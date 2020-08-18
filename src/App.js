import React, {Component} from 'react';
import {Route, BrowserRouter as Router} from 'react-router-dom';

import Landing from './components/home/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';

class App extends Component {
  render() {
    return (
      <Router>
        <Route exact path="/" component={Landing} />
        <Route exact path="/register" component={Register} />
        <Route exact path="/login" component={Login} />
      </Router>
    );
  }
}

export default App;
