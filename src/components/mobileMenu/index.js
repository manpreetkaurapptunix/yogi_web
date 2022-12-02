import React, { useState } from "react";
import { Box, Button, Menu, MenuItem, SwipeableDrawer } from "@mui/material";

import menuIcon from "../../../public/static/images/menu.png";
import Image from "next/image";

export default function MobileMenu() {
  const [state, setState] = useState({ left: false });

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
      <Menu
        id="basic-menu"
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
        <MenuItem className="log">Log out</MenuItem>
      </Menu>
    </Box>
  );

  return (
    <div>
      {["left"].map((anchor) => (
        <React.Fragment key={anchor}>
          <Button onClick={toggleDrawer(anchor, true)} className="toggle_Bar">
            <Image src={menuIcon.src} alt="menuIcon" />
          </Button>
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
