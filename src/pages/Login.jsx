import { Container, Row, Col, Card, CardHeader, CardBody, Form, FormGroup, Label, Button, Input, Spinner } from "reactstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Base from "../components/Base";
import { toast } from "react-toastify";
import { loginUser } from "../services/user-service";
import { doLogin } from "../auth";

const Login = () => {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [loginDetails, setLoginDetails] = useState({
        username: "",
        password: ""
    });

    const handleChange = (event, property) => {
        let actualValue = event.target.value;
        setLoginDetails({ ...loginDetails, [property]: actualValue });
    };

    const handleSubmit = (event) => {
        event.preventDefault();

        if (loginDetails.username.trim() === "" || loginDetails.password.trim() === "") {
            toast.error("Username and password are required");
            return;
        }

        setLoading(true);
        loginUser(loginDetails)
            .then((data) => {
                toast.success("Login successful!");
                doLogin(data, () => { // Or doLogin(data.token, ...) based on your auth helper
                    navigate("/");
                });
            })
            .catch((error) => {
                console.error(error);
                if (error.response && (error.response.status === 400 || error.response.status === 404)) {
                    toast.error(error.response.data.message || "Invalid credentials");
                } else {
                    toast.error("Login failed! Please check your credentials.");
                }
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const handleReset = () => {
        setLoginDetails({
            username: "",
            password: ""
        });
    };

    return (
        <Base>
            <Container className="py-5">
                <Row className="justify-content-center">
                    <Col md={6} lg={5}>
                        <Card className="border-0 shadow-lg rounded-4 overflow-hidden">
                            <CardHeader className="bg-dark text-white text-center py-4 border-0">
                                <h3 className="mb-0 fw-bold">Welcome Back</h3>
                                <p className="text-muted small mb-0 text-white-50">Please enter your credentials to login</p>
                            </CardHeader>
                            <CardBody className="p-4 p-md-5 bg-light">
                                <Form onSubmit={handleSubmit}>
                                    <FormGroup className="mb-3">
                                        <Label for="username" className="fw-semibold text-secondary">Username or Email</Label>
                                        <Input 
                                            type="text" 
                                            id="username" 
                                            placeholder="Enter your username" 
                                            value={loginDetails.username} 
                                            onChange={(e) => handleChange(e, "username")} 
                                            className="rounded-pill px-3 py-2"
                                        />
                                    </FormGroup>

                                    <FormGroup className="mb-4">
                                        <Label for="password" className="fw-semibold text-secondary">Password</Label>
                                        <Input 
                                            type="password" 
                                            id="password" 
                                            placeholder="Enter your password" 
                                            value={loginDetails.password} 
                                            onChange={(e) => handleChange(e, "password")} 
                                            className="rounded-pill px-3 py-2"
                                        />
                                    </FormGroup>

                                    <div className="d-flex justify-content-between align-items-center gap-2">
                                        <Button 
                                            type="submit" 
                                            color="dark" 
                                            className="w-100 rounded-pill py-2 fw-semibold shadow-sm"
                                            disabled={loading}
                                        >
                                            {loading ? <Spinner size="sm" /> : "Sign In"}
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
            </Container>
        </Base>
    );
};

export default Login;