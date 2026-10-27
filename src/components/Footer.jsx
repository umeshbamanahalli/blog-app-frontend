import React from 'react';
import { Container, Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';
import { FaBlog, FaGithub, FaTwitter, FaLinkedin, FaEnvelope, FaHeart } from 'react-icons/fa';
import { isLoggedIn } from '../auth';

const Footer = () => {
    return (
        <footer className="bg-dark text-white pt-5 pb-4 mt-auto border-top border-secondary shadow-lg position-relative overflow-hidden">
            <Container className="position-relative">
                <Row className="gy-4 align-items-center justify-content-between">
                    {/* Brand / Logo section */}
                    <Col md={4} className="text-center text-md-start">
                        <div className="d-flex align-items-center justify-content-center justify-content-md-start gap-2 mb-2">
                            <span className="bg-success text-white p-2 rounded-circle d-flex align-items-center justify-content-center shadow-sm" style={{ width: 40, height: 40 }}>
                                <FaBlog size={20} />
                            </span>
                            <h4 className="fw-bold mb-0 text-white tracking-wide">Blogger</h4>
                        </div>
                        <p className="text-white-50 small mb-0 px-2 px-md-0">
                            Sharing thoughts, stories, and ideas with the world, one post at a time.
                        </p>
                    </Col>

                    {/* Quick Navigation Links */}
                    <Col md={4} className="text-center">
                        <h6 className="text-uppercase fw-bold small text-white tracking-wider mb-3">Quick Links</h6>
                        <div className="d-flex justify-content-center gap-4">
                            <Link to="/" className="text-white text-decoration-none small opacity-75 fw-semibold transition-all hover-opacity-100">Home</Link>
                            <Link to="/about" className="text-white text-decoration-none small opacity-75 fw-semibold transition-all hover-opacity-100">About</Link>
                            {!isLoggedIn() && (
                                <>
                                    <Link to="/login" className="text-white text-decoration-none small opacity-75 fw-semibold transition-all hover-opacity-100">Login</Link>
                                    <Link to="/signup" className="text-white text-decoration-none small opacity-75 fw-semibold transition-all hover-opacity-100">Register</Link>
                                </>
                            )}
                        </div>
                    </Col>

                    {/* Social Media Icons with Smooth Hover Animation */}
                    <Col md={4} className="text-center text-md-end">
                        <h6 className="text-uppercase fw-bold small text-white tracking-wider mb-3">Connect With Us</h6>
                        <div className="d-flex justify-content-center justify-content-md-end gap-3">
                            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-white bg-secondary bg-opacity-25 p-2 rounded-circle d-flex align-items-center justify-content-center text-decoration-none shadow-sm transition-transform hover-scale" style={{ width: 38, height: 38 }}>
                                <FaGithub size={16} />
                            </a>
                            <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-white bg-secondary bg-opacity-25 p-2 rounded-circle d-flex align-items-center justify-content-center text-decoration-none shadow-sm transition-transform hover-scale" style={{ width: 38, height: 38 }}>
                                <FaTwitter size={16} />
                            </a>
                            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-white bg-secondary bg-opacity-25 p-2 rounded-circle d-flex align-items-center justify-content-center text-decoration-none shadow-sm transition-transform hover-scale" style={{ width: 38, height: 38 }}>
                                <FaLinkedin size={16} />
                            </a>
                            <a href="mailto:support@blogger.com" className="text-white bg-secondary bg-opacity-25 p-2 rounded-circle d-flex align-items-center justify-content-center text-decoration-none shadow-sm transition-transform hover-scale" style={{ width: 38, height: 38 }}>
                                <FaEnvelope size={16} />
                            </a>
                        </div>
                    </Col>
                </Row>

                <hr className="border-secondary my-4 opacity-25" />

                {/* Copyright & Made with Love */}
                <Row className="align-items-center">
                    <Col md={6} className="text-center text-md-start text-white-50 small">
                        &copy; {new Date().getFullYear()} <span className="text-white fw-semibold">Blogger</span>. All rights reserved.
                    </Col>
                    <Col md={6} className="text-center text-md-end text-white-50 small mt-2 mt-md-0">
                        Made with <FaHeart className="text-danger mx-1 animate-pulse" /> using <span className="text-white fw-semibold">React & Spring Boot</span>
                    </Col>
                </Row>
            </Container>

            {/* Inline CSS helper classes for hover effects */}
            <style>{`
                .hover-scale:hover {
                    transform: translateY(-3px) scale(1.1);
                    background-color: #198754 !important;
                    transition: all 0.2s ease-in-out;
                }
                .hover-opacity-100:hover {
                    opacity: 1 !important;
                    color: #198754 !important;
                }
            `}</style>
        </footer>
    );
};

export default Footer;