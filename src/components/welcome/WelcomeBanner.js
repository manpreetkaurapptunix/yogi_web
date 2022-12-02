import React from "react";
import Image from "next/image";
import { Box, Button, Grid, Typography } from "@mui/material";
import { Container } from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import bannerImg from "../../../public/static/images/banner_girl.png";
import bannerBg from "../../../public/static/images/bannerBg2.png";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { modalVisible } from "../../redux/actions";
import { Modules } from "../../constants/modules";

export const WelcomeBanner = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuthorised = useSelector((state) => state.commonReducer.isAuthorised);

  return (
    <Box
      className="bannerSec"
      sx={{
        width: "100%",
        background: `url(${bannerBg.src})  no-repeat   center`,
        backgroundSize: "cover",
      }}
    >
      <Container maxWidth="xl">
        <Grid container spacing={2}>
          <Grid item sm={6}>
            <Box className="banner_ctnt wel_text">
              <Typography variant="h2">
                Create, Promote &<br /> Manage Your Classes
              </Typography>
              <Typography variant="h4">
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
              </Typography>
              {isAuthorised ? (
                <Button
                  onClick={() => router.push("/dashboard")}
                  variant="contained"
                  endIcon={<EastIcon />}
                  className="new_btn"
                >
                  Go Ahead
                </Button>
              ) : (
                <Button
                  onClick={() =>
                    dispatch(modalVisible.modalOpen(Modules.SIGNUP))
                  }
                  variant="contained"
                  endIcon={<EastIcon />}
                  className="new_btn"
                >
                  Sign up today
                </Button>
              )}
            </Box>
          </Grid>
          <Grid item sm={6} className="ban_ImgWpr">
            {/* <Box className="banner_img">
              <figure>
                <Image src={bannerImg} alt="img" />
              </figure>
            </Box> */}
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
