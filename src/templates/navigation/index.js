import React, { Fragment } from "react";
import "./navigation.css";
import { NavLink } from "react-router-dom";

export const Sidebar = (props) => {
  const { pageParams } = props;

  return (
    <Fragment>
      <div className="sidebar">
        <NavLink activeClassName="active" to={`/${pageParams}/transactions`}>
          Transactions
        </NavLink>
        <NavLink activeClassName="active" to={`/${pageParams}/wallets`}>
          Wallets
        </NavLink>
        <NavLink activeClassName="active" to={`/${pageParams}/budgets`}>
          Budgets
        </NavLink>
        <NavLink activeClassName="active" to={`/${pageParams}/categories`}>
          Categories
        </NavLink>
        <div className="sidebar__divider"></div>
        <NavLink activeClassName="active" to={`/${pageParams}/reports`}>
          Reports
        </NavLink>
        <NavLink activeClassName="active" to={`/${pageParams}/partners`}>
          Invite Partner
        </NavLink>
      </div>
    </Fragment>
  );
};

export const SidebarProfile = (props) => {
  //const { pageParams } = props;

  return (
    <Fragment>
      <div className="sidebar">
        <NavLink activeClassName="active" to={`/profile`}>
          Profile
        </NavLink>
        <NavLink activeClassName="active" to={`/setting`}>
          Setting
        </NavLink>
      </div>
    </Fragment>
  );
};
