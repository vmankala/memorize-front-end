import React, { Component } from 'react';
import { Jumbotron, Card, ButtonGroup, Button } from 'react-bootstrap';
import { connect } from 'react-redux';
import { getCardsets } from '../../actions/cardset.actions';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class Dashboard extends Component {
    constructor() {
        super();
        this.state = {
            sets: []
        }
    }

    componentDidMount() {
        this.props.getCardsets();
    }

    componentWillReceiveProps(next) {
        this.setState({
            sets: next.cardsets.sets.map((set, index) => (
                <Card className="col-md-4 m-2" key={index} style={{ maxWidth: "20rem" }}>
                    <Card.Body>
                        <Card.Title>{set.title}</Card.Title>
                        <Card.Text>
                            {set.description}
                        </Card.Text>
                        <ButtonGroup className="align-self-end">
                            <Button variant="outline-primary" size="sm">View</Button>
                            <Button variant="outline-secondary" size="sm">Edit</Button>
                        </ButtonGroup>
                    </Card.Body>
                </Card>
            ))
        });
    }

    render() {
        console.log(this.props);
        return (
            <React.Fragment>
                <Jumbotron style={{ backgroundColor: "#ffffff" }}>
                    <h1 className="jumbotron-heading display-4">Hello, {this.props.auth.user.username}</h1>
                    <p className="lead text-muted w-50 p-3 mx-auto">
                        Welcome to your dashboard. Here you can view your saved card sets, or edit their properties.
                    </p>
                </Jumbotron>
                {(this.props.cardsets.sets.length !== 0) ?
                    <div className="album py-4 px-5 bg-light row">
                        {this.state.sets}
                    </div>
                    : <p className="text-muted my-5 font-italic">You don't seem to have any sets</p>}
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => ({
    cardsets: state.cardsets,
    auth: state.auth
});

Dashboard.propTypes = {
    getCardsets: PropTypes.func.isRequired,
    cardsets: PropTypes.object.isRequired,
    auth: PropTypes.object.isRequired
};

export default connect(mapStateToProps, { getCardsets })(withRouter(Dashboard));