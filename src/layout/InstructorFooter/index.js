import Link from "next/link";
import { useRouter } from "next/router";
import { Grid, Typography } from "@mui/material";
import { Box, Container } from "@mui/system";
import Image from "next/image";
import React from "react";
import FacebookRoundedIcon from "@mui/icons-material/FacebookRounded";
import InstagramIcon from "@mui/icons-material/Instagram";
import TwitterIcon from "@mui/icons-material/Twitter";
import YouTubeIcon from "@mui/icons-material/YouTube";
import LinkedInIcon from "@mui/icons-material/LinkedIn";
import { useDispatch, useSelector } from "react-redux";
import { tempData } from "../../redux/actions";
import { setCookie } from "cookies-next";

// const support = [
//   "Trial Version",
//   "Premium",
//   "FAQ's",
//   "Privacy Policy",
//   "Terms of use",
//   "Copyright",
//   "Help",
// ];

export const InstructorFooter = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const isAuthorised = useSelector((state) => state.commonReducer.isAuthorised);

  return (
    <Box className="ftr_sec">
      <Box className="wrapper">
        <Box className="cstm_container">
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Box className="ftr_logo">
                <figure onClick={() => router.replace("/")}>
                  <Image
                    width={"100%"}
                    height={"100%"}
                    src={"/static/images/logo.png"}
                    alt=" "
                  />
                </figure>
              </Box>
            </Grid>
            <Grid item lg={5} sm={6} xs={12}>
              <Box className="ftr_logo_wpr">
                <p className="ftr_des">
                  Lorem Ipsum has been the industry’s standard dummy text ever
                  since the 1500s, when an unknown printer took a galley of type
                  and scrambled it to make a type specimen book. It has survived
                  not only five centuries, but also the leap into electronic
                  typesetting, remaining essentially unchanged.
                </p>
                <p className="copy_rgt">© 2022 Yogi. All rights reserved.</p>
              </Box>
            </Grid>
            <Grid item lg={2} sm={6} xs={12}>
              <Box className="links_wpr">
                <h4>Quick links</h4>
                <Box className="links" onClick={() => router.replace("/")}>
                  <Typography className="ftr_link">Home</Typography>
                </Box>
                <Box
                  className="links"
                  onClick={() => router.replace("/dashboard")}
                >
                  <Typography className="ftr_link">Dashboard</Typography>
                </Box>
                <Box
                  className="links"
                  onClick={() => {
                    dispatch(tempData.updateTempData({ link: 4 }));
                    router.push("/settings");
                  }}
                >
                  <Typography className="ftr_link">About Us</Typography>
                </Box>

                {isAuthorised && (
                  <Box
                    className="links"
                    onClick={() => router.push("/manageClasses")}
                  >
                    <Typography className="ftr_link">Classes</Typography>
                  </Box>
                )}

                <Box
                  className="links"
                  onClick={() => {
                    dispatch(tempData.updateTempData({ link: 3 }));
                    router.push("/settings");
                  }}
                >
                  <Typography className="ftr_link">Contact Us</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item lg={2} sm={6} xs={12}>
              <Box className="links_wpr">
                <h4>Support</h4>

                {isAuthorised && (
                  <Box
                    className="links"
                    onClick={() => {
                      router.push(`manageMembership`);
                    }}
                  >
                    <Typography className="ftr_link">{"Membership"}</Typography>
                  </Box>
                )}
                <Box
                  className="links"
                  onClick={() => {
                    dispatch(tempData.updateTempData({ link: 6 }));

                    router.push(`settings`);
                  }}
                >
                  <Typography className="ftr_link">{"FAQ's"}</Typography>
                </Box>

                <Box
                  className="links"
                  onClick={() => {
                    router.push(`privacypolicy`);
                  }}
                >
                  <Typography className="ftr_link">
                    {"Privacy Policy"}
                  </Typography>
                </Box>

                <Box
                  className="links"
                  onClick={() => {
                    dispatch(tempData.updateTempData({ link: 5 }));

                    router.push(`settings`);
                  }}
                >
                  <Typography className="ftr_link">
                    {"Terms & Conditions"}
                  </Typography>
                </Box>

                <Box
                  className="links"
                  onClick={() => {
                    // dispatch(tempData.updateTempData({ link: 3 }));
                    dispatch(tempData.updateTempData({ role: "instructor" }));
                    router.push(`/help`);
                    setCookie("type", "instructor");
                  }}
                >
                  <Typography className="ftr_link">{"Help"}</Typography>
                </Box>
              </Box>
            </Grid>
            <Grid item lg={3} sm={6} xs={12}>
              <Box className="links_wpr">
                <h4>Subscribe Us</h4>
                <Typography>
                  Lorem Ipsum is simply dummy text of the printing and
                  typesetting industry.
                </Typography>
                <Box className="social_footer">
                  <Typography>Connect Us on social media</Typography>
                  <Box className="social_icons">
                    <Box className="social_item">
                      <Link href="">
                        <Image
                          width={"100%"}
                          height={"100%"}
                          src={"/static/images/fb.png"}
                          alt=" "
                        />
                      </Link>
                    </Box>
                    <Box className="social_item">
                      <Link href="">
                        <TwitterIcon />
                      </Link>
                    </Box>
                    <Box className="social_item">
                      <Link href="">
                        <Image
                          width={"100%"}
                          height={"100%"}
                          src={"/static/images/linkdin.svg"}
                          alt=" "
                        />
                      </Link>
                    </Box>
                    <Box className="social_item">
                      <Link href="">
                        <YouTubeIcon />
                      </Link>
                    </Box>
                    <Box className="social_item">
                      <Link href="">
                        <Image
                          width={"100%"}
                          height={"100%"}
                          src={"/static/images/instagram.svg"}
                          alt=" "
                        />
                      </Link>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};
