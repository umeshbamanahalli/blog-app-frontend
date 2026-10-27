import { useEffect, useState } from "react";
import Base from "../components/Base";
import { loadAllPosts } from "../services/post-service";
import { Col, Row, Spinner, Container } from "reactstrap";
import Post from "./Post";
import { toast } from "react-toastify";
import InfiniteScroll from "react-infinite-scroll-component";

const NewFeed = () => {
  const [posts, setPosts] = useState({
    content: [],
    totalPages: 0,
    totalElements: 0,
    pageSize: 5,
    pageNumber: 0,
    lastPage: false
  });

  const [currentPage, setCurrentPage] = useState(0);

  // Fetch initial posts on component mount
  useEffect(() => {
    changePage(0);
  }, []);

  const changePage = (pageNumber = 0, pageSize = 5) => {
    loadAllPosts(pageNumber, pageSize)
      .then((data) => {
        setPosts({
          content: [...posts.content, ...data.content], // Append new posts to existing ones
          totalPages: data.totalPages,
          totalElements: data.totalElements,
          pageSize: data.pageSize,
          pageNumber: data.pageNumber,
          lastPage: data.lastPage
        });
      })
      .catch((error) => {
        console.error(error);
        // toast.error("Error in loading posts");
      });
  };

  // Function called automatically when user scrolls near the bottom
  const fetchMoreData = () => {
    if (!posts.lastPage) {
      const nextPage = currentPage + 1;
      setCurrentPage(nextPage);
      changePage(nextPage, posts.pageSize);
    }
  };

  return (
    <Container className="py-4">
      <Row>
        <Col md={{ size: 12, }}>
          {/* Header Section */}
          <div className="mb-4 text-center">
            <h2 className="fw-bold text-dark">Blogs Feed</h2>
            <p className="text-muted">
              Total Posts: {posts?.totalElements || 0}
            </p>
          </div>

          {/* Infinite Scroll Wrapper */}
          <InfiniteScroll
            dataLength={posts.content.length}
            next={fetchMoreData}
            hasMore={!posts.lastPage}
            loader={
              <div className="text-center py-4">
                <Spinner color="dark" style={{ width: "2.5rem", height: "2.5rem" }} />
                <p className="text-muted mt-2 fw-semibold">Loading more stories...</p>
              </div>
            }
            endMessage={
              <div className="text-center py-4 text-muted fw-semibold">
                 You've reached the end of the feed!
              </div>
            }
          >
            {posts.content && posts.content.length > 0 ? (
              posts.content.map((post, index) => (
                <div key={post.postId || post.id || index} className="mb-4">
                  <Post post={post} />
                </div>
              ))
            ) : (
              <div className="text-center py-5 bg-light rounded-4 shadow-sm">
                <h5 className="text-muted mb-0">No posts available yet!</h5>
              </div>
            )}
          </InfiniteScroll>
        </Col>
      </Row>
    </Container>
  );
};

export default NewFeed;