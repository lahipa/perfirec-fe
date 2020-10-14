import React, { Fragment, useEffect, useState } from "react";
import "./lists.css";
import { Avatar, Typography, Dialog, DialogContent } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

import { connect } from "react-redux";
import { convertToIdr } from "../../../utils/convert";

const Lists = (props) => {
  const { key, listData, balance, doUpdate, show } = props;
  const [data, setData] = useState({});
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (listData) {
      setData({
        name: listData.name,
        balance: balance.find((val) => val.wallet_id === listData._id)?.balance,
        type: listData.type,
      });
    }
  }, [listData, balance]);

  const onSubmitUpdate = (id) => {
    doUpdate(id, data);
  };

  const handleForm = (e, formName) => {
    setData({ ...data, [formName]: e.target.value });
  };

  return (
    <Fragment>
      <div className="list" key={key}>
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
              <Typography variant="body1">
                <b>{listData.name}</b>
              </Typography>
            )}

            {show ? (
              <Skeleton animation="wave" height={10} width={100} />
            ) : (
              <Typography variant="caption">
                <button className="links" onClick={() => setEdit(true)}>
                  Edit
                </button>
              </Typography>
            )}
          </div>
        </div>
        <div className="list__right">
          {show ? (
            <Skeleton animation="wave" height={30} width={200} />
          ) : (
            <Typography variant="h6">
              {convertToIdr(
                balance?.find((val) => val.wallet_id === listData._id)?.balance
              )}
            </Typography>
          )}
        </div>
      </div>

      <Dialog
        fullWidth
        maxWidth="xs"
        open={edit}
        onClose={() => {
          setEdit(false);
          setData({
            name: listData.name,
            balance: balance?.find((val) => val.wallet_id === listData._id)
              ?.balance,
            type: listData.type,
          });
        }}
      >
        <DialogContent>
          <div className="dialog__form">
            <Avatar />
            <div className="dialog__input">
              <label>Balance Name</label>
              <input
                type="text"
                value={data.name}
                onChange={(e) => handleForm(e, "name")}
              />
            </div>

            <div className="dialog__input">
              <label>Balance</label>
              <input
                type="number"
                value={data.balance}
                onChange={(e) => handleForm(e, "balance")}
              />
            </div>

            <button
              type="submit"
              className="button__second"
              onClick={() => {
                onSubmitUpdate(listData._id);
                setEdit(false);
              }}
            >
              Edit Wallet
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    balance: state.blncReducer.balance,
  };
};

export default connect(mapStateToProps, null)(Lists);
