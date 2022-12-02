import { Box, Typography } from "@mui/material";
import React from "react";

export const NumberCard = (props) => {
  return (
    <Box className="numberCard">
      <Typography variant="div" className="nmbr">
        {props.number}
      </Typography>
      <Typography variant="p" className="fz-22 fw-bold">
        {props.heading}
      </Typography>
    </Box>
  );
};
