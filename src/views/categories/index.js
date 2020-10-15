import React, { Fragment, useEffect, useState } from "react";
import "./categories.css";
import DocumentMeta from "react-document-meta";
import Layout from "../../templates";
import { Typography, CircularProgress } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

import { connect } from "react-redux";
import { createLoadingSelector } from "../../store/selector";
import {
  addCategory,
  getCategory,
  updateCategory,
  getRecordById,
} from "../../store/actions";
import { Sidebar } from "../../templates/navigation";
import { Tabs as handleTabs } from "../../components/tabs";
import Add from "./add";
import Lists from "./lists";
import EmptyDataImg from "../../asset/graphic.png";

const Categories = (props) => {
  const {
    match,
    user,
    record,
    categories,
    addCategory,
    getCategory,
    updateCategory,
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
      getCategory(match.params.book, user.token);
      getRecordById(match.params.book, user.token);
    }

    return () => {
      clearTimeout(timerShow);
    };
  }, [match, user, getCategory, getRecordById]);

  const handleSubmit = (data) => {
    addCategory(match.params.book, data, user.token);
  };

  const handleUpdate = (id, data) => {
    updateCategory(id, match.params.book, data, user.token);
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
                    <div>
                      {categories.length === 0 ? (
                        <p style={{ fontSize: "24px", margin: 0 }}>
                          <button
                            className="tablinks active"
                            onClick={(e) => handleTabs(e, "income")}
                          >
                            Income
                          </button>{" "}
                          |{" "}
                          <button
                            className="tablinks"
                            onClick={(e) => handleTabs(e, "expense")}
                          >
                            Expense
                          </button>
                        </p>
                      ) : show ? (
                        <Skeleton animation="wave" height={30} width={300} />
                      ) : (
                        <p style={{ fontSize: "24px", margin: 0 }}>
                          <button
                            className="tablinks active"
                            onClick={(e) => handleTabs(e, "income")}
                          >
                            Income
                          </button>{" "}
                          |{" "}
                          <button
                            className="tablinks"
                            onClick={(e) => handleTabs(e, "expense")}
                          >
                            Expense
                          </button>
                        </p>
                      )}
                    </div>
                    <button
                      className="button__main"
                      onClick={() => setOpen(true)}
                    >
                      Add Categories
                    </button>
                  </div>

                  {categories.filter((val) => val.type === "income").length ===
                  0 ? (
                    <div id="income" className="tabcontent">
                      <div className="content__empty">
                        <Typography
                          variant="body2"
                          className="content__emptytext"
                        >
                          You don’t have set any income category. <br />
                          Create one in seconds.
                        </Typography>
                        <img src={EmptyDataImg} alt="empty-icons-img" />
                      </div>
                    </div>
                  ) : (
                    <div id="income" className="panel tabcontent">
                      <div className="panel__header">
                        {show ? (
                          <Skeleton animation="wave" height={20} width={150} />
                        ) : (
                          <Typography variant="body1">
                            Income Categories
                          </Typography>
                        )}
                      </div>
                      <div className="panel__content">
                        {categories
                          .filter((val) => val.type === "income")
                          .map((val, key) => {
                            return (
                              <Lists
                                listData={val}
                                key={key}
                                doUpdate={handleUpdate}
                                type="income"
                                show={show}
                              />
                            );
                          })}
                      </div>
                    </div>
                  )}

                  {categories.filter((val) => val.type === "expense").length ===
                  0 ? (
                    <div id="expense" className="tabcontent">
                      <div className="content__empty">
                        <Typography
                          variant="body2"
                          className="content__emptytext"
                        >
                          You don’t have set any expense category. <br />
                          Create one in seconds.
                        </Typography>
                        <img src={EmptyDataImg} alt="empty-icons-img" />
                      </div>
                    </div>
                  ) : (
                    <div
                      id="expense"
                      className="panel tabcontent"
                      style={{ display: "none" }}
                    >
                      <div className="panel__header">
                        {show ? (
                          <Skeleton animation="wave" height={20} width={150} />
                        ) : (
                          <Typography variant="body1">
                            Expense Categories
                          </Typography>
                        )}
                      </div>
                      <div className="panel__content">
                        {categories
                          .filter((val) => val.type === "expense")
                          .map((val, key) => {
                            return (
                              <Lists
                                listData={val}
                                key={key}
                                doUpdate={handleUpdate}
                                type="expense"
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
            record={record}
            categories={categories}
            handleClose={() => setOpen(false)}
          />
        </div>
      </Layout>
    </DocumentMeta>
  );
};

const loadingSelector = createLoadingSelector([
  "GET_RECORD_ID",
  "GET_CATEGORIES",
  "ADD_CATEGORIES",
  "UPDATE_CATEGORIES",
]);

const mapStateToProps = (state) => {
  return {
    user: state.usrReducer.user,
    record: state.rcrdReducer.record,
    categories: state.catReducer.categories,
    isLoading: loadingSelector(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getCategory: (idRecords, token) => dispatch(getCategory(idRecords, token)),
    addCategory: (idRecords, data, token) =>
      dispatch(addCategory(idRecords, data, token)),
    updateCategory: (id, idRecords, data, token) =>
      dispatch(updateCategory(id, idRecords, data, token)),
    getRecordById: (id, token) => dispatch(getRecordById(id, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Categories);
