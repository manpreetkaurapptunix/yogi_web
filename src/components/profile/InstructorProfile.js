import { LoadingButton } from "@mui/lab";
import {
  Box,
  TextField,
  Typography,
  InputAdornment,
  IconButton,
  capitalize,
} from "@mui/material";
import React, { useState, useEffect } from "react";
import { InstructorFooter } from "../../layout/InstructorFooter";
import Header from "../../layout/Header";
import { isNumber, isString } from "../../utils/validations";
import EditIcon from "@mui/icons-material/Edit";
import { useFormik } from "formik";
import * as Yup from "yup";
import Image from "next/image";
import { DatePicker } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import FormControl from "@mui/material/FormControl";
import { InputLabel, MenuItem, Select } from "@mui/material";
import { toast } from "react-toastify";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  addBankDetailAction,
  getProfileAction,
  imageUploadAction,
  updatProfileAction,
} from "../../redux/actions";
import Autocomplete from "react-google-autocomplete";
import { GOOGLE_API_KEY } from "../../constants/urls";
const getSymbolFromCurrency = require("currency-symbol-map");
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/bootstrap.css";

const InstructorProfile = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [phone, setPhone] = useState("+91");
  const [image, setImage] = useState("");
  const [countryName, setCountryName] = useState("in");
  const [phoneCode, setPhoneCode] = useState("+91");
  const [flag, setFlag] = useState(false);
  const [dob, setDob] = useState(null);
  const [gender, setgender] = useState("");
  const [bankName, setBankName] = useState("");
  const [error, setError] = useState(false);
  const [certi, setcerti] = useState("");
  const [identity, setidentity] = useState("");
  const [currency, setCurrency] = useState("INR");
  const [imageType, setimageType] = useState(0);
  const [autocomplete, setAutocomplete] = useState(null);
  const [phoneNo, setPhoneNo] = useState("");
  const [dialCode, setDialCode] = useState("");
  const [coordinates, setCoordinates] = useState({});

  const imageData = useSelector((state) => state.commonReducer.uploadImage);
  const userProfileData = useSelector((state) => state.authReducer.userData);
  const updateProfileData = useSelector(
    (state) => state.authReducer.updateProfile
  );
  const profileRes = useSelector((state) => state.authReducer.updateProfile);
  const bankRes = useSelector((state) => state.authReducer.addBank);
  // addBank

  const bankdetails = [
    { label: "PNB Bank", value: "1" },
    { label: "AXIS Bank", value: "2" },
    { label: "UNION BANK", value: "3" },
  ];

  useEffect(() => {
    const img = imageData;

    if (img) {
      if (imageType == 1) {
        setImage(img);
      } else if (imageType == 2) {
        setcerti(img);
      } else if (imageType == 3) {
        setidentity(img);
      }
    }
  }, [imageData, imageType]);

  useEffect(() => {
    dispatch(updatProfileAction.success(null));
    dispatch(addBankDetailAction.success(null));
    setFlag(true);
  }, [dispatch]);

  useEffect(() => {
    if (flag) {
      if (profileRes && bankRes) {
        dispatch(getProfileAction.request());
        setTimeout(() => {
          router.replace("/");
        }, 2000);
      }
    }
  }, [profileRes, flag, bankRes]);

  useEffect(() => {
    if (userProfileData) {
      setPhone(userProfileData?.phone);
      setPhoneCode(userProfileData?.callingCode || "91");
      setImage(userProfileData?.image);
      setCountryName(userProfileData?.countryCode || "in");
      setDob(userProfileData?.dob);
      setcerti(userProfileData?.doc_certificate);
      setidentity(userProfileData?.document);
      setgender(userProfileData?.gender && capitalize(userProfileData?.gender));
      setCurrency(userProfileData?.currencyCode || "INR");
      setBankName(
        userProfileData?.banks ? userProfileData?.banks[0]?.bankName : ""
      );
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
      cancelplicy: userProfileData?.cancelationPolicy || "",
      schoolName: userProfileData?.schoolName || "",
      area: userProfileData?.address || "",

      accNumber: userProfileData?.banks
        ? `${userProfileData?.banks[0]?.accountNo}`
        : "",

      swiftCode: userProfileData?.banks
        ? userProfileData?.banks[0]?.swiftCode
        : "",
      branchName: userProfileData?.banks
        ? userProfileData?.banks[0]?.branchName
        : "",
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email("Must be a valid email")
        .max(25)
        .required("Email is required"),
      fullName: Yup.string().required("Full Name is required"),
      area: Yup.string().required("Address is required"),
      schoolName: Yup.string().required("School Name is required"),
      cancelplicy: Yup.string().required("Cancelation policy is Required"),
      accNumber: Yup.string()
        .required("Account Number is required")
        .max(18)
        .min(8),
      swiftCode: Yup.string().required("Swift Code is required"),
      branchName: Yup.string().required("Branch Name is required"),
    }),
    onSubmit: async () => {
      formik.setSubmitting(true);
      setError(true);
      if (!phone || !gender?.length || !image || !dob || !certi || !identity) {
        return;
      }

      let body = {
        phone: phone,
        countryCode: countryName,
        callingCode: phoneCode ? phoneCode : "",
        cancelationPolicy: formik.values.cancelplicy,
        name: formik.values.fullName,
        email: formik.values.email,
        image: image,
        dob: new Date(dob).toISOString(),
        // deviceType: "ANDROID",
        // deviceToken: "dsdss222wds",
        latitude: coordinates?.lat || "0",
        longitude: coordinates?.lng || "0",
        isProfileComplete: true,
        address: formik.values.area,
        role: "instructor",
        schoolName: formik.values.schoolName,
        document: identity,
        doc_certificate: certi,
        gender: gender,
        currencyCode: currency,
        currencySymbol: getSymbolFromCurrency(currency),
      };
      const input = {
        bankName: bankName,
        accountNo: `${formik.values.accNumber}`,
        swiftCode: formik.values.swiftCode,
        branchName: formik.values.branchName,
      };
      console.log({ body, coordinates });
      dispatch(updatProfileAction.request(body));
      dispatch(addBankDetailAction.request(input));

      // setTimeout(() => {
      //   router.replace("home");
      // }, 3000);
      // if (updateProfileData) {
      // }
      setError(false);
      setTimeout(() => {
        formik.setSubmitting(false);
      }, 3000);
    },
  });
  const countryToCurrency = require("country-to-currency");

  const handlePhoneChange = (rawValue, countryData) => {
    setCountryName(countryData?.countryCode);
    setPhone(rawValue.split(`+${phoneCode}`).join(""));
    setCurrency(
      () => countryToCurrency[countryData?.countryCode?.toUpperCase()]
    );
  };

  const handleChangePhone = (phone, country) => {
    console.log(
      phone,
      country,
      phone?.replace(country.dialCode, ""),
      "countryDatacountryData"
    );
    setPhoneCode(country?.dialCode);
    setPhone(phone?.replace(country.dialCode, ""));
    setCountryName(country?.countryCode);
    setCurrency(() => countryToCurrency[country?.countryCode?.toUpperCase()]);
  };

  const handleChange = (event) => {
    setgender(event.target.value);
  };

  const handleBankChange = (event) => {
    console.log(event.target, "eventttt");
    setBankName(event.target.value);
  };

  const onKeyPress = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      return false;
    }
  };

  return (
    <Box>
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
                        src={image || "/static/images/profileimg.png"}
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
                            // if (val.target.files[0].type.includes("image")) {
                            //   setImage(URL.createObjectURL(val.target.files[0]));
                            // }
                            setimageType(1);
                            uploadImage(val);
                          }}
                        />
                        <EditIcon />
                      </label>
                    </Box>
                    <h4 align="center">
                      {userProfileData?.name ? userProfileData?.name : "Name"}{" "}
                    </h4>
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
                            placeholder="Full Name"
                            type="text"
                            fullWidth
                            margin="none"
                            name="fullName"
                            onBlur={formik.handleBlur}
                            error={Boolean(
                              formik.touched.fullName && formik.errors.fullName
                            )}
                            helperText={
                              formik.touched.fullName && formik.errors.fullName
                            }
                            onChange={(val) => {
                              if (isString(val.target.value)) {
                                formik.handleChange(val);
                              }
                            }}
                            value={formik.values.fullName}
                            variant="standard"
                          />
                        </Box>
                      </Box>
                    </Box>
                    <Box className="edit_name">
                      <label>School Name</label>
                      <Box className="input-group">
                        <TextField
                          placeholder="School Name"
                          type="text"
                          error={Boolean(
                            formik.touched.schoolName &&
                              formik.errors.schoolName
                          )}
                          fullWidth
                          helperText={
                            formik.touched.schoolName &&
                            formik.errors.schoolName
                          }
                          margin="none"
                          name="schoolName"
                          onBlur={formik.handleBlur}
                          onChange={(val) => {
                            if (isString(val.target.value)) {
                              formik.handleChange(val);
                            }
                          }}
                          value={formik.values.schoolName}
                          variant="standard"
                        />
                      </Box>
                    </Box>
                    <Box className="edit_name">
                      <Box>
                        <label> Email Address</label>
                        <Box className="input-group">
                          <TextField
                            placeholder="Email Address"
                            type="email"
                            error={Boolean(
                              formik.touched.email && formik.errors.email
                            )}
                            fullWidth
                            helperText={
                              formik.touched.email && formik.errors.email
                            }
                            disabled={
                              userProfileData?.isEmailVerify ? true : false
                            }
                            margin="none"
                            name="email"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            value={formik.values.email || ""}
                            variant="standard"
                          />
                        </Box>
                      </Box>
                    </Box>
                    <Box className="edit_name">
                      <label>Phone Number</label>
                      <Box className="input-group vrfy-ico">
                        <PhoneInput
                          value={phoneCode + phone}
                          enableSearch={true}
                          error={Boolean(error && phone.length < 10)}
                          helperText={
                            error && phone.length < 10
                              ? "Enter valid phone number"
                              : ""
                          }
                          disabled={
                            userProfileData?.isPhoneVerify ? true : false
                          }
                          disableCountryCode={
                            userProfileData?.isPhoneVerify ? true : false
                          }
                          onChange={(phone, country) =>
                            handleChangePhone(phone, country)
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
                      <label>Date of birth</label>
                      <Box className="input-group vrfy-ico">
                        <Box className="datepicker">
                          <LocalizationProvider dateAdapter={AdapterDayjs}>
                            <DatePicker
                              value={dob || null}
                              onChange={(date) => {
                                setDob(date);
                              }}
                              className="date_picker"
                              disableFuture
                              maxDate={new Date()}
                              renderInput={(params) => (
                                <TextField
                                  {...params}
                                  fullWidth
                                  variant="standard"
                                  inputProps={{
                                    ...params.inputProps,
                                    placeholder: "Date of birth",
                                    readOnly: true,
                                  }}
                                  error={Boolean(error && !dob)}
                                  helperText={
                                    error && !dob
                                      ? "This field is compulsory"
                                      : ""
                                  }
                                />
                              )}
                            />
                          </LocalizationProvider>
                        </Box>
                      </Box>
                    </Box>

                    <FormControl
                      variant="standard"
                      fullWidth
                      className="edit_name gender_input"
                    >
                      <label id="gender">Choose gender</label>
                      <Select
                        labelId="gender"
                        id="demo-simple-select-standard"
                        value={gender}
                        label="Choose gender"
                        onChange={handleChange}
                      >
                        <MenuItem value={"Male"}>Male</MenuItem>
                        <MenuItem value={"Female"}>Female</MenuItem>
                      </Select>
                      {!gender?.length && error ? (
                        <label className="compul_gender">
                          Gender field is required
                        </label>
                      ) : (
                        ""
                      )}
                    </FormControl>

                    <Box className="edit_name">
                      <label> Address</label>
                      <Box className="input-group">
                        <Autocomplete
                          apiKey={GOOGLE_API_KEY}
                          placeholder="Location"
                          onPlaceSelected={(place) => {
                            console.log(place, ">>>><<<<<<");
                            // setCountryName(place?.address);
                            formik.setFieldValue(
                              "area",
                              place.formatted_address
                            );
                            var lat = place?.geometry?.location?.lat();
                            var lng = place?.geometry?.location?.lng();

                            var latLong = {
                              lat: JSON.stringify(lat),
                              lng: JSON.stringify(lng),
                            };

                            setCoordinates(latLong);
                          }}
                          id="area"
                          value={formik.values.area}
                          onChange={formik.handleChange}
                          onKeyDown={onKeyPress}
                        />
                      </Box>
                    </Box>
                    <Box className="edit_name">
                      <label>Cancellation Policy</label>
                      <Box className="input-group">
                        <TextField
                          placeholder="Cancellation Policy"
                          type="text"
                          error={Boolean(
                            formik.touched.cancelplicy &&
                              formik.errors.cancelplicy
                          )}
                          fullWidth
                          helperText={
                            formik.touched.cancelplicy &&
                            formik.errors.cancelplicy
                          }
                          margin="none"
                          name="cancelplicy"
                          onBlur={formik.handleBlur}
                          onChange={(val) => {
                            if (isString(val.target.value)) {
                              formik.handleChange(val);
                            }
                          }}
                          value={formik.values.cancelplicy}
                          variant="standard"
                        />
                      </Box>
                    </Box>
                    <Box className="edit_name">
                      <label>Upload Documents</label>

                      <Box className="dcmnt_upld_cntnr">
                        <Box className="dcmnt_upld_wpr">
                          <Box className="dcmnt_upld_bx">
                            <Box className="doc_upload">
                              <Box className="doc_isUpload">
                                <Box className="docImg_upload">
                                  <Image
                                    width={"50px"}
                                    height={"50px"}
                                    src={certi || "/static/images/upload.png"}
                                    alt=""
                                  />
                                  <label htmlFor="icon-button-certi">
                                    <TextField
                                      inputProps={{
                                        accept:
                                          "image/jpeg, image/jpg, image/png",
                                      }}
                                      id="icon-button-certi"
                                      type="file"
                                      sx={{ display: "none" }}
                                      onChange={(val) => {
                                        setimageType(2);
                                        uploadImage(val);
                                        // if (
                                        //   val.target.files[0].type.includes("image")
                                        // ) {
                                        //   setcerti(
                                        //     URL.createObjectURL(val.target.files[0])
                                        //   );
                                        // }
                                      }}
                                    />
                                    <EditIcon />
                                  </label>
                                </Box>
                                <label>Certifications</label>
                              </Box>
                            </Box>
                          </Box>
                          <Box>
                            {!certi && error ? (
                              <label className="compul_s error">
                                This field is compulsory
                              </label>
                            ) : (
                              ""
                            )}
                          </Box>
                        </Box>

                        <Box className="dcmnt_upld_wpr">
                          <Box className="doc_upload">
                            <Box className="doc_isUpload">
                              <Box className="docImg_upload">
                                <Image
                                  width={"50px"}
                                  height={"50px"}
                                  src={identity || "/static/images/upload.png"}
                                  alt=""
                                />
                                <label htmlFor="icon-button-identity">
                                  <TextField
                                    inputProps={{
                                      accept:
                                        "image/jpeg, image/jpg, image/png",
                                    }}
                                    id="icon-button-identity"
                                    type="file"
                                    sx={{ display: "none" }}
                                    onChange={(val) => {
                                      setimageType(3);
                                      uploadImage(val);
                                      // if (
                                      //   val.target.files[0].type.includes("image")
                                      // ) {
                                      //   setidentity(
                                      //     URL.createObjectURL(val.target.files[0])
                                      //   );
                                      // }
                                    }}
                                  />
                                  <EditIcon />
                                </label>
                              </Box>
                              <label>Identity Proof</label>
                            </Box>
                          </Box>
                          <Box>
                            {!identity && error ? (
                              <label className="compul_s error">
                                This field is compulsory
                              </label>
                            ) : (
                              ""
                            )}
                          </Box>
                        </Box>
                      </Box>
                    </Box>
                  </Box>

                  <Box className="next_heading">
                    <Box className="sub_hdg_next" sx={{ my: 5 }}>
                      <h3 align="center">Bank Details</h3>
                    </Box>

                    <Box className="profile_outr">
                      <FormControl
                        variant="standard"
                        fullWidth
                        className="edit_name gender_input"
                      >
                        <label id="bank_name">Bank Name</label>
                        <Select
                          labelId="bank_name"
                          id="demo-simple-select-standard2"
                          value={bankName}
                          label="Bank Name"
                          onChange={handleBankChange}
                        >
                          {bankdetails.map((item, i) => (
                            <MenuItem value={item.label} key={i}>
                              {item.label}
                            </MenuItem>
                          ))}
                        </Select>
                        {!bankName?.length && error ? (
                          <label className="compul_gender error" sx>
                            Bank Name is required
                          </label>
                        ) : (
                          ""
                        )}
                      </FormControl>

                      {/* <Box className="edit_name">
                        <label>Bank Name</label>
                        <Box className="input-group">
                          <TextField
                            placeholder="Bank Name"
                            type="text"
                            error={Boolean(
                              formik.touched.bankName && formik.errors.bankName
                            )}
                            fullWidth
                            helperText={
                              formik.touched.bankName && formik.errors.bankName
                            }
                            margin="none"
                            name="bankName"
                            onBlur={formik.handleBlur}
                            onChange={(val) => {
                              if (isString(val.target.value)) {
                                formik.handleChange(val);
                              }
                            }}
                            value={formik.values.bankName}
                            variant="standard"
                          />
                        </Box>
                      </Box> */}

                      <Box className="edit_name">
                        <label>Account Number</label>
                        <Box className="input-group">
                          <TextField
                            placeholder="Account Number"
                            type="number"
                            error={Boolean(
                              formik.touched.accNumber &&
                                formik.errors.accNumber
                            )}
                            fullWidth
                            helperText={
                              formik.touched.accNumber &&
                              formik.errors.accNumber
                            }
                            margin="none"
                            name="accNumber"
                            onBlur={formik.handleBlur}
                            onChange={(val) => {
                              formik.handleChange(val);
                            }}
                            value={formik.values.accNumber}
                            variant="standard"
                          />
                        </Box>
                      </Box>

                      <Box className="edit_name">
                        <label>Swift Code</label>
                        <Box className="input-group">
                          <TextField
                            placeholder="Swift Code"
                            type="text"
                            error={Boolean(
                              formik.touched.swiftCode &&
                                formik.errors.swiftCode
                            )}
                            fullWidth
                            helperText={
                              formik.touched.swiftCode &&
                              formik.errors.swiftCode
                            }
                            margin="none"
                            name="swiftCode"
                            onBlur={formik.handleBlur}
                            onChange={(val) => {
                              if (isString(val.target.value)) {
                                formik.handleChange(val);
                              }
                            }}
                            value={formik.values.swiftCode}
                            variant="standard"
                          />
                        </Box>
                      </Box>

                      <Box className="edit_name">
                        <label>Branch Name</label>
                        <Box className="input-group">
                          <TextField
                            placeholder="Branch Name"
                            type="text"
                            error={Boolean(
                              formik.touched.branchName &&
                                formik.errors.branchName
                            )}
                            fullWidth
                            helperText={
                              formik.touched.branchName &&
                              formik.errors.branchName
                            }
                            margin="none"
                            name="branchName"
                            onBlur={formik.handleBlur}
                            onChange={(val) => {
                              if (isString(val.target.value)) {
                                formik.handleChange(val);
                              }
                            }}
                            value={formik.values.branchName}
                            variant="standard"
                          />
                        </Box>
                      </Box>
                    </Box>
                  </Box>

                  <Box className="btn_wpr">
                    <LoadingButton
                      type="submit"
                      loading={formik.isSubmitting}
                      disabled={formik.isSubmitting}
                      className="btn-designthree"
                      onClick={() => setError(true)}
                    >
                      Next
                    </LoadingButton>
                  </Box>
                </Box>
              </Box>
            </form>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default InstructorProfile;
