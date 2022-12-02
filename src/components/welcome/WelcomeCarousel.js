/* eslint-disable @next/next/no-img-element */
import React from "react";
import Image from "next/image";
import { Box, Button, Grid, Typography } from "@mui/material";
import caroselImg from "../../../public/static/images/carousel_img.png";
import sliderIcon from "../../../public/static/images/sliderIcon.png";
import sliderIcon2 from "../../../public/static/images/sliderIcon2.png";
import sliderIcon3 from "../../../public/static/images/sliderIcon3.png";
import sliderIcon4 from "../../../public/static/images/sliderIcon4.png";
import sliderIcon5 from "../../../public/static/images/sliderIcon5.png";

import Slider from "react-slick";
import PersonIcon from "@mui/icons-material/Person";

export const WelcomeCarousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    // arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  //   const renderArrows = () => {
  //     return (
  //       <div className="slider-arrow">
  //         <Button className="arrow-btn prev" onClick={() => slider.slickPrev()}>
  //           <ArrowLeft />
  //         </Button>
  //         <Button className="arrow-btn next" onClick={() => slider.slickNext()}>
  //           <ArrowRight />
  //         </Button>
  //       </div>
  //     );
  //   };

  return (
    <Box className="carl_bx">
      <Grid container spacing={{ lg: 4, md: 3, xs: 2 }} className="reversecol">
        <Grid item lg={7} md={6} sm={12} xs={12}>
          <Slider {...settings}>
            <Box className="carl_content">
              <Typography variant="h2" className="fw-bold">
                Benefits of Yogi
              </Typography>
              <Box className="benftList">
                <Box className="benftItem">
                  <Box>
                    <Box className="benftIcon">
                      <img src={sliderIcon?.src} alt="img" />
                    </Box>
                  </Box>
                  <h6>Advertise to Customers</h6>
                </Box>
                <Box className="benftItem">
                  <Box>
                    <Box className="benftIcon">
                      <img src={sliderIcon2?.src} alt="img" />
                    </Box>
                  </Box>
                  <h6>Share on Social Media Platforms</h6>
                </Box>
                <Box className="benftItem">
                  <Box>
                    <Box className="benftIcon">
                      <img src={sliderIcon3?.src} alt="img" />
                    </Box>
                  </Box>
                  <h6>Easy Payment Options</h6>
                </Box>
                <Box className="benftItem">
                  <Box>
                    <Box className="benftIcon">
                      <img src={sliderIcon4?.src} alt="img" />
                    </Box>
                  </Box>
                  <h6>Message Potential Customers</h6>
                </Box>
                <Box className="benftItem">
                  <Box>
                    <Box className="benftIcon">
                      <img src={sliderIcon5?.src} alt="img" />
                    </Box>
                  </Box>
                  <h6>Promote Late Availability</h6>
                </Box>
              </Box>
            </Box>
            <Box className="carl_content">
              <Typography variant="h2" className="fw-bold">
                Benefits of Yogi
              </Typography>
              <Box className="benftList">
                <Box className="benftItem">
                  <Box>
                    <Box className="benftIcon">
                      <img src={sliderIcon?.src} alt="img" />
                    </Box>
                  </Box>
                  <h6>Create your instructor profile</h6>
                </Box>
                <Box className="benftItem">
                  <Box>
                    <Box className="benftIcon">
                      <img src={sliderIcon2?.src} alt="img" />
                    </Box>
                  </Box>
                  <h6>Design & promote your classes</h6>
                </Box>
                <Box className="benftItem">
                  <Box>
                    <Box className="benftIcon">
                      <img src={sliderIcon3?.src} alt="img" />
                    </Box>
                  </Box>
                  <h6>Choose your categories </h6>
                </Box>
                <Box className="benftItem">
                  <Box>
                    <Box className="benftIcon">
                      <img src={sliderIcon4?.src} alt="img" />
                    </Box>
                  </Box>
                  <h6>Upload pictures & images</h6>
                </Box>
                <Box className="benftItem">
                  <Box>
                    <Box className="benftIcon">
                      <img src={sliderIcon5?.src} alt="img" />
                    </Box>
                  </Box>
                  <h6>Add times & locations</h6>
                </Box>
              </Box>
            </Box>
            <Box className="carl_content">
              <Typography variant="h2" className="fw-bold">
                Benefits of Yogi
              </Typography>
              <Box className="benftList">
                <Box className="benftItem">
                  <Box>
                    <Box className="benftIcon">
                      <img src={sliderIcon?.src} alt="img" />
                    </Box>
                  </Box>
                  <h6>Be in control of your calendar</h6>
                </Box>
                <Box className="benftItem">
                  <Box>
                    <Box className="benftIcon">
                      <img src={sliderIcon2?.src} alt="img" />
                    </Box>
                  </Box>
                  <h6>Manage your availability</h6>
                </Box>
                <Box className="benftItem">
                  <Box>
                    <Box className="benftIcon">
                      <img src={sliderIcon3?.src} alt="img" />
                    </Box>
                  </Box>
                  <h6>Create marketing campaigns </h6>
                </Box>
                <Box className="benftItem">
                  <Box>
                    <Box className="benftIcon">
                      <img src={sliderIcon4?.src} alt="img" />
                    </Box>
                  </Box>
                  <h6>Receive notifications</h6>
                </Box>
                <Box className="benftItem">
                  <Box>
                    <Box className="benftIcon">
                      <img src={sliderIcon5?.src} alt="img" />
                    </Box>
                  </Box>
                  <h6>View your earnings</h6>
                </Box>
              </Box>
            </Box>
          </Slider>
        </Grid>
        <Grid item lg={5} md={6} sm={12} xs={12}>
          <div>
            <Box className="carl_img">
              <figure>
                <Image src={caroselImg} alt="text" />
              </figure>
            </Box>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};
