import React from "react";
import { Avatar, Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

import { connect } from "react-redux";
import { convertToIdr } from "../../../utils/convert";

const Lists = (props) => {
  const { datas, categories, show } = props;
  return (
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
            <Typography variant="body1">
              <b>
                {categories.find((val) => val._id === datas.category_id).name}
              </b>
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
          <Typography
            variant="h6"
            className={datas.amount > 0 ? "color__green" : "color__red"}
          >
            {convertToIdr(datas.amount)}
          </Typography>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    categories: state.catReducer.categories,
  };
};

export default connect(mapStateToProps, null)(Lists);
