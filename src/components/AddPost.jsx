import { Button, Card, CardBody, Container, Form, Input, Label, Row, Col, Spinner } from "reactstrap";
import { FaPlus, FaTrash, FaImage, FaUpload } from "react-icons/fa";
import { useEffect, useState, useRef } from "react";
import JoditEditor from "jodit-react";
import { getAllCategories } from "../services/catergory-service";
import { toast } from "react-toastify";
import Base from "../components/Base";
import { createPost as doCreatePost, uploadPostImage } from "../services/post-service";
import { getCurrentUserDetail } from "../auth";
import { useNavigate } from "react-router-dom";

const AddPost = () => {
    const editor = useRef(null);
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [user, setUser] = useState(undefined);
    const [loading, setLoading] = useState(false);

    // Form fields state
    const [postData, setPostData] = useState({
        title: '',
        content: '',
        categoryId: ''
    });


    // Image upload state
    const [image, setImage] = useState(null);
    const [imagePreview, setImagePreview] = useState(null);

    useEffect(() => {
        setUser(getCurrentUserDetail());
        getAllCategories()
            .then((data) => {
                setCategories(data);
            })
            .catch((error) => {
                console.error("Error fetching categories:", error);
                toast.error("Failed to load categories");
            });
    }, []);

    const fieldChanged = (event) => {
        setPostData({ ...postData, [event.target.name]: event.target.value });
    };

    const contentFieldChanged = (content) => {
        setPostData({ ...postData, content });
    };

    // Handle Image file selection & generate preview
    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            if (!file.type.startsWith("image/")) {
                toast.error("Please select a valid image file (PNG, JPG, JPEG)");
                return;
            }
            setImage(file);
            setImagePreview(URL.createObjectURL(file));
        }
    };

    // Remove selected image
    const removeSelectedImage = () => {
        setImage(null);
        setImagePreview(null);
    };

    const createPost = (event) => {
        event.preventDefault();

        if (postData.title.trim() === '') {
            toast.error("Post title is required!");
            return;
        }
        if (postData.content.trim() === '') {
            toast.error("Post content is required!");
            return;
        }
        if (postData.categoryId === '') {
            toast.error("Category is required!");
            return;
        }

        setLoading(true);

        // Attach userId to data payload
        const postPayload = {
            ...postData,
            userId: user.id
        };

        // Step 1: Create the post
        doCreatePost(postPayload)
            .then((data) => {
                const createdPostId = data.postId || data.id;

                // Step 2: Upload image if selected
                if (image) {
                    return uploadPostImage(image, createdPostId)
                        .then(() => {
                            toast.success("Post and image published successfully!");
                        })
                        .catch((err) => {
                            console.error("Image upload error:", err);
                            toast.warning("Post created, but failed to upload image.");
                        });
                } else {
                    toast.success("Post created successfully!");
                }
            })
            .then(() => {
                resetForm();
                navigate("/user/dashboard");
            })
            .catch((error) => {
                console.error("Error creating post:", error);
                toast.error("Failed to create post. Please try again.");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const resetForm = () => {
        setPostData({
            title: '',
            content: '',
            categoryId: ''
        });
        setImage(null);
        setImagePreview(null);
    };

    return (
        <Base>
            <Container className="py-5">
                <Row className="justify-content-center">
                    <Col md={10} lg={8}>
                        <Card className="border-0 shadow-lg rounded-4 overflow-hidden">
                            <div className="bg-dark text-white p-4 text-center">
                                <h3 className="mb-0 fw-bold">What is on your mind?</h3>
                                <p className="text-white-50 small mb-0">Create and publish a new blog post</p>
                            </div>
                            <CardBody className="p-4 p-md-5 bg-light">
                                <Form onSubmit={createPost}>
                                    {/* Post Title */}
                                    <div className="mb-3">
                                        <Label for="title" className="fw-semibold text-secondary">
                                            Post Title
                                        </Label>
                                        <Input
                                            type="text"
                                            placeholder="Enter an engaging title here..."
                                            id="title"
                                            className="rounded-pill px-3 py-2"
                                            name="title"
                                            value={postData.title}
                                            onChange={fieldChanged}
                                        />
                                    </div>

                                    {/* Category Select */}
                                    <div className="mb-3">
                                        <Label for="categoryId" className="fw-semibold text-secondary">
                                            Category
                                        </Label>
                                        <Input
                                            type="select"
                                            id="categoryId"
                                            className="rounded-pill px-3 py-2"
                                            name="categoryId"
                                            value={postData.categoryId}
                                            onChange={fieldChanged}
                                        >
                                            <option value="">Select a category</option>
                                            {categories.map((category) => (
                                                <option key={category.id || category.categoryId} value={category.categoryId}>
                                                    {category.categoryTitle}
                                                </option>
                                            ))}
                                        </Input>
                                    </div>

                                    {/* Banner Image / File Picker */}
                                    <div className="mb-4">
                                        <Label for="image" className="fw-semibold text-secondary mb-2 d-flex align-items-center gap-2">
                                            <FaImage className="text-success" /> Cover Image (Optional)
                                        </Label>
                                        <Input
                                            type="file"
                                            id="image"
                                            accept="image/*"
                                            className="rounded-pill px-3 py-2 bg-white"
                                            onChange={handleFileChange}
                                        />
                                        
                                        {/* Image Preview Box */}
                                        {imagePreview && (
                                            <div className="mt-3 position-relative d-inline-block rounded-3 overflow-hidden border shadow-sm" style={{ maxHeight: '200px' }}>
                                                <img 
                                                    src={imagePreview} 
                                                    alt="Preview" 
                                                    className="img-fluid rounded-3" 
                                                    style={{ maxHeight: '200px', objectFit: 'cover' }} 
                                                />
                                                <Button 
                                                    color="danger" 
                                                    size="sm" 
                                                    className="position-absolute top-0 end-0 m-2 rounded-circle p-1"
                                                    style={{ width: 28, height: 28 }}
                                                    onClick={removeSelectedImage}
                                                    type="button"
                                                >
                                                    <FaTrash size={12} />
                                                </Button>
                                            </div>
                                        )}
                                    </div>

                                    {/* Jodit Content Editor */}
                                    <div className="mb-4">
                                        <Label for="content" className="fw-semibold text-secondary mb-2">
                                            Post Content
                                        </Label>
                                        <div className="rounded-3 overflow-hidden border">
                                            <JoditEditor
                                                ref={editor}
                                                value={postData.content}
                                                onChange={contentFieldChanged}
                                            />
                                        </div>
                                    </div>

                                    {/* Buttons */}
                                    <div className="d-flex justify-content-center gap-3 pt-2">
                                        <Button
                                            type="submit"
                                            color="dark"
                                            className="rounded-pill px-4 py-2 fw-semibold shadow-sm d-flex align-items-center gap-2"
                                            disabled={loading}
                                        >
                                            {loading ? <Spinner size="sm" /> : <FaPlus />} Create Post
                                        </Button>
                                        <Button
                                            type="button"
                                            color="outline-secondary"
                                            className="rounded-pill px-4 py-2 fw-semibold shadow-sm d-flex align-items-center gap-2"
                                            onClick={resetForm}
                                            disabled={loading}
                                        >
                                            <FaTrash size={14} /> Reset Content
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
};

export default AddPost;