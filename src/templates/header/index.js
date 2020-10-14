import React, { useState } from "react";
import "./header.css";
import { useHistory } from "react-router-dom";
import {
  Menu,
  MenuItem,
  ListItemIcon,
  IconButton,
  Typography,
  Divider,
} from "@material-ui/core";
import { AccountCircle, Dashboard } from "@material-ui/icons";
import { Skeleton } from "@material-ui/lab";

import { connect } from "react-redux";
import { logoutUser } from "../../store/actions";
import { createLoadingSelector } from "../../store/selector";

const Header = (props) => {
  const { user, logoutUser, isLogin, isLoading } = props;
  const [anchorEl, setAnchorEl] = useState(null);

  const history = useHistory();

  const handleLogout = () => {
    logoutUser(history, user.token);

    handleMenuClose();
  };

  const handleMenuOpen = (e) => {
    setAnchorEl(e.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <header className="header">
      <div
        className="header__logo"
        onClick={() =>
          isLogin ? history.push("/dashboard") : history.push("/")
        }
      >
        <h3>Perfirec</h3>
        <span>Personal Finance Record</span>
      </div>
      <div className="header__right">
        {isLogin && (
          <IconButton
            aria-label="back-dashboard"
            className="button__back"
            onClick={() => history.push("/dashboard")}
          >
            <Dashboard />
          </IconButton>
        )}

        {isLoading ? (
          <div className="header__menus">
            <div>
              <Skeleton animation="wave" height={25} width={45} />
            </div>{" "}
            <div style={{ marginLeft: "10px" }}>
              <Skeleton
                animation="wave"
                variant="circle"
                width={33}
                height={33}
              />
            </div>
          </div>
        ) : isLogin ? (
          <div className="header__menus" onClick={(e) => handleMenuOpen(e)}>
            {user.user?.nameu} <AccountCircle />
          </div>
        ) : (
          <div
            className="header__menus"
            onClick={(e) => history.push("/login")}
          >
            Sign In <AccountCircle />
          </div>
        )}

        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem style={{ paddingTop: "15px", paddingBottom: "15px" }}>
            <ListItemIcon
              style={{
                minWidth: "0",
                marginRight: "10px",
              }}
            >
              <AccountCircle fontSize="large" />
            </ListItemIcon>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                width: "150px",
              }}
            >
              <Typography variant="body1">{user.user?.namer}</Typography>
              <Typography variant="caption">{user.user?.email}</Typography>
            </div>
          </MenuItem>
          <Divider />
          <MenuItem
            onClick={() => {
              history.push("/profile");
              handleMenuClose();
            }}
          >
            Profile
          </MenuItem>
          <MenuItem
            onClick={() => {
              history.push("/setting");
              handleMenuClose();
            }}
          >
            Setting
          </MenuItem>
          <Divider />
          <MenuItem onClick={handleLogout}>Logout</MenuItem>
        </Menu>
      </div>
    </header>
  );
};

const loadingSelector = createLoadingSelector(["AUTH"]);

const mapStateToProps = (state) => {
  return {
    user: state.usrReducer.user,
    isLogin: state.usrReducer.isLogin,
    isLoading: loadingSelector(state),
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    logoutUser: (history, token) => dispatch(logoutUser(history, token)),
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(Header);
