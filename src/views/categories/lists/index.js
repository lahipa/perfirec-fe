import React, { Fragment, useEffect, useState } from "react";
import "./lists.css";

import {
  Avatar,
  Typography,
  Dialog,
  DialogContent,
  //RadioGroup,
  //Radio,
  //FormControlLabel,
} from "@material-ui/core";
import { ArrowDropDownCircle } from "@material-ui/icons";
import { Skeleton } from "@material-ui/lab";

import { connect } from "react-redux";

const Lists = (props) => {
  const { key, listData, type, categories, doUpdate, show } = props;
  const [data, setData] = useState({});
  const [edit, setEdit] = useState(false);

  useEffect(() => {
    if (listData) {
      setData({
        name: listData.name,
        parrent_id: listData.parrent_id,
        type: listData.type,
      });
    }
  }, [listData]);

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
                {listData.parrent_id === "" ? "Categories" : "Sub Categories"} |{" "}
                <button className="links" onClick={() => setEdit(true)}>
                  Edit
                </button>
              </Typography>
            )}
          </div>
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
            parrent_id: listData.parrent_id,
            type: listData.type,
          });
        }}
      >
        <DialogContent>
          <div className="dialog__form">
            <Avatar />
            <div className="dialog__input">
              <label>Parent Catogory</label>
              <div className="selects">
                <select
                  value={data.parrent_id}
                  onChange={(e) => handleForm(e, "parrent_id")}
                >
                  <option value="">Pilih</option>
                  {categories
                    .filter(
                      (val) =>
                        val._id !== listData._id &&
                        val.parrent_id === "" &&
                        val.type === type
                    )
                    .map((val, key) => (
                      <option key={key} value={val._id}>
                        {val.name}
                      </option>
                    ))}
                </select>
                <ArrowDropDownCircle />
              </div>
            </div>

            <div className="dialog__input">
              <label>Category Name</label>
              <input
                type="text"
                value={data.name}
                onChange={(e) => handleForm(e, "name")}
              />
            </div>

            {/* <div className="dialog__input">
              <label>Category Type</label>
              <RadioGroup
                row
                aria-label="cattype"
                name="cattype"
                value={data.type}
                onChange={(e) => handleForm(e, "type")}
              >
                <FormControlLabel
                  value="income"
                  control={<Radio />}
                  label="Income"
                />
                <FormControlLabel
                  value="expense"
                  control={<Radio />}
                  label="Expense"
                />
              </RadioGroup>
            </div> */}

            <button
              type="submit"
              className="button__second"
              onClick={() => {
                onSubmitUpdate(listData._id);
                setEdit(false);
              }}
            >
              Edit Category
            </button>
          </div>
        </DialogContent>
      </Dialog>
    </Fragment>
  );
};

const mapStateToProps = (state) => {
  return {
    categories: state.catReducer.categories,
  };
};

export default connect(mapStateToProps, null)(Lists);
