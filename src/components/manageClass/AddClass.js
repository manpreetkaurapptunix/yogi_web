import { Box, Button, Grid, TextField, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { LoadingButton } from "@mui/lab";
import FormControl from "@mui/material/FormControl";
import { InputLabel, MenuItem, Select } from "@mui/material";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { DatePicker } from "@mui/x-date-pickers";
import Image from "next/image";
import { isString } from "../../utils/validations";
import { useDispatch, useSelector } from "react-redux";
import {
  getCategoryAction,
  imageUploadAction,
  tempData,
} from "../../redux/actions";
import AddIcon from "@mui/icons-material/Add";
import CloseIcon from "@mui/icons-material/Close";
import { toast } from "react-toastify";
import isBetween from "dayjs/plugin/isBetween";
import dayjs from "dayjs";

dayjs.extend(isBetween);

const AddClass = (props) => {
  const { setsteps } = props;
  const dispatch = useDispatch();
  const [classCategory, setclassCategory] = useState("");
  const [startTime, setstartTime] = useState(null);
  const [endTime, setendTime] = useState(null);
  const [startDate, setstartDate] = useState(null);
  const [endDate, setendDate] = useState(null);
  const [image, setImage] = useState([]);
  const [error, setError] = useState(false);
  const [timeArray, settimeArray] = useState([]);

  const today = new Date();
  // to return the date number(1-31) for the specified date

  let tomorrow = new Date();

  let count = 0;

  const imageData = useSelector((state) => state.commonReducer.tempData);
  const catData = useSelector((state) => state.classReducer.categoryData);
  const userData = useSelector((state) => state.authReducer.userData);

  useEffect(() => {
    const img = imageData?.uploadImage;

    if (img) {
      setImage(img);
    }
  }, [imageData]);

  useEffect(() => {
    let params = {
      page: 1,
      limit: 20,
    };

    dispatch(getCategoryAction.request(params));
    dispatch(tempData.updateTempData({ uploadImage: null }));
  }, [dispatch]);

  // const uploadImage = (val) => {
  //   const files = val.target;
  //   const file = files?.files[0];
  //   const formData = new FormData();
  //   formData.append("image", file);
  //   image.push(...file);
  //   console.log(image, "file?>>>>>>>>><<<<<<<<<");
  //   dispatch(imageUploadAction.request(formData));
  // };

  const uploadImage = async (val) => {
    const files = val.target;

    const file = files?.files[0];
    const formData = new FormData();
    formData.append("image", file);
    dispatch(imageUploadAction.request(formData));
    // setImage([...image, imageData.profileComp]);
  };

  useEffect(() => {
    if (imageData?.uploadImage) {
      image.unshift(imageData?.uploadImage);
      setImage([...image]);
      dispatch(tempData.updateTempData({ uploadImage: null }));
    }
  }, [imageData]);

  const addData = () => {
    if (!startTime || !endTime) {
      return setError(true);
    } else {
      timeArray.push({
        start_time: new Date(startTime).toISOString(),
        end_time: new Date(endTime).toISOString(),
      });
      settimeArray([...timeArray]);
      setstartTime(null);
      setendTime(null);
    }
  };

  const deleteSlot = (index) => {
    let arr1 = [];
    arr1.push(...timeArray.slice(0, index), ...timeArray.slice(index + 1));
    settimeArray([...arr1]);
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      totalSeats: "",
      pricePerHead: "",
      className: "",
      classDesc: "",
      cancellation: userData?.cancelationPolicy || "",
    },
    validationSchema: Yup.object({
      totalSeats: Yup.string().required("Must be required"),
      pricePerHead: Yup.string().required("price Per Head is required"),
      className: Yup.string().required("Class Name is required"),
      classDesc: Yup.string().required("Class Description is required"),
      // cancellation: Yup.string().required("Class Name is required"),
    }),
    onSubmit: async () => {
      formik.setSubmitting(true);
      setError(true);

      if (
        !classCategory.length ||
        // !startTime ||
        // !endTime ||
        !image ||
        !startDate ||
        !endDate
      ) {
        return;
      } else if (!startTime && !endTime && timeArray?.length == 0) {
        return;
      } else {
        if (startTime && endTime) {
          timeArray.push({
            start_time: new Date(startTime).toISOString(),
            end_time: new Date(endTime).toISOString(),
          });
          settimeArray([...timeArray]);
        }
      }
      // settimeArray

      let body = {
        image,
        className: formik.values.className,
        classCategory,
        pricePerHead: formik.values.pricePerHead,
        timeArray,
        startDate: new Date(startDate).toISOString(),
        endDate: new Date(endDate).toISOString(),
        totalSeats: formik.values.totalSeats,
        classDesc: formik.values.classDesc,
        cancellation: formik.values.cancellation,
      };

      dispatch(tempData.updateTempData({ classData: body }));
      dispatch(tempData.updateTempData({ uploadImage: null }));
      setsteps(1);

      setError(false);
      formik.setSubmitting(false);
    },
  });

  const handleChange = (event) => {
    setclassCategory(event.target.value);
  };

  const removeImage = async (item) => {
    if (image.includes(item)) {
      let arr = [];
      arr = image.filter((name) => name !== item);
      setImage(arr);
    }
  };

  return (
    <Box className="ad_cls_mn">
      <Box className="new_cls ">
        <h3 align="center">Add New Class</h3>
      </Box>
      <Box>
        <form className="form_input" onSubmit={formik.handleSubmit}>
          <Box className="input_field">
            <Box className="upload_class">
              {image && image?.length < 5 && (
                <Box
                  className={
                    image && image.length
                      ? "img_upload_cls mx-0"
                      : "img_upload_cls"
                  }
                >
                  <Image
                    width={"200px"}
                    height={"200px"}
                    src={"/static/images/addClass.png"}
                    alt=""
                  />
                  <label htmlFor="icon-button-file">
                    <TextField
                      inputProps={{
                        accept: "image/jpeg, image/jpg, image/png",
                      }}
                      id="icon-button-file"
                      type="file"
                      sx={{ display: "none" }}
                      onChange={(val) => {
                        // if (val?.target?.files[0]?.type.includes("image")) {
                        //   setImage(URL.createObjectURL(val.target.files[0]));
                        //   console.log(val.target.files[0], "kjdnj");
                        // }
                        uploadImage(val);
                      }}
                    />
                  </label>
                </Box>
              )}

              {image && image.length ? (
                <>
                  {image &&
                    image?.map((item, i) => {
                      return (
                        <Box key={i} className="img_upload_cls mx-0">
                          <Image
                            width={"200px"}
                            height={"200px"}
                            src={item}
                            alt=""
                          />
                          <span
                            onClick={() => removeImage(item)}
                            className="modalClose"
                          >
                            <CloseIcon />
                          </span>
                        </Box>
                      );
                    })}
                </>
              ) : (
                ""
              )}

              {!image && error ? (
                <label className="compul_s">This field is compulsory</label>
              ) : (
                ""
              )}
            </Box>
          </Box>

          <Box className="input_field">
            <Typography className="fw-bold" sx={{ marginBottom: "5px" }}>
              Class Name
            </Typography>
            <TextField
              type="text"
              className="line_form"
              placeholder="Class Name"
              error={Boolean(
                formik.touched.className && formik.errors.className
              )}
              fullWidth
              helperText={formik.touched.className && formik.errors.className}
              margin="none"
              name="className"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.className}
              variant="standard"
            />
          </Box>
          <Typography className="fw-bold" sx={{ marginBottom: "5px" }}>
            Class Category
          </Typography>
          <FormControl fullWidth className="select_btn outer_label">
            <InputLabel id="demo-simple-select-label">
              Class Category
            </InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={classCategory}
              label="Customer"
              onChange={handleChange}
            >
              {catData?.data?.map((item, index) => {
                return (
                  <MenuItem key={index} value={item?._id}>
                    {item?.name}
                  </MenuItem>
                );
              })}
              {/* <MenuItem value={"Customer"}>Category 1</MenuItem> */}
              {/* <MenuItem value={"Instructor"}>Category 2</MenuItem> */}
            </Select>
            {!classCategory?.length && error ? (
              <label className="compul_s">This field is required</label>
            ) : (
              ""
            )}
          </FormControl>

          <Box className="input_field">
            <Typography className="fw-bold" sx={{ marginBottom: "5px" }}>
              Price per head
            </Typography>
            <TextField
              type="number"
              className="line_form"
              placeholder="Price per head"
              error={Boolean(
                formik.touched.pricePerHead && formik.errors.pricePerHead
              )}
              fullWidth
              helperText={
                formik.touched.pricePerHead && formik.errors.pricePerHead
              }
              margin="none"
              name="pricePerHead"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.pricePerHead}
              variant="standard"
            />
          </Box>

          <Box className="input_field tw_bx dt_mn">
            <Box className="strt_dt">
              <Typography className="fw-bold" sx={{ marginBottom: "5px" }}>
                Start Date
              </Typography>
              <Box className="time_bx">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={startDate || null}
                    onChange={(date) => {
                      setstartDate(date);
                    }}
                    className="date_picker"
                    minDate={tomorrow?.setDate(today.getDate() + 1)}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        variant="standard"
                        inputProps={{
                          ...params.inputProps,
                          placeholder: "Start Date",
                          readOnly: true,
                        }}
                        error={Boolean(error && !startDate)}
                        helperText={
                          error && !startDate ? "This field is compulsory" : ""
                        }
                      />
                    )}
                  />
                </LocalizationProvider>
              </Box>
            </Box>
            <Box className="strt_dt">
              <Typography className="fw-bold" sx={{ marginBottom: "5px" }}>
                End Date
              </Typography>
              <Box className="time_bx">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DatePicker
                    value={endDate || null}
                    onChange={(date) => {
                      setendDate(date);
                      // if (
                      //   new Date(startDate).toISOString() <=
                      //   new Date(date).toISOString()
                      // ) {
                      //   setendDate(date);
                      // } else {
                      //   toast.error(
                      //     "End Date should be greater than start date"
                      //   );
                      // }
                    }}
                    className="date_picker"
                    minDate={startDate}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        fullWidth
                        variant="standard"
                        inputProps={{
                          ...params.inputProps,
                          placeholder: "End Date",
                          readOnly: true,
                        }}
                        error={Boolean(error && !endDate)}
                        helperText={
                          error && !endDate ? "This field is compulsory" : ""
                        }
                      />
                    )}
                  />
                </LocalizationProvider>
              </Box>
            </Box>
          </Box>

          {timeArray?.map((item, index) => {
            return (
              <Box key={index} className="input_field dt_mn twoInput">
                <Box className="strt_dt">
                  <Typography className="fw-bold" sx={{ marginBottom: "5px" }}>
                    Start Time
                  </Typography>
                  <Box className="time_bx tm_fl">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        label="Start Time"
                        value={item.start_time || ""}
                        onChange={(newValue) => {
                          setstartTime(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </Box>
                </Box>
                <Box className="strt_dt">
                  <Typography className="fw-bold" sx={{ marginBottom: "5px" }}>
                    End Time
                  </Typography>
                  <Box className="time_bx">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <TimePicker
                        label="End Time"
                        value={item.end_time || ""}
                        onChange={(newValue) => {
                          setendTime(newValue);
                        }}
                        renderInput={(params) => <TextField {...params} />}
                      />
                    </LocalizationProvider>
                  </Box>
                </Box>
                <Button onClick={() => deleteSlot(index)} className="more">
                  <CloseIcon className="ad_icn" />
                </Button>
              </Box>
            );
          })}

          <Box className="input_field twoInput dt_mn">
            <Box className="strt_dt">
              <Typography className="fw-bold" sx={{ marginBottom: "5px" }}>
                Start Time
              </Typography>
              <Box className="time_bx">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    label="Start Time"
                    value={startTime}
                    onChange={(newValue) => {
                      if (timeArray.length) {
                        timeArray.forEach((ele) => {
                          if (
                            dayjs(newValue).isBetween(
                              ele.start_time,
                              dayjs(ele.end_time)
                            )
                          ) {
                            toast.error("You already select this time slot");
                            return;
                          } else {
                            count = count + 1;
                          }
                          if (count == timeArray?.length) {
                            setstartTime(newValue);
                            setendTime(null);
                          }
                        });
                      } else {
                        setstartTime(newValue);
                        setendTime(null);
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        inputProps={{
                          ...params.inputProps,
                          placeholder: "Start Time",
                          readOnly: true,
                        }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Box>

              {!startTime && timeArray?.length == 0 && error ? (
                <label className="compul_s">This field is required</label>
              ) : (
                ""
              )}
            </Box>
            <Box className="strt_dt">
              <Typography className="fw-bold" sx={{ marginBottom: "5px" }}>
                End Time
              </Typography>
              <Box className="time_bx">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <TimePicker
                    label="End Time"
                    value={endTime}
                    minTime={startTime}
                    disabled={startTime ? false : true}
                    onChange={(newValue) => {
                      if (newValue?.diff(startTime, "minutes") >= 59) {
                        if (timeArray.length) {
                          timeArray.forEach((ele) => {
                            if (
                              dayjs(newValue)?.isBetween(
                                ele?.start_time,
                                dayjs(ele?.end_time)
                              )
                            ) {
                              toast.error("You already select this time slot");
                              return;
                            } else {
                              count = count + 1;
                            }
                            if (count == timeArray?.length) {
                              setendTime(newValue);
                            } else {
                              setendTime(null);
                            }
                          });
                        } else {
                          setendTime(newValue);
                        }
                      } else {
                        toast.error(
                          "Differnce between start time and end time should be greater than 1 hour"
                        );
                      }
                    }}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        inputProps={{
                          ...params.inputProps,
                          placeholder: "End Time",
                          readOnly: true,
                        }}
                      />
                    )}
                  />
                </LocalizationProvider>
              </Box>
              {!endTime && timeArray?.length == 0 && error ? (
                <label className="compul_s">This field is required</label>
              ) : (
                ""
              )}
            </Box>
            {/* <AddIcon  className="ad_icn" /> */}
            <Button
              disabled={!startTime || !endTime}
              onClick={addData}
              className="more"
            >
              <AddIcon className="ad_icn" />
              {/* <span>Add More</span> */}
            </Button>
          </Box>

          <Box className="input_field">
            <Typography className="fw-bold" sx={{ marginBottom: "5px" }}>
              Total seats
            </Typography>
            <TextField
              type="number"
              className="line_form"
              placeholder="Total seats"
              error={Boolean(
                formik.touched.totalSeats && formik.errors.totalSeats
              )}
              fullWidth
              helperText={formik.touched.totalSeats && formik.errors.totalSeats}
              margin="none"
              name="totalSeats"
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.totalSeats}
              variant="standard"
            />
          </Box>

          <Box className="input_field">
            <Typography className="fw-bold" sx={{ marginBottom: "5px" }}>
              Class Description
            </Typography>
            <TextField
              type="text"
              className="line_form"
              placeholder="Class Description"
              error={Boolean(
                formik.touched.classDesc && formik.errors.classDesc
              )}
              fullWidth
              helperText={formik.touched.classDesc && formik.errors.classDesc}
              margin="none"
              name="classDesc"
              multiline
              maxRows={5}
              onBlur={formik.handleBlur}
              onChange={formik.handleChange}
              value={formik.values.classDesc}
              variant="standard"
            />
          </Box>

          <Box className="input_field">
            <Typography className="fw-bold" sx={{ marginBottom: "5px" }}>
              Cancelation Policy
            </Typography>
            <TextField
              type="text"
              className="line_form"
              placeholder="Cancelation Policy"
              error={Boolean(
                formik.touched.cancellation && formik.errors.cancellation
              )}
              fullWidth
              helperText={
                formik.touched.cancellation && formik.errors.cancellation
              }
              margin="none"
              name="cancellation"
              onBlur={formik.handleBlur}
              multiline
              maxRows={5}
              onChange={formik.handleChange}
              value={formik.values.cancellation}
              variant="standard"
              disabled
            />
          </Box>

          <Box className="btm">
            {/* <LoadingButton
              type="submit"
              disabled={formik.isSubmitting}
              variant="contained"
              className="fluid_btn"
              onClick={() => setError(true)}
            >
              Next
            </LoadingButton> */}
            <LoadingButton
              type="submit"
              // loading={formik.isSubmitting}
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
    </Box>
  );
};

export default AddClass;
