import React, { Component } from 'react';
import { Jumbotron, Card, ButtonGroup, Button, Modal, Form, InputGroup, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getCardset, deleteCard, createCard, updateCard } from '../../actions/card.actions';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class SetDashboard extends Component {
    constructor() {
        super();
        this.state = {
            deleteModal: false,
            updateModal: false,
            createModal: false,
            selectedId: '',
            errors: {},
            prompt: '',
            answer: ''
        }

        this.showDelete = this.showDelete.bind(this);
        this.closeDelete = this.closeDelete.bind(this);
        this.acceptDelete = this.acceptDelete.bind(this);
        this.showUpdate = this.showUpdate.bind(this);
        this.closeUpdate = this.closeUpdate.bind(this);
        this.acceptUpdate = this.acceptUpdate.bind(this);
        this.showCreate = this.showCreate.bind(this);
        this.closeCreate = this.closeCreate.bind(this);
        this.acceptCreate = this.acceptCreate.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(event) {
        this.setState({ [event.target.id]: event.target.value });
    }

    showDelete(id) {
        this.setState({
            deleteModal: true,
            selectedId: id
        });
    }

    closeDelete() {
        this.setState({
            deleteModal: false,
            selectedId: ''
        });
    }

    acceptDelete() {
        this.props.deleteCard(this.props.match.params.setid, this.state.selectedId);
        this.closeDelete();
    }

    showUpdate(id, prompt, answer) {
        this.setState({
            updateModal: true,
            selectedId: id,
            prompt: prompt,
            answer: answer
        });
    }

    closeUpdate() {
        this.setState({
            updateModal: false,
            selectedId: '',
            errors: {}
        });
    }

    acceptUpdate(event) {
        event.preventDefault();

        const data = {
            prompt: this.state.prompt,
            answer: this.state.answer
        }

        this.props.updateCard(this.props.match.params.setid, this.state.selectedId, data);
    }

    showCreate() {
        this.setState({
            createModal: true,
            prompt: '',
            answer: ''
        });
    }

    closeCreate() {
        this.setState({
            createModal: false,
            prompt: '',
            answer: '',
            errors: {}
        });
    }

    acceptCreate(event) {
        event.preventDefault();

        const data = {
            prompt: this.state.prompt,
            answer: this.state.answer
        }

        this.props.createCard(this.props.match.params.setid, data);
    }

    deleteModal() {
        return (
            <Modal show={this.state.deleteModal} onHide={this.closeDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete card</Modal.Title>
                </Modal.Header>
                <Modal.Body>You are about to delete your card. <br /> Warning: This action is irreversible.</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={this.closeDelete}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={this.acceptDelete}>
                        Delete
                    </Button>
                </Modal.Footer>
            </Modal>
        )
    }

    updateModal() {
        return (
            <Modal show={this.state.updateModal} onHide={this.closeUpdate}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit card</Modal.Title>
                </Modal.Header>
                <Modal.Body>Changes are not saved until the edit button is pressed.</Modal.Body>
                <Modal.Footer>
                    <Form noValidate className="w-100 p-3 mx-auto" onSubmit={this.acceptUpdate} style={{ maxWidth: "350px", textAlign: "left" }}>
                        <Form.Row>
                            <Form.Group as={Col} controlId="prompt">
                                <Form.Label>Prompt</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        as="textarea"
                                        rows="3"
                                        type="text"
                                        placeholder="Prompt"
                                        aria-describedby="inputGroupPrepend"
                                        required
                                        onChange={this.handleChange}
                                        value={this.state.prompt}
                                        isInvalid={!!this.state.errors.prompt}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {this.state.errors.prompt}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="answer">
                                <Form.Label>Answer</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        as="textarea"
                                        rows="3"
                                        type="text"
                                        placeholder="Answer"
                                        aria-describedby="inputGroupPrepend"
                                        onChange={this.handleChange}
                                        value={this.state.answer}
                                        isInvalid={!!this.state.errors.answer}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {this.state.errors.answer}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Form.Row>
                        <div style={{ textAlign: "right" }}>
                            <Button variant="secondary" className="mx-2" onClick={this.closeUpdate}>
                                Cancel
                            </Button>
                            <Button variant="primary" type="submit">
                                Edit
                            </Button>
                        </div>
                    </Form>
                </Modal.Footer>
            </Modal>
        )
    }

    createModal() {
        return (
            <Modal show={this.state.createModal} onHide={this.closeCreate}>
                <Modal.Header closeButton>
                    <Modal.Title>Create new card</Modal.Title>
                </Modal.Header>
                <Modal.Body>The card is not saved until the create button is pressed.</Modal.Body>
                <Modal.Footer>
                    <Form noValidate className="w-100 p-3 mx-auto" onSubmit={this.acceptCreate} style={{ maxWidth: "350px", textAlign: "left" }}>
                        <Form.Row>
                            <Form.Group as={Col} controlId="prompt">
                                <Form.Label>Prompt</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        as="textarea"
                                        rows="3"
                                        type="text"
                                        placeholder="Prompt"
                                        aria-describedby="inputGroupPrepend"
                                        required
                                        onChange={this.handleChange}
                                        value={this.state.prompt}
                                        isInvalid={!!this.state.errors.prompt}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {this.state.errors.prompt}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="answer">
                                <Form.Label>Answer</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        as="textarea"
                                        rows="3"
                                        type="text"
                                        placeholder="Answer"
                                        aria-describedby="inputGroupPrepend"
                                        onChange={this.handleChange}
                                        value={this.state.answer}
                                        isInvalid={!!this.state.errors.answer}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {this.state.errors.answer}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Form.Row>
                        <div style={{ textAlign: "right" }}>
                            <Button variant="secondary" className="mx-2" onClick={this.closeCreate}>
                                Cancel
                            </Button>
                            <Button variant="primary" type="submit">
                                Create
                            </Button>
                        </div>
                    </Form>
                </Modal.Footer>
            </Modal>
        )
    }

    componentDidMount() {
        this.props.getCardset(this.props.match.params.setid);
    }

    componentWillReceiveProps(next) {
        if (this.state.createModal && Object.keys(next.errors).length === 0) {
            this.closeCreate();
        } else if (this.state.updateModal && Object.keys(next.errors).length === 0) {
            this.closeUpdate();
        }
        if (next.errors) {
            this.setState({ errors: next.errors });
        }
    }

    render() {
        return (
            <React.Fragment>
                <Jumbotron style={{ backgroundColor: "#ffffff" }}>
                    <h1 className="jumbotron-heading display-4">{this.props.cards.title}</h1>
                    <p className="lead text-muted text-center p-3 mx-auto" style={{ maxWidth: "850px" }}>
                        {this.props.cards.description}
                    </p>
                    <div style={{ textAlign: "center" }}>
                        <Button variant="primary" size="lg" className="mx-4" onClick={this.showCreate}>Create Card</Button>
                        <Button variant="secondary" size="lg" onClick={() => this.props.history.push('/dashboard')}>Dashboard</Button>
                    </div>
                </Jumbotron>
                {(this.props.cards.cards.length !== 0) ?
                    <div className="album px-5 bg-light row justify-content-md-center">
                        {this.props.cards.cards.map((card) => (
                            <Card className="col-md-4 m-2" key={card._id} style={{ maxWidth: "20rem" }}>
                                <Card.Body>
                                    <Card.Title>{card.prompt}</Card.Title>
                                    <Card.Text>
                                        {card.answer}
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer style={{backgroundColor:"#ffffff"}}>
                                    <ButtonGroup>
                                            <Button variant="outline-secondary" onClick={() => this.showUpdate(card._id, card.prompt, card.answer)}>&nbsp;Edit&nbsp;</Button>
                                            <Button variant="outline-danger" onClick={() => this.showDelete(card._id)} setid={card._id}>Delete</Button>
                                    </ButtonGroup>
                                </Card.Footer>
                            </Card>
                        ))}
                    </div>
                    : <p className="text-muted my-5 font-italic">You don't seem to have any cards</p>}
                {this.deleteModal()}
                {this.updateModal()}
                {this.createModal()}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    cards: state.cards,
    errors: state.validate
});

SetDashboard.propTypes = {
    getCardset: PropTypes.func.isRequired,
    deleteCard: PropTypes.func.isRequired,
    createCard: PropTypes.func.isRequired,
    updateCard: PropTypes.func.isRequired,
    cards: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

export default connect(mapStateToProps, { getCardset, deleteCard, createCard, updateCard })(withRouter(SetDashboard));