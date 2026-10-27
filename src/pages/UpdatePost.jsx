import React, { useState, useEffect, useRef } from 'react';
import Base from '../components/Base';
import { useParams, useNavigate } from 'react-router-dom';
import { Container, Card, CardBody, Form, FormGroup, Label, Input, Button, Row, Col, Spinner } from 'reactstrap';
import { loadPost, updatePost, uploadPostImage } from '../services/post-service';
import { loadAllCategories } from '../services/catergory-service';
import { toast } from 'react-toastify';
import JoditEditor from 'jodit-react';
import { BASE_URL } from '../services/helpers'; // Import BASE_URL to show preview if needed

export default function UpdatePost() {
    const editor = useRef(null);
    const { postId } = useParams();
    const navigate = useNavigate();

    const [categories, setCategories] = useState([]);
    const [post, setPost] = useState({
        title: '',
        content: '',
        categoryId: '',
        imageName: '' // 👈 Added to preserve existing image
    });
    
    const [image, setImage] = useState(null); // New image file if selected
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        // 1. Fetch categories
        loadAllCategories()
            .then((data) => setCategories(data))
            .catch((error) => {
                console.error(error);
                toast.error("Error in loading categories");
            });

        // 2. Fetch existing post data
        loadPost(postId)
            .then((data) => {
                setPost({
                    title: data.title,
                    content: data.content,
                    categoryId: data.category ? data.category.categoryId : '',
                    imageName: data.imageName || '' // 👈 Capture existing image name from backend
                });
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                toast.error("Error in loading post details");
                setLoading(false);
            });
    }, [postId]);

    // Handle text input changes
    const fieldChanged = (event) => {
        setPost({ ...post, [event.target.name]: event.target.value });
    };

    // Handle rich text editor changes
    const contentFieldChanged = (value) => {
        setPost({ ...post, content: value });
    };

    // Handle new image file selection
    const handleFileChange = (event) => {
        setImage(event.target.files[0]);
    };

    // Handle form submission & updates
  // Handle form submission & updates
    const submitUpdate = (event) => {
        event.preventDefault();

        if (post.title.trim() === '' || post.content.trim() === '') {
            toast.error("Title and content cannot be empty!");
            return;
        }

        // Prepare the payload for the backend
        // Note: Adjust 'category: { categoryId: post.categoryId }' if your backend 
        // expects 'categoryId: post.categoryId' directly instead of a nested object.
        const postDataToUpdate = {
            title: post.title,
            content: post.content,
            imageName: post.imageName,
            category: {
                categoryId: post.categoryId
            }
        };

        setUpdating(true);

        // 1. Update Post Details (Title, Content, Category, Preserved Image)
        updatePost(postId, postDataToUpdate)
            .then((res) => {
                // 2. If a NEW image was selected, upload it separately
                if (image != null) {
                    uploadPostImage(image, res.postId || postId)
                        .then(() => {
                            toast.success("Post, category, and image updated successfully!");
                            navigate(`/posts/${postId}`);
                        })
                        .catch((imgError) => {
                            console.error(imgError);
                            toast.error("Post updated, but failed to upload new image.");
                            navigate(`/posts/${postId}`);
                        });
                } else {
                    toast.success("Post and category updated successfully!");
                    setUpdating(false);
                    navigate(`/posts/${postId}`);
                }
            })
            .catch((error) => {
                console.error(error);
                toast.error("Error in updating post");
                setUpdating(false);
            });
    };;

    if (loading) {
        return (
            <Base>
                <Container className="text-center py-5">
                    <Spinner color="dark" style={{ width: '3rem', height: '3rem' }} />
                    <p className="text-muted mt-3 fw-semibold">Loading post details...</p>
                </Container>
            </Base>
        );
    }

    return (
        <Base>
            <Container className="py-5">
                <Row className="justify-content-center">
                    <Col md={10} lg={9}>
                        <Card className="border-0 shadow-sm rounded-4 p-4">
                            <CardBody>
                                <div className="text-center mb-4">
                                    <h2 className="fw-bold text-dark">Update Blog Post</h2>
                                    <p className="text-muted">Modify your story content or update its cover image</p>
                                </div>

                                <Form onSubmit={submitUpdate}>
                                    {/* Post Title */}
                                    <FormGroup className="mb-3">
                                        <Label for="title" className="fw-semibold">Post Title</Label>
                                        <Input 
                                            type="text" 
                                            id="title" 
                                            name="title" 
                                            placeholder="Enter your title"
                                            value={post.title}
                                            onChange={fieldChanged}
                                            className="rounded-3 py-2 shadow-none"
                                            required
                                        />
                                    </FormGroup>

                                    {/* Category Selection */}
                                    <FormGroup className="mb-3">
                                        <Label for="categoryId" className="fw-semibold">Category</Label>
                                        <Input 
                                            type="select" 
                                            id="categoryId" 
                                            name="categoryId"
                                            value={post.categoryId}
                                            onChange={fieldChanged}
                                            className="rounded-3 py-2 shadow-none"
                                            required
                                        >
                                            <option value="" disabled>Select category</option>
                                            {categories.map((cat) => (
                                                <option key={cat.categoryId} value={cat.categoryId}>
                                                    {cat.categoryTitle}
                                                </option>
                                            ))}
                                        </Input>
                                    </FormGroup>

                                    {/* Existing Image Preview / Optional New Image Upload */}
                                    <FormGroup className="mb-3">
                                        <Label for="image" className="fw-semibold">Banner Image</Label>
                                        {post.imageName && !image && (
                                            <div className="mb-2">
                                                <p className="text-muted small mb-1">Current Image:</p>
                                                <img 
                                                    src={`${BASE_URL}posts/image/${post.imageName}`} 
                                                    alt="Current Banner" 
                                                    className="rounded-3 shadow-sm"
                                                    style={{ width: '150px', height: '90px', objectFit: 'cover' }}
                                                />
                                            </div>
                                        )}
                                        <Input 
                                            type="file" 
                                            id="image" 
                                            onChange={handleFileChange}
                                            className="rounded-3 py-2 shadow-none"
                                        />
                                        <small className="text-muted">Leave empty to keep the existing image.</small>
                                    </FormGroup>

                                    {/* Jodit Rich Text Editor for Content */}
                                    <FormGroup className="mb-4">
                                        <Label for="content" className="fw-semibold">Post Content</Label>
                                        <JoditEditor
                                            ref={editor}
                                            value={post.content}
                                            onChange={contentFieldChanged}
                                        />
                                    </FormGroup>

                                    {/* Submit Button */}
                                    <div className="d-grid gap-2">
                                        <Button 
                                            color="dark" 
                                            className="rounded-pill py-2 fw-semibold shadow-sm"
                                            type="submit"
                                            disabled={updating}
                                        >
                                            {updating ? (
                                                <>
                                                    <Spinner size="sm" className="me-2" /> Saving Changes...
                                                </>
                                            ) : (
                                                "Save Changes"
                                            )}
                                        </Button>
                                    </div>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Base>
    );
}