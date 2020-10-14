import React, { useState } from "react";
import "./register.css";
import DocumentMeta from "react-document-meta";
import Layout from "../../templates";
import { useHistory } from "react-router-dom";
import { Container, Typography } from "@material-ui/core";

import { connect } from "react-redux";
import { registerUser } from "../../store/actions";
import {
  createLoadingSelector,
  createErrorMessageSelector,
} from "../../store/selector";

const Register = (props) => {
  const { registerUser, isLoading, isError } = props;
  const [data, setData] = useState({});
  const [message, setMessage] = useState("");

  const history = useHistory();

  const onSubmitLogin = (e) => {
    e.preventDefault();

    if (data.password !== data.confirmPassword) {
      setMessage("Passwords don't match");
    } else {
      const newData = {
        name: data.name,
        email: data.email,
        username: data.username,
        password: data.password,
        dateOfBirth: "",
        googleAccount: {
          account: "",
          linked: false,
          key: "",
        },
        facebookAccount: {
          account: "",
          linked: false,
          key: "",
        },
        avatar: "",
      };

      registerUser(newData, history);
    }
  };

  const handleForm = (e, formName) => {
    setData({ ...data, [formName]: e.target.value });
  };

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
        <div className="content">
          <Container component="main" maxWidth="xs">
            <form className="login" onSubmit={onSubmitLogin}>
              <Typography variant="h5" className="login__title">
                Sign up Account
              </Typography>

              <div className="login__input">
                <label>Name :</label>
                <input
                  type="text"
                  onChange={(e) => handleForm(e, "name")}
                  autoComplete="name"
                  disabled={isLoading}
                />
              </div>

              <div className="login__input">
                <label>Email :</label>
                <input
                  type="text"
                  onChange={(e) => handleForm(e, "email")}
                  autoComplete="email"
                  disabled={isLoading}
                />
              </div>

              <div className="login__input">
                <label>Username :</label>
                <input
                  type="text"
                  onChange={(e) => handleForm(e, "username")}
                  autoComplete="username"
                  disabled={isLoading}
                />
              </div>

              <div className="login__input">
                <label>Password :</label>
                <input
                  type="password"
                  onChange={(e) => handleForm(e, "password")}
                  disabled={isLoading}
                />
              </div>

              <div className="login__input">
                <label>Confirm Password :</label>
                <input
                  type="password"
                  onChange={(e) => handleForm(e, "confirmPassword")}
                  disabled={isLoading}
                />
              </div>

              <div className="login__input">
                <small style={{ color: "red" }}>
                  {isError && isError.code === 400 ? isError.message : message}
                </small>
              </div>

              <button
                type="submit"
                className="button__second full"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Register"}
              </button>
            </form>
          </Container>
        </div>
      </Layout>
    </DocumentMeta>
  );
};

const loadingSelector = createLoadingSelector(["REGISTER"]);
const errorSelector = createErrorMessageSelector(["REGISTER"]);

const mapStateToProps = (state) => {
  return {
    isLoading: loadingSelector(state),
    isError: errorSelector(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    registerUser: (data, history) => dispatch(registerUser(data, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Register);
