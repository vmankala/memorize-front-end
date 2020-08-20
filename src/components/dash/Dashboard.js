import React, { Component } from 'react';
import { Jumbotron, Card, ButtonGroup, Button, Modal, Form, InputGroup, Col } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getCardsets, deleteCardset, createCardset, updateCardset } from '../../actions/cardset.actions';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            deleteModal: false,
            updateModal: false,
            createModal: false,
            selectedId: '',
            errors: {},
            title: '',
            description: ''
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
        this.props.deleteCardset(this.state.selectedId);
        this.closeDelete();
    }

    showUpdate(id, title, description) {
        this.setState({
            updateModal: true,
            selectedId: id,
            title: title,
            description: description
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
            title: this.state.title,
            description: this.state.description
        }

        this.props.updateCardset(data, this.state.selectedId);
    }

    showCreate() {
        this.setState({
            createModal: true,
            title: '',
            description: ''
        });
    }

    closeCreate() {
        this.setState({
            createModal: false,
            title: '',
            description: '',
            errors: {}
        });
    }

    acceptCreate(event) {
        event.preventDefault();

        const data = {
            title: this.state.title,
            description: this.state.description
        }

        this.props.createCardset(data);
    }

    deleteModal() {
        return (
            <Modal show={this.state.deleteModal} onHide={this.closeDelete}>
                <Modal.Header closeButton>
                    <Modal.Title>Delete card set</Modal.Title>
                </Modal.Header>
                <Modal.Body>You are about to delete your card set. <br /> Warning: This action is irreversible.</Modal.Body>
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
                    <Modal.Title>Edit card set</Modal.Title>
                </Modal.Header>
                <Modal.Body>Changes are not saved until the edit button is pressed.</Modal.Body>
                <Modal.Footer>
                    <Form noValidate className="w-100 p-3 mx-auto" onSubmit={this.acceptUpdate} style={{ maxWidth: "350px", textAlign: "left" }}>
                        <Form.Row>
                            <Form.Group as={Col} controlId="title">
                                <Form.Label>Title</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        type="text"
                                        placeholder="Title"
                                        aria-describedby="inputGroupPrepend"
                                        required
                                        onChange={this.handleChange}
                                        value={this.state.title}
                                        isInvalid={!!this.state.errors.title}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {this.state.errors.title}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="description">
                                <Form.Label>Description</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        as="textarea"
                                        rows="3"
                                        type="text"
                                        placeholder="Description"
                                        aria-describedby="inputGroupPrepend"
                                        onChange={this.handleChange}
                                        value={this.state.description}
                                    />
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
                    <Modal.Title>Create new card set</Modal.Title>
                </Modal.Header>
                <Modal.Body>You will be able to add cards to this set after creating it.</Modal.Body>
                <Modal.Footer>
                    <Form noValidate className="w-100 p-3 mx-auto" onSubmit={this.acceptCreate} style={{ maxWidth: "350px", textAlign: "left" }}>
                        <Form.Row>
                            <Form.Group as={Col} controlId="title">
                                <Form.Label>Title</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        type="text"
                                        placeholder="Title"
                                        aria-describedby="inputGroupPrepend"
                                        required
                                        onChange={this.handleChange}
                                        value={this.state.title}
                                        isInvalid={!!this.state.errors.title}
                                    />
                                    <Form.Control.Feedback type="invalid">
                                        {this.state.errors.title}
                                    </Form.Control.Feedback>
                                </InputGroup>
                            </Form.Group>
                        </Form.Row>
                        <Form.Row>
                            <Form.Group as={Col} controlId="description">
                                <Form.Label>Description</Form.Label>
                                <InputGroup>
                                    <Form.Control
                                        type="text"
                                        placeholder="Description"
                                        aria-describedby="inputGroupPrepend"
                                        onChange={this.handleChange}
                                        value={this.state.description}
                                    />
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
        this.props.getCardsets();
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
                    <h1 className="jumbotron-heading display-4">Hello, {this.props.auth.user.username}</h1>
                    <p className="lead text-muted text-justify p-3 mx-auto" style={{ maxWidth: "850px" }}>
                        Welcome to your dashboard. Here you can view your saved card sets, or edit their properties.
                    </p>
                    <Button variant="primary" size="lg" onClick={this.showCreate}>Create Card Set</Button>
                </Jumbotron>
                {(this.props.cardsets.sets.length !== 0) ?
                    <div className="album px-5 bg-light row justify-content-md-center">
                        {this.props.cardsets.sets.map((set) => (
                            <Card className="col-md-4 m-2" key={set._id} style={{ maxWidth: "20rem" }}>
                                <Card.Body>
                                    <Card.Title>{set.title}</Card.Title>
                                    <Card.Text>
                                        {set.description}
                                    </Card.Text>
                                </Card.Body>
                                <Card.Footer style={{backgroundColor:"#ffffff"}}>
                                    <Card.Text className="font-italic text-muted">
                                        Contains {set.cards.length} cards
                                    </Card.Text>
                                    <ButtonGroup>
                                            <Button variant="outline-primary">&nbsp;View&nbsp;</Button>
                                            <Button variant="outline-secondary" onClick={() => this.showUpdate(set._id, set.title, set.description)}>&nbsp;Edit&nbsp;</Button>
                                            <Button variant="outline-danger" onClick={() => this.showDelete(set._id)} setid={set._id}>Delete</Button>
                                    </ButtonGroup>
                                </Card.Footer>
                            </Card>
                        ))}
                    </div>
                    : <p className="text-muted my-5 font-italic">You don't seem to have any sets</p>}
                {this.deleteModal()}
                {this.updateModal()}
                {this.createModal()}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    cardsets: state.cardsets,
    auth: state.auth,
    errors: state.validate
});

Dashboard.propTypes = {
    getCardsets: PropTypes.func.isRequired,
    deleteCardset: PropTypes.func.isRequired,
    createCardset: PropTypes.func.isRequired,
    updateCardset: PropTypes.func.isRequired,
    cardsets: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired,
    errors: PropTypes.object.isRequired
};

export default connect(mapStateToProps, { getCardsets, deleteCardset, createCardset, updateCardset })(withRouter(Dashboard));