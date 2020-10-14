import React from "react";
import "./home.css";
import DocumentMeta from "react-document-meta";
import Layout from "../../templates";
import { useHistory } from "react-router-dom";
import { Typography, CircularProgress } from "@material-ui/core";

import { connect } from "react-redux";
import { createLoadingSelector } from "../../store/selector";
import ImageReorder from "../../asset/finance-recorder.png";

const Home = (props) => {
  const { isLogin, isLoading } = props;

  const history = useHistory();

  const meta = {
    title: `${process.env.REACT_APP_BRAND} - Your Web Solution`,
    description: `${process.env.REACT_APP_BRAND} is the solution for all your needs`,
    meta: {
      name: {
        robots: "follow,index",
        keywords: "simple, fast, reliable",
      },
    },
  };

  return (
    <DocumentMeta {...meta}>
      <Layout>
        <div className="home">
          <div className="home__landing">
            <Typography variant="h3">
              Record your personal finance now
            </Typography>
            {isLoading ? (
              <button className="button__second">
                <CircularProgress size={16} color="inherit" />
              </button>
            ) : isLogin ? (
              <button
                className="button__second"
                onClick={() => history.push("/dashboard")}
              >
                Dashboard
              </button>
            ) : (
              <button
                className="button__second"
                onClick={() => history.push("/register")}
              >
                Sign Up
              </button>
            )}
          </div>
          <img
            src={ImageReorder}
            alt="home-landing-images"
            style={{ height: "auto", width: "100%" }}
          />
        </div>
      </Layout>
    </DocumentMeta>
  );
};

const loadingSelector = createLoadingSelector(["AUTH"]);

const mapStateToProps = (state) => {
  return {
    isLogin: state.usrReducer.isLogin,
    isLoading: loadingSelector(state),
  };
};

export default connect(mapStateToProps, null)(Home);
