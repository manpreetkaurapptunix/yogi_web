import React from "react";
import Image from "next/image";
import { Box, Container, Grid, Button, Typography } from "@mui/material";
import mobileApp from "../../../public/static/images/downloadImg.png";
import googleplay from "../../../public/static/images/google-play.png";
import appleStore from "../../../public/static/images/appleStore.png";

export const DownloadApp = () => {
  return (
    <Box className="download_sec">
      <Container className="cstm_container">
        <Grid container spacing={2}>
          <Grid item sm={6}>
            <Box className="banner_ctnt wel_text">
              <Typography variant="h2">
                Download The App Now
                <br /> & Start Booking
              </Typography>
              <Typography variant="h4">
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using ‘Content
                here, content here’, making it look like readable English.
              </Typography>
              <Box className="download_btns">
                <Box>
                  <Image src={googleplay} alt="Google Play" />
                </Box>
                <Box>
                  <Image src={appleStore} alt="Google Play" />
                </Box>
              </Box>
            </Box>
          </Grid>
          <Grid item sm={6} className="ban_ImgWpr">
            <Box className="banner_img">
              <figure>
                <Image src={mobileApp} alt="img" />
              </figure>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
