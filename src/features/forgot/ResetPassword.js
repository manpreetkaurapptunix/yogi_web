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
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { useDispatch, useSelector } from "react-redux";
import {
  forgotPasswordAction,
  resetPasswordAction,
  tempData,
} from "../../redux/actions";

const ResetPassword = (props) => {
  const { setstep } = props;
  const router = useRouter();
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const tempData = useSelector((state) => state.commonReducer.tempData);

  // useEffect(() => {
  //   if (router.isReady) {
  //     if (!tempData?.token) {
  //       router.back();
  //     }
  //   }
  // }, [tempData]);

  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleClickShowConfirmPassword = () => {
    setShowConfirmPassword(!showConfirmPassword);
  };

  const formik = useFormik({
    initialValues: {
      password: "",
      confirmPassowrd: "",
    },
    validationSchema: Yup.object({
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

      let body = {
        password: formik.values.password,
      };
      console.log(body);
      dispatch(resetPasswordAction.request(body, tempData.token));

      formik.setSubmitting(false);
    },
  });

  return (
    <Box className="twoColumn_itemOne">
      <AuthLeftComponent
        heading="Reset Password"
        subHeading={"Enter the valid password to reset your password."}
        verify
      />
      <form className="form_input" onSubmit={formik.handleSubmit}>
        <Box className="input_field">
          <TextField
            className="line_form pwd_type"
            placeholder="Password"
            error={Boolean(formik.touched.password && formik.errors.password)}
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
              formik.touched.confirmPassword && formik.errors.confirmPassword
            )}
            fullWidth
            helperText={
              formik.touched.confirmPassword && formik.errors.confirmPassword
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
                    {!showConfirmPassword ? <VisibilityOff /> : <Visibility />}
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
            Next
          </LoadingButton>
        </Box>
      </form>
    </Box>
  );
};

export default ResetPassword;
