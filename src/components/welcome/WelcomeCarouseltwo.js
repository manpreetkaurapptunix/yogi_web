/* eslint-disable @next/next/no-img-element */
import React from "react";
import Image from "next/image";
import { Box, Button, Grid, Typography } from "@mui/material";
import caroselImg from "../../../public/static/images/welcomeCarousel_Picture.jpeg";
import Slider from "react-slick";
import PersonIcon from "@mui/icons-material/Person";

export const WelcomeCarouseltwo = () => {
  const settings = {
    dots: false,
    infinite: true,
    // arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Box className="carl_bx carl_bxtwo pb-80">
      <Grid container spacing={{ lg: 4, md: 3, xs: 2 }} className="reversecol">
        <Grid item md={6} sm={12} xs={12}>
          <Box className="carl_imgtwo">
            <figure>
              <Image src={caroselImg} alt="text" />
            </figure>
          </Box>
        </Grid>
        <Grid item md={6} sm={12} xs={12} className="carl_contentCol">
          <Slider {...settings}>
            <div>
              <Box className="carl_content carl_contenttwo ">
                <Typography variant="h2" className="fw-bold">
                  Benefits of Yogi
                </Typography>
                <ul className="benftListtwo">
                  <li className="benftItemtwo">Advertise to Customers</li>
                  <li className="benftItemtwo">
                    Share on Social Media Platforms
                  </li>
                  <li className="benftItemtwo">Easy Payment Options</li>
                  <li className="benftItemtwo">Message Potential Customers</li>
                  <li className="benftItemtwo">Promote Late Availability</li>
                </ul>
              </Box>
            </div>
            <div>
              <Box className="carl_content carl_contenttwo ">
                <Typography variant="h2" className="fw-bold">
                  Benefits of Yogi
                </Typography>
                <ul className="benftListtwo">
                  <li className="benftItemtwo">
                    Create your instructor profile
                  </li>
                  <li className="benftItemtwo">
                    Design & promote your classes
                  </li>
                  <li className="benftItemtwo">Choose your categories </li>
                  <li className="benftItemtwo">Upload pictures & images</li>
                  <li className="benftItemtwo">Add times & locations</li>
                </ul>
              </Box>
            </div>
            <div>
              <Box className="carl_content carl_contenttwo ">
                <Typography variant="h2" className="fw-bold">
                  Benefits of Yogi
                </Typography>
                <ul className="benftListtwo">
                  <li className="benftItemtwo">
                    Be in control of your calendar
                  </li>
                  <li className="benftItemtwo">Manage your availability</li>
                  <li className="benftItemtwo">Create marketing campaigns </li>
                  <li className="benftItemtwo">Receive notifications</li>
                  <li className="benftItemtwo">View your earnings</li>
                </ul>
              </Box>
            </div>
          </Slider>
        </Grid>
      </Grid>
    </Box>
  );
};
