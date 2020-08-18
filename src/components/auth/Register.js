import React, { Component } from 'react';
import { Form, Col, Button, InputGroup } from 'react-bootstrap'

import PublicNavbar from '../shared/PublicNavbar';

class Register extends Component {
    render() {
        return (
            <React.Fragment>
                <PublicNavbar />
                <br />
                <h2>Register</h2>
                <Form noValidate className="w-25 p-3 mx-auto">
                    <Form.Row>
                        <Form.Group as={Col} controlId="validationUsername">
                            <Form.Label>Username</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type="text"
                                    placeholder="Username"
                                    aria-describedby="inputGroupPrepend"
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    (username errors here)
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="validationPassword">
                            <Form.Label>Password</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type="password"
                                    placeholder="Password"
                                    aria-describedby="inputGroupPrepend"
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    (password errors here)
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Form.Row>
                    <Form.Row>
                        <Form.Group as={Col} controlId="validationPassword2">
                            <Form.Label>Confirm Password</Form.Label>
                            <InputGroup>
                                <Form.Control
                                    type="password"
                                    placeholder="Confirm Password"
                                    aria-describedby="inputGroupPrepend"
                                    required
                                />
                                <Form.Control.Feedback type="invalid">
                                    (password errors here)
                                </Form.Control.Feedback>
                            </InputGroup>
                        </Form.Group>
                    </Form.Row>
                    <Button type="submit">Login</Button>
                </Form>
            </React.Fragment>
        );
    }
}

export default Register;
