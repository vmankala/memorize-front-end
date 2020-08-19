import React, { Component } from 'react';
import { Jumbotron } from 'react-bootstrap'

class Landing extends Component {
    render() {
        return (
            <React.Fragment>
                <Jumbotron style={{backgroundColor:"#ffffff"}}>
                    <h1 className="jumbotron-heading display-4">Welcome to Memorize!</h1>
                    <p className="lead text-muted w-50 p-3 mx-auto">
                        Memorize is a web app that I created to learn the MERN stack. It is a flashcard tool (like Quizlet) that allows you to create and save flashcard sets.
                        It features a secure login system with password hashing via bcrypt and with login session tokens via json-web-tokens.
                        The user dashboard features all of your flashcard sets, and allows you to add, modify, and delete them.
                        <br /> <br />
                        Click the Register or Login tabs to get started!
                    </p>
                </Jumbotron>
            </React.Fragment>
        );
    }
}

export default Landing;
