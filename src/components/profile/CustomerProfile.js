import { LoadingButton } from "@mui/lab";
import {
  Box,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { Footer } from "../../layout/Footer";
import Header from "../../layout/Header";
import { isNumber, isString } from "../../utils/validations";
import EditIcon from "@mui/icons-material/Edit";
import { useFormik } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import {
  getProfileAction,
  imageUploadAction,
  updatProfileAction,
} from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { GOOGLE_API_KEY } from "../../constants/urls";
import Autocomplete from "react-google-autocomplete";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";

const CustomerProfile = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [phone, setPhone] = useState("+91");
  const [image, setImage] = useState("");
  const [countryName, setCountryName] = useState("in");
  const [phoneCode, setPhoneCode] = useState("");
  const [flag, setFlag] = useState(false);
  const [error, setError] = useState(false);
  const [autocomplete, setAutocomplete] = useState(null);
  const [coordinates, setCoordinates] = useState({});
  // const getSymbolFromCurrency = require("currency-symbol-map");

  const userProfileData = useSelector((state) => state.authReducer.userData);
  const profileRes = useSelector((state) => state.authReducer.updateProfile);
  const imageData = useSelector((state) => state.commonReducer.uploadImage);

  useEffect(() => {
    const img = imageData;

    if (img) {
      setImage(img);
    }
  }, [imageData]);

  useEffect(() => {
    dispatch(updatProfileAction.success(null));
    setFlag(true);
  }, [dispatch]);

  useEffect(() => {
    if (flag) {
      if (profileRes) {
        router.replace("/");
      }
    }
  }, [profileRes, flag]);

  useEffect(() => {
    if (userProfileData) {
      setPhone(userProfileData.phone);
      setPhoneCode(userProfileData?.callingCode || "91");
      setImage(userProfileData?.image);
      setCountryName(userProfileData?.countryCode || "in");
      setCoordinates({
        lat: userProfileData?.latitude,
        lng: userProfileData?.longitude,
      });
    }
  }, [userProfileData]);

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
      email: userProfileData?.email || "",
      fullName: userProfileData?.name || "",
      // lastName: "",
      address: userProfileData?.address || "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email")
        .max(25)
        .required("Email is required"),
      fullName: Yup.string().required(" Name is required"),
      address: Yup.string().required("Address is required"),
    }),

    onSubmit: async () => {
      formik.setSubmitting(true);
      setError(true);

      if (!phone || !image) {
        return;
      }

      const body = {
        phone: phone.split(`+${phoneCode}`).join(""),
        countryCode: countryName,
        name: formik.values.fullName,
        email: formik.values.email,
        image: image,
        isProfileComplete: true,
        address: formik.values.address,
        role: "user",
        callingCode: phoneCode || "",
        latitude: coordinates?.lat || "0",
        longitude: coordinates?.lng || "0",
        // currencySymbol: getSymbolFromCurrency(currency),
      };

      console.log({ body });
      dispatch(updatProfileAction.request(body));

      setError(false);
      setTimeout(() => {
        formik.setSubmitting(false);
      }, 3000);
    },
  });

  const onLoad = (autocompleteObj) => {
    setAutocomplete(autocompleteObj);
  };

  const onPlaceChanged = async (e, val) => {
    if (autocomplete) {
      var place = await autocomplete.getPlace();
    }
    var place = autocomplete.getPlace();
    formik.setFieldValue("address", place.address_components[0].long_name);
    // setlat(place);
    // setlong(place);
    // console.log(lat, long, "000000-----");
  };

  const onKeypress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      return false;
    }
  };

  const handleChangePhone = (phone, country) => {
    setPhoneCode(country?.dialCode);
    setPhone(phone?.replace(country.dialCode, ""));
    setCountryName(country?.countryCode);
  };

  return (
    <Box className="profile_pag">
      <Box className="cstm_conta_n">
        <Box className="content_conta_in">
          <Box className="sub_hdg">
            <h3 align="center">Profile</h3>
          </Box>
          <form onSubmit={formik.handleSubmit}>
            <Box className="prfl_ctnt">
              <Box className="prfl_ctnt_lft">
                <Box className="upload">
                  <Box className="img_upload">
                    <Image
                      width={"200px"}
                      height={"200px"}
                      src={image || "/static/images/dummy.png"}
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
                          uploadImage(val);
                          // if (val.target.files[0].type.includes("image")) {
                          //   setImage(URL.createObjectURL(val.target.files[0]));
                          // }
                        }}
                      />
                      <EditIcon />
                    </label>
                  </Box>
                  <h4 align="center">{formik.values.fullName || ""}</h4>
                </Box>
                {!image && error ? (
                  <label className="compul_s">This field is compulsory</label>
                ) : (
                  ""
                )}
              </Box>

              <Box className="prfl_ctnt_rgt">
                <Box className="profile_outr">
                  <Box className="edit_name">
                    <Box>
                      <label>Full Name</label>
                      <Box className="input-group">
                        <TextField
                          placeholder="Your Name"
                          type="text"
                          fullWidth
                          margin="none"
                          name="fullName"
                          onBlur={formik.handleBlur}
                          onChange={(val) => {
                            if (isString(val.target.value)) {
                              formik.handleChange(val);
                            }
                          }}
                          value={formik.values.fullName}
                          variant="standard"
                          error={Boolean(
                            formik.touched.fullName && formik.errors.fullName
                          )}
                          helperText={
                            formik.touched.fullName && formik.errors.fullName
                          }
                        />
                      </Box>
                    </Box>
                  </Box>
                  <Box className="edit_name">
                    <Box>
                      <label> Email Address</label>
                      <Box className="input-group">
                        <TextField
                          placeholder="Your Email Address"
                          type="email"
                          error={Boolean(
                            formik.touched.email && formik.errors.email
                          )}
                          fullWidth
                          helperText={
                            formik.touched.email && formik.errors.email
                          }
                          margin="none"
                          name="email"
                          onBlur={formik.handleBlur}
                          onChange={formik.handleChange}
                          value={formik.values.email || ""}
                          variant="standard"
                          disabled={
                            userProfileData?.isEmailVerify ? true : false
                          }
                        />
                      </Box>
                    </Box>
                  </Box>
                  <Box className="edit_name">
                    <label>Phone Number</label>
                    <Box className="input-group  vrfy-ico">
                      <PhoneInput
                        value={phoneCode + phone}
                        enableSearch={true}
                        error={Boolean(error && phone.length < 10)}
                        helperText={
                          error && phone.length < 10
                            ? "Enter valid phone number"
                            : ""
                        }
                        onChange={(phone, country) =>
                          handleChangePhone(phone, country)
                        }
                        disabled={userProfileData?.isPhoneVerify ? true : false}
                        disableCountryCode={
                          userProfileData?.isPhoneVerify ? true : false
                        }
                      />
                      {!phone && error ? (
                        <label className="compul_s error">
                          This field is compulsory
                        </label>
                      ) : (
                        ""
                      )}
                    </Box>
                  </Box>
                  <Box className="edit_name">
                    <label> Address</label>
                    <Box className="input-group">
                      <Autocomplete
                        apiKey={GOOGLE_API_KEY}
                        placeholder="Location"
                        onPlaceSelected={(place) => {
                          // setCountryName(place?.address);
                          formik.setFieldValue(
                            "address",
                            place.formatted_address
                          );
                          var lat = place?.geometry?.location?.lat();
                          // get lng
                          var lng = place?.geometry?.location?.lng();
                          var latLong = {
                            lat: JSON.stringify(lat),
                            lng: JSON.stringify(lng),
                          };

                          setCoordinates(latLong);
                          // setlat(place?.geometry?.location?.lat());
                          // setlong(place?.geometry?.location?.lat());
                        }}
                        id="address"
                        value={formik.values.address}
                        onChange={formik.handleChange}
                        onKeyDown={onKeypress}
                      />
                    </Box>
                  </Box>
                </Box>
                <Box className="btn_wpr">
                  <LoadingButton
                    type="submit"
                    // loading={formik.isSubmitting}
                    disabled={formik.isSubmitting}
                    variant="contained"
                    className="btn-designthree"
                    onClick={() => setError(true)}
                  >
                    Edit
                  </LoadingButton>
                </Box>
              </Box>
            </Box>
          </form>
        </Box>
      </Box>
    </Box>
  );
};

export default CustomerProfile;
