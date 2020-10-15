import React, { useState, useEffect } from "react";
import "./profile.css";
import DocumentMeta from "react-document-meta";
import Layout from "../../templates";
import { Avatar } from "@material-ui/core";

import { connect } from "react-redux";
import { updateUser } from "../../store/actions";
import { createLoadingSelector } from "../../store/selector";
import { SidebarProfile as Sidebar } from "../../templates/navigation";
import { formatDateTime } from "../../utils/convert";

const Profile = (props) => {
  const { match, user, updateUser, isLoading } = props;
  const [data, setData] = useState({});

  useEffect(() => {
    if (match && user) {
      setData({
        name: user.user?.namer,
        username: user.user?.nameu,
        email: user.user?.email,
        dateOfBirth: user.user?.dateOfBirth
          ? formatDateTime(user.user?.dateOfBirth, "yyyy-MM-dd")
          : "",
        avatar: user.avatar,
      });
    }
  }, [match, user]);

  const handleUpdate = () => {
    updateUser(user.user?.id, data, user.token);
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
              <div className="profile">
                <Avatar
                  alt="my-avatar"
                  src={data.avatar !== "" && data.avatar}
                  className="profile__avatar"
                />
                <div className="profile__card">
                  <div className="profile__form">
                    <div className="profile__formcontrol">
                      <label>Name:</label>
                      <input
                        type="text"
                        className="profile__forminput"
                        value={data.name || ""}
                        disabled={isLoading}
                        onChange={(e) => handleForm(e, "name")}
                        required
                      />
                    </div>

                    <div className="profile__formcontrol">
                      <label>Username:</label>
                      <input
                        type="text"
                        className="profile__forminput"
                        value={data.username || ""}
                        disabled={true}
                        onChange={(e) => handleForm(e, "username")}
                        required
                      />
                    </div>

                    <div className="profile__formcontrol">
                      <label>Email:</label>
                      <input
                        type="text"
                        className="profile__forminput"
                        value={data.email || ""}
                        disabled={isLoading}
                        onChange={(e) => handleForm(e, "email")}
                        required
                      />
                    </div>

                    <div className="profile__formcontrol">
                      <label>Date of Birth:</label>
                      <input
                        type="date"
                        className="profile__forminput"
                        value={data.dateOfBirth || ""}
                        disabled={isLoading}
                        onChange={(e) => handleForm(e, "dateOfBirth")}
                      />
                    </div>

                    <div className="profile__formcontrol">
                      <button
                        type="submit"
                        className="button__second"
                        onClick={handleUpdate}
                      >
                        {isLoading ? "Loading..." : "Update"}
                      </button>
                    </div>
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

const loadingSelector = createLoadingSelector(["UPDATE_USER"]);

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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
