import React, { Fragment } from "react";
import "./templates.css";
import { Backdrop, CircularProgress } from "@material-ui/core";
import Header from "./header";
import Footer from "./footer";

import { connect } from "react-redux";
import { createLoadingSelector } from "../store/selector";

const Layout = (props) => {
  const { isLoading } = props;
  return (
    <Fragment>
      <div className="body">
        {isLoading && (
          <Backdrop open={true} style={{ zIndex: 9999, color: "white" }}>
            <CircularProgress color="inherit" />
          </Backdrop>
        )}

        <Header />
        <React.StrictMode>{props.children}</React.StrictMode>
        <Footer />
      </div>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    isLoading: loadingSelector(state),
  };
};

const loadingSelector = createLoadingSelector(["LOGOUT"]);

export default connect(mapStateToProps, null)(Layout);
