import React, { useState } from "react";
import "./login.css";
import DocumentMeta from "react-document-meta";
import Layout from "../../templates";
import { useHistory } from "react-router-dom";
import { Container, Typography } from "@material-ui/core";

import { connect } from "react-redux";
import { loginUser, loginWithExternalData } from "../../store/actions";
import {
  createLoadingSelector,
  createErrorMessageSelector,
} from "../../store/selector";
import { auth, provider } from "../../utils/firebase";
import ChickenOne from "../../asset/chicken_bank_1.png";
import ChickenTwo from "../../asset/chicken_bank_2.png";
import ChickenThree from "../../asset/chicken_bank_3.png";

const Login = (props) => {
  const { loginUser, loginWithExternalData, isLoading, isError } = props;
  const [data, setData] = useState("");
  const [errMessage, setErrMessage] = useState("");

  const history = useHistory();

  const onSubmitLogin = (e) => {
    e.preventDefault();

    loginUser(data, history);
  };

  const handleLoginGoogle = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        const userGoogle = result.user;

        if (userGoogle.emailVerified && result.operationType === "signIn") {
          //console.log(result);
          loginWithExternalData(
            {
              account: userGoogle.email,
              key: userGoogle.uid,
            },
            history
          );
        } else {
          setErrMessage("Your email not verified");
        }
      })
      .catch((err) => {
        console.log(err.message);
      });
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
                Sign in Account
              </Typography>

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
                <label>Password: </label>
                <input
                  type="password"
                  onChange={(e) => handleForm(e, "password")}
                  autoComplete="password"
                  disabled={isLoading}
                />
              </div>
              <div className="login__input">
                <small style={{ color: "red" }}>
                  {isError && isError.code === 401
                    ? isError.message
                    : errMessage}
                </small>
              </div>
              <button
                type="submit"
                className="button__second full"
                disabled={isLoading}
              >
                {isLoading ? "Loading..." : "Sign In"}
              </button>
            </form>
            <div className="login__devider">
              <span className="login__deviderouterline"></span>
              <span className="login__devidertexts">Or login with</span>
              <span className="login__deviderouterline"></span>
            </div>

            <div className="login__other">
              <button
                type="submit"
                className="button__withother button__google full"
                disabled={isLoading}
                onClick={handleLoginGoogle}
              >
                Google Account
              </button>

              <button
                type="submit"
                className="button__withother button__facebook full"
                disabled={isLoading}
              >
                Facebook Account
              </button>
            </div>
          </Container>
          <Container component="main" maxWidth="md">
            <div className="login__ornament">
              <img src={ChickenOne} alt="chicken-one" height="145" />
              <img src={ChickenTwo} alt="chicken-two" />
              <img src={ChickenThree} alt="chicken-three" />
            </div>
          </Container>
        </div>
      </Layout>
    </DocumentMeta>
  );
};

const loadingSelector = createLoadingSelector(["LOGIN", "FIREBASE_LOGIN"]);
const errorSelector = createErrorMessageSelector(["LOGIN", "FIREBASE_LOGIN"]);

const mapStateToProps = (state) => {
  return {
    isLoading: loadingSelector(state),
    isError: errorSelector(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    loginUser: (data, history) => dispatch(loginUser(data, history)),
    loginWithExternalData: (data, history) =>
      dispatch(loginWithExternalData(data, history)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
