import React from "react";
import { Box, Typography } from "@mui/material";
import { useSelector } from "react-redux";
import { colors } from "../../constants/colors";
import { Loader } from "../Loader";

const AboutApp = () => {
  const { aboutData } = useSelector((state) => state.aboutReducer);

  return (
    <Box className="about_Cont text_card">
      <Box className="about_view">
        {aboutData && aboutData[0]?.legal ? (
          <p
            dangerouslySetInnerHTML={{
              __html: aboutData[0]?.legal,
            }}
          ></p>
        ) : (
          <Typography sx={{ textAlign: "center" }}>data not found</Typography>
        )}
      </Box>
    </Box>
  );
};

export default AboutApp;
