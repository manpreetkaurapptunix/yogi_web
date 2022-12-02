import React from "react";
import Image from "next/image";
import { Box, Button, Grid, Typography } from "@mui/material";
import { Container } from "@mui/material";
import EastIcon from "@mui/icons-material/East";
import bannerImg from "../../../public/static/images/banner_girl.png";
import about from "../../../public/static/images/logo.png";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { modalVisible } from "../../redux/actions";
import { Modules } from "../../constants/modules";

export const HelpBanner = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const isAuthorised = useSelector((state) => state.commonReducer.isAuthorised);

  return (
    <Box className="bannerSec help_Banner">
      <Container maxWidth="xl">
        <Box className="wel_text">
          <Typography variant="h2" align="center" className="fw-bold">
            How can we help?
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};
