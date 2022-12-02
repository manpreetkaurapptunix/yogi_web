import React, { useState, useEffect } from "react";
import { Box } from "@mui/material";
import { useRouter } from "next/router";
import Header from "../../layout/Header";
import { Footer } from "../../layout/Footer";
import { aboutAction } from "../../redux/actions";
import { useDispatch, useSelector } from "react-redux";
import { Loader } from "../../components/Loader";

const PrivacyPolicy = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const { aboutData, isLoading } = useSelector((state) => state.aboutReducer);
  // console.log(aboutData, isLoading, "pp=============pp");

  useEffect(() => {
    dispatch(aboutAction.request());
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }
  return (
    <Box className="setting_page w-100" sx={{ minHeight: "70vh", width: 1 }}>
      <Header />
      <Box className="cstm_container">
        <Box className="setting_wrap">
          <Box className="sub_hdg setting_hdg">
            <h3 align="center">Privacy & Policy</h3>
          </Box>
          <Box className="" sx={{ mb: 5 }}>
            <p
              dangerouslySetInnerHTML={{
                __html: aboutData ? aboutData[0]?.privacyPolicy : "",
              }}
            ></p>
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default PrivacyPolicy;
