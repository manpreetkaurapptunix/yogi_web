import { Box, Typography } from "@mui/material";
import React from "react";

export const GuideCard = (props) => {
  return (
    <Box className="guideCard">
      <Box className="guideTab">{props.tab}</Box>
      <Typography className="fz-18 guideCode">{props.code}</Typography>
      <Box className="guideContent">
        <Typography className="fz-20 fw-bold mb-10">{props.heading}</Typography>
        <Typography className="fz-16">{props.desc}</Typography>
      </Box>
    </Box>
  );
};
