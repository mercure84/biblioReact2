import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import './index.css';
import App from './App';
import LoginForm from './LoginForm';
import * as serviceWorker from './serviceWorker';
import Login from './JWTAuthentication/Login';

ReactDOM.render(
    <Router>
        <div>
          <Route path='/' component={App} />
          <Route exact path='/login' component={Login} />
        </div>
    </Router>,
    document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
