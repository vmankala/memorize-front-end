import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Col, Button, InputGroup } from 'react-bootstrap'
import { connect } from 'react-redux';
import { loginUser } from '../../actions/auth.actions';
import PropTypes from 'prop-types';

class Login extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            errors: {}
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentWillReceiveProps(next) {
        if (next.auth.loggedIn) {
            this.props.history.push('/dashboard')
        }

        if (next.errors) {
            this.setState({ errors: next.errors });
        }
    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }

    handleSubmit(event) {
        event.preventDefault();

        const data = {
            username: this.state.username,
            password: this.state.password,
        }

        this.props.loginUser(data);
    }

    render() {
        return (
            <React.Fragment>
                <br/> <br/>
                <h2>Please sign in</h2>
                <Form noValidate className="w-100 p-3 mx-auto" onSubmit={this.handleSubmit} style={{maxWidth:"350px"}}>
                    <Form.Row>
                        <Form.Group as={Col} controlId="username">
                            <Form.Label>Username</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    placeholder="Username"
                                    aria-describedby="inputGroupPrepend"
                                    required
                                    onChange={this.handleChange}
                                    value={this.state.username}
                                    isInvalid={!!this.state.errors.username}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {this.state.errors.username}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="password">
                            <Form.Label>Password</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    aria-describedby="inputGroupPrepend"
                                    required
                                    onChange={this.handleChange}
                                    value={this.state.password}
                                    isInvalid={!!this.state.errors.password}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {this.state.errors.password}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Form.Row>
                    <br/>
                    <Button type="submit" className="btn btn-lg btn-primary btn-block">Login</Button>
                </Form>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.validate
});

Login.propTypes = {
    loginUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

export default connect(mapStateToProps, { loginUser })(withRouter(Login));

