/* eslint-disable @next/next/no-img-element */
import {
  Box,
  Button,
  Container,
  Grid,
  IconButton,
  InputAdornment,
  TextField,
  Typography,
} from "@material-ui/core";
import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import AuthLeftComponent from "../AuthCommon/AuthLeftComponent";

import * as Yup from "yup";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/router";
import AuthRightComponent from "../AuthCommon/AuthRightComponent";
import { toast } from "react-toastify";
import FormControl from "@mui/material/FormControl";
import { InputLabel, MenuItem, Select } from "@mui/material";
import { modalVisible, registerAction, tempData } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Modules } from "../../constants/modules";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { isString } from "../../utils/validations";
import { getCookie } from "cookies-next";

const SignUpCompo = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isEmail, setisEmail] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneCode, setPhoneCode] = useState("91");
  const [countryName, setCountryName] = useState("in");
  const [error, setError] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [role, setrole] = useState("");
  const [lat, setlat] = useState("");
  const [long, setlong] = useState("");
  const dataFilled = useSelector((state) => state.commonReducer.tempData);

  console.log(dataFilled, "dataFilled");

  useEffect(() => {
    if (dataFilled?.signUp) {
      formik.setFieldValue(
        "email",
        dataFilled?.signUp?.callingCode ? "" : dataFilled?.signUp?.key
      );
      formik.setFieldValue("password", dataFilled?.signUp?.password);
      formik.setFieldValue("confirmPassword", dataFilled?.signUp?.password);
      formik.setFieldValue("fullName", dataFilled?.signUp?.name);
      setrole(dataFilled?.signUp?.role == "user" ? "Customer" : "Instructor");
      setPhone(dataFilled?.signUp?.key);
      setPhoneCode(dataFilled?.signUp?.callingCode);
      setCountryName(dataFilled?.signUp?.countryCode);
    }
  }, [dataFilled]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    getUserCoordinates();
  }, []);

  const getUserCoordinates = () => {
    if (!navigator.geolocation) {
      setError("Geolocation API is not available in your browser!");
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position, "positionnnnn");
          const { coords } = position;
          setlat(coords.latitude);
          setlong(coords.longitude);
        },
        (error) => {
          setError("Something went wrong getting your position!");
        }
      );
    }
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const handleChangePhone = (phone, country) => {
    setPhoneCode(country?.dialCode);
    setPhone(phone?.replace(country.dialCode, ""));
    setCountryName(country?.countryCode);
  };

  const handleChange = (event) => {
    setrole(event.target.value);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      fullName: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().when("isEmail", {
        is: (val) => isEmail,
        then: Yup.string()
          .email("Must be a valid email")
          .max(25)
          .required("Email is required"),
      }),
      fullName: Yup.string()
        .required("Full Name is required")
        .max(30)
        .matches(/^[aA-zZ\s]+$/, "Must Contain alphabets only"),
      password: Yup.string()
        .max(15)
        .required("Password is requird")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is requird"),
    }),
    onSubmit: async () => {
      formik.setSubmitting(true);
      setError(true);

      if (!role?.length || (!isEmail && !phone)) {
        return;
      }

      const fcmToken = getCookie("fcm_token");

      let body = {};
      if (isEmail) {
        body = {
          key: formik.values.email,
          password: formik.values.password,
          name: formik.values.fullName,
          role: role == "Instructor" ? "instructor" : "user",
          latitude: lat ? JSON.stringify(lat) : "30.7226948",
          longitude: long ? JSON.stringify(long) : "76.699006",
          deviceType: "WEB",
          deviceToken: fcmToken || "WEB!@#$334234",
        };
      } else {
        body = {
          key: phone,
          countryCode: countryName,
          callingCode: phoneCode || "",
          password: formik.values.password,
          name: formik.values.fullName,
          role: role == "Instructor" ? "instructor" : "user",
          latitude: lat ? JSON.stringify(lat) : "30.7226948",
          longitude: long ? JSON.stringify(long) : "76.699006",
          deviceType: "WEB",
          deviceToken: fcmToken || "WEB!@#$334234",
        };
      }

      dispatch(tempData?.updateTempData({ signUp: body }));

      dispatch(registerAction.request(body));
      setError(false);
      formik.setSubmitting(false);
    },
  });

  return (
    <Box component="main" className="login_wpr">
      <Box className="wrapper">
        {/* <Loader /> */}
        <Box className="twoColumn">
          <Box className="twoColumn_itemOne">
            <AuthLeftComponent
              heading="Sign Up"
              subHeading={
                "Please enter your" +
                (isEmail ? " Email " : " Phone number ") +
                "to continue"
              }
              isEmail={isEmail}
              setisEmail={setisEmail}
            />
            <form className="form_input" onSubmit={formik.handleSubmit}>
              <FormControl fullWidth className="select_btn">
                <InputLabel id="demo-simple-select-label">Customer</InputLabel>
                <Select
                  labelId="demo-simple-select-label"
                  id="demo-simple-select"
                  value={role}
                  label="Customer"
                  onChange={handleChange}
                >
                  <MenuItem value={"Customer"}>Customer</MenuItem>
                  <MenuItem value={"Instructor"}>Instructor</MenuItem>
                </Select>
                {!role?.length && error ? (
                  <label className="compul_s">This field is required</label>
                ) : (
                  ""
                )}
              </FormControl>

              <Box className="input_field">
                <TextField
                  type="text"
                  className="line_form"
                  placeholder="Full Name"
                  error={Boolean(
                    formik.touched.fullName && formik.errors.fullName
                  )}
                  fullWidth
                  helperText={formik.touched.fullName && formik.errors.fullName}
                  margin="none"
                  name="fullName"
                  onBlur={formik.handleBlur}
                  onChange={(val) => {
                    if (isString(val.target.value)) {
                      formik.handleChange(val);
                    }
                  }}
                  value={formik.values.fullName}
                  variant="standard"
                />
              </Box>
              {isEmail ? (
                <Box className="input_field">
                  <TextField
                    type="email"
                    className="line_form"
                    placeholder="Email"
                    error={Boolean(formik.touched.email && formik.errors.email)}
                    fullWidth
                    helperText={formik.touched.email && formik.errors.email}
                    margin="none"
                    name="email"
                    onBlur={formik.handleBlur}
                    onChange={formik.handleChange}
                    value={formik.values.email}
                    variant="standard"
                  />
                </Box>
              ) : (
                <Box sx={{ my: 2 }} style={{}} className="input_field">
                  <PhoneInput
                    value={phoneCode + phone}
                    // className="ph_input "
                    name="phone"
                    enableSearch={true}
                    onChange={(phone, country) =>
                      handleChangePhone(phone, country)
                    }
                  />
                  {!phone && error ? (
                    <label className="compul_s">This field is compulsory</label>
                  ) : (
                    ""
                  )}
                </Box>
              )}
              <Box className="input_field">
                <TextField
                  className="line_form pwd_type"
                  placeholder="Password"
                  error={Boolean(
                    formik.touched.password && formik.errors.password
                  )}
                  fullWidth
                  helperText={formik.touched.password && formik.errors.password}
                  margin="none"
                  name="password"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type={showPassword ? "text" : "password"}
                  value={formik.values.password}
                  variant="standard"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {!showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>

              <Box className="input_field">
                <TextField
                  className="line_form pwd_type"
                  placeholder="Confirm Password"
                  error={Boolean(
                    formik.touched.confirmPassword &&
                      formik.errors.confirmPassword
                  )}
                  fullWidth
                  helperText={
                    formik.touched.confirmPassword &&
                    formik.errors.confirmPassword
                  }
                  margin="none"
                  name="confirmPassword"
                  onBlur={formik.handleBlur}
                  onChange={formik.handleChange}
                  type={showConfirmPassword ? "text" : "password"}
                  value={formik.values.confirmPassword}
                  variant="standard"
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowConfirmPassword}
                          onMouseDown={handleMouseDownPassword}
                          edge="end"
                        >
                          {!showConfirmPassword ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Box>
              <Box className="btm">
                <LoadingButton
                  type="submit"
                  disabled={formik.isSubmitting}
                  variant="contained"
                  className="fluid_btn"
                  onClick={() => setError(true)}
                >
                  Sign Up
                </LoadingButton>
              </Box>
            </form>
            <Box className="social_tabs_wpr">
              {/* <ul className="social_tabs">
                <li className="social_tab_item">
                  <a>
                    <img src="/static/images/facebook.png" alt="facebook" />
                    <p>Facebook</p>
                  </a>
                </li>  */}
              {/* <li className="social_tab_item">
                  <a href="https://www.icloud.com/">
                    <img src="/static/images/apple.png" alt="apple" />
                    <p>Apple</p>
                  </a>
                </li> */}
              {/* <li className="social_tab_item">
                  <a>
                    <img src="/static/images/google.png" alt="google" />
                    <p>Google</p>
                  </a>
                </li>
              </ul> */}

              <p className="signup_link">
                Already have an account ?
                <Box
                  // variant="text"
                  onClick={() => {
                    dispatch(modalVisible.modalClose());
                    dispatch(modalVisible.modalOpen(Modules.LOGIN));
                    // router.push("/signup");
                  }}
                >
                  <Typography>Login</Typography>
                </Box>
              </p>
            </Box>
          </Box>
          <Box className="twoColumn_itemTwo">
            <AuthRightComponent images={"/static/images/signupImg.png"} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default SignUpCompo;
