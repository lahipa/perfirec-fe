import React, { Fragment, useEffect } from "react";
import { Switch, Route } from "react-router-dom";

import PrivateRoute from "./utils/privateRoute";
import PublicRoute from "./utils/publicRoute";

import Home from "./views/home";
import Register from "./views/register";
import Login from "./views/login";
import Dashboard from "./views/dashboard";
import RecordTransactions from "./views/transactions";
import RecordWallets from "./views/wallets";
import RecordBudgets from "./views/budgets";
import RecordCategories from "./views/categories";
import RecordReports from "./views/reports";
import RecordPartners from "./views/partners";
import Profile from "./views/profile";
import Setting from "./views/setting";

import { connect } from "react-redux";
import { getAuth } from "./store/actions";
import { getToken } from "./utils/globals";

const App = (props) => {
  const { getAuth } = props;

  useEffect(() => {
    const token = getToken();

    if (token) {
      getAuth(token);
    }
  }, [getAuth]);

  return (
    <Fragment>
      <Switch>
        <Route exact path="/" component={Home} />

        <PublicRoute path="/login" component={Login} />
        <PublicRoute path="/register" component={Register} />
        <PrivateRoute path="/dashboard" component={Dashboard} />
        <PrivateRoute
          path="/:book/transactions"
          component={RecordTransactions}
        />
        <PrivateRoute path="/:book/wallets" component={RecordWallets} />
        <PrivateRoute path="/:book/budgets" component={RecordBudgets} />
        <PrivateRoute path="/:book/categories" component={RecordCategories} />
        <PrivateRoute path="/:book/reports" component={RecordReports} />
        <PrivateRoute path="/:book/partners" component={RecordPartners} />
        <PrivateRoute path="/profile" component={Profile} />
        <PrivateRoute path="/setting" component={Setting} />
      </Switch>
    </Fragment>
  );
};

const mapDispatchToProps = (dispatch) => {
  return {
    getAuth: (token) => dispatch(getAuth(token)),
  };
};

export default connect(null, mapDispatchToProps)(App);
