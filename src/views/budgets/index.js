import React, { Fragment, useEffect, useState } from "react";
import "./budgets.css";
import DocumentMeta from "react-document-meta";
import Layout from "../../templates";
import { Typography, CircularProgress } from "@material-ui/core";

import { connect } from "react-redux";
import {
  getBudgets,
  addBudgets,
  getCategory,
  getRecordById,
} from "../../store/actions";
import { createLoadingSelector } from "../../store/selector";

import { Sidebar } from "../../templates/navigation";
import Add from "./add";
import List from "./lists";
import EmptyDataImg from "../../asset/graphic.png";

const Budgets = (props) => {
  const {
    match,
    user,
    budgets,
    getBudgets,
    addBudgets,
    getCategory,
    getRecordById,
    isLoading,
  } = props;
  const [open, setOpen] = useState(false);
  const [show, setShow] = useState(true);

  useEffect(() => {
    let timerShow = setTimeout(
      () => setShow(false),
      process.env.REACT_APP_SHOW
    );

    if (match) {
      getBudgets(match.params.book, user.token);
      getCategory(match.params.book, user.token);
      getRecordById(match.params.book, user.token);
    }

    return () => {
      clearTimeout(timerShow);
    };
  }, [match, user, getBudgets, getCategory, getRecordById]);

  const handleSubmit = (data) => {
    const newData = {
      record_id: match.params.book,
      category_id: data.category_id,
      subcategory_id: data.subcategory_id ? data.subcategory_id : "",
      amount: parseInt(data.amount),
      note: data.note ? data.note : "",
      from: data.from,
      to: data.to,
    };

    addBudgets(match.params.book, newData, user.token);
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
                    <div />
                    <button className="button__main" onClick={handleOpen}>
                      Add Budgets
                    </button>
                  </div>

                  {budgets.length === 0 && (
                    <div className="content__empty">
                      <Typography
                        variant="body2"
                        className="content__emptytext"
                      >
                        You don’t have set any transaction. <br />
                        Create one in seconds.
                      </Typography>
                      <img src={EmptyDataImg} alt="empty-icons-img" />
                    </div>
                  )}

                  {budgets.map((val, key) => {
                    return (
                      <List
                        datas={val}
                        recordId={match.params.book}
                        key={key}
                        show={show}
                      />
                    );
                  })}
                </Fragment>
              )}
            </div>
          </div>

          <Add
            open={open}
            doAdd={handleSubmit}
            handleClose={handleClose}
            isLoading={isLoading}
          />
        </div>
      </Layout>
    </DocumentMeta>
  );
};

const loadingSelector = createLoadingSelector([
  "GET_BUDGETS",
  "ADD_BUDGETS",
  "GET_CATEGORIES",
  "GET_RECORD_ID",
]);

const mapStateToProps = (state) => {
  return {
    user: state.usrReducer.user,
    budgets: state.bdgtReducer.budgets,
    isLoading: loadingSelector(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getBudgets: (idRecords, token) => dispatch(getBudgets(idRecords, token)),
    addBudgets: (idRecords, data, token) =>
      dispatch(addBudgets(idRecords, data, token)),
    getCategory: (idRecords, token) => dispatch(getCategory(idRecords, token)),
    getRecordById: (id, token) => dispatch(getRecordById(id, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Budgets);
