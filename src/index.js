import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
// add reactstrap librerie
import 'bootstrap/dist/css/bootstrap.css';
import UserLayout from "./components/layouts/user";
import AdminLayout from "./components/layouts/admin";

ReactDOM.render(
    <BrowserRouter>
    <Switch>
      <Route path="/user" render={props => <UserLayout {...props} />} />
      <Route path="/admin" render={props => <AdminLayout {...props} />} />
      <Redirect from="/" to="/user/index" />
    </Switch>
  </BrowserRouter>
  , document.getElementById('root'));
