import React, { useState } from 'react';
import { Card, CardBody, CardHeader, Container, Form, FormGroup, Label, Button, Row, Col, Input, FormFeedback, Spinner } from "reactstrap";
import Base from "../components/Base";
import { Link, useNavigate } from "react-router-dom";
import { signUp } from "../services/user-service";
import { toast } from "react-toastify";

const Register = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        about: ""
    });

    const [error, setError] = useState({
        errors: {},
        isError: false,
        message: "" // 👈 Add a general message state for things like "User already exists"
    });

    const handleChange = (event, property) => {
        setData({ ...data, [property]: event.target.value });
    };

    const submitForm = (event) => {
        event.preventDefault();
        setLoading(true);

        signUp(data)
            .then((resp) => {
                toast.success("Registration successful!");
                setData({ name: "", email: "", password: "", about: "" });
                setError({ errors: {}, isError: false, message: "" });
                setTimeout(() => navigate("/login"), 1500);
            })
            .catch((error) => {
                console.log(error);

                // Handles both ApiException message and fallback text
                const serverMessage = error.response?.data?.message || "Registration failed! Please check the form fields.";

                setError({
                    errors: error.response?.data || {},
                    isError: true,
                    message: serverMessage
                });

                toast.error(serverMessage);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleReset = () => {
        setData({
            name: "",
            email: "",
            password: "",
            about: ""
        });
        setError({ errors: {}, isError: false });
    };

    return (
        <Base>
            <Container className="py-5">
                <Row className="justify-content-center">
                    <Col md={8} lg={6}>
                        <Card className="border-0 shadow-lg rounded-4 overflow-hidden">
                            <CardHeader className="bg-dark text-white text-center py-4 border-0">
                                <h3 className="mb-0 fw-bold">Create Account</h3>
                                <p className="text-white-50 small mb-0">Join our blogging community today</p>
                            </CardHeader>
                            <CardBody className="p-4 p-md-5 bg-light">
                                <Form onSubmit={submitForm}>
                                    {/* Username */}
                                    <FormGroup className="mb-3">
                                        <Label for="name" className="fw-semibold text-secondary">Username</Label>
                                        <Input
                                            type="text"
                                            id="name"
                                            placeholder="Enter your username"
                                            value={data.name}
                                            onChange={(e) => handleChange(e, "name")}
                                            invalid={!!error.errors?.name} // 👈 Fixed path
                                            className="rounded-pill px-3 py-2"
                                        />
                                        <FormFeedback>{error.errors?.name}</FormFeedback>
                                    </FormGroup>

                                    {/* Email */}
                                    <FormGroup className="mb-3">
                                        <Label for="email" className="fw-semibold text-secondary">Email</Label>
                                        <Input
                                            type="email"
                                            id="email"
                                            placeholder="Enter your email"
                                            value={data.email}
                                            onChange={(e) => handleChange(e, "email")}
                                            invalid={!!error.errors?.email} // 👈 Fixed path
                                            className="rounded-pill px-3 py-2"
                                        />
                                        <FormFeedback>{error.errors?.email}</FormFeedback>
                                    </FormGroup>

                                    {/* Password */}
                                    <FormGroup className="mb-3">
                                        <Label for="password" className="fw-semibold text-secondary">Password</Label>
                                        <Input
                                            type="password"
                                            id="password"
                                            placeholder="Enter your password"
                                            value={data.password}
                                            onChange={(e) => handleChange(e, "password")}
                                            invalid={!!error.errors?.password} // 👈 Fixed path
                                            className="rounded-pill px-3 py-2"
                                        />
                                        <FormFeedback>{error.errors?.password}</FormFeedback>
                                    </FormGroup>

                                    {/* About */}
                                    <FormGroup className="mb-4">
                                        <Label for="about" className="fw-semibold text-secondary">About</Label>
                                        <Input
                                            type="textarea"
                                            id="about"
                                            placeholder="Tell us about yourself..."
                                            style={{ height: "120px", resize: "none" }}
                                            value={data.about}
                                            onChange={(e) => handleChange(e, "about")}
                                            invalid={!!error.errors?.about} // 👈 Fixed path
                                            className="rounded-4 p-3"
                                        />
                                        <FormFeedback>{error.errors?.about}</FormFeedback>
                                    </FormGroup>

                                    {/* Action Buttons */}
                                    <div className="d-flex justify-content-between align-items-center gap-2">
                                        <Button
                                            type="submit"
                                            color="dark"
                                            className="w-100 rounded-pill py-2 fw-semibold shadow-sm"
                                            disabled={loading}
                                        >
                                            {loading ? <Spinner size="sm" /> : "Register"}
                                        </Button>
                                        <Button
                                            type="button"
                                            color="outline-secondary"
                                            className="w-100 rounded-pill py-2 fw-semibold"
                                            onClick={handleReset}
                                            disabled={loading}
                                        >
                                            Reset
                                        </Button>
                                    </div>
                                </Form>
                            </CardBody>
                        </Card>
                    </Col>
                </Row>
                <div className="text-center mt-3">
                    <p className="text-muted">Already registered? <Link to={"/login"} className="text-dark fw-semibold">Login</Link></p>
                </div>
            </Container>
        </Base>
    );
};

export default Register;