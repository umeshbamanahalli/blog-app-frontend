import React from 'react';
import { Container, Row, Col, Card, CardBody, Button } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FaBlog, FaShieldAlt, FaRocket, FaCode } from 'react-icons/fa';
import Base from '../components/Base';

const About = () => {
    return (
        <Base>
            <Container className="py-5">
                {/* Header Section */}
                <Row className="justify-content-center text-center mb-5">
                    <Col md={8} lg={6}>
                        <div className="bg-success text-white p-3 rounded-circle d-inline-flex align-items-center justify-content-center shadow-sm mb-3" style={{ width: 64, height: 64 }}>
                            <FaBlog size={32} />
                        </div>
                        <h1 className="fw-bold text-dark display-5 mb-3">About Blogger</h1>
                        <p className="text-secondary lead">
                            Empowering writers, developers, and thinkers to share their ideas with the world through a secure, fast, and elegant blogging experience.
                        </p>
                    </Col>
                </Row>

                {/* Features Grid */}
                <Row className="g-4 mb-5">
                    <Col md={4}>
                        <Card className="border-0 shadow-sm rounded-4 h-100 p-3 bg-light">
                            <CardBody>
                                <div className="text-success mb-3">
                                    <FaRocket size={30} />
                                </div>
                                <h5 className="fw-bold text-dark mb-2">Blazing Fast Feed</h5>
                                <p className="text-muted small mb-0">
                                    Browse rich blog feeds seamlessly with instant load times, clean card layouts, and live category filters.
                                </p>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="border-0 shadow-sm rounded-4 h-100 p-3 bg-light">
                            <CardBody>
                                <div className="text-success mb-3">
                                    <FaShieldAlt size={30} />
                                </div>
                                <h5 className="fw-bold text-dark mb-2">Secure Authentication</h5>
                                <p className="text-muted small mb-0">
                                    JWT-based authentication ensures your account, published articles, and profile details remain protected.
                                </p>
                            </CardBody>
                        </Card>
                    </Col>
                    <Col md={4}>
                        <Card className="border-0 shadow-sm rounded-4 h-100 p-3 bg-light">
                            <CardBody>
                                <div className="text-success mb-3">
                                    <FaCode size={30} />
                                </div>
                                <h5 className="fw-bold text-dark mb-2">Modern Tech Stack</h5>
                                <p className="text-muted small mb-0">
                                    Built on a robust Spring Boot backend REST API and a responsive React frontend powered by Reactstrap & Bootstrap.
                                </p>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>

                {/* Mission Statement Callout */}
                <Row className="justify-content-center">
                    <Col md={10} lg={8}>
                        <Card className="border-0 shadow-lg rounded-4 p-4 p-md-5 bg-dark text-white text-center">
                            <CardBody>
                                <h3 className="fw-bold mb-3">Ready to share your story?</h3>
                                <p className="text-white-50 mb-4">
                                    Join our community today, create your account, and start publishing your articles with rich text editing tools.
                                </p>
                                <div className="d-flex justify-content-center gap-3">
                                    <Button tag={Link} to="/signup" color="success" className="rounded-pill px-4 py-2 fw-semibold shadow-sm">
                                        Get Started
                                    </Button>
                                    <Button tag={Link} to="/" color="outline-light" className="rounded-pill px-4 py-2 fw-semibold">
                                        Browse Feeds
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

export default About;