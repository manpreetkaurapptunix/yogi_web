import { Box, TextField, Button, Typography } from "@mui/material";
import Image from "next/image";
import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import { LoadingButton } from "@mui/lab";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useFormik } from "formik";
import * as Yup from "yup";
import { isString } from "../../utils/validations";
import { useDispatch, useSelector } from "react-redux";
import {
  createClassAction,
  imageUploadAction,
  tempData,
} from "../../redux/actions";
import CloseIcon from "@mui/icons-material/Close";

const AboutInstructor = (props) => {
  const { setsteps } = props;
  const dispatch = useDispatch();
  const [exerciseName, setExerciseName] = useState("");
  const [exerciseDesc, setExerciseDesc] = useState("");
  const [exerciseImg, setExerciseImg] = useState("");
  const [error, setError] = useState("");
  const [datalist, setDatalist] = useState([]);

  const [name, setName] = useState("");
  const [desc, setDesc] = useState("");
  const [exercise, setExercise] = useState([]);
  const [image, setImage] = useState("");
  const [exerciseImgUri, setExerciseImgUri] = useState("");

  const { classData } = useSelector((state) => state.commonReducer.tempData);
  const imageData = useSelector((state) => state.commonReducer.tempData);

  useEffect(() => {
    const img = imageData?.uploadImage;

    if (img) {
      setExerciseImg(img);
      setImage(img);
    }
  }, [imageData]);

  const removeItem = (index) => {
    let arr1 = [];
    arr1.push(...exercise.slice(0, index), ...exercise.slice(index + 1));
    setExercise([...arr1]);
  };

  // const addData = () => {
  //   if (!exerciseName || !exerciseDesc || !exerciseImg) {
  //     return setError(true);
  //   } else {
  //     datalist.push({
  //       name: exerciseName,
  //       desc: exerciseDesc,
  //       image: exerciseImg,
  //     });
  //     setDatalist([...datalist]);
  //     setExerciseName("");
  //     setExerciseImg("");
  //     setExerciseDesc("");
  //     dispatch(tempData.updateTempData({ uploadImage: null }));
  //   }
  // };

  const uploadImage = (val) => {
    const files = val.target;
    const file = files?.files[0];
    const formData = new FormData();
    formData.append("image", file);
    dispatch(imageUploadAction.request(formData));
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      about: "",
    },
    validationSchema: Yup.object({
      about: Yup.string().required("Must be required"),
    }),
    onSubmit: async () => {
      formik.setSubmitting(true);
      setError(true);

      if (name || desc || image) {
        setExerciseImgUri("");
        exercise.push({
          name: name,
          image: image,
          desc: desc,
        });
        setExercise([...exercise]);
        setName(""), setImage(""), setDesc("");
      }

      // if (!exerciseName || !exerciseDesc || !exerciseImg) {
      //   return;
      // } else {
      //   datalist.push({
      //     name: exerciseName,
      //     desc: exerciseDesc,
      //     image: exerciseImg,
      //   });
      //   setDatalist([...datalist]);
      //   setExerciseName("");
      //   setExerciseImg("");
      //   setExerciseDesc("");
      // }

      let body = {
        name: classData?.className,
        image: classData?.image,
        desc: classData?.classDesc,
        cancel_policy: classData?.cancellation,
        categoryId: classData?.classCategory,
        start_date: classData?.startDate,
        end_date: classData?.endDate,
        time: classData?.timeArray,
        price_per_head: classData?.pricePerHead,
        seats: classData?.totalSeats,
        about: formik.values.about,
        excercises: exercise,
      };

      dispatch(createClassAction.request(body));
      dispatch(tempData.updateTempData({ uploadImage: null }));
      setsteps(0);

      setError(false);
      formik.setSubmitting(false);
    },
  });

  const AddExercise = () => {
    setExerciseImgUri("");
    exercise.push({
      name: name,
      image: image,
      desc: desc,
    });
    setExercise([...exercise]);
    setName(""), setImage(""), setDesc("");
  };

  const deleteItems = (index) => {
    // if (datalist?.length == 1) {
    //   setaddMore(true);
    // }
    let arr = [];
    arr.push(...datalist.slice(0, index), ...datalist.slice(index + 1));
    setDatalist([...arr]);
  };

  return (
    <Box>
      <Box className="new_cls abt_ins_hdng">
        <Box sx={{ mb: 2 }}>
          <Button
            variant="text"
            className="back_btn"
            onClick={() => {
              setsteps(0);
            }}
          >
            <ArrowBackIosIcon width="20px" />{" "}
            <span className="fz-18 text-cap fw-bold">Back</span>
          </Button>
          <h3>About Instructor</h3>
        </Box>
      </Box>
      <form onSubmit={formik.handleSubmit}>
        <Box className="abt_inst p-10">
          <Box className="input_field">
            <TextField
              type="text"
              className="line_form"
              placeholder="About"
              fullWidth
              margin="none"
              name="about"
              multiline
              maxRows={5}
              onBlur={formik.handleBlur}
              error={Boolean(formik.touched.about && formik.errors.about)}
              helperText={formik.touched.about && formik.errors.about}
              onChange={(val) => {
                if (isString(val.target.value)) {
                  formik.handleChange(val);
                }
              }}
              value={formik.values.about}
              variant="standard"
            />
          </Box>

          {exercise?.map((eachItem, index) => {
            return (
              <Box className="exs_bx" key={index}>
                <Button
                  onClick={() => removeItem(index)}
                  className="more dlt_btn"
                >
                  <CloseIcon className="ad_icn" />
                </Button>
                <Box className="input_field">
                  <Typography>Exercise Name</Typography>
                  <TextField
                    type={"text"}
                    name="name"
                    variant="outlined"
                    value={eachItem?.name}
                    onChange={(val) => setName(val.target.value)}
                    placeholder="Exercise Name"
                    margin="normal"
                    sx={{
                      width: "100%",
                    }}
                    className="line_form"
                  />
                </Box>
                <Box className="input_field">
                  <Typography>Description</Typography>

                  <TextField
                    type={"text"}
                    name="name"
                    variant="outlined"
                    value={eachItem?.desc}
                    onChange={(val) => setDesc(val.target.value)}
                    placeholder="Description"
                    margin="normal"
                    multiline
                    rows={5}
                    sx={{
                      width: "100%",
                    }}
                    className="line_form p-0"
                  />
                </Box>
                <Box className="input_field">
                  <Box className="upload_class">
                    <Box className="img_upload_cls">
                      <Image
                        width={"200px"}
                        height={"200px"}
                        src={eachItem?.image || "/static/images/addClass.png"}
                        alt=""
                      />
                      <label htmlFor="icon-button-file-aray">
                        <TextField
                          inputProps={{
                            accept: "image/jpeg, image/jpg, image/png",
                          }}
                          id="icon-button-file-aray"
                          type="file"
                          sx={{ display: "none" }}
                          // onChange={(val) => {
                          //   uploadImage(val);
                          // }}
                        />
                      </label>
                    </Box>
                  </Box>
                </Box>

                <Box
                  sx={{
                    marginTop: "20px",
                    textAlign: "right",
                    width: "100%",
                  }}
                ></Box>
              </Box>
            );
          })}
          <Box className="input_field">
            <TextField
              type={"text"}
              name="name"
              variant="outlined"
              value={name}
              onChange={(val) => setName(val.target.value)}
              placeholder="Exercise Name "
              margin="normal"
              sx={{
                width: "100%",
              }}
              className="line_form"
            />
          </Box>

          <Box className="img_upload_cls">
            <Image
              width={"200px"}
              height={"200px"}
              src={image || "/static/images/addClass.png"}
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
                  // setExerciseImgUri(URL.createObjectURL(val.target.files[0]));

                  uploadImage(val);
                }}
              />
            </label>
          </Box>
          <Box className="img_upload_cls">
            <TextField
              multiline
              rows={6}
              type={"text"}
              name="name"
              variant="outlined"
              value={desc}
              onChange={(val) => setDesc(val.target.value)}
              placeholder="Description"
              margin="normal"
              sx={{
                width: "100%",
              }}
              className="line_form"
            />
          </Box>

          <Box className="ad_mr">
            <Button
              disabled={!name.length || !desc.length || !image}
              onClick={AddExercise}
              className="more"
            >
              <AddIcon className="ad_icn" />
              <span>Add More</span>
            </Button>
          </Box>

          <Box className="btm">
            <LoadingButton
              type="submit"
              variant="contained"
              disabled={formik.isSubmitting}
              className="fluid_btn"
              onClick={() => setError(true)}
            >
              Submit
            </LoadingButton>
          </Box>
        </Box>
      </form>
    </Box>
  );
};

export default AboutInstructor;
