/* eslint-disable @next/next/no-img-element */
import React, { useState } from "react";
import { useSelector } from "react-redux";
import Image from "next/image";
import { Box, Grid, Container, Typography } from "@mui/material";

const ContactUs = () => {
  const data = useSelector((state) => state.aboutReducer.aboutData);

  return (
    <Box className="contact_Cont">
      <Container maxWidth={false}>
        <Grid container spacing={8}>
          <Grid item xl={6} lg={6} sm={12} xs={12}>
            <figure className="cntct_img">
              <img src={"/static/images/contactImg.svg"} alt="img" />
            </figure>
          </Grid>
          <Grid item xl={6} lg={6} sm={12} xs={12}>
            <Typography className="fz-18">Need Help?</Typography>
            <Typography className="fz-14" sx={{ mt: 1 }}>
              feel free to get in touch with us
            </Typography>
            <Box className="contactList">
              <a
                href={"mailto:" + `${data[0].email}`}
                className="contactList_item"
              >
                <span>
                  {" "}
                  <img src="/static/images/contactMail.svg" alt="img" />
                </span>
                <Box className="contactList_itemCnt">
                  <Typography className="fz-16">Email Address</Typography>
                  <Typography className="fz-12">
                    {data ? data[0].email : "apptunix@gmail.com"}
                  </Typography>
                </Box>
              </a>

              <a
                href={"tel:" + `${data[0].phone}`}
                className="contactList_item"
              >
                <span>
                  <img src="/static/images/contactPhn.svg" alt="img" />
                </span>
                <Box className="contactList_itemCnt">
                  <Typography className="fz-16">Phone Number</Typography>
                  <Typography className="fz-12">
                    {data
                      ? "+" + data[0]?.dialCode + " " + data[0]?.phone
                      : "+91-99556-96563"}
                  </Typography>
                </Box>
              </a>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default ContactUs;
