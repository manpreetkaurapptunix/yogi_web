import { Box } from "@mui/material";
import React, { useState, useEffect } from "react";
import { Footer } from "../../layout/Footer";
import Header from "../../layout/Header";
import CustomerProfile from "../../components/profile/CustomerProfile";
import { getCookie } from "cookies-next";
import InstructorProfile from "../../components/profile/InstructorProfile";
import InstructorHeader from "../../layout/InstructorHeader";
import { useDispatch, useSelector } from "react-redux";
import { getProfileAction } from "../../redux/actions";
import { InstructorFooter } from "../../layout/InstructorFooter";

const Profile = () => {
  const dispatch = useDispatch();

  const isAuthorised = useSelector((state) => state.commonReducer.isAuthorised);
  const userData = useSelector((state) => state.authReducer.userData);
  const roleRed = useSelector((state) => state.commonReducer.tempData);

  return (
    <Box className="profile_page w-100">
      {userData?.role == "instructor" ? <InstructorHeader /> : <Header />}
      <Box className="cstm_container">
        <Box className="content_cont">
          {userData?.role == "instructor" || roleRed?.role == "instructor" ? (
            <InstructorProfile />
          ) : (
            <CustomerProfile />
          )}
        </Box>
      </Box>
      {userData?.role == "instructor" ? <InstructorFooter /> : <Footer />}
    </Box>
  );
};

export default Profile;
