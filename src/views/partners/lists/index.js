import React, { useEffect, useState } from "react";
import { Avatar, Typography } from "@material-ui/core";
import { Skeleton } from "@material-ui/lab";

import { connect } from "react-redux";
import axios from "axios";

const Lists = (props) => {
  const { user, datas, show } = props;
  const [memberData, setMemberData] = useState({});

  useEffect(() => {
    let unmounted = false;

    async function getMemberData() {
      try {
        const result = await axios.get(
          `${process.env.REACT_APP_ENDPOINT_MAIN}/users/${datas.user_id}`,
          {
            params: { ok: process.env.REACT_APP_ACCKEY },
            headers: {
              Authorization: user.token,
            },
          }
        );

        if (!unmounted) {
          setMemberData(result.data.data);
        }
      } catch (err) {
        console.log("request error!");
      }
    }

    if (datas.status !== "pending") {
      getMemberData();
    }

    return () => {
      unmounted = true;
    };
  }, [datas, user]);

  return (
    <div className="list">
      <div className="list__info">
        {show ? (
          <Skeleton variant="circle" height={60} width={60} />
        ) : (
          <Avatar alt="my-avatar" src={memberData.avatar} />
        )}
        <div className="list__infoText">
          {show ? (
            <Skeleton animation="wave" height={30} width={200} />
          ) : (
            <Typography variant="body1">
              <b>
                {datas.status !== "pending" ? memberData.namer : datas.user_id}
              </b>
            </Typography>
          )}

          {show ? (
            <Skeleton animation="wave" height={10} width={100} />
          ) : (
            <Typography variant="caption">
              {datas.status !== "pending"
                ? memberData.email
                : "Pending invitation"}
            </Typography>
          )}
        </div>
      </div>
      <div className="list__right">
        {show ? (
          <Skeleton animation="wave" height={30} width={200} />
        ) : (
          // <button className="links">Remove</button>
          <Typography variant="body2">{datas.status}</Typography>
        )}
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.usrReducer.user,
  };
};

export default connect(mapStateToProps, null)(Lists);
