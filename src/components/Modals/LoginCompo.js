/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
import {
  Box,
  Button,
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
import Checkbox from "@mui/material/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import {
  modalVisible,
  resetAuth,
  loginAction,
  tempData,
  sociallLoginAction,
} from "../../redux/actions";
import { deleteCookie, getCookie, setCookie } from "cookies-next";
import Divider from "@mui/material/Divider";
import { Modules } from "../../constants/modules";
import { Loader } from "../Loader";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  GoogleAuthProvider,
  FacebookAuthProvider,
  signInWithPopup,
} from "firebase/auth";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";

const LoginCompo = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  let { userData } = useSelector((state) => state.authReducer);
  const [isEmail, setisEmail] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneCode, setPhoneCode] = useState("91");
  const [countryName, setCountryName] = useState("in");
  const [error, setError] = useState(false);
  const [cookieData, setcookieData] = useState("");
  const [lat, setlat] = useState("");
  const [long, setlong] = useState("");

  useEffect(() => {
    const data = getCookie("Credes");

    if (data) {
      setcookieData(JSON.parse(data));
      setPhone(JSON.parse(data)?.phone);
      formik.setFieldValue("password", JSON.parse(data)?.pasword);
      formik.setFieldValue("email", JSON.parse(data)?.email);
      formik.setFieldValue("remember", JSON.parse(data)?.remember);
    }
  }, [getCookie]);

  useEffect(() => {
    dispatch(tempData?.updateTempData({ signUp: null }));
  }, [dispatch]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChangePhone = (phone, country) => {
    setPhoneCode(country?.dialCode);
    setPhone(phone?.replace(country.dialCode, ""));
    setCountryName(country?.countryCode);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      remember: false,
    },
    validationSchema: Yup.object({
      email: Yup.string().when("isEmail", {
        is: (val) => isEmail,
        then: Yup.string()
          .email("Must be a valid email")
          .max(25)
          .required("Email is required"),
        otherwise: null,
      }),
      password: Yup.string()
        .max(15)
        .required("Password is requird")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
      remember: Yup.boolean(),
    }),
    onSubmit: async () => {
      formik.setSubmitting(true);
      setError(true);

      if (!isEmail && !phone) {
        return;
      }

      const fcmToken = getCookie("fcm_token");

      let body = {
        password: formik.values.password,
        deviceType: "WEB",
        deviceToken: fcmToken || "WEB!@#$334234",
      };
      body[isEmail ? "email" : "phone"] = isEmail ? formik.values.email : phone;

      console.log({ body });

      dispatch(loginAction.request(body));
      setError(false);
      formik.setSubmitting(false);
    },
  });

  const handleRemember = (item) => {
    console.log(item);
    if (item == false) {
      let creds = {};
      if (isEmail) {
        creds = {
          email: formik.values.email,
          pasword: formik.values.password,
          remember: !item,
        };
      } else {
        creds = {
          phone: phone,
          pasword: formik.values.password,
          remember: !item,
        };
      }
      // storeData(storageKey.CREDS, JSON.stringify(creds));
      setCookie("Credes", JSON.stringify(creds));
    } else if (item == true) {
      // localStorage?.removeItem(storageKey.CREDS, JSON.stringify(creds));
      deleteCookie("Credes");
    }
  };

  const config = {
    apiKey: "AIzaSyB7eliIQzf-Zp9WoVH8R_zT1vYDaEn-7G4",
    authDomain: "yogi-76ea1.firebaseapp.com",
    projectId: "yogi-76ea1",
    storageBucket: "yogi-76ea1.appspot.com",
    messagingSenderId: "242445304021",
    appId: "1:242445304021:web:454ca6ecd2f06edcdda25c",
    measurementId: "G-JM740ZBKJ7",
  };
  const app = initializeApp(config);

  const auth = getAuth(app);
  const provider = new GoogleAuthProvider();

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then(async (result) => {
        console.log(result, "????????", lat, long);
        const fcmToken = getCookie("fcm_token");

        const body = {
          email: result._tokenResponse.email,
          name: result._tokenResponse.fullName,
          image: result._tokenResponse.photoURL,
          socialId: result.user.uid,
          socialType: "GOOGLE",
          role: "user",
          latitude: lat ? JSON.stringify(lat) : "0",
          longitude: long ? JSON.stringify(long) : "0",
          deviceType: "WEB",
          deviceToken: fcmToken || "WEB!@#$334234",
        };
        dispatch(sociallLoginAction.request(body));
        toast.success("Login Succesfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const signInWithFacebook = () => {
    const fbprovider = new FacebookAuthProvider();
    const fcmToken = getCookie("fcm_token");
    signInWithPopup(auth, fbprovider)
      .then(async (result) => {
        console.log(result, "FACEBOOK", lat, long);
        const body = {
          email: result._tokenResponse.email,
          name: result._tokenResponse.fullName,
          image: result._tokenResponse.photoURL,
          socialId: result.user.uid,
          socialType: "FACEBOOK",
          role: "user",
          latitude: lat ? JSON.stringify(lat) : "0",
          longitude: long ? JSON.stringify(long) : "0",
          deviceType: "WEB",
          deviceToken: fcmToken || "WEB!@#$334234",
        };
        dispatch(sociallLoginAction.request(body));
        toast.success("Login Succesfully");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  /* Location */
  useEffect(() => {
    getUserCoordinates();
  }, []);

  const getUserCoordinates = () => {
    if (!navigator.geolocation) {
      setError("Geolocation API is not available in your browser!");
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log(position, "login positionnnnn");
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

  return (
    <Box component="main" className="login_wpr">
      <Box className="wrapper">
        {/* <Loader /> */}
        <Box className="twoColumn">
          <Box className="twoColumn_itemOne">
            <AuthLeftComponent
              heading="Welcome Back"
              subHeading={
                "Please enter your" +
                (isEmail ? " Email " : " Phone number ") +
                "to continue"
              }
              isEmail={isEmail}
              setisEmail={setisEmail}
            />
            <form className="form_input" onSubmit={formik.handleSubmit}>
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
                <Box sx={{ mb: 2 }} style={{}} className="input_field">
                  {/* <MuiPhoneNumber
                    className="ph_input "
                    name="phone"
                    dropdownClass="drop_down"
                    defaultCountry={countryName}
                    value={phone}
                    error={Boolean(error && phone?.length < 10)}
                    helperText={
                      error && phone?.length < 10
                        ? "Enter valid phone number"
                        : ""
                    }
                    autoFormat={false}
                    onChange={handlePhoneChange}
                  /> */}

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
                  placeholder="password"
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
              <Box className="rmbr_chk_wpr">
                <Box className="rmbr_chk">
                  {/* <Checkbox
                    checked={formik.values.remember}
                    name="remember"
                    onChange={formik.handleChange}
                  /> */}
                  <Checkbox
                    checked={formik.values.remember}
                    name="remember"
                    onChange={formik.handleChange}
                    onClick={() => {
                      handleRemember(formik.values.remember);
                    }}
                  />
                  <Typography
                    className="rem"
                    sx={{ mx: "auto", width: 200 }}
                    // onClick={() => router.push("/forget")}
                  >
                    Remember Me
                  </Typography>
                </Box>
                <Typography
                  className="forgot"
                  onClick={() => {
                    dispatch(tempData.updateTempData({ isEmail: isEmail }));
                    dispatch(modalVisible.modalOpen(Modules.FORGOT_PASSWORD));
                  }}
                >
                  Forgot Password ?
                </Typography>
              </Box>
              <Box className="btm">
                <LoadingButton
                  type="submit"
                  // disabled={formik.isSubmitting}
                  variant="contained"
                  className="fluid_btn"
                  onClick={() => {
                    setError(true);
                  }}
                >
                  Login
                </LoadingButton>
                {/* <p className="sprtr_txt">Continue with social media</p> */}
                <Divider style={{ opacity: 0.5 }}>
                  Continue with social media
                </Divider>
              </Box>
            </form>
            <Box className="social_tabs_wpr" sx={{ mt: 4 }}>
              <ul className="social_tabs">
                <li className="social_tab_item" onClick={signInWithFacebook}>
                  <a>
                    <img src="/static/images/facebook.png" alt="facebook" />
                    <p>Facebook</p>
                  </a>
                </li>
                {/* <li className="social_tab_item">
                  <a href="https://www.icloud.com/">
                    <img src="/static/images/apple.png" alt="apple" />
                    <p>Apple</p>
                  </a>
                </li> */}
                <li className="social_tab_item" onClick={signInWithGoogle}>
                  <a>
                    <img src="/static/images/google.png" alt="google" />
                    <p>Google</p>
                  </a>
                </li>
              </ul>

              <p className="signup_link">
                Don't have an account ?
                <Box
                  variant="text"
                  onClick={() => {
                    dispatch(modalVisible.modalClose());
                    dispatch(modalVisible.modalOpen(Modules.SIGNUP));
                    // router.push("/signup");
                  }}
                >
                  <Typography>Sign up</Typography>
                </Box>
              </p>
            </Box>
          </Box>
          <Box className="twoColumn_itemTwo">
            <AuthRightComponent images={"/static/images/loginImg.png"} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default LoginCompo;
