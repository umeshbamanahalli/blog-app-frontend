import { Link } from "react-router-dom";
import { Button, Card, CardBody, CardText, CardTitle } from "reactstrap";
import { FaUser, FaCalendarAlt, FaArrowRight } from "react-icons/fa";
import { BASE_URL } from "../services/helpers"; // Adjust path to your base URL helper

const Post = ({ 
    post = { 
        title: "This is default post title", 
        content: "This is default content...", 
        postId: "", 
        addedDate: "",
        imageName: "",
        user: { name: "Author" },
        category: { categoryTitle: "General" }
    } 
}) => {
    // Extract ID safely (supports both postId and id)
    const postId = post.postId || post.id;

    // Truncate content for a clean snippet preview (handling potential HTML tags safely)
    const getSnippet = (content) => {
        if (!content) return "";
        // Strip basic HTML tags for preview snippet if needed, or substring raw HTML
        const strippedContent = content.replace(/<[^>]*>?/gm, '');
        return strippedContent.length > 120 ? strippedContent.substring(0, 120) + "..." : strippedContent;
    };

    return (
        <Card className="border-0 shadow-sm rounded-4 mb-4 overflow-hidden transition-all hover-shadow bg-white">
            {/* Optional Post Cover Image Banner */}
            {post.imageName && post.imageName !== "default.png" && (
                <div style={{ height: "180px", overflow: "hidden" }} className="bg-light">
                    <img 
                        src={`${BASE_URL}/post/image/${post.imageName}`} 
                        alt={post.title} 
                        className="w-100 h-100 object-fit-cover"
                    />
                </div>
            )}

            <CardBody className="p-4">
                {/* Category & Date Header */}
                <div className="d-flex justify-content-between align-items-center mb-2">
                    <span className="badge bg-dark bg-opacity-75 px-3 py-1 rounded-pill small">
                        {post.category?.categoryTitle || "General"}
                    </span>
                    {post.addedDate && (
                        <small className="text-muted d-flex align-items-center gap-1">
                            <FaCalendarAlt size={12} /> {new Date(post.addedDate).toLocaleDateString()}
                        </small>
                    )}
                </div>

                {/* Post Title */}
                <CardTitle tag="h4" className="fw-bold text-dark mb-2">
                    <Link to={`/posts/${postId}`} className="text-decoration-none text-dark hover-success">
                        {post.title}
                    </Link>
                </CardTitle>
                
                {/* Snippet Preview */}
                <CardText className="text-secondary mb-4 small lh-base">
                    {getSnippet(post.content)}
                </CardText>

                {/* Footer Section: Author Info & Read More Button */}
                <div className="d-flex justify-content-between align-items-center pt-3 border-top border-light">
                    <div className="d-flex align-items-center gap-2">
                        <span className="rounded-circle bg-success text-white d-inline-flex align-items-center justify-content-center fw-bold" style={{ width: 30, height: 30, fontSize: '12px' }}>
                            {post.user?.name ? post.user.name.charAt(0).toUpperCase() : <FaUser size={10} />}
                        </span>
                        <small className="text-muted fw-semibold">
                            {post.user?.name || "Author"}
                        </small>
                    </div>

                    <Button 
                        tag={Link} 
                        to={`/posts/${postId}`} 
                        color="dark" 
                        size="sm" 
                        className="rounded-pill px-4 py-2 fw-semibold shadow-sm d-flex align-items-center gap-1"
                    >
                        Read More <FaArrowRight size={10} />
                    </Button>
                </div>
            </CardBody>
        </Card>
    );
};

export default Post;