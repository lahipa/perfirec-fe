import React, { useEffect, useState } from "react";
import "./setting.css";
import DocumentMeta from "react-document-meta";
import Layout from "../../templates";
import { Typography } from "@material-ui/core";

import { connect } from "react-redux";
import { updateUser } from "../../store/actions";
import { createLoadingSelector } from "../../store/selector";
import { auth, provider } from "../../utils/firebase";
import { SidebarProfile as Sidebar } from "../../templates/navigation";

const Setting = (props) => {
  const { match, user, updateUser, isLoading } = props;
  const [data, setData] = useState({});
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (match && user) {
      setData({
        password: "",
        confirmPassword: "",
        googleAccount: user.googleAccount?.linked,
        facebookAccount: user.facebookAccount?.linked,
      });
    }
  }, [match, user]);

  const handleUpdatePassword = () => {
    if (data.password !== data.confirmPassword) {
      setMessage("Passwords don't match");
    } else {
      updateUser(user.user?.id, { password: data.password }, user.token);
    }
  };

  const handleLinkedGoogle = () => {
    if (data.googleAccount) {
      updateUser(
        user.user?.id,
        {
          googleAccount: {
            account: "",
            linked: false,
            key: "",
          },
        },
        user.token
      );
    } else {
      auth
        .signInWithPopup(provider)
        .then((result) => {
          const userGoogle = result.user;

          //console.log(result);
          updateUser(
            user.user?.id,
            {
              googleAccount: {
                account: userGoogle.email,
                linked: true,
                key: userGoogle.uid,
              },
            },
            user.token
          );
        })
        .catch((err) => {
          console.log(err.message);
        });
    }
  };

  const handleLinkedFacebook = () => {
    console.log(data, "ini data facebook");

    // setData({
    //   facebookAccount: {
    //     account: "",
    //     linked: false,
    //     key: "",
    //   },
    // });
  };

  const handleForm = (e, formName) => {
    setData({ ...data, [formName]: e.target.value });
  };

  const meta = {
    title: `${process.env.REACT_APP_BRAND} - Your Web Solution`,
    description: `${process.env.REACT_APP_BRAND} is the solution for all your needs`,
    meta: {
      name: {
        robots: "noindex,nofollow",
      },
    },
  };

  return (
    <DocumentMeta {...meta}>
      <Layout>
        <div className="content">
          <div className="content__withSidebar">
            <Sidebar />
            <div className="main">
              <div className="setting">
                <Typography variant="h6">Change Password</Typography>
                <div className="setting__card">
                  <div className="setting__form">
                    <div className="setting__formcontrol">
                      <label>Password:</label>
                      <input
                        type="password"
                        value={data.password || ""}
                        className="setting__forminput"
                        onChange={(e) => handleForm(e, "password")}
                        disabled={isLoading}
                      />
                    </div>

                    <div className="setting__formcontrol">
                      <label>ReType Password:</label>
                      <input
                        type="password"
                        value={data.confirmPassword || ""}
                        className="setting__forminput"
                        onChange={(e) => handleForm(e, "confirmPassword")}
                        disabled={isLoading}
                      />
                    </div>

                    {message !== "" && (
                      <div className="setting__formcontrol">
                        <small style={{ color: "red" }}>{message}</small>
                      </div>
                    )}

                    <div className="profile__formcontrol">
                      <button
                        type="submit"
                        className="button__second"
                        onClick={handleUpdatePassword}
                        disabled={isLoading}
                      >
                        {isLoading ? "Loading..." : "Update"}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="setting__linked">
                  <Typography variant="h6">Linked Account</Typography>
                  <div className="setting__linkedbutton">
                    <button
                      className={`button__linked google ${
                        data.googleAccount && "linked"
                      }`}
                      onClick={handleLinkedGoogle}
                    >
                      {isLoading
                        ? "Loading..."
                        : data.googleAccount
                        ? "Linked to Google"
                        : "Link to Google"}
                    </button>
                    <button
                      className={`button__linked facebook ${
                        data.facebookAccount && "linked"
                      }`}
                      onClick={handleLinkedFacebook}
                    >
                      {isLoading
                        ? "Loading..."
                        : data.facebookAccount
                        ? "Linked to Facebook"
                        : "Link to Facebook"}
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </DocumentMeta>
  );
};

const loadingSelector = createLoadingSelector(["AUTH", "UPDATE_USER"]);

const mapStateToProps = (state) => {
  return {
    isLoading: loadingSelector(state),
    user: state.usrReducer.user,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    updateUser: (id, data, token) => dispatch(updateUser(id, data, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Setting);
