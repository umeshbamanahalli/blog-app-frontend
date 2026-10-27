import { Link, useParams, useNavigate } from "react-router-dom";
import Base from "../components/Base";
import { Col, Container, Row, Card, CardBody, Spinner, CardText, Input, Button } from "reactstrap";
import { useEffect, useState } from "react";
import { createComment, loadPost, deletePostService, deleteCommentService, updateCommentService } from "../services/post-service";
import { isLoggedIn, getCurrentUserDetail } from "../auth/index.js";
import { toast } from "react-toastify";
import { FaArrowLeft, FaPaperPlane, FaRegCommentDots, FaEdit, FaTrash, FaCheck, FaTimes } from "react-icons/fa";
import { BASE_URL } from "../services/helpers";

const PostPage = () => {
    const { postId } = useParams();
    const navigate = useNavigate();
    const [post, setPost] = useState(null);
    const [comment, setComment] = useState({
        content: ''
    });

    // States for comment editing
    const [editingCommentId, setEditingCommentId] = useState(null);
    const [editedContent, setEditedContent] = useState('');

    const [user, setUser] = useState(null);
    const [login, setLogin] = useState(false);

    useEffect(() => {
        setUser(getCurrentUserDetail());
        setLogin(isLoggedIn());

        if (postId) {
            loadPost(postId)
                .then((data) => {
                    setPost(data);
                })
                .catch((err) => {
                    toast.error("Error in loading post details");
                });
        }
    }, [postId]);

    // Handle Delete Post
    const handleDeletePost = () => {
        if (window.confirm("Are you sure you want to delete this post?")) {
            deletePostService(post.postId || postId)
                .then((res) => {
                    toast.success("Post deleted successfully");
                    navigate("/");
                })
                .catch((error) => {
                    console.error(error);
                    toast.error("Error in deleting post");
                });
        }
    };

    // Handle Delete Comment
    const handleDeleteComment = (commentId) => {
        if (window.confirm("Are you sure you want to delete this comment?")) {
            deleteCommentService(commentId)
                .then((res) => {
                    toast.success("Comment deleted successfully");
                    setPost({
                        ...post,
                        comments: post.comments.filter((c) => (c.commentId || c.id) !== commentId)
                    });
                })
                .catch((error) => {
                    console.error(error);
                    toast.error("Error in deleting comment");
                });
        }
    };

    // Handle Start Editing Comment
    const startEditing = (c) => {
        setEditingCommentId(c.commentId || c.id);
        setEditedContent(c.content);
    };

    // Handle Save Edited Comment
    const handleUpdateComment = (commentId) => {
        if (!editedContent.trim()) {
            toast.warn("Comment cannot be empty!");
            return;
        }

        updateCommentService({ content: editedContent }, commentId)
            .then((updatedComment) => {
                toast.success("Comment updated successfully!");
                // Update state locally
                setPost({
                    ...post,
                    comments: post.comments.map((c) => {
                        const id = c.commentId || c.id;
                        if (id === commentId) {
                            return { ...c, content: editedContent };
                        }
                        return c;
                    })
                });
                setEditingCommentId(null);
                setEditedContent('');
            })
            .catch((error) => {
                console.error(error);
                toast.error("Failed to update comment");
            });
    };

    const submitComment = () => {
        if (!comment.content.trim()) {
            toast.warn("Comment cannot be empty!");
            return;
        }

        createComment(comment, postId)
            .then((data) => {
                toast.success("Comment added successfully!");
                setPost({
                    ...post,
                    comments: [...(post.comments || []), data]
                });
                setComment({ content: '' });
            })
            .catch((err) => {
                console.error(err);
                toast.error("Failed to add comment.");
            });
    };

    return (
        <Base>
            <Container className="py-5">
                {/* Back Link & Action Buttons (Edit/Delete Post) */}
                <Row className="justify-content-center mb-3">
                    <Col md={10} lg={8} className="d-flex justify-content-between align-items-center">
                        <Link to="/" className="text-decoration-none text-dark fw-semibold d-inline-flex align-items-center gap-2">
                            <FaArrowLeft /> Back to Feed
                        </Link>

                        {login && user && post && user.id === post.user?.id && (
                            <div className="d-flex gap-2">
                                <Button 
                                    tag={Link} 
                                    to={`/user/update-blog/${post.postId || postId}`} 
                                    color="warning" 
                                    size="sm" 
                                    className="rounded-pill px-3 text-dark fw-semibold d-inline-flex align-items-center gap-1"
                                >
                                    <FaEdit /> Edit
                                </Button>
                                <Button 
                                    onClick={handleDeletePost} 
                                    color="danger" 
                                    size="sm" 
                                    className="rounded-pill px-3 fw-semibold d-inline-flex align-items-center gap-1"
                                >
                                    <FaTrash /> Delete
                                </Button>
                            </div>
                        )}
                    </Col>
                </Row>

                {/* Main Post Section */}
                <Row className="justify-content-center">
                    <Col md={10} lg={8}>
                        {post ? (
                            <Card className="border-0 shadow-lg rounded-4 overflow-hidden p-3 p-md-4 bg-white mb-4">
                                <CardBody>
                                    {/* Category & Date */}
                                    <div className="d-flex justify-content-between align-items-center mb-3 text-muted small">
                                        <span className="badge bg-dark px-3 py-2 rounded-pill">
                                            {post.category?.categoryTitle || "General"}
                                        </span>
                                        <span>
                                            {post.addedDate ? new Date(post.addedDate).toLocaleDateString() : ""}
                                        </span>
                                    </div>

                                    {/* Post Title */}
                                    <h1 className="fw-bold text-dark mb-4 display-6">
                                        {post.title}
                                    </h1>

                                    {post.imageName && (
                                        <div className="image-container mb-4 rounded-4 overflow-hidden shadow-sm">
                                            <img 
                                                src={BASE_URL + '/post/image/' + post.imageName} 
                                                alt="Post visual" 
                                                className="w-100 object-fit-cover" 
                                                style={{ maxHeight: '400px' }}
                                            />
                                        </div>
                                    )}

                                    {/* Author Info */}
                                    <div className="d-flex align-items-center gap-3 mb-4 pb-3 border-bottom">
                                        <div className="bg-dark bg-opacity-10 rounded-circle d-flex align-items-center justify-content-center fw-bold text-dark" style={{ width: 45, height: 45 }}>
                                            {post.user?.name ? post.user.name.charAt(0).toUpperCase() : "U"}
                                        </div>
                                        <div>
                                            <h6 className="mb-0 fw-bold">{post.user?.name || "Anonymous Author"}</h6>
                                            <small className="text-muted">Author</small>
                                        </div>
                                    </div>

                                    {/* Post Content */}
                                    <div
                                        className="post-content text-secondary lh-lg"
                                        dangerouslySetInnerHTML={{ __html: post.content }}
                                    />
                                </CardBody>
                            </Card>
                        ) : (
                            <div className="text-center py-5">
                                <Spinner color="dark" style={{ width: '3rem', height: '3rem' }} />
                                <p className="text-muted mt-3 fw-semibold">Loading post details...</p>
                            </div>
                        )}
                    </Col>
                </Row>

                {/* Comments Section */}
                <Row className="justify-content-center mt-3">
                    <Col md={10} lg={8}>
                        <div className="d-flex align-items-center gap-2 mb-3">
                            <FaRegCommentDots className="text-dark fs-4" />
                            <h3 className="fw-bold mb-0 text-dark">Comments ({post?.comments?.length || 0})</h3>
                        </div>

                        {/* Existing Comments */}
                        {post?.comments && post.comments.length > 0 ? (
                            post.comments.map((c, index) => {
                                const commentId = c.commentId || c.id;
                                const isCommentAuthor = login && user && c.user && user.id === c.user.id;
                                const isEditing = editingCommentId === commentId;

                                return (
                                    <Card className="mb-3 border-0 shadow-sm rounded-4 bg-light" key={commentId || index}>
                                        <CardBody className="py-3">
                                            <div className="d-flex justify-content-between align-items-start mb-2">
                                                <small className="fw-bold text-muted">{c.user?.name || "Anonymous"}</small>
                                                
                                                {/* Show Edit & Delete buttons if comment author */}
                                                {isCommentAuthor && !isEditing && (
                                                    <div className="d-flex gap-2">
                                                        <Button 
                                                            color="link" 
                                                            className="text-primary p-0 text-decoration-none" 
                                                            onClick={() => startEditing(c)}
                                                            title="Edit comment"
                                                        >
                                                            <FaEdit size={14} />
                                                        </Button>
                                                        <Button 
                                                            color="link" 
                                                            className="text-danger p-0 text-decoration-none" 
                                                            onClick={() => handleDeleteComment(commentId)}
                                                            title="Delete comment"
                                                        >
                                                            <FaTrash size={14} />
                                                        </Button>
                                                    </div>
                                                )}
                                            </div>

                                            {/* Render Text or Inline Edit Input */}
                                            {isEditing ? (
                                                <div className="mt-2">
                                                    <Input 
                                                        type="textarea"
                                                        rows="2"
                                                        value={editedContent}
                                                        onChange={(e) => setEditedContent(e.target.value)}
                                                        className="mb-2 shadow-none"
                                                    />
                                                    <div className="d-flex gap-2 justify-content-end">
                                                        <Button color="success" size="sm" onClick={() => handleUpdateComment(commentId)}>
                                                            <FaCheck /> Save
                                                        </Button>
                                                        <Button color="secondary" size="sm" onClick={() => setEditingCommentId(null)}>
                                                            <FaTimes /> Cancel
                                                        </Button>
                                                    </div>
                                                </div>
                                            ) : (
                                                <CardText className="text-dark mb-0">
                                                    {c.content}
                                                </CardText>
                                            )}
                                        </CardBody>
                                    </Card>
                                );
                            })
                        ) : (
                            <p className="text-muted fst-italic mb-4">No comments yet. Be the first to share your thoughts!</p>
                        )}

                        {/* Add Comment Card */}
                        <Card className="border-0 shadow-lg rounded-4 p-3 bg-white mt-4">
                            <CardBody>
                                <h5 className="fw-bold mb-3">Leave a Comment</h5>
                                <Input 
                                    type="textarea" 
                                    rows="3"
                                    placeholder="Write your comment here..." 
                                    className="border-0 bg-light rounded-3 p-3 mb-3 shadow-none"
                                    value={comment.content} 
                                    onChange={(event) => setComment({ content: event.target.value })}
                                />
                                <div className="d-flex justify-content-end">
                                    <Button 
                                        onClick={submitComment} 
                                        color="dark" 
                                        className="rounded-pill px-4 d-inline-flex align-items-center gap-2"
                                    >
                                        <FaPaperPlane /> Post Comment
                                    </Button>
                                </div>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
            </Container>
        </Base>
    );
};

export default PostPage;