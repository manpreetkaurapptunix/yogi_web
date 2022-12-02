import {
  Box,
  Grid,
  Container,
  Typography,
  Tooltip,
  Button,
} from "@mui/material";
import Image from "next/image";
import React, { useState } from "react";
import { colors } from "../../constants/colors";
import ContentCopySharpIcon from "@mui/icons-material/ContentCopySharp";
import ContentCopyIcon from "@mui/icons-material/ContentCopy";
import { RWebShare } from "react-web-share";
import { useSelector } from "react-redux";

const ReferFriend = () => {
  const { userData } = useSelector((state) => state.authReducer);
  const [referCode, setreferCode] = useState(userData?.my_referral);
  const [toolTipMessage, setToolTipMessage] = useState("Copy wallet address.");

  const copyToClipBoard = () => {
    navigator.clipboard.writeText(referCode);
    setToolTipMessage("Copied to clipboard.");
    setTimeout(() => {
      setToolTipMessage("Copy wallet address.");
    }, 2000);
  };

  return (
    <Box className="refer_Cont">
      <Container maxWidth={false}>
        <Grid container spacing={8}>
          <Grid item xl={5} lg={5} sm={12} xs={12}>
            <figure className="refer_img">
              <Image
                width={"100%"}
                height={"100%"}
                style={{ tintColor: colors.mainColor }}
                src={"/static/images/referFriend.svg"}
                alt=""
              />
            </figure>
          </Grid>
          <Grid item xl={7} lg={7} sm={12} xs={12}>
            <Typography className="fz-18">Refer As Many As You Can</Typography>
            <Typography className="fz-14" sx={{ mt: 1 }}>
              lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam
              nonumy eirmod tempor invidunt ut labore et dolore magna aliquyam
              erat, sed diam eirmod tempor invidunt ut labore et dolore magna
              aliquyam erat, sed diam
            </Typography>
            <Box className="invite_box">
              <h6 align="center">Invite Code</h6>
              <Box className="invite_code">
                <Typography>{referCode}</Typography>
                <Tooltip title={toolTipMessage}>
                  <ContentCopySharpIcon onClick={copyToClipBoard} />
                </Tooltip>
              </Box>
              <Typography
                style={{ textAlign: "center" }}
                className="invite_desc"
              >
                you can use this code while making any purchase on the platform
              </Typography>
            </Box>
            <RWebShare
              data={{
                url: "https://yogiweb.appgrowthcompany.com",
                title: "Share",
                text: "Let's Book Yoga Classes on Yogi! It's a World best, Advance, and Famous app we can use to yoga. Get it at",
              }}
              onClick={() => console.info("share successful!")}
            >
              <Button type="submit" className="btn_cancel">
                Refer Now
              </Button>
            </RWebShare>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ReferFriend;
