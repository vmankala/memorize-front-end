import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap';

class PublicNavbar extends Component {
    render() {
        return (
            <Navbar bg="dark" variant="dark" expand="lg">
                <Link to="/" className="navbar-brand">Memorize</Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse>
                    <Nav className="mr-auto">
                        <Link to="/register" className="nav-link">Register</Link>
                        <Link to="/login" className="nav-link">Login</Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

export default PublicNavbar;
