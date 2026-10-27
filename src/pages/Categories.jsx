import React, { useEffect, useState } from 'react';
import Base from '../components/Base';
import { useParams } from 'react-router-dom';
import { Container, Row, Col, Spinner } from 'reactstrap';
import { loadPostsByCategory } from '../services/post-service';
import { toast } from 'react-toastify';
import Post from '../components/Post';// Adjust path if your Post component is in a different folder
import HorizontalCategoryList from '../components/HorizontalCategoryList';

export default function Categories() {
    const { categoryId } = useParams();
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(true);
        loadPostsByCategory(categoryId)
            .then((data) => {
                // Handle both paginated responses (data.content) and direct array responses (data)
                setPosts(data.content || data);
                setLoading(false);
            })
            .catch((error) => {
                console.error(error);
                toast.error("Error in loading posts for this category");
                setLoading(false);
            });
    }, [categoryId]); // Re-fetch whenever the category changes in the URL

    return (
        <Base>
            <Container className="py-5">
                <Row className="justify-content-center">
                    <Col md={10} lg={8}>
                        {/* Optional: Include the horizontal category bar at the top for easy switching */}
                        <HorizontalCategoryList />

                        {/* Page Header */}
                        <div className="mb-4 text-center">
                            <h2 className="fw-bold text-dark display-6">Category Posts</h2>
                            <p className="text-muted">
                                {loading ? "Loading..." : `Found ${posts.length} story/stories in this category`}
                            </p>
                        </div>

                        {/* Conditional Rendering: Loading vs Posts vs Empty State */}
                        {loading ? (
                            <div className="text-center py-5">
                                <Spinner color="dark" style={{ width: '3rem', height: '3rem' }} />
                                <p className="text-muted mt-3 fw-semibold">Loading category posts...</p>
                            </div>
                        ) : posts && posts.length > 0 ? (
                            posts.map((post) => (
                                <div key={post.postId || post.id} className="mb-4">
                                    <Post post={post} />
                                </div>
                            ))
                        ) : (
                            <div className="text-center py-5 bg-light rounded-4 shadow-sm">
                                <h5 className="text-muted mb-0">No posts found in this category yet!</h5>
                            </div>
                        )}
                    </Col>
                </Row>
            </Container>
        </Base>
    );
}