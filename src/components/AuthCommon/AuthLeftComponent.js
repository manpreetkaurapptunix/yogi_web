/* eslint-disable @next/next/no-img-element */
import { Box, Typography } from "@material-ui/core";
import Image from "next/image";
import { useRouter } from "next/router";
import React from "react";
import { colors } from "../../constants/colors";

const AuthLeftComponent = (props) => {
  const { heading, subHeading, isEmail, setisEmail, verify } = props;
  const router = useRouter();

  return (
    <Box className="common_auth">
      <Box className="row_part">
        {/* <figure className="logo_auth">
          <img
            onClick={() => router.replace("/")}
            src="/static/images/logo.png"
            alt="logo"
            className="logo_img"
            // style={{ height: 20, width: 20 }}
          />
        </figure> */}
        <Typography className="heading">{props.heading}</Typography>
        <Typography className="subHead_text">{props.subHeading}</Typography>
      </Box>
      {/* <Box className="static_image">
        <figure className="yoga_static">
          <img src="/static/images/logo.png" alt="yoga" />
        </figure>
      </Box> */}
      {!verify && (
        <Box className="toggle">
          <Box
            style={{ backgroundColor: isEmail ? "#fff" : colors.inputColor }}
            className="email_toogle"
          >
            <Typography onClick={() => setisEmail(true)} className="email_text">
              Email
            </Typography>
          </Box>
          <Box
            style={{ backgroundColor: !isEmail ? "#fff" : colors.inputColor }}
            className="email_toogle"
          >
            <Typography
              onClick={() => setisEmail(false)}
              className="email_text"
            >
              Phone Number
            </Typography>
          </Box>
        </Box>
      )}
    </Box>
  );
};

export default AuthLeftComponent;
