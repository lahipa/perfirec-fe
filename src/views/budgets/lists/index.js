import React, { useEffect, useState } from "react";
import { Avatar, Paper, Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

import { connect } from "react-redux";
import axios from "axios";
import { formatDateTime, convertToIdr } from "../../../utils/convert";

const Lists = (props) => {
  const { user, datas, categories, recordId, show } = props;
  const [transactions, setTransactions] = useState([]);

  useEffect(() => {
    let unmounted = false;

    async function getBalance() {
      try {
        const result = await axios.get(
          `${process.env.REACT_APP_ENDPOINT_MAIN}/transactions/${recordId}`,
          {
            params: {
              ok: process.env.REACT_APP_ACCKEY,
              from: datas.from,
              to: datas.to,
            },
            headers: {
              Authorization: user.token,
            },
          }
        );

        if (!unmounted) {
          setTransactions(result.data.data);
        }
      } catch (err) {
        console.log(err.res);
      }
    }

    getBalance();

    return () => {
      unmounted = true;
    };
  }, [datas, recordId, user]);

  const budgetUsed = Math.abs(
    transactions
      .filter((trans) => trans.category_id === datas.category_id)
      .reduce((prev, curr) => prev + curr.amount, 0)
  );

  return (
    <Paper variant="outlined" key={datas._id} style={{ marginBottom: "30px" }}>
      <div className="panel">
        <div className="panel__header">
          {show ? (
            <Skeleton animation="wave" height={20} width={150} />
          ) : (
            <Typography variant="body1">
              {formatDateTime(datas.from, "dd MMMM")} to{" "}
              {formatDateTime(datas.to, "dd MMMM")}
            </Typography>
          )}

          {show ? (
            <Skeleton animation="wave" height={20} width={200} />
          ) : (
            <Typography variant="h6">
              Goal : {convertToIdr(datas.amount)}
            </Typography>
          )}
        </div>
        <div className="panel__content">
          <div className="list">
            <div className="list__info">
              {show ? (
                <Skeleton variant="circle" height={60} width={60} />
              ) : (
                <Avatar alt="my-avatar" />
              )}

              <div className="list__infoText">
                {show ? (
                  <Skeleton animation="wave" height={30} width={200} />
                ) : (
                  <Typography variant="h5">
                    {
                      categories.find((cat) => cat._id === datas.category_id)
                        .name
                    }
                  </Typography>
                )}

                {show ? (
                  <Skeleton animation="wave" height={10} width={100} />
                ) : (
                  <Typography variant="caption">{datas.note}</Typography>
                )}
              </div>
            </div>
            <div className="list__right">
              {show ? (
                <Skeleton animation="wave" height={30} width={200} />
              ) : (
                <Typography variant="h6">
                  Left :{" "}
                  <span className="color__green">
                    {convertToIdr(datas.amount - budgetUsed)}
                  </span>{" "}
                  | Used :{" "}
                  <span className="color__red">{convertToIdr(budgetUsed)}</span>
                </Typography>
              )}
            </div>
          </div>
        </div>
      </div>
    </Paper>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.usrReducer.user,
    categories: state.catReducer.categories,
  };
};

export default connect(mapStateToProps, null)(Lists);
