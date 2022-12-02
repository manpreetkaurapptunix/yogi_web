import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Box, TextField } from "@mui/material";
import { LoadingButton } from "@mui/lab";
import { createReportAction } from "../../redux/actions";
import { useDispatch } from "react-redux";

const Report = (props) => {
  const { setreport, data } = props;
  const dispatch = useDispatch();
  const [error, setError] = useState(false);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      desc: "",
    },
    validationSchema: Yup.object({
      desc: Yup.string().required("This field is required"),
    }),
    onSubmit: async () => {
      formik.setSubmitting(true);
      setError(true);

      let payload = {
        bookingId: data?._id,
        desc: formik.values.desc,
      };

      console.log("bpdyyyyy", payload);
      dispatch(createReportAction.request(payload));
      setreport(false);
      setError(false);
      formik.setSubmitting(false);
    },
  });

  return (
    <Box className="report_contain">
      <form className="form_input" onSubmit={formik.handleSubmit}>
        <Box className="input_field">
          <TextField
            type="text"
            className="line_form"
            placeholder="Description"
            error={Boolean(formik.touched.desc && formik.errors.desc)}
            fullWidth
            helperText={formik.touched.desc && formik.errors.desc}
            margin="none"
            name="desc"
            multiline
            maxRows={5}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.desc}
            variant="standard"
          />
        </Box>
        <Box className="btm">
          <LoadingButton
            type="submit"
            disabled={formik.isSubmitting}
            variant="contained"
            className="fluid_btn"
            onClick={() => {
              setError(true);
            }}
          >
            Submit
          </LoadingButton>
        </Box>
      </form>
    </Box>
  );
};

export default Report;
