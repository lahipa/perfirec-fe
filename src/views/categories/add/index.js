import React, { useState } from "react";
import "./add.css";
import {
  Avatar,
  Dialog,
  DialogContent,
  RadioGroup,
  Radio,
  FormControlLabel,
} from "@material-ui/core";
import { ArrowDropDownCircle } from "@material-ui/icons";

const Add = (props) => {
  const { open, doAdd, record, categories, handleClose, isLoading } = props;
  const [data, setData] = useState({});

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(record);

    const newData = {
      record_id: record._id,
      name: data.name,
      type: data.type,
      parrent_id: data.parrent_id ? data.parrent_id : "",
    };

    doAdd(newData);

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
              <label>Parent Category</label>
              <div className="selects">
                <select onChange={(e) => handleForm(e, "parrent_id")}>
                  <option>Pilih</option>
                  {categories
                    .filter((val) => val.parrent_id === "")
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
              <input type="text" onChange={(e) => handleForm(e, "name")} />
            </div>

            <div className="dialog__input">
              <label>Category Type</label>
              <RadioGroup
                row
                aria-label="cattype"
                name="cattype"
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
            </div>

            <button type="submit" className="button__second">
              Create Category
            </button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default Add;
