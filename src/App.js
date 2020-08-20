import React, { Component } from 'react';
import { Route, BrowserRouter as Router } from 'react-router-dom';

import { Provider } from 'react-redux';
import store from './store';

import jwtdecode from 'jwt-decode';

import PrivateRoute from './components/utils/PrivateRoute';
import Landing from './components/home/Landing';
import Register from './components/auth/Register';
import Login from './components/auth/Login';
import PublicNavbar from './components/shared/PublicNavbar';
import Dashboard from './components/dash/Dashboard';
import SetDashboard from './components/dash/SetDashboard';
import PrivateNavbar from './components/shared/PrivateNavbar';

import authenticate from './helpers/authenticate';
import { setUser, logoutUser } from './actions/auth.actions';

if (localStorage.getItem('sessionToken')) {
  const token = localStorage.getItem('sessionToken');
  authenticate(token);
  const decodedToken = jwtdecode(token);
  store.dispatch(setUser(decodedToken));

  if (decodedToken.exp < Date.now() / 1000) {
    store.dispatch(logoutUser());
    window.location.href = './login';
  }
}

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Route exact path={["/", "/register", "/login"]} component={PublicNavbar} />
          <Route exact path="/" component={Landing} />
          <Route exact path="/register" component={Register} />
          <Route exact path="/login" component={Login} />
          <PrivateRoute path="/dashboard" component={PrivateNavbar} />
          <PrivateRoute exact path="/dashboard" component={Dashboard} />
          <PrivateRoute exact path="/dashboard/:setid" component={SetDashboard}/>
        </Router>
      </Provider>
    );
  }
}

export default App;
