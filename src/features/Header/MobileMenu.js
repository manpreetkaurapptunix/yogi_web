import * as React from "react";
import Image from "next/image";
import { Button, Menu, MenuItem, Box, SwipeableDrawer } from "@mui/material";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

export default function MobileMenu() {
  const [state, setState] = React.useState({
    top: false,
    left: false,
    bottom: false,
    right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const list = (anchor) => (
    <Box
      sx={{ width: anchor === "top" || anchor === "bottom" ? "auto" : 250 }}
      role="presentation"
      onClick={toggleDrawer(anchor, false)}
      onKeyDown={toggleDrawer(anchor, false)}
    >
      <Box className="hdr_btn_wpr">
        <Box className="become_instructor">
          <Button
            onClick={becomeInst}
            variant="contained"
            className="btn-designTwo"
          >
            Become an instructor
          </Button>
        </Box>

        <Box className="hdr_btn">
          {!isAuthorised && (
            <Button
              onClick={() => {
                // setCookie("type", "user"),
                dispatch(modalVisible.modalOpen(Modules.LOGIN));
              }}
              variant="contained"
              className="btn-designTwo"
            >
              Sign In
            </Button>
          )}

          {isAuthorised && (
            <Box className="user_data">
              <Button
                className="dropdwn user_btn"
                id="basic-button"
                aria-controls={open ? "basic-menu" : undefined}
                aria-haspopup="true"
                aria-expanded={open ? "true" : undefined}
                onClick={handleClick}
              >
                <Box className="user_img">
                  <figure className="profile_log">
                    <Image
                      width={"100%"}
                      height={"100%"}
                      src={"/static/images/dummy.png"}
                      alt=" "
                    />
                  </figure>
                </Box>
                {"Emma Watson" || "Dashboard"}
                <ArrowDropDownIcon />
              </Button>
            </Box>
          )}
          <Menu
            id="basic-menu"
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem
              onClick={() => {
                handleClose();
                router.push("/profile");
              }}
            >
              Profile
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                router.push("/wishlist");
              }}
            >
              WishList
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                router.push("/myClasses");
              }}
            >
              My Classes
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                router.push("/messages");
              }}
            >
              Messages
            </MenuItem>
            <MenuItem
              onClick={() => {
                handleClose();
                router.push("/settings");
              }}
            >
              Settings
            </MenuItem>
            <MenuItem className="log" onClick={logOut}>
              Log out
            </MenuItem>
          </Menu>
        </Box>
      </Box>
    </Box>
  );

  return (
    <div>
      {["left", "right", "top", "bottom"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)}>{anchor}</Button>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
