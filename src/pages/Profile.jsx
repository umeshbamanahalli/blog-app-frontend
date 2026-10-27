import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card, CardBody, Button, Form, Label, Input, Spinner } from 'reactstrap';
import { toast } from 'react-toastify';
import { FaUser, FaEnvelope, FaUserTag, FaSave, FaCog, FaTimes, FaShieldAlt } from 'react-icons/fa';
import Base from '../components/Base';
import { getCurrentUserDetail } from '../auth';
import { privateAxios } from '../services/helpers'; // Or your custom axios instance

const Profile = () => {
    const [user, setUser] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const [formData, setFormData] = useState({
        name: '',
        about: ''
    });

    useEffect(() => {
       const currentUser = getCurrentUserDetail();
        if (currentUser && currentUser.id) {
            // Fetch fresh user data directly from the database
            privateAxios.get(`/users/${currentUser.id}`)
                .then((res) => {
                    const freshUser = res.data;
                    setUser(freshUser);
                    setFormData({
                        name: freshUser.name || '',
                        about: freshUser.about || ''
                    });
                })
                .catch((error) => {
                    console.error("Failed to fetch fresh user profile:", error);
                    // Fallback to local storage if the API call fails
                    setUser(currentUser);
                    setFormData({
                        name: currentUser.name || '',
                        about: currentUser.about || ''
                    });
                });
        }
    }, []);

    const handleChange = (e, field) => {
        setFormData({
            ...formData,
            [field]: e.target.value
        });
    };

 const handleUpdateProfile = (e) => {
        e.preventDefault();
        setLoading(true);

        privateAxios.put(`/users/${user.id}`, formData)
            .then((res) => {
                toast.success("Profile updated successfully!");
                const updatedUser = res.data;
                setUser(updatedUser);
                setIsEditing(false);
                
                // 1. Get current stored session data
                const currentUser = getCurrentUserDetail();
                
                // 2. Merge updated fields into the stored user object
                const updatedSessionData = {
                    ...currentUser,
                    name: updatedUser.name,
                    about: updatedUser.about
                };
                
                // 3. Save back to localStorage so refresh keeps the new data!
                localStorage.setItem("data", JSON.stringify(updatedSessionData));
            })
            .catch((error) => {
                console.error(error);
                toast.error(error.response?.data?.message || "Failed to update profile settings.");
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return (
        <Base>
            <Container className="py-5">
                <Row className="justify-content-center">
                    <Col md={9} lg={7}>
                        {user ? (
                            <Card className="border-0 shadow-lg rounded-4 overflow-hidden bg-white">
                                {/* Profile Header Banner */}
                                <div className="bg-gradient bg-dark text-white p-5 text-center position-relative">
                                    <div 
                                        className="bg-primary text-white rounded-circle mx-auto mb-3 d-flex align-items-center justify-content-center fw-bold shadow fs-1 border border-3 border-white" 
                                        style={{ width: 90, height: 90 }}
                                    >
                                        {user.name ? user.name.charAt(0).toUpperCase() : <FaUser />}
                                    </div>
                                    <h3 className="fw-bold mb-1 text-white">{user.name || "Blogger User"}</h3>
                                    <p className="text-white-50 small mb-3">{user.email || "No email provided"}</p>
                                    
                                    {/* Toggle Edit Settings Button */}
                                    <Button 
                                        color={isEditing ? "outline-light" : "light"} 
                                        size="sm" 
                                        className="rounded-pill px-4 py-2 fw-semibold d-inline-flex align-items-center gap-2 shadow-sm text-dark transition-all"
                                        onClick={() => setIsEditing(!isEditing)}
                                    >
                                        {isEditing ? <><FaTimes /> Cancel Editing</> : <><FaCog /> Account Settings</>}
                                    </Button>
                                </div>

                                <CardBody className="p-4 p-md-5">
                                    {!isEditing ? (
                                        /* View Mode */
                                        <div className="d-flex flex-column gap-3">
                                            <div className="d-flex align-items-center gap-3 p-3 bg-light rounded-4 border-0 shadow-sm">
                                                <div className="p-2 bg-white rounded-circle shadow-sm text-primary">
                                                    <FaEnvelope size={18} />
                                                </div>
                                                <div>
                                                    <small className="text-muted text-uppercase fw-semibold" style={{ fontSize: '0.75rem' }}>Email Address</small>
                                                    <div className="fw-bold text-dark">{user.email || "N/A"}</div>
                                                </div>
                                            </div>

                                            <div className="d-flex align-items-center gap-3 p-3 bg-light rounded-4 border-0 shadow-sm">
                                                <div className="p-2 bg-white rounded-circle shadow-sm text-success">
                                                    <FaShieldAlt size={18} />
                                                </div>
                                                <div>
                                                    <small className="text-muted text-uppercase fw-semibold" style={{ fontSize: '0.75rem' }}>Assigned Roles</small>
                                                    <div className="mt-1">
                                                        {user.roles && user.roles.length > 0 ? (
                                                            user.roles.map((role, index) => (
                                                                <span key={index} className="badge bg-dark me-1 px-3 py-2 rounded-pill fw-normal">
                                                                    {role.name || role}
                                                                </span>
                                                            ))
                                                        ) : (
                                                            <span className="badge bg-secondary px-3 py-2 rounded-pill fw-normal">ROLE_NORMAL</span>
                                                        )}
                                                    </div>
                                                </div>
                                            </div>

                                            <div className="p-4 bg-light rounded-4 border-0 shadow-sm mt-1">
                                                <small className="text-muted text-uppercase fw-semibold d-block mb-2" style={{ fontSize: '0.75rem' }}>About Bio</small>
                                                <p className="text-secondary mb-0" style={{ lineHeight: '1.6' }}>
                                                    {user.about || "No bio added yet. Click 'Account Settings' to customize your profile summary!"}
                                                </p>
                                            </div>
                                        </div>
                                    ) : (
                                        /* Edit Settings Mode */
                                        <Form onSubmit={handleUpdateProfile}>
                                            <div className="d-flex align-items-center justify-content-between mb-4 border-bottom pb-3">
                                                <h5 className="fw-bold text-dark mb-0">Update Profile Information</h5>
                                                <span className="text-muted small">Make changes below</span>
                                            </div>
                                            
                                            <div className="mb-3">
                                                <Label for="name" className="fw-semibold text-secondary small">Full Name</Label>
                                                <Input
                                                    type="text"
                                                    id="name"
                                                    className="rounded-pill px-3 py-2 shadow-none border-secondary-subtle"
                                                    value={formData.name}
                                                    onChange={(e) => handleChange(e, 'name')}
                                                    required
                                                />
                                            </div>

                                            <div className="mb-4">
                                                <Label for="about" className="fw-semibold text-secondary small">About Bio</Label>
                                                <Input
                                                    type="textarea"
                                                    id="about"
                                                    rows="4"
                                                    className="rounded-4 p-3 shadow-none border-secondary-subtle"
                                                    value={formData.about}
                                                    onChange={(e) => handleChange(e, 'about')}
                                                    placeholder="Tell the world a bit about yourself..."
                                                    style={{ resize: 'none' }}
                                                />
                                            </div>

                                            <div className="d-flex justify-content-end gap-2">
                                                <Button
                                                    type="button"
                                                    color="outline-secondary"
                                                    className="rounded-pill px-4 py-2 fw-semibold"
                                                    onClick={() => setIsEditing(false)}
                                                    disabled={loading}
                                                >
                                                    Cancel
                                                </Button>
                                                <Button
                                                    type="submit"
                                                    color="dark"
                                                    className="rounded-pill px-4 py-2 fw-semibold shadow-sm d-inline-flex align-items-center gap-2"
                                                    disabled={loading}
                                                >
                                                    {loading ? <Spinner size="sm" /> : <FaSave />} Save Changes
                                                </Button>
                                            </div>
                                        </Form>
                                    )}
                                </CardBody>
                            </Card>
                        ) : (
                            <div className="text-center py-5">
                                <Spinner color="dark" style={{ width: '3rem', height: '3rem' }} />
                                <p className="text-muted mt-3 fw-semibold">Loading profile data...</p>
                            </div>
                        )}
                    </Col>
                </Row>
            </Container>
        </Base>
    );
};

export default Profile;