import React, { useEffect, useState } from "react";
import "./add.css";
import { Avatar, Grid, Dialog, DialogContent } from "@material-ui/core";
import { ArrowDropDownCircle } from "@material-ui/icons";

import { connect } from "react-redux";
import { getWallets } from "../../../store/actions";

const Adds = (props) => {
  const {
    open,
    user,
    categories,
    wallets,
    doAdd,
    recordId,
    handleClose,
    getWallets,
    isLoading,
  } = props;
  const [data, setData] = useState({});

  useEffect(() => {
    if (open) {
      getWallets(recordId, user.token);
    }
  }, [open, user, recordId, getWallets]);

  const handleSubmit = (e) => {
    e.preventDefault();

    doAdd(data);

    if (!isLoading) {
      handleClose();
    }
  };

  const handleForm = (e, formName) => {
    setData({ ...data, [formName]: e.target.value });
  };

  return (
    <Dialog fullWidth maxWidth="md" open={open} onClose={handleClose}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <div className="dialog__form">
            <Avatar />
            <Grid container spacing={5}>
              <Grid item sm={6}>
                <div className="dialog__input">
                  <label>Amount</label>
                  <input
                    type="number"
                    onChange={(e) => handleForm(e, "amount")}
                    required
                  />
                </div>
                <div className="dialog__input">
                  <label>Wallets</label>
                  <div className="selects">
                    <select
                      onChange={(e) => handleForm(e, "wallet_id")}
                      required
                    >
                      <option value="">Pilih</option>
                      {wallets.map((val, key) => {
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
                  <label>Date</label>
                  <input
                    type="date"
                    onChange={(e) => handleForm(e, "date")}
                    required
                  />
                </div>
              </Grid>
              <Grid item sm={6}>
                <div className="dialog__input">
                  <label>Category</label>
                  <div className="selects">
                    <select
                      onChange={(e) => handleForm(e, "category_id")}
                      required
                    >
                      <option value="">Pilih</option>
                      {categories
                        .filter((val) => val.parrent_id === "")
                        .map((val, key) => {
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
                  <label>Sub Category</label>

                  <div className="selects">
                    <select onChange={(e) => handleForm(e, "subcategory_id")}>
                      <option value="">Pilih</option>
                      {categories
                        .filter((val) => val.parrent_id === data.category_id)
                        .map((val, key) => {
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
              </Grid>
            </Grid>

            <button type="submit" className="button__second">
              Create Transaction
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.usrReducer.user,
    categories: state.catReducer.categories,
    wallets: state.wltsReducer.wallets,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    getWallets: (id, token) => dispatch(getWallets(id, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Adds);
