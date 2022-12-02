import React, { useState, useEffect } from "react";
import Image from "next/image";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import Button from "@mui/material/Button";
import logo from "../../../public/static/images/logo.png";
import { Container, Link, Menu, MenuItem } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import {
  getProfileAction,
  logoutAction,
  modalVisible,
  resetAuth,
  tempData,
} from "../../redux/actions";
import { getCookie } from "cookies-next";
import { Modules } from "../../constants/modules";
import CommonDialoge from "../../layout/CommonDialoge";

const drawerWidth = 240;
const navItems = [
  {
    id: 0,
    heading: "Dashboard",
    route: "/dashboard",
    val: 4,
  },
  {
    id: 1,
    heading: "Home",
    route: "/",
  },
  {
    id: 2,
    heading: "Classes",
    route: "manageClasses",
  },
  {
    id: 3,
    heading: "About",
    route: "/settings",
    val: 4,
  },
];

function WelcomeHeader(props) {
  const { window } = props;
  const router = useRouter();
  const dispatch = useDispatch();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);

  const isAuthorised = useSelector((state) => state.commonReducer.isAuthorised);
  let { userData } = useSelector((state) => state.authReducer);
  const profileComp = useSelector((state) => state.authReducer.userData);

  const open = Boolean(anchorEl);

  useEffect(() => {
    const token = getCookie("token");

    if (token || isAuthorised) {
      dispatch(resetAuth.authorise());
      // dispatch(getProfileAction.request());
    }
  }, [isAuthorised, getCookie, dispatch]);

  useEffect(() => {
    if (isAuthorised) {
      if (profileComp?.document == "") {
        router.push("profile");
      }
    }
  }, [profileComp, isAuthorised, router]);

  const logOut = () => {
    dispatch(logoutAction.request());
    dispatch(tempData.updateTempData({ role: "user" }));
    handleClose();
    router.replace("/");
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
      <Box sx={{ my: 2, width: "35px", mx: "auto", mb: 0 }}>
        <Image src={logo} alt="img" />
      </Box>
      <List className="mobile_menu">
        {navItems.map((item) => (
          <ListItem key={item?.id} disablePadding>
            {/* <ListItemButton sx={{ textAlign: "center" }}>
              <ListItemText primary={item?.heading} />
            </ListItemButton> */}
            <Link href={item?.route}>{item?.heading}</Link>
          </ListItem>
        ))}
      </List>
    </Box>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <Box sx={{ display: "flex" }} className="wlc_hdr">
      <AppBar component="nav">
        <CommonDialoge />
        <Container maxWidth="xl">
          <Toolbar>
            <Box sx={{ flexGrow: 1, lineHeight: 0 }}>
              <figure className="hdr_logo">
                <Image src={logo} alt="img" />
              </figure>
            </Box>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{
                mr: 2,
                display: { sm: "none" },
                color: "#000",
                margin: 0,
                padding: 0,
              }}
            >
              <MenuIcon />
            </IconButton>

            <Box
              sx={{ display: { xs: "none", sm: "flex" } }}
              className="hdr_mn"
            >
              {navItems.map((item) => (
                <Button
                  onClick={() => {
                    if (item.id == 3) {
                      dispatch(tempData.updateTempData({ link: 4 }));
                    }
                    if (isAuthorised) {
                      router.push(`${item?.route}`);
                    } else {
                      dispatch(modalVisible.modalOpen(Modules.LOGIN));
                    }
                  }}
                  key={item?.id}
                >
                  {item?.heading}
                </Button>
              ))}

              {isAuthorised ? (
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
                          src={userData?.image || "/static/images/dummy.png"}
                          alt=" "
                        />
                      </figure>
                    </Box>
                    {userData?.name || "Dashboard"}
                    <ArrowDropDownIcon />
                  </Button>
                </Box>
              ) : (
                <Button
                  onClick={() =>
                    dispatch(modalVisible.modalOpen(Modules.LOGIN))
                  }
                  className="stroke_btn"
                >
                  Sign in
                </Button>
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
                    router.push("/manageClasses");
                  }}
                >
                  Manage Classes
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    router.push("/manageBookings");
                  }}
                >
                  Manage Bookings
                </MenuItem>
                <MenuItem
                  onClick={() => {
                    handleClose();
                    router.push("/manageMembership");
                  }}
                >
                  Manage Memberships
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
          </Toolbar>
        </Container>
      </AppBar>
      <Box component="nav">
        <Drawer
          container={container}
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
      </Box>
    </Box>
  );
}

export default WelcomeHeader;
