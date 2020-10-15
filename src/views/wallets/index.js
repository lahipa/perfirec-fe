import React, { Fragment, useEffect, useState } from "react";
import "./wallet.css";
import DocumentMeta from "react-document-meta";
import Layout from "../../templates";
import { Typography, CircularProgress } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

import { connect } from "react-redux";
import {
  getWallets,
  addWallets,
  updateWallets,
  getBalance,
  getRecordById,
} from "../../store/actions";
import { createLoadingSelector } from "../../store/selector";
import { convertToIdr } from "../../utils/convert";
import { Sidebar } from "../../templates/navigation";
import Add from "./add";
import Lists from "./lists";
import EmptyDataImg from "../../asset/graphic.png";

const Wallet = (props) => {
  const {
    match,
    user,
    wallets,
    balance,
    getWallets,
    addWallets,
    updateWallets,
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
      getWallets(match.params.book, user.token);
      getBalance(match.params.book, user.token);
      getRecordById(match.params.book, user.token);
    }

    return () => {
      clearTimeout(timerShow);
    };
  }, [match, user, getWallets, getBalance, getRecordById]);

  const handleSubmit = (data) => {
    data.record_id = match.params.book;

    addWallets(data, match.params.book, getBalance, user.token);
  };

  const handleUpdate = (id, data) => {
    updateWallets(id, data, match.params.book, getBalance, user.token);
  };

  //const totalBalance = transactions.reduce((prev, val) => prev + val.amount, 0);

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
                      {wallets.length === 0 ? (
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
                    </div>
                    <button
                      className="button__main"
                      onClick={() => setOpen(true)}
                    >
                      Add Wallets
                    </button>
                  </div>

                  {wallets.length === 0 ? (
                    <div className="content__empty">
                      <Typography
                        variant="body2"
                        className="content__emptytext"
                      >
                        You don’t have set any wallet. <br />
                        Create one in seconds.
                      </Typography>
                      <img src={EmptyDataImg} alt="empty-icons-img" />
                    </div>
                  ) : (
                    <div className="panel">
                      <div className="panel__header">
                        {show ? (
                          <Skeleton animation="wave" height={20} width={150} />
                        ) : (
                          <Typography variant="body1">Wallets</Typography>
                        )}
                      </div>
                      <div className="panel__content">
                        {wallets.map((val) => {
                          return (
                            <Lists
                              listData={val}
                              key={val._id}
                              doUpdate={handleUpdate}
                              show={show}
                            />
                          );
                        })}
                      </div>
                    </div>
                  )}
                </Fragment>
              )}
            </div>
          </div>

          <Add
            open={open}
            doAdd={handleSubmit}
            handleClose={() => setOpen(false)}
          />
        </div>
      </Layout>
    </DocumentMeta>
  );
};

const loadingSelector = createLoadingSelector([
  "GET_RECORD_ID",
  "GET_BALANCE",
  "GET_WALLETS",
  "ADD_WALLETS",
  "UPDATE_WALLETS",
]);

const mapStateToProps = (state) => {
  return {
    user: state.usrReducer.user,
    wallets: state.wltsReducer.wallets,
    balance: state.blncReducer.balance,
    isLoading: loadingSelector(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getWallets: (id, token) => dispatch(getWallets(id, token)),
    addWallets: (data, recordId, getBalance, token) =>
      dispatch(addWallets(data, recordId, getBalance, token)),
    updateWallets: (id, data, recordId, getBalance, token) =>
      dispatch(updateWallets(id, data, recordId, getBalance, token)),
    getBalance: (id, token) => dispatch(getBalance(id, token)),
    getRecordById: (id, token) => dispatch(getRecordById(id, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Wallet);
