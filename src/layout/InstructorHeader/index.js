/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { Box, Button, Menu, MenuItem, Typography } from "@material-ui/core";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  getProfileAction,
  logoutAction,
  modalVisible,
  resetAuth,
  selectRole,
  switchUserAction,
  tempData,
} from "../../redux/actions";
import {
  deleteCookie,
  getCookie,
  removeCookies,
  setCookie,
} from "cookies-next";
import DateRangeIcon from "@mui/icons-material/DateRange";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import WatchLaterIcon from "@mui/icons-material/WatchLater";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CommonDialoge from "../CommonDialoge";
import { Modules } from "../../constants/modules";
import { Footer } from "../Footer";
import MobileMenu from "../../components/mobileMenu";
import { Loader } from "../../components/Loader";

function InstructorHeader(props) {
  const { home } = props;
  const dispatch = useDispatch();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);

  const isAuthorised = useSelector((state) => state.commonReducer.isAuthorised);
  let { userData } = useSelector((state) => state.authReducer);

  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      dispatch(resetAuth.authorise());
    }
  }, [isAuthorised, getCookie]);

  useEffect(() => {
    if (isAuthorised) {
      dispatch(getProfileAction.request());
    }
  }, [dispatch, isAuthorised]);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    dispatch(tempData?.updateTempData({ uploadImage: null }));
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOut = () => {
    dispatch(logoutAction.request());
    handleClose();
    router.replace("/");
    dispatch(tempData.updateTempData({ role: "user" }));
  };

  const becomeCust = () => {
    const fcmToken = getCookie("fcm_token");
    let body = {
      deviceType: "WEB",
      deviceToken: fcmToken || "WEB!@#$334234",
    };

    dispatch(switchUserAction.request(body));
    dispatch(tempData.updateTempData({ role: "user" }));
    setTimeout(() => {
      router.replace("/");
    }, 2000);
  };

  return (
    <Box className="nav_bar hdr_sec inst_hdr">
      <CommonDialoge />
      <Loader />
      <Box className="cstm_container">
        <Box className="nav_warapper">
          <Box className="hdr_logo">
            <figure onClick={() => router.replace("/")}>
              <Image
                width={"100%"}
                height={"100%"}
                src={"/static/images/logo.png"}
                alt="logo"
              />
            </figure>
          </Box>
          <Box className="hdr_rt_mn ">
            <Box
              onClick={() => router.replace("/")}
              sx={{ mr: 2 }}
              className="inst_dashboard_menu"
            >
              <Typography>Home</Typography>
            </Box>

            <Box
              onClick={() => router.replace("/dashboard")}
              sx={{ mr: 2 }}
              className="inst_dashboard_menu"
            >
              <Typography>Dashboard</Typography>
            </Box>

            <Box className="edit_icons">
              <figure onClick={() => router.push("/calender")}>
                <Image
                  width={"35%"}
                  height={"35%"}
                  src={"/static/images/calendar.png"}
                  alt="logo"
                />
              </figure>
              <figure onClick={() => router.push("/notification")}>
                <Image
                  width={"35%"}
                  height={"35%"}
                  src={"/static/images/bell.png"}
                  alt="logo"
                />
              </figure>
            </Box>

            <Box className="hdr_btn_wpr">
              <Box className="become_instructor">
                <Button
                  onClick={becomeCust}
                  variant="contained"
                  className="btn-designTwo"
                >
                  Become a Customer
                </Button>
              </Box>

              <Box className="hdr_btn">
                {!isAuthorised && (
                  <Button
                    onClick={() =>
                      dispatch(modalVisible.modalOpen(Modules.LOGIN))
                    }
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
                            src={userData?.image || "/static/images/dummy.png"}
                            alt=" "
                          />
                        </figure>
                      </Box>
                      {userData?.name || "Dashboard"}
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
                    onClick={() => router.replace("/")}
                    className="inst_mbl_menu"
                  >
                    Home
                  </MenuItem>

                  <MenuItem
                    onClick={() => router.replace("/dashboard")}
                    className="inst_mbl_menu"
                  >
                    Dashboard
                  </MenuItem>
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

              {/* <Box>
                <MobileMenu />
              </Box> */}
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default InstructorHeader;
