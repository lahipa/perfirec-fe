import React, { useState } from "react";
import "./add.css";
import { Avatar, Dialog, DialogContent } from "@material-ui/core";

const Adds = (props) => {
  const { open, doAdd, handleClose, isLoading } = props;
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
    <Dialog fullWidth maxWidth="xs" open={open} onClose={handleClose}>
      <DialogContent>
        <form onSubmit={handleSubmit}>
          <div className="dialog__form">
            <Avatar />
            <div className="dialog__input">
              <label>Wallets Name</label>
              <input type="text" onChange={(e) => handleForm(e, "name")} />
            </div>

            <div className="dialog__input">
              <label>Balance</label>
              <input type="number" onChange={(e) => handleForm(e, "balance")} />
            </div>

            <button type="submit" className="button__second">
              Create Wallet
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Adds;
