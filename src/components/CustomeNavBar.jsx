import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  UncontrolledDropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Form,
  Input,
  Button
} from 'reactstrap';
import { FaBlog, FaSearch, FaUser, FaPlus, FaSignOutAlt, FaHome, FaInfoCircle } from 'react-icons/fa';
import bloggerLogo from '../assets/blogger.png';
import { isLoggedIn, getCurrentUserDetail, doLogout } from '../auth';

function CustomeNavBar() {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const login = isLoggedIn();
  const user = getCurrentUserDetail();
  const navigate = useNavigate();

  const logout = () => {
    doLogout(() => {
      navigate("/login");
    });
  };

  const toggle = () => setIsOpen(!isOpen);

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/?query=${searchQuery}`);
    }
  };

  return (
    // ✅ Full-width edge-to-edge navbar with dark background and shadow
    <Navbar
      className="py-3 px-4 shadow-sm bg-dark navbar-dark sticky-top"
      expand="lg"
    >
      {/* Brand / Logo */}
      <NavbarBrand tag={Link} to="/" className="fw-bold d-flex align-items-center gap-2">
        <span className="bg-success text-white p-2 rounded-circle d-flex align-items-center justify-content-center shadow-sm" style={{ width: 40, height: 40 }}>
          <FaBlog size={20} />
        </span>
        <span className="text-white tracking-wide">Blogger</span>
      </NavbarBrand>

      <NavbarToggler onClick={toggle} className="border-0 shadow-none" />

      <Collapse isOpen={isOpen} navbar>
        {/* Left Navigation Links */}
        <Nav className="me-auto align-items-lg-center gap-2" navbar>
          <NavItem>
            <Link to="/" className="nav-link d-flex align-items-center gap-1 text-white opacity-75 hover-opacity-100">
              <FaHome size={14} /> Feeds
            </Link>
          </NavItem>
          <NavItem>
            <Link to="/about" className="nav-link d-flex align-items-center gap-1 text-white opacity-75 hover-opacity-100">
              <FaInfoCircle size={14} /> About
            </Link>
          </NavItem>

          {/* Search Bar */}
          <Form onSubmit={handleSearch} className="d-flex ms-lg-3 my-2 my-lg-0">
            <div className="input-group input-group-sm">
              <Input
                type="text"
                placeholder="Search blogs..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="rounded-start-pill px-3 border-0 bg-secondary bg-opacity-25 text-white placeholder-light"
                style={{ minWidth: "200px" }}
              />
              <Button type="submit" color="success" className="rounded-end-pill px-3 d-flex align-items-center justify-content-center">
                <FaSearch size={12} />
              </Button>
            </div>
          </Form>
        </Nav>

        {/* Right Navigation Links (Auth / User Profile) */}
        <Nav className="ms-auto align-items-lg-center gap-2" navbar>
          {login ? (
            <>
              <NavItem>
                <Link to="/user/add-blog" className="btn btn-success btn-sm rounded-pill px-3 fw-semibold text-white d-flex align-items-center gap-1 shadow-sm">
                  <FaPlus size={12} /> Add Post
                </Link>
              </NavItem>

              <UncontrolledDropdown nav inNavbar>
                <DropdownToggle nav caret className="text-white d-flex align-items-center gap-2 py-1 px-2 rounded-pill bg-secondary bg-opacity-10">
                  <span className="rounded-circle bg-success text-white d-inline-flex align-items-center justify-content-center fw-bold" style={{ width: 28, height: 28, fontSize: '12px' }}>
                    {user?.name ? user.name.charAt(0).toUpperCase() : <FaUser size={12} />}
                  </span>
                  <span className="small fw-semibold">{user?.name || user?.username || "Account"}</span>
                </DropdownToggle>
                <DropdownMenu end className="shadow-lg border-0 rounded-4 p-2 mt-2">
                  <DropdownItem tag={Link} to="/user/profile" className="rounded-2 py-2">My Profile</DropdownItem>
                  <DropdownItem tag={Link} to="/user/dashboard" className="rounded-2 py-2">Dashboard</DropdownItem>
                  <DropdownItem divider />
                  <DropdownItem onClick={logout} className="text-danger rounded-2 py-2 d-flex align-items-center gap-2">
                    <FaSignOutAlt size={14} /> Logout
                  </DropdownItem>
                </DropdownMenu>
              </UncontrolledDropdown>
            </>
          ) : (
            <>
              <NavItem>
                <Link to="/login" className="btn btn-outline-light btn-sm rounded-pill px-4 fw-semibold">
                  Login
                </Link>
              </NavItem>
              <NavItem className="mt-2 mt-lg-0">
                <Link to="/signup" className="btn btn-success btn-sm rounded-pill px-4 fw-semibold text-white shadow-sm">
                  Register
                </Link>
              </NavItem>
            </>
          )}
        </Nav>
      </Collapse>
    </Navbar>
  );
}

export default CustomeNavBar;