import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';

import Landing from './components/home/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import PublicNavbar from './components/shared/PublicNavbar';

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route exact path={["/", "/register", "/login"]} component={PublicNavbar} />
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
        </Router>
      </Provider>
    );
  }
}

export default App;
