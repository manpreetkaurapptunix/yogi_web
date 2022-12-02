import { LoadingButton } from "@mui/lab";
import { Box, Typography, TextField, Button } from "@mui/material";
import { useFormik } from "formik";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import { changePasswordAction } from "../../redux/actions";

const ChangePassword = () => {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      password: "",
      newPassword: "",
      passwordConfirmation: "",
    },
    validationSchema: Yup.object({
      password: Yup.string().max(15).required("Password is requird"),
      newPassword: Yup.string()
        .max(15)
        .required("New Password Field is Requird")
        .matches(
          /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
          "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"
        ),
      passwordConfirmation: Yup.string()
        .oneOf([Yup.ref("newPassword"), null], "Passwords must match")
        .required("Confirm Password Field is Requird"),
    }),
    onSubmit: async () => {
      formik.setSubmitting(true);

      let body = {
        oldPassword: formik.values.password,
        password: formik.values.newPassword,
      };

      dispatch(changePasswordAction.request(body));
      formik.setSubmitting(false);
    },
  });

  return (
    <Box className="changePass_cont">
      <Box>
        <form onSubmit={formik.handleSubmit}>
          <Box className="input-group" sx={{ mb: 3 }}>
            <Box className="sl_cntnt">
              <Typography>Current Password</Typography>
            </Box>
            <TextField
              className="line_form"
              placeholder="**************"
              error={Boolean(formik.touched.password && formik.errors.password)}
              fullWidth
              helperText={formik.touched.password && formik.errors.password}
              // label="Current Password"
              margin="none"
              name="password"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type={"password"}
              value={formik.values.password}
              variant="standard"
            />
          </Box>
          <Box className="input-group" sx={{ mb: 3 }}>
            <Box className="sl_cntnt">
              <Typography>New Password</Typography>
            </Box>
            <TextField
              className="line_form"
              placeholder="**************"
              error={Boolean(
                formik.touched.newPassword && formik.errors.newPassword
              )}
              fullWidth
              helperText={
                formik.touched.newPassword && formik.errors.newPassword
              }
              // label=" New Password"
              margin="none"
              name="newPassword"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type={"password"}
              value={formik.values.newPassword}
              variant="standard"
            />
          </Box>

          <Box className="input-group" sx={{ mb: 3 }}>
            <Box className="sl_cntnt">
              <Typography>Confirm Password</Typography>
            </Box>
            <TextField
              className="line_form"
              placeholder="************"
              error={Boolean(
                formik.touched.passwordConfirmation &&
                  formik.errors.passwordConfirmation
              )}
              fullWidth
              helperText={
                formik.touched.passwordConfirmation &&
                formik.errors.passwordConfirmation
              }
              // label=" Confirm Password"
              margin="none"
              name="passwordConfirmation"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              type={"password"}
              value={formik.values.passwordConfirmation}
              variant="standard"
            />
          </Box>

          <Box c>
            <LoadingButton
              type="submit"
              disabled={formik.isSubmitting}
              variant="contained"
              className="btn-designTwo"
            >
              Change Password
            </LoadingButton>
          </Box>
        </form>
      </Box>
    </Box>
  );
};

export default ChangePassword;
