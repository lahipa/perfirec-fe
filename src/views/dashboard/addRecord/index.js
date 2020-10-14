// import React, { useState, useEffect } from "react";
import React, { useState } from "react";
import "./addRecord.css";
import { Dialog, DialogContent, Avatar } from "@material-ui/core";
import { ArrowDropDownCircle } from "@material-ui/icons";

import { connect } from "react-redux";
//import { getCurrency } from "../../../store/actions";
import { createLoadingSelector } from "../../../store/selector";

const AddRecord = (props) => {
  const {
    open,
    user,
    doAdd,
    handleClose,
    isLoading,
    //getCurrency,
    currencies,
  } = props;
  const [data, setData] = useState({});

  // useEffect(() => {
  //   if (open) {
  //     getCurrency(user.token);
  //   }
  // }, [open, getCurrency, user.token]);

  const handleSubmit = (e) => {
    e.preventDefault();

    const datas = {
      name: data.name,
      note: data.note ? data.note : "",
      currency_id: data.currency_id,
      members: [
        {
          user_id: user.user?.id,
          status: "owner",
          avatar: user.avatar,
        },
      ],
    };

    doAdd(datas);

    handleClose();
  };

  const handleForm = (e, formName) => {
    setData({ ...data, [formName]: e.target.value });
  };

  return (
    <Dialog fullWidth maxWidth="xs" open={open} onClose={handleClose}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <div className="dialog__form">
            <Avatar />
            <div className="dialog__input">
              <label>Book Record Name</label>
              <input type="text" onChange={(e) => handleForm(e, "name")} />
            </div>
            <div className="dialog__input">
              <label>Currency</label>
              <div className="selects">
                <select
                  onChange={(e) => handleForm(e, "currency_id")}
                  disabled={isLoading}
                >
                  <option>Pilih</option>
                  {currencies.map((val, key) => {
                    return (
                      <option key={key} value={val._id}>
                        {val.name}
                      </option>
                    );
                  })}
                </select>
                <ArrowDropDownCircle />
              </div>
            </div>
            <div className="dialog__input">
              <label>Note</label>
              <input type="text" onChange={(e) => handleForm(e, "note")} />
            </div>
            <button type="submit" className="button__second">
              Create Book Record
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const loadingSelector = createLoadingSelector(["GET_CURRENCIES"]);

const mapStateToProps = (state) => {
  return {
    currencies: state.crcyReducer.currencies,
    isLoading: loadingSelector(state),
  };
};

// const mapDispatchToProps = (dispatch) => {
//   return {
//     getCurrency: (token) => dispatch(getCurrency(token)),
//   };
// };

export default connect(mapStateToProps, null)(AddRecord);
