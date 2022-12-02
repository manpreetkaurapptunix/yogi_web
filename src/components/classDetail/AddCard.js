import React, { useState } from "react";
import { Box, Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import { isNumber, isString } from "../../utils/validations";

export const AddCard = () => {
  const [val, setVal] = useState("");

  const formik = useFormik({
    initialValues: {
      cardNumber: "",
      cardHolderName: "",
      cvv: "",
      expiryDate: "",
    },
    validationSchema: Yup.object({
      cardNumber: Yup.string().label("Card number").max(16).required(),
      cvv: Yup.string().label("CVC").min(3).max(4).required(),
      cardHolderName: Yup.string().label("Name on card").required(),
      expiryDate: Yup.string()
        .typeError("Not a valid expiration date. Example: MM/YY")
        .max(5, "Not a valid expiration date. Example: MM/YY")
        .matches(
          /([0-9]{2})\/([0-9]{2})/,
          "Not a valid expiration date. Example: MM/YY"
        )
        .required("Expiration date is required"),
    }),
    onSubmit: async () => {
      formik.setSubmitting(true);

      setTimeout(() => {
        formik.setSubmitting(false);
      }, 3000);
    },
  });
  /* Card number */
  const onChange = (e) => {
    setVal(e.target.value);
  };

  function cc_format(value) {
    const v = value
      .replace(/\s+/g, "")
      .replace(/[^0-9]/gi, "")
      .substr(0, 16);
    const parts = [];

    for (let i = 0; i < v.length; i += 4) {
      parts.push(v.substr(i, 4));
    }

    return parts.length > 1 ? parts.join(" ") : value;
  }

  /* Expiry Date */
  function formatString(event) {
    var inputChar = String.fromCharCode(event.keyCode);
    var code = event.keyCode;
    var allowedKeys = [8];
    if (allowedKeys.indexOf(code) !== -1) {
      return;
    }

    event.target.value = event.target.value
      .replace(
        /^([1-9]\/|[2-9])$/g,
        "0$1/" // 3 > 03/
      )
      .replace(
        /^(0[1-9]|1[0-2])$/g,
        "$1/" // 11 > 11/
      )
      .replace(
        /^([0-1])([3-9])$/g,
        "0$1/$2" // 13 > 01/3
      )
      .replace(
        /^(0?[1-9]|1[0-2])([0-9]{2})$/g,
        "$1/$2" // 141 > 01/41
      )
      .replace(
        /^([0]+)\/|[0]+$/g,
        "0" // 0/ > 0 and 00 > 0
      )
      .replace(
        /[^\d\/]|^[\/]*$/g,
        "" // To allow only digits and `/`
      )
      .replace(
        /\/\//g,
        "/" // Prevent entering more than 1 `/`
      );
  }

  return (
    <Box className="addcard_cont">
      <h6 className="add_heading">Add Card</h6>
      <Box className="addcard_wrap">
        <form onSubmit={formik.handleSubmit} action="">
          <Box className="input_field">
            <Box className="input-group">
              <Box className="sl_cntnt">
                <Typography>Card Number</Typography>
              </Box>
              <TextField
                type="text"
                id="outlined-basic"
                variant="outlined"
                className="form-control"
                placeholder="Card Number"
                fullWidth
                margin="none"
                name="cardNumber"
                value={cc_format(val)}
                onChange={onChange}
              />
            </Box>

            <Box className="input-group">
              <Box className="sl_cntnt">
                <Typography>Card Holder Name</Typography>
              </Box>
              <TextField
                type="text"
                id="outlined-basic"
                variant="outlined"
                className="form-control"
                placeholder="Card Holder Name"
                value={formik.values.cardHolderName}
                fullWidth
                margin="none"
                name="cardHolderName"
                onBlur={formik.handleBlur}
                onChange={(val) => {
                  if (isString(val.target.value)) {
                    formik.handleChange(val);
                  }
                }}
              />
            </Box>
            <Box className="expiry_cvv">
              <Box className="input-group">
                <Box className="sl_cntnt">
                  <Typography>Expiry Date</Typography>
                </Box>
                <TextField
                  type="text"
                  id="outlined-basic"
                  variant="outlined"
                  className="form-control"
                  placeholder="Expiry Date"
                  fullWidth
                  inputProps={{ maxLength: 5 }}
                  margin="none"
                  name="expiryDate"
                  onChange={(e) => formatString(e)}
                />
              </Box>
              <Box className="input-group">
                <Box className="sl_cntnt">
                  <Typography>CVV</Typography>
                </Box>
                <TextField
                  type="text"
                  id="outlined-basic"
                  variant="outlined"
                  className="form-control"
                  placeholder="CVV"
                  value={formik.values.cvv}
                  inputProps={{ maxLength: 4 }}
                  fullWidth
                  margin="none"
                  name="cvv"
                  onBlur={formik.handleBlur}
                  onChange={(val) => {
                    if (isNumber(val.target.value)) {
                      formik.handleChange(val);
                    }
                  }}
                />
              </Box>
            </Box>
            <Box className="btn_group">
              <Button variant="contained" className="add_btn">
                Save
              </Button>
            </Box>
          </Box>
        </form>
      </Box>
    </Box>
  );
};
