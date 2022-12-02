/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Menu,
  MenuItem,
  Typography,
  TextField,
} from "@material-ui/core";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  modalVisible,
  resetAuth,
  logoutAction,
  switchUserAction,
  getProfileAction,
  getUserDashAction,
  tempData,
} from "../../redux/actions";
import { getCookie, setCookie } from "cookies-next";
import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import SearchIcon from "@mui/icons-material/Search";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import CommonDialoge from "../CommonDialoge";
import { Modules } from "../../constants/modules";
import ClassIcon from "@mui/icons-material/Class";
import SchoolIcon from "@mui/icons-material/School";
import { Loader } from "../../components/Loader";
import dayjs from "dayjs";
import { isString } from "../../utils/validations";
import { GOOGLE_API_KEY } from "../../constants/urls";
import loginIcon from "../../../public/static/images/loginIcon.png";
import signupIcon from "../../../public/static/images/signupIcon.png";
import Autocomplete from "react-google-autocomplete";

function Header(props) {
  const { home, setsteps } = props;

  const dispatch = useDispatch();
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState(null);
  const [dummyToken, setdummyToken] = useState("");
  const [locationFilter, setlocationFilter] = useState("");
  const [schoolName, setschoolName] = useState("");
  const [className, setclassName] = useState("");
  const [autocomplete, setAutocomplete] = useState(null);
  const [coordinates, setCoordinates] = useState({});
  const [sourceFormateAdd, setSourceFormateAdd] = useState("");
  const [dumy, setDumy] = useState("");

  const isAuthorised = useSelector((state) => state.commonReducer.isAuthorised);
  let { userData } = useSelector((state) => state.authReducer);

  const seatSelect = useSelector((state) => state.commonReducer.tempData);

  useEffect(() => {
    if (seatSelect?.globalSearch) {
    } else {
      setlocationFilter("");
      setCoordinates({});
      setschoolName("");
      setclassName("");
    }
  }, [seatSelect]);

  useEffect(() => {
    const token = getCookie("token");
    setdummyToken(token);
    if (token) {
      dispatch(resetAuth.authorise());
    }
  }, [isAuthorised, getCookie]);

  useEffect(() => {
    if (isAuthorised) {
      dispatch(getProfileAction.request());
    }
  }, [dispatch, isAuthorised]);

  useEffect(() => {
    if (seatSelect?.globalSearch) {
      setschoolName(seatSelect?.globalSearch?.schoolName);
      setclassName(seatSelect?.globalSearch?.className);
      setlocationFilter(seatSelect?.globalSearch?.location);
      setCoordinates({
        lat: seatSelect?.globalSearch?.latitude,
        lng: seatSelect?.globalSearch?.longitude,
      });
    }
  }, [seatSelect]);

  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    dispatch(tempData?.updateTempData({ uploadImage: null }));
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const logOut = () => {
    // dispatch(loginAction.success(false, null));
    dispatch(logoutAction.request());
    dispatch(tempData.updateTempData({ role: "user" }));
    handleClose();
    router.replace("/");
  };

  const becomeInst = () => {
    const fcmToken = getCookie("fcm_token");

    if (isAuthorised) {
      let body = {
        deviceType: "WEB",
        deviceToken: fcmToken || "WEB!@#$334234",
      };
      dispatch(switchUserAction.request(body));
      dispatch(tempData.updateTempData({ role: "instructor" }));
      const token = getCookie("token");
      if (token) {
        router.push("/");
      } else {
        dispatch(modalVisible.modalOpen(Modules.LOGIN));
      }
    } else {
      router.replace("/");
      dispatch(tempData.updateTempData({ role: "instructor" }));
      // setCookie("role", "instructor");
    }
  };

  const onSearchClick = () => {
    if (locationFilter || schoolName || className || dumy) {
      let arr = [];
      const body = {
        arr: seatSelect?.filterTempData?.arr || JSON.stringify(arr),
        sortFilter: seatSelect?.filterTempData?.sortFilter || null,
        priceFilter: seatSelect?.filterTempData?.priceFilter || null,
        startTime: seatSelect?.filterTempData?.startTime || null,
        endTime: seatSelect?.filterTempData?.endTime || null,
        schoolName: schoolName || null,
        className: className || null,
        longitude: coordinates?.lng || null,
        latitude: coordinates?.lat || null,
        location: locationFilter || null,
      };

      let params = {
        page: 1,
        limit: 20,
        guestMode: isAuthorised ? false : true,
      };

      dispatch(tempData.updateTempData({ globalSearch: body }));

      dispatch(getUserDashAction.request(body, params));
    } else {
    }
  };
  /**************/

  const handleSrcCitySelect = async (value) => {
    const results = await geocodeByAddress(value);
    const latLng = await getLatLng(results[0]);
    setCoordinates(latLng);
    setSourceFormateAdd(results[0].formatted_address);
    setlocationFilter(results[0].formatted_address);
  };

  const onRemoveClick = () => {
    setschoolName("");
    setclassName("");
    setAutocomplete("");
    setCoordinates("");
    setlocationFilter("");
    setDumy("");
    let params = {
      page: 1,
      limit: 20,
      guestMode: isAuthorised ? false : true,
    };
    let arr = [];
    const body = {
      arr: seatSelect?.filterTempData?.arr || JSON.stringify(arr),
      sortFilter: seatSelect?.filterTempData?.sortFilter || null,
      priceFilter: seatSelect?.filterTempData?.priceFilter || null,
      startTime: seatSelect?.filterTempData?.startTime || null,
      endTime: seatSelect?.filterTempData?.endTime || null,
      schoolName: null,
      className: null,
      longitude: null,
      latitude: null,
    };
    dispatch(getUserDashAction.request(body, params));
    dispatch(tempData.updateTempData({ globalSearch: null }));
  };

  return (
    <Box className="nav_bar hdr_sec cstmr_hdr">
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

          {home && (
            <Box className="filterBar_wpr">
              <Box className="filter_bar">
                <Box
                  // onClick={() => dispatch(modalVisible.modalOpen(Modules.DATE))}
                  className="select_date"
                >
                  <LocationOnOutlinedIcon />
                  <Autocomplete
                    apiKey={GOOGLE_API_KEY}
                    placeholder="Location"
                    onPlaceSelected={(place) => {
                      setlocationFilter(place?.formatted_address);
                      var lat = place?.geometry?.location?.lat();

                      // get lng
                      var lng = place?.geometry?.location?.lng();

                      var latLong = {
                        lat: JSON.stringify(lat),
                        lng: JSON.stringify(lng),
                      };
                      setCoordinates(latLong);
                    }}
                    value={locationFilter}
                    onChange={(e) => setlocationFilter(e?.target?.value)}
                  />
                  {/* <Box className="loc_srch">
                    <PlacesAutocomplete
                      sx={{ m: 0 }}
                      value={locationFilter ? locationFilter : ""}
                      onChange={(value) => {
                        setlocationFilter(value);
                      }}
                      onSelect={handleSrcCitySelect}
                    >
                      {({
                        getInputProps,
                        suggestions,
                        getSuggestionItemProps,
                        loading,
                      }) => (
                        <>
                          <TextField
                            className="inputRounded"
                            fullWidth
                            //label="City"
                            placeholder={"Location"}
                            margin="normal"
                            name="locationFilter"
                            onChange={(newValue) => {
                              setFieldValue("locationFilter", newValue);
                            }}
                            type="text"
                            value={locationFilter}
                            variant="outlined"
                            style={{ borderRadius: 50 }}
                            {...getInputProps()}
                          />
                          <div>
                            {loading ? <div>loading...</div> : null}
                            {suggestions.map((suggestion) => {
                              const style = {
                                backgroundColor: suggestion.active
                                  ? "#41B6E6"
                                  : "#fff",
                              };
                              return (
                                // eslint-disable-next-line react/jsx-key
                                <div
                                  className="searchFieldEffect"
                                  {...getSuggestionItemProps(suggestion, {
                                    style,
                                  })}
                                >
                                  {suggestion.description}
                                </div>
                              );
                            })}
                          </div>
                        </>
                      )}
                    </PlacesAutocomplete>
                  </Box> */}
                  {/* <Box>
                    <Box className="input-group">
                      <TextField
                        placeholder="Location"
                        type="text"
                        fullWidth
                        margin="none"
                        name="Location"
                        value={dumy}
                        onChange={(val) => {
                          if (isString(val.target.value)) {
                            setDumy(val.target.value);
                          }
                        }}
                        variant="standard"
                        className="inputRounded"
                      />
                    </Box>
                  </Box> */}
                </Box>
                <Box
                  // onClick={() => dispatch(modalVisible.modalOpen(Modules.TIME))}
                  className="select_date"
                >
                  <SchoolIcon className="date_icon" />
                  <Box>
                    <Box className="input-group">
                      <TextField
                        placeholder="School Name"
                        type="text"
                        fullWidth
                        margin="none"
                        name="schoolName"
                        onChange={(val) => {
                          if (isString(val.target.value)) {
                            setschoolName(val.target.value);
                          }
                        }}
                        inputProps={{ style: { border: "none" } }}
                        value={schoolName}
                        variant="standard"
                        className="inputRounded"
                      />
                    </Box>
                  </Box>
                </Box>
                <Box className="select_date">
                  <ClassIcon className="date_icon" />
                  <Box>
                    <Box className="input-group">
                      <TextField
                        placeholder="Class Name"
                        type="text"
                        fullWidth
                        margin="none"
                        name="className"
                        onChange={(val) => {
                          if (isString(val.target.value)) {
                            setclassName(val.target.value);
                          }
                        }}
                        inputProps={{ style: { border: "none" } }}
                        value={className}
                        variant="standard"
                        className="inputRounded"
                      />
                    </Box>
                  </Box>
                </Box>
                <Box onClick={onSearchClick} className="search_btn">
                  <SearchIcon />
                </Box>
              </Box>
              <Box className="clr_text">
                {locationFilter || schoolName || className || dumy ? (
                  <Typography onClick={onRemoveClick}>Clear All</Typography>
                ) : (
                  ""
                )}
              </Box>
            </Box>
          )}
          {isAuthorised && (
            <Box className="edit_icons">
              <figure onClick={() => router.push("/notification")}>
                <Image
                  width={"35%"}
                  height={"35%"}
                  src={"/static/images/bell.png"}
                  alt="logo"
                />
              </figure>
            </Box>
          )}

          <Box className="hdr_btn_wpr">
            <Box className="become_instructor">
              <Button
                onClick={becomeInst}
                variant="contained"
                className="btn-designTwo y"
              >
                Become an instructor
              </Button>
            </Box>

            {!isAuthorised && (
              <Button
                onClick={() => {
                  // setCookie("type", "user"),
                  dispatch(modalVisible.modalOpen(Modules.SIGNUP));
                }}
                variant="contained"
                className="btn-designTwo mbl_btn"
              >
                Sign Up
                <span className="res_icon">
                  <img src={signupIcon.src} alt="img" />
                </span>
              </Button>
            )}

            <Box className="hdr_btn">
              {!isAuthorised && (
                <Button
                  onClick={() => {
                    // setCookie("type", "user"),
                    dispatch(modalVisible.modalOpen(Modules.LOGIN));
                  }}
                  variant="contained"
                  className="btn-designTwo mbl_btn"
                >
                  Sign In
                  <span className="res_icon">
                    <img src={loginIcon.src} alt="img" />
                  </span>
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
      </Box>
    </Box>
  );
}

export default Header;
