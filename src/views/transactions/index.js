import React, { useState, useEffect, Fragment } from "react";
import "./transaction.css";
import DocumentMeta from "react-document-meta";
import Layout from "../../templates";
import { Typography, CircularProgress } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

import { connect } from "react-redux";
import {
  getTransactions,
  addTransactions,
  getCategory,
  getBalance,
  getRecordById,
} from "../../store/actions";
import { createLoadingSelector } from "../../store/selector";
import { formatDateTime, convertToIdr } from "../../utils/convert";
import { Sidebar } from "../../templates/navigation";
import Add from "./add";
import Lists from "./lists";
import EmptyDataImg from "../../asset/graphic.png";

const Transaction = (props) => {
  const {
    match,
    user,
    raw,
    transactions,
    balance,
    getTransactions,
    addTransactions,
    getCategory,
    getBalance,
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
      getTransactions(
        match.params.book,
        { from: "2020-01-01", to: "2020-12-31" },
        user.token
      );
      getCategory(match.params.book, user.token);
      getBalance(match.params.book, user.token);
      getRecordById(match.params.book, user.token);
    }

    return () => {
      clearTimeout(timerShow);
    };
  }, [match, user, getTransactions, getCategory, getBalance, getRecordById]);

  const handleSubmit = (data) => {
    const newData = {
      record_id: match.params.book,
      wallet_id: data.wallet_id,
      category_id: data.category_id,
      subcategory_id: data.subcategory_id ? data.subcategory_id : "",
      amount: parseInt(data.amount),
      date: data.date,
      note: data.note ? data.note : "",
    };

    //console.log(newData);
    addTransactions(
      match.params.book,
      newData,
      { from: "2020-01-01", to: "2020-12-31" },
      getBalance,
      user.token
    );
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const arrnumber = raw.map((val) => val.amount);
  const positive = arrnumber.filter((val) => val >= 0);
  const negative = arrnumber.filter((val) => val < 0);

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
                    <div>
                      {transactions.length === 0 ? (
                        <Typography variant="h5" color="textPrimary">
                          Balance:{" "}
                          {convertToIdr(
                            balance.reduce((prev, val) => prev + val.balance, 0)
                          )}
                        </Typography>
                      ) : show ? (
                        <Skeleton animation="wave" height={30} width={300} />
                      ) : (
                        <Typography variant="h5" color="textPrimary">
                          Balance:{" "}
                          {convertToIdr(
                            balance.reduce((prev, val) => prev + val.balance, 0)
                          )}
                        </Typography>
                      )}

                      {transactions.length === 0 ? (
                        <Typography variant="body2">
                          <span className="color__green">
                            Income:{" "}
                            {convertToIdr(
                              Math.abs(positive.reduce((a, b) => a + b, 0))
                            )}
                          </span>{" "}
                          |{" "}
                          <span className="color__red">
                            Expense:{" "}
                            {convertToIdr(
                              Math.abs(negative.reduce((a, b) => a + b, 0))
                            )}
                          </span>
                        </Typography>
                      ) : show ? (
                        <Skeleton animation="wave" height={20} width={300} />
                      ) : (
                        <Typography variant="body2">
                          <span className="color__green">
                            Income:{" "}
                            {convertToIdr(
                              Math.abs(positive.reduce((a, b) => a + b, 0))
                            )}
                          </span>{" "}
                          |{" "}
                          <span className="color__red">
                            Expense:{" "}
                            {convertToIdr(
                              Math.abs(negative.reduce((a, b) => a + b, 0))
                            )}
                          </span>
                        </Typography>
                      )}
                    </div>

                    <button className="button__main" onClick={handleOpen}>
                      Add Transactions
                    </button>
                  </div>

                  {transactions.length === 0 && (
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

                  {transactions.map((val, key) => {
                    let sumAmount = val.lists.reduce(
                      (prev, val) => prev + val.amount,
                      0
                    );

                    return (
                      <div
                        className="panel"
                        key={key}
                        style={{ marginBottom: "30px" }}
                      >
                        <div className="panel__header">
                          {show ? (
                            <Skeleton
                              animation="wave"
                              height={20}
                              width={150}
                            />
                          ) : (
                            <Typography variant="body1">
                              {formatDateTime(val.date, "dddd, dd-MMMM")}
                            </Typography>
                          )}

                          {show ? (
                            <Skeleton
                              animation="wave"
                              height={20}
                              width={200}
                            />
                          ) : (
                            <Typography variant="h6">
                              <span
                                className={
                                  sumAmount > 0 ? "color__green" : "color__red"
                                }
                              >
                                {convertToIdr(sumAmount)}
                              </span>
                            </Typography>
                          )}
                        </div>
                        <div className="panel__content">
                          {val.lists.map((val) => {
                            return (
                              <Lists datas={val} key={val._id} show={show} />
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}
                </Fragment>
              )}
            </div>
          </div>

          <Add
            open={open}
            doAdd={handleSubmit}
            recordId={match.params.book}
            handleClose={handleClose}
            isLoading={isLoading}
          />
        </div>
      </Layout>
    </DocumentMeta>
  );
};

const loadingSelector = createLoadingSelector([
  "GET_TRANSACTIONS",
  "ADD_TRANSACTIONS",
  "GET_CATEGORIES",
  "GET_BALANCE",
  "GET_RECORD_ID",
]);

const mapStateToProps = (state) => {
  return {
    transactions: state.trxReducer.transactions,
    raw: state.trxReducer.raw,
    balance: state.blncReducer.balance,
    user: state.usrReducer.user,
    record: state.rcrdReducer.record,
    isLoading: loadingSelector(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getTransactions: (id, params, token) =>
      dispatch(getTransactions(id, params, token)),
    addTransactions: (id, data, params, getBalance, token) =>
      dispatch(addTransactions(id, data, params, getBalance, token)),
    getCategory: (id, token) => dispatch(getCategory(id, token)),
    getBalance: (id, token) => dispatch(getBalance(id, token)),
    getRecordById: (id, token) => dispatch(getRecordById(id, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Transaction);
