import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import WelcomeHeader from "../../components/welcome/WelcomeHeader";
import { WelcomeBanner } from "../../components/welcome/WelcomeBanner";
import { WelcomeInfoCard } from "../../components/welcome/WelcomeInfoCard";
import { NumberCard } from "../../components/welcome/NumberCard";
import { WelcomeCarousel } from "../../components/welcome/WelcomeCarousel";
import { Footer } from "../../layout/Footer";
import { InstructorFooter } from "../../layout/InstructorFooter";
import { DownloadApp } from "../../components/welcome/DownloadApp";
import { Pricing } from "../../components/welcome/Pricing";
import { GetInTouch } from "../../components/welcome/GetInTouch";
// import { WelcomeCarouseltwo } from "../../components/welcome/WelcomeCarouseltwo";

const InstructorHome = () => {
  const data = [
    {
      heading: " Seamless Integration",
      desc: " Hub IT allows your business and technology computers to store, transmit and analyze.",
    },
    {
      heading: " Seamless Integration",
      desc: " Hub IT allows your business and technology computers to store, transmit and analyze.",
    },
    {
      heading: " Seamless Integration",
      desc: " Hub IT allows your business and technology computers to store, transmit and analyze.",
    },
  ];

  const numberData = [
    {
      number: "01",
      heading: "Create Classes",
    },
    {
      number: "02",
      heading: "Market To Your Customers",
    },
    {
      number: "03",
      heading: "Fill Your Spaces",
    },
    {
      number: "04",
      heading: "Manage Your Bookings",
    },
  ];
  return (
    <Box className="w-100">
      {/* Header Section */}
      <WelcomeHeader />

      {/* Banner Section */}
      <WelcomeBanner />

      {/* Info cards Section */}
      {/* <Box className="infoCards_sec py-80">
        <Container maxWidth="xl">
          <Grid container spacing={{ md: 4, sm: 2, xs: 2 }}>
            {data.map((item, i) => {
              return (
                <Grid item md={4} sm={6} xs={12} key={i}>
                  <WelcomeInfoCard heading={item.heading} desc={item.desc} />
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box> */}
      {/* welcome Section */}
      <Box className="wlcm_sec  py-80">
        <Container maxWidth="xl">
          <Box className="wel_text" sx={{ textAlign: "center" }}>
            <Typography variant="h2">
              Welcome to the
              <br /> World of Workout
            </Typography>
            <Typography variant="h4">
              Yogi allows instructors to create, sell and manage fitness classes
              all in one place for free.
              <br /> Our platform is designed to help local fitness instructors
              reach more customers, make more sales and help grow their
              businesses. Yogi makes it easy for customers to see what classes
              are available near them and gives them easy options to book on
              making the experience hassle free.
            </Typography>
          </Box>
          <Grid container spacing={{ md: 3, xs: 2 }}>
            {numberData.map((item, i) => {
              return (
                <Grid item md={3} sm={6} xs={12} key={i}>
                  <NumberCard number={item.number} heading={item.heading} />
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>

      {/*grow Section */}
      <Box className="grow_sec">
        <Container maxWidth="xl">
          <Box className="wel_text" sx={{ textAlign: "center" }}>
            <Typography variant="h2">Grow your business with Yogi</Typography>
            <Typography variant="h4" sx={{ marginBottom: " 0 !important" }}>
              Say goodbye to expensive fitness booking systems and say hello too
              yogi!
            </Typography>
          </Box>
        </Container>
      </Box>

      {/* wlcm Carousel */}
      <Box className="wlcm_carsl_sec">
        <Container maxWidth="xl" className="cstm_container">
          <WelcomeCarousel />
        </Container>
      </Box>

      {/* pricing */}
      <Pricing />

      {/* Get in touch */}
      <GetInTouch />

      <DownloadApp />

      {/* Footer Section */}
      <Box className="wlcm_ftr">
        <InstructorFooter />
      </Box>
    </Box>
  );
};

export default InstructorHome;
