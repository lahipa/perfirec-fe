import React, { useEffect, useState } from "react";
import "./listRecord.css";
import { useHistory } from "react-router-dom";

import {
  Grid,
  Card,
  CardHeader,
  CardContent,
  CardActions,
  CardActionArea,
  Typography,
  Avatar,
} from "@material-ui/core";
import { Skeleton, AvatarGroup } from "@material-ui/lab";

import axios from "axios";
import { convertToIdr } from "../../../utils/convert";

const List = (props) => {
  const { user, data, show } = props;
  const [balance, setBalance] = useState([]);

  const history = useHistory();

  useEffect(() => {
    let unmounted = false;

    async function getBalance() {
      try {
        const result = await axios.get(
          `${process.env.REACT_APP_ENDPOINT_MAIN}/balance/${data?._id}`,
          {
            params: { ok: process.env.REACT_APP_ACCKEY },
            headers: {
              Authorization: user.token,
            },
          }
        );

        if (!unmounted) {
          setBalance(result.data.data);
        }
      } catch (err) {
        console.log(err.res);
      }
    }

    getBalance();

    return () => {
      unmounted = true;
    };
  }, [data, user]);

  return (
    <Grid item sm={4} key={data?._id}>
      <Card className="recordItem">
        <CardActionArea
          onClick={() => history.push(`/${data?._id}/transactions`)}
          disabled={show}
        >
          <CardHeader
            className="recordItem__header"
            avatar={
              show ? (
                <Skeleton variant="circle" height={45} width={45} />
              ) : (
                <Avatar title="my-avatar" />
              )
            }
            title={
              show ? (
                <Skeleton animation="wave" height={30} width="40%" />
              ) : (
                data?.name
              )
            }
          />
          <CardContent>
            {show ? (
              <Skeleton animation="wave" height={20} width="30%" />
            ) : (
              <Typography variant="h6" color="textSecondary">
                Balance:
              </Typography>
            )}

            {show ? (
              <Skeleton animation="wave" height={30} width="60%" />
            ) : (
              <Typography variant="h4" color="textSecondary">
                {convertToIdr(
                  balance.reduce((prev, val) => prev + val.balance, 0)
                )}
              </Typography>
            )}
          </CardContent>
          <CardActions className="recordItem__footer">
            <AvatarGroup max={4}>
              {data.members.map((val, key) =>
                show ? (
                  <Skeleton variant="circle" key={key} height={40} width={40} />
                ) : (
                  <Avatar src={val.avatar} key={key} title={val.user_id} />
                )
              )}
            </AvatarGroup>
          </CardActions>
        </CardActionArea>
      </Card>
    </Grid>
  );
};

export default List;
