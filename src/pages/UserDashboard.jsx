import { Container, Row, Col, Card, CardBody, Button, Spinner } from "reactstrap";
import Base from "../components/Base";
import { useEffect, useState } from "react";
import { getCurrentUserDetail } from "../auth";
import { loadPostUserData,deletePostService } from "../services/post-service"; // Adjust service import if needed
import { Link } from "react-router-dom";
import { FaPlus, FaBlog, FaTrash, FaEye } from "react-icons/fa";
import { toast } from "react-toastify";

const UserDashboard = () => {
    const [user, setUser] = useState({});
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const currentUser = getCurrentUserDetail();
        setUser(currentUser);

        if (currentUser?.id) {
            loadPostUserData(currentUser?.id)
                .then((data) => {
                    setPosts(data);
                })
                .catch((error) => {
                    console.error(error);
                    toast.error("Error in loading your posts");
                })
                .finally(() => {
                    setLoading(false);
                });
                console.log(currentUser);
                
        } else {
            setLoading(false);
        }
    }, []);

    const handleDeletePost = (postId) => {
        deletePostService(postId)
            .then(() => {
                toast.success("Post deleted successfully");
                setPosts(posts.filter((p) => (p.postId || p.id) !== postId));
            })
            .catch((error) => {
                console.error(error);
                toast.error("Error in deleting post");
            });
    };

    return (
        <Base>
            <Container className="py-5">
                {/* Welcome Banner */}
                <Row className="mb-4">
                    <Col md={12}>
                        <Card className="border-0 shadow-lg rounded-4 bg-dark text-white p-4">
                            <CardBody className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                                <div>
                                    <h2 className="fw-bold mb-1">Welcome back, {user?.name || "Blogger"}! 👋</h2>
                                    <p className="text-white-50 mb-0">Manage your published blogs and track your activity here.</p>
                                </div>
                                <Button 
                                    tag={Link} 
                                    to="/user/add-blog" 
                                    color="success" 
                                    className="rounded-pill px-4 py-2 fw-semibold d-flex align-items-center gap-2 shadow-sm"
                                >
                                    <FaPlus /> Create New Post
                                </Button>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                {/* Posts Management Section */}
                <Row>
                    <Col md={12}>
                        <h4 className="fw-bold text-dark mb-3">Your Published Posts ({posts.length})</h4>
                        
                        {loading ? (
                            <div className="text-center py-5">
                                <Spinner color="dark" style={{ width: '3rem', height: '3rem' }} />
                                <p className="text-muted mt-3 fw-semibold">Loading your posts...</p>
                            </div>
                        ) : posts.length > 0 ? (
                            <div className="d-flex flex-column gap-3">
                                {posts.map((post) => {
                                    const id = post.postId || post.id;
                                    return (
                                        <Card key={id} className="border-0 shadow-sm rounded-4 p-3 bg-white">
                                            <CardBody className="d-flex justify-content-between align-items-center flex-wrap gap-3">
                                                <div>
                                                    <h5 className="fw-bold text-dark mb-1">{post.title}</h5>
                                                    <small className="text-muted">
                                                        Category: {post.category?.categoryTitle || "General"} | Added: {post.addedDate ? new Date(post.addedDate).toLocaleDateString() : ""}
                                                    </small>
                                                </div>
                                                <div className="d-flex gap-2">
                                                    <Button 
                                                        tag={Link} 
                                                        to={`/posts/${id}`} 
                                                        color="outline-dark" 
                                                        size="sm" 
                                                        className="rounded-pill px-3 d-flex align-items-center gap-1"
                                                    >
                                                        <FaEye /> View
                                                    </Button>
                                                    <Button 
                                                        color="outline-danger" 
                                                        size="sm" 
                                                        className="rounded-pill px-3 d-flex align-items-center gap-1"
                                                        onClick={() => handleDeletePost(id)}
                                                    >
                                                        <FaTrash /> Delete
                                                    </Button>
                                                </div>
                                            </CardBody>
                                        </Card>
                                    );
                                })}
                            </div>
                        ) : (
                            <Card className="border-0 shadow-sm rounded-4 text-center py-5 bg-light">
                                <CardBody>
                                    <FaBlog size={48} className="text-muted mb-3" />
                                    <h5 className="text-muted mb-2">You haven't published any posts yet!</h5>
                                    <p className="text-muted small mb-4">Share your thoughts with the world by creating your first post.</p>
                                    <Button 
                                        tag={Link} 
                                        to="/user/add-blog" 
                                        color="dark" 
                                        className="rounded-pill px-4 fw-semibold"
                                    >
                                        Create Post Now
                                    </Button>
                                </CardBody>
                            </Card>
                        )}
                    </Col>
                </Row>
            </Container>
        </Base>
    );
};

export default UserDashboard;