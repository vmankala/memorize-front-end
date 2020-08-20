import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';
import { Form, Col, Button, InputGroup } from 'react-bootstrap'
import { connect } from 'react-redux';
import { registerUser } from '../../actions/auth.actions';
import PropTypes from 'prop-types';

class Register extends Component {
    constructor() {
        super();
        this.state = {
            username: "",
            password: "",
            password2: "",
            errors: {}
        }

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    componentDidMount() {
        if (this.props.auth.loggedIn) {
            this.props.history.push('/dashboard')
        }
    }

    componentWillReceiveProps(next) {
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
            password2: this.state.password2
        }

        this.props.registerUser(data, this.props.history);
    }

    render() {
        return (
            <React.Fragment>
                <br/> <br/>
                <h2>Create new account</h2>
                <Form noValidate className="w-100 p-3 mx-auto" onSubmit={this.handleSubmit} style={{maxWidth:"350px", textAlign:"left"}}>
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
                    <Form.Row>
                        <Form.Group as={Col} controlId="password2">
                            <Form.Label>Confirm Password</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type="password"
                                    placeholder="Confirm Password"
                                    aria-describedby="inputGroupPrepend"
                                    required
                                    onChange={this.handleChange}
                                    value={this.state.password2}
                                    isInvalid={!!this.state.errors.password2}
                                />
                                <Form.Control.Feedback type="invalid">
                                    {this.state.errors.password2}
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Form.Row>
                    <br/>
                    <Button type="submit" className="btn btn-lg btn-primary btn-block">Register</Button>
                </Form>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    auth: state.auth,
    errors: state.validate
});

Register.propTypes = {
    registerUser: PropTypes.func.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

export default connect(mapStateToProps, { registerUser })(withRouter(Register));

