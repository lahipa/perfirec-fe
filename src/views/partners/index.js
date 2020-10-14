import React, { Fragment, useEffect, useState } from "react";
import "./partners.css";
import DocumentMeta from "react-document-meta";
import Layout from "../../templates";
import { Paper, Typography, CircularProgress } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

import { connect } from "react-redux";
import { getRecordById, updateRecordMember } from "../../store/actions";
import { createLoadingSelector } from "../../store/selector";
import { Sidebar } from "../../templates/navigation";
import Lists from "./lists";

const Partners = (props) => {
  const {
    match,
    user,
    record,
    getRecordById,
    updateRecordMember,
    isLoading,
  } = props;
  const [data, setData] = useState({});
  const [show, setShow] = useState(true);

  useEffect(() => {
    let timerShow = setTimeout(
      () => setShow(false),
      process.env.REACT_APP_SHOW
    );

    if (match) {
      getRecordById(match.params.book, user.token);
    }

    return () => {
      clearTimeout(timerShow);
    };
  }, [match, user, getRecordById]);

  const handleSubmit = () => {
    updateRecordMember(match.params.book, data, user.token);
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
            <Sidebar pageParams={match.params.book} />
            <div className="main">
              {isLoading ? (
                <div className="content__backdrop">
                  <CircularProgress color="inherit" />
                </div>
              ) : (
                <Fragment>
                  <div className="main__actions">
                    <div className="invite">
                      <input
                        type="text"
                        onChange={(e) => handleForm(e, "email")}
                      />
                      <button type="submit" onClick={handleSubmit}>
                        Invite
                      </button>
                    </div>
                  </div>

                  <Paper variant="outlined">
                    <div className="panel">
                      <div className="panel__header">
                        {show ? (
                          <Skeleton animation="wave" height={20} width={150} />
                        ) : (
                          <Typography variant="body1">Your Partner</Typography>
                        )}
                      </div>
                      <div className="panel__content">
                        {record.members
                          ?.filter((val) => val.user_id !== user.user?.id)
                          .map((val, key) => {
                            return <Lists datas={val} key={key} show={show} />;
                          })}
                      </div>
                    </div>
                  </Paper>
                </Fragment>
              )}
            </div>
          </div>
        </div>
      </Layout>
    </DocumentMeta>
  );
};

const loadingSelector = createLoadingSelector([
  "GET_RECORD_ID",
  "UPDATE_RECORD_MEMBER",
]);

const mapStateToProps = (state) => {
  return {
    user: state.usrReducer.user,
    record: state.rcrdReducer.record,
    isLoading: loadingSelector(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getRecordById: (id, token) => dispatch(getRecordById(id, token)),
    updateRecordMember: (id, data, token) =>
      dispatch(updateRecordMember(id, data, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Partners);
