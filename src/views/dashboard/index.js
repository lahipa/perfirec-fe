import React, { useState, useEffect, Fragment } from "react";
import "./dashboard.css";
import { withRouter } from "react-router-dom";
import DocumentMeta from "react-document-meta";
import Layout from "../../templates";
import { Grid, CircularProgress } from "@material-ui/core";

import { connect } from "react-redux";
import { addRecord, getRecord, getCurrency } from "../../store/actions";
import { createLoadingSelector } from "../../store/selector";
import AddRecord from "./addRecord";
import ListRecord from "./listRecord";

function Dashboard(props) {
  const {
    match,
    user,
    records,
    isLoading,
    addRecord,
    getRecord,
    getCurrency,
  } = props;
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(true);

  useEffect(() => {
    let timerShow = setTimeout(
      () => setShow(false),
      process.env.REACT_APP_SHOW
    );

    if (match) {
      getRecord(user.user?.id, user.token);
      getCurrency(user.token);
    }

    return () => {
      clearTimeout(timerShow);
    };
  }, [match, user, getRecord, getCurrency]);

  const handleSubmit = (data) => {
    addRecord(user.user?.id, data, user.token);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
          <div className="content__box">
            {isLoading ? (
              <div className="content__backdrop">
                <CircularProgress color="inherit" />
              </div>
            ) : (
              <Fragment>
                <Grid container spacing={5} className="record">
                  {records.map((val, key) => (
                    <ListRecord
                      user={user}
                      data={val}
                      key={key}
                      match={match}
                      show={show}
                    />
                  ))}
                </Grid>
                <Grid container justify="center" spacing={5}>
                  <Grid item sm={4}>
                    <button
                      type="button"
                      className="record__addNew"
                      onClick={handleOpen}
                    >
                      Add New Book Record
                    </button>
                  </Grid>
                </Grid>
              </Fragment>
            )}
          </div>

          <AddRecord
            user={user}
            open={open}
            doAdd={handleSubmit}
            handleClose={handleClose}
          />
        </div>
      </Layout>
    </DocumentMeta>
  );
}

const loadingSelector = createLoadingSelector([
  "AUTH",
  "GET_RECORD",
  "ADD_RECORD",
]);

const mapStateToProps = (state) => {
  return {
    user: state.usrReducer.user,
    records: state.rcrdReducer.records,
    isLoading: loadingSelector(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    addRecord: (id, data, token) => dispatch(addRecord(id, data, token)),
    getRecord: (id, token) => dispatch(getRecord(id, token)),
    getCurrency: (token) => dispatch(getCurrency(token)),
  };
};

export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(Dashboard)
);
