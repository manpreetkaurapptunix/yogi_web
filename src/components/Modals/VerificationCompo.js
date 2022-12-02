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
import React, { useState, useEffect } from "react";
import AuthLeftComponent from "../AuthCommon/AuthLeftComponent";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import {
  forgotPasswordAction,
  modalVisible,
  resendOtpAction,
  resetAuth,
  verifyOtpAction,
} from "../../redux/actions";
import AuthRightComponent from "../AuthCommon/AuthRightComponent";
import dynamic from "next/dynamic";
import { getCookie, setCookie } from "cookies-next";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Modules } from "../../constants/modules";
import { Loader } from "../Loader";

const OTPInput = dynamic(() => import("otp-input-react"), { ssr: false });

const VerificationCompo = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [error, setError] = useState(false);
  const [OTP, setOTP] = useState("");
  const [counter, setCounter] = useState(30);
  const [resent, setResent] = useState(true);

  const data = useSelector((state) => state.commonReducer.tempData);

  useEffect(() => {
    if (!counter) {
      setResent(false);
      return;
    }
    const timer =
      counter > 0 && setInterval(() => setCounter(counter - 1), 1000);
    return () => clearInterval(timer);
  }, [counter]);

  const handleOtp = async (val) => {
    setOTP(val);
    let body = {
      key: data?.signUp?.key || "",
      countryCode: data?.signUp?.countryCode,
      code: val,
      // role: data?.role,
      callingCode: data?.signUp?.callingCode,
    };
    if (val.length == 4) {
      dispatch(verifyOtpAction.request(body, "signup"));
      // router.replace("home");
    }
    // if (val.length == 4) {
    //   setCookie("token", "abc");
    //   dispatch(modalVisible.modalClose());
    //   const type = getCookie("type");
    //   console.log(type, "typee");
    //   if (type == "instructor") {
    //     router.push("profile");
    //   } else {
    //     router.replace("/");
    //   }
    //   dispatch(resetAuth.authorise());
    // }
  };

  const handleResend = () => {
    setCounter(30);
    let body = {
      key: data?.signUp?.key || "",
      countryCode: data?.signUp?.countryCode,
      // role: data?.role,
      callingCode: data?.signUp?.callingCode,
    };

    dispatch(resendOtpAction.request(body));
    // router.replace("home");
  };

  return (
    <Box component="main" className="login_wpr verf_wpr">
      <Box className="wrapper">
        {/* <Loader /> */}
        <Box className="twoColumn">
          <Box className="twoColumn_itemOne mb-5">
            <Box sx={{ mb: 2 }}>
              <Button
                variant="text"
                className="back_btn"
                onClick={() => {
                  dispatch(modalVisible.modalClose());
                  dispatch(modalVisible.modalOpen(Modules.SIGNUP));
                  // router.push("/signup");
                }}
              >
                <ArrowBackIosIcon width="20px" />{" "}
                <span className="fz-18 text-cap fw-bold">Back</span>
              </Button>
            </Box>
            <AuthLeftComponent
              heading="Verification"
              subHeading={`We have just sent you a verification code via ${
                data?.signUp?.callingCode
                  ? data?.signUp?.callingCode + " " + data?.signUp?.key
                  : data?.signUp?.key
              }`}
              verify
            />

            <Box className="otp_fdx">
              <OTPInput
                className="otpInpt_bx"
                value={OTP}
                onChange={(val) => {
                  {
                    handleOtp(val);
                  }
                }}
                hasErrored={false}
                autoFocus
                OTPLength={4}
                otpType="number"
                disabled={false}
                inputStyles={{
                  height: 50,
                  width: 50,
                }}
              />
            </Box>
            <Box className="btm">
              <span>{`The verify code will expire in 00 : ${
                counter < 10 ? "0" + counter : counter
              }`}</span>

              {!resent && (
                <Box className="resend_txt" onClick={() => handleResend()}>
                  <h6 className="lst_name">Resend Code</h6>
                </Box>
              )}
            </Box>
          </Box>
          <Box className="twoColumn_itemTwo">
            <AuthRightComponent images={"/static/images/otpImg.png"} />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default VerificationCompo;
