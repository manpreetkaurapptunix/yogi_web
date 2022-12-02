import React from "react";
import { useSelector } from "react-redux";
import { Box, Typography } from "@mui/material";

const TermsConditions = () => {
  const { aboutData } = useSelector((state) => state.aboutReducer);

  return (
    <Box className="terms_Cont text_card">
      <Box className="terms_view">
        {aboutData && aboutData[0]?.termsAndConditions ? (
          <p
            dangerouslySetInnerHTML={{
              __html: aboutData[0]?.termsAndConditions,
            }}
          ></p>
        ) : (
          <Typography sx={{ textAlign: "center" }}>data not found</Typography>
        )}
      </Box>
    </Box>
  );
};

export default TermsConditions;
