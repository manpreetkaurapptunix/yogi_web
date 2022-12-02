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
import AuthLeftComponent from "../../components/AuthCommon/AuthLeftComponent";
import * as Yup from "yup";
import { LoadingButton } from "@mui/lab";
import { useRouter } from "next/router";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";
import { useDispatch, useSelector } from "react-redux";
import { forgotPasswordAction, tempData } from "../../redux/actions";

const ForgotPassword = (props) => {
  const { setstep } = props;
  const router = useRouter();
  const dispatch = useDispatch();
  const [isEmail, setisEmail] = useState(true);
  const [flag, setFlag] = useState(false);
  const [phone, setPhone] = useState("");
  const [phoneCode, setPhoneCode] = useState("91");
  const [countryName, setCountryName] = useState("in");
  const [error, setError] = useState(false);

  const temporary = useSelector((state) => state.commonReducer.tempData);
  const forgot = useSelector((state) => state.authReducer.forgorRes);

  useEffect(() => {
    if (temporary) {
      setisEmail(temporary.isEmail);
    }
  }, [temporary]);

  useEffect(() => {
    dispatch(forgotPasswordAction.success(null));
    setFlag(true);
  }, [dispatch]);

  useEffect(() => {
    if (flag) {
      if (forgot) {
        setstep(1);
      }
    }
  }, [forgot, flag]);

  const handleChangePhone = (phone, country) => {
    setPhoneCode(country?.dialCode);
    setPhone(phone?.replace(country.dialCode, ""));
    setCountryName(country?.countryCode);
  };

  const formik = useFormik({
    initialValues: {
      email: "",
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
      remember: Yup.boolean(),
    }),
    onSubmit: async () => {
      formik.setSubmitting(true);
      setError(true);

      if (!isEmail && !phone) {
        console.log("hiii");
        return;
      }
      let body = {};

      if (isEmail) {
        body = {
          key: formik.values.email,
        };
      } else {
        body = {
          key: phone,
          countryCode: phoneCode,
        };
      }

      dispatch(tempData.updateTempData({ forgotData: body }));
      dispatch(forgotPasswordAction.request(body));

      // if (forgot?.statusCode == 200) {
      //   setstep(1);
      // }

      setError(false);
      formik.setSubmitting(false);
    },
  });

  return (
    <Box className="twoColumn_itemOne">
      <AuthLeftComponent
        heading="Forgot Password"
        subHeading={
          "Enter the email associated with your account to reset your password."
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
                error && phone?.length < 10 ? "Enter valid phone number" : ""
              }
              autoFormat={false}
              onChange={handlePhoneChange}
            /> */}
            <PhoneInput
              value={phoneCode + phone}
              // className="ph_input "
              name="phone"
              enableSearch={true}
              onChange={(phone, country) => handleChangePhone(phone, country)}
            />
            {!phone && error ? (
              <label className="compul_s">This field is compulsory</label>
            ) : (
              ""
            )}
          </Box>
        )}

        <Box className="btm">
          <LoadingButton
            type="submit"
            disabled={formik.isSubmitting}
            variant="contained"
            className="fluid_btn"
            onClick={() => setError(true)}
          >
            Next
          </LoadingButton>
        </Box>
      </form>
    </Box>
  );
};

export default ForgotPassword;
