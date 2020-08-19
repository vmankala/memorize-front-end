import React, { Component } from 'react';
import { Link } from 'react-router-dom'
import { Navbar, Nav } from 'react-bootstrap';
import { connect } from 'react-redux';
import { logoutUser } from '../../actions/auth.actions';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class PrivateNavbar extends Component {
    constructor () {
        super();

        this.handleLogOut = this.handleLogOut.bind(this);
    }

    handleLogOut(e) {
        e.preventDefault();

        this.props.logoutUser(this.props.history);
    }

    render() {
        return (
            <Navbar bg="dark" variant="dark" expand="lg">
                <Link to="/dashboard" className="navbar-brand">Memorize</Link>
                <Navbar.Toggle aria-controls="basic-navbar-nav" />
                <Navbar.Collapse>
                    <Nav className="mr-auto">
                        <Link to="/dashboard" className="nav-link">Dashboard</Link>
                        <Link to="/" onClick={this.handleLogOut} className="nav-link">Log out</Link>
                    </Nav>
                </Navbar.Collapse>
            </Navbar>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.validate
});

PrivateNavbar.propTypes = {
    logoutUser: PropTypes.func.isRequired,
};

export default connect(mapStateToProps, { logoutUser })(withRouter(PrivateNavbar));
