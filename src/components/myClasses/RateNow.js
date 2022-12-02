import { Box, TextField } from "@mui/material";
import React, { useState } from "react";
import ReactStars from "react-stars";
import { useFormik } from "formik";
import * as Yup from "yup";
import { LoadingButton } from "@mui/lab";
import { useDispatch } from "react-redux";
import { addRatingAction } from "../../redux/actions";

const RateNow = (props) => {
  const { setrateNow, data } = props;
  const dispatch = useDispatch();

  const [ratingCount, setratingCount] = useState("");
  const [error, setError] = useState(false);

  const ratingChanged = (newRating) => {
    console.log(newRating);
    setratingCount(newRating);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      classRemark: "",
      instructorRemark: "",
    },
    validationSchema: Yup.object({
      classRemark: Yup.string().required("Class Remark is required"),
      instructorRemark: Yup.string().required("Instructor Remark is required"),
    }),
    onSubmit: async () => {
      formik.setSubmitting(true);
      setError(true);

      if (!ratingCount) {
        return;
      }

      const body = {
        type: "PAST",
        page: 1,
        size: 20,
      };

      let payload = {
        bookingId: data?._id,
        classRemarks: formik.values.classRemark,
        rating: ratingCount,
        instructorRemarks: formik.values.instructorRemark,
      };

      console.log("bpdyyyyy", payload);
      dispatch(addRatingAction.request(payload, body));
      setrateNow(false);
      setError(false);
      formik.setSubmitting(false);
    },
  });

  return (
    <Box className="rateNow_contain">
      <ReactStars
        count={5}
        onChange={ratingChanged}
        size={24}
        color2={"#ffd700"}
        value={ratingCount}
      />
      {!ratingCount && error ? (
        <label className="compul_s">This field is required</label>
      ) : (
        ""
      )}
      <form className="form_input" onSubmit={formik.handleSubmit}>
        <Box className="input_field">
          <TextField
            type="text"
            className="line_form"
            placeholder="Class Remark"
            error={Boolean(
              formik.touched.classRemark && formik.errors.classRemark
            )}
            fullWidth
            helperText={formik.touched.classRemark && formik.errors.classRemark}
            margin="none"
            name="classRemark"
            multiline
            maxRows={5}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.classRemark}
            variant="standard"
          />
        </Box>
        <Box className="input_field">
          <TextField
            type="text"
            className="line_form"
            placeholder="Instructor Remark"
            error={Boolean(
              formik.touched.instructorRemark && formik.errors.instructorRemark
            )}
            fullWidth
            helperText={
              formik.touched.instructorRemark && formik.errors.instructorRemark
            }
            margin="none"
            name="instructorRemark"
            multiline
            maxRows={5}
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.instructorRemark}
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

export default RateNow;
