import { Box, Typography } from "@mui/material";
import React from "react";

export const WelcomeInfoCard = (props) => {
  return (
    <Box className="infoCard">
      <Typography variant="div" className="fz-20 fw-bold">
        {props.heading}
      </Typography>
      <Typography variant="p" className="fz-20">
        {props.desc}
      </Typography>
    </Box>
  );
};
