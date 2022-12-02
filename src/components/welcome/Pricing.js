/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React from "react";
import { Box, Typography, Grid, Button } from "@mui/material";
import priceImg from "../../../public/static/images/priceImg.svg";
import priceImg2 from "../../../public/static/images/priceImg2.svg";
import tick from "../../../public/static/images/tick.png";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/router";
import { modalVisible } from "../../redux/actions";
import { Modules } from "../../constants/modules";

export const Pricing = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const isAuthorised = useSelector((state) => state.commonReducer.isAuthorised);

  return (
    <Box className="pricing_sec pb-80">
      <Box className="cstm_container mx-1170">
        <Box className="heading">
          <Typography variant="h2" align="center" className="fw-bold uppercase">
            PRICING
          </Typography>
        </Box>
        <Grid container spacing={{ lg: 8, md: 3, xs: 2 }}>
          <Grid item md={6} sm={12} xs={12}>
            <Box className="priceCard">
              <Box className="price_img">
                <Image src={priceImg} alt="img" />
              </Box>
              <Box className="cardName">YOGI FREE</Box>
              <Box className="type">FREE</Box>
              <ul>
                <li>
                  <span className="pl_icon">
                    <img src={tick?.src} alt="img" />
                  </span>
                  CREATE AND SELL YOUR FITNESS CLASSES
                </li>
                <li>
                  <span className="pl_icon">
                    <img src={tick?.src} alt="img" />
                  </span>
                  PROMOTE ON YOGIS WORLDWIDE PLATFORM
                </li>
                <li>
                  <span className="pl_icon">
                    <img src={tick?.src} alt="img" />
                  </span>
                  PROMOTE ON SOCIAL MEDIA
                </li>
                <li>
                  <span className="pl_icon">
                    <img src={tick?.src} alt="img" />
                  </span>
                  MARKET TO POTENTIAL CLIENTS
                </li>
                <li>
                  <span className="pl_icon">
                    <img src={tick?.src} alt="img" />
                  </span>
                  PROMOTE LATE AVAIABILITY
                </li>
                <li>
                  <span className="pl_icon">
                    <img src={tick?.src} alt="img" />
                  </span>
                  ONLY 8% TRANSACTION FEE ON CLASSES SOLD
                </li>
                <li>
                  <span className="pl_icon">
                    <img src={tick?.src} alt="img" />
                  </span>
                  NO HIDDEN COSTS
                </li>
              </ul>
              {!isAuthorised ? (
                <Button
                  onClick={() =>
                    dispatch(modalVisible.modalOpen(Modules.SIGNUP))
                  }
                  className="price_btn"
                >
                  Sign up today
                </Button>
              ) : (
                <></>
              )}
            </Box>
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <Box className="priceCard">
              <Box className="price_img">
                <Image src={priceImg2} alt="img" />
              </Box>
              <Box className="cardName">YOGI PRO</Box>
              <Box className="pro_pr">
                £<strong>45</strong>PM
              </Box>
              <ul>
                <li>
                  <span className="pl_icon">
                    <img src={tick?.src} alt="img" />
                  </span>
                  CREATE AND SELL YOUR FITNESS CLASSES
                </li>
                <li>
                  <span className="pl_icon">
                    <img src={tick?.src} alt="img" />
                  </span>
                  PROMOTE ON YOGIS WORLDWIDE PLATFORM
                </li>
                <li>
                  <span className="pl_icon">
                    <img src={tick?.src} alt="img" />
                  </span>
                  PROMOTE ON SOCIAL MEDIA
                </li>
                <li>
                  <span className="pl_icon">
                    <img src={tick?.src} alt="img" />
                  </span>
                  MARKET TO POTENTIAL CLIENTS
                </li>
                <li>
                  <span className="pl_icon">
                    <img src={tick?.src} alt="img" />
                  </span>
                  PROMOTE LATE AVAIABILITY
                </li>
                <li>
                  <span className="pl_icon">
                    <img src={tick?.src} alt="img" />
                  </span>
                  ONLY 2% TRANSACTION FEE ON CLASSES SOLD
                </li>
                <li>
                  <span className="pl_icon">
                    <img src={tick?.src} alt="img" />
                  </span>
                  NO HIDDEN COSTS
                </li>
              </ul>
              <Button className="price_btn price_fill_btn">Become Pro</Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
