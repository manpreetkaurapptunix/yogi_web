/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unescaped-entities */
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
import Checkbox from "@mui/material/Checkbox";
import { useDispatch, useSelector } from "react-redux";
import {
  modalVisible,
  resetAuth,
  loginAction,
  forgotPasswordAction,
} from "../../redux/actions";
import { getCookie, setCookie } from "cookies-next";
import Divider from "@mui/material/Divider";
import { Modules } from "../../constants/modules";
import ForgotPassword from "../../features/forgot/ForgotPassword";
import ForgotOtpVerify from "../../features/forgot/ForgotOtpVerify";
import ResetPassword from "../../features/forgot/ResetPassword";

const Forgot = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [isEmail, setisEmail] = useState(true);
  const [step, setstep] = useState(0);
  const [phone, setPhone] = useState("");
  const [phoneCode, setPhoneCode] = useState("91");
  const [countryName, setCountryName] = useState("in");
  const [error, setError] = useState(false);

  const handlePhoneChange = (rawValue, countryData) => {
    setCountryName(countryData?.countryCode);
    setPhone(rawValue.split(`+${phoneCode}`).join(""));
    setPhoneCode(countryData?.dialCode);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object({
      // email: Yup.string()
      //   .email("Must be a valid email")
      //   .max(25)
      //   .required("Email is required"),
      email: Yup.string().when("isEmail", {
        is: (val) => isEmail,
        then: Yup.string()
          .email("Must be a valid email")
          .max(25)
          .required("Email is required"),
      }),
      remember: Yup.boolean(),
    }),
    onSubmit: async () => {
      formik.setSubmitting(true);
      setError(true);

      if (!isEmail && phone.length < 10) {
        return;
      }

      let body = {
        key: isEmail ? formik.values.email : phone,
        countryCode: isEmail ? "" : phoneCode,
      };

      dispatch(forgotPasswordAction.request(body));

      setError(false);
      formik.setSubmitting(false);
    },
  });

  return (
    <Box component="main" className="login_wpr">
      <Box className="wrapper">
        <Box className="twoColumn">
          {step == 0 ? (
            <ForgotPassword setstep={setstep} />
          ) : step == 1 ? (
            <ForgotOtpVerify setstep={setstep} />
          ) : (
            <ResetPassword setstep={setstep} />
          )}
          <Box className="twoColumn_itemTwo">
            <AuthRightComponent images={"/static/images/loginImg.png"} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Forgot;
