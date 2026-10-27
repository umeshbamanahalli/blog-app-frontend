import React from 'react';
import { Container, Row, Col, Card, CardBody, Button } from 'reactstrap';
import { FaExclamationTriangle, FaHome } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Base from '../components/Base';

const ErrorPage = ({ error, resetErrorBoundary }) => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    if (resetErrorBoundary) resetErrorBoundary();
    navigate('/');
  };

  return (
    <Base>
      <Container className="py-5">
        <Row className="justify-content-center">
          <Col md={8} lg={6} className="text-center">
            <Card className="border-0 shadow-lg rounded-4 p-4 bg-light">
              <CardBody>
                <div className="mb-4 text-danger">
                  <FaExclamationTriangle size={60} />
                </div>
                <h2 className="fw-bold text-dark mb-3">Oops! Something went wrong.</h2>
                <p className="text-muted mb-4">
                  We encountered an unexpected error. Don't worry, our team has been notified.
                </p>
                {error?.message && (
                  <div className="bg-white p-3 rounded-3 text-start small text-danger border mb-4 font-monospace">
                    {error.message}
                  </div>
                )}
                <div className="d-flex justify-content-center gap-3">
                  <Button 
                    color="dark" 
                    className="rounded-pill px-4 py-2 fw-semibold d-flex align-items-center gap-2"
                    onClick={handleGoHome}
                  >
                    <FaHome /> Back to Home
                  </Button>
                  <Button 
                    color="outline-secondary" 
                    className="rounded-pill px-4 py-2 fw-semibold"
                    onClick={() => window.location.reload()}
                  >
                    Reload Page
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

export default ErrorPage;