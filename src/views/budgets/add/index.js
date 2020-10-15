import React, { useState } from "react";
import "./add.css";
import { Avatar, Grid, Dialog, DialogContent } from "@material-ui/core";
import { ArrowDropDownCircle } from "@material-ui/icons";

import { connect } from "react-redux";

const Adds = (props) => {
  const { open, categories, doAdd, handleClose, isLoading } = props;
  const [data, setData] = useState({});

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
                <Grid container spacing={5}>
                  <Grid item sm={6}>
                    <div className="dialog__input">
                      <label>Date From</label>
                      <input
                        type="date"
                        onChange={(e) => handleForm(e, "from")}
                        required
                      />
                    </div>
                  </Grid>
                  <Grid item sm={6}>
                    <div className="dialog__input">
                      <label>Date To</label>
                      <input
                        type="date"
                        onChange={(e) => handleForm(e, "to")}
                        required
                      />
                    </div>
                  </Grid>
                </Grid>
                <div className="dialog__input">
                  <label>Note</label>
                  <input type="text" onChange={(e) => handleForm(e, "note")} />
                </div>
              </Grid>
              <Grid item sm={6}>
                <div className="dialog__input">
                  <div style={{ height: "86px" }} />
                </div>
                <div className="dialog__input">
                  <label>Category</label>
                  <div className="selects">
                    <select
                      onChange={(e) => handleForm(e, "category_id")}
                      required
                    >
                      <option value="">Pilih</option>
                      {categories
                        .filter(
                          (val) =>
                            val.parrent_id === "" && val.type === "expense"
                        )
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
              </Grid>
            </Grid>

            <button type="submit" className="button__second">
              Create Budget
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

const mapStateToProps = (state) => {
  return {
    categories: state.catReducer.categories,
  };
};

export default connect(mapStateToProps, null)(Adds);
