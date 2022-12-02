import { Button, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Categories } from "../../components/home/Categories";
import { ClassCard } from "../../components/home/ClassCard";
import { Footer } from "../../layout/Footer";
import FilterAltIcon from "@mui/icons-material/FilterAlt";
import Header from "../../layout/Header";
import { useDispatch, useSelector } from "react-redux";
import { modalVisible } from "../../redux/actions";
import { Box } from "@material-ui/core";
import Pagination from "../../components/Pagination";
import { useRouter } from "next/router";
import { Modules } from "../../constants/modules";
import { getCookie } from "cookies-next";
import InstructorHome from "../../features/home/InstructorHome";
import CustomerHome from "../../features/home/CustomerHome";

function LandingPage() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [roleType, setroleType] = useState("user");

  const isAuthorised = useSelector((state) => state.commonReducer.isAuthorised);
  const userData = useSelector((state) => state.authReducer.userData);
  const roleRed = useSelector((state) => state.commonReducer.tempData);

  useEffect(() => {
    const role = getCookie("role");
    setroleType(role);
  }, [getCookie]);

  return (
    <Box className="home_wrapper w-100">
      {userData?.role == "instructor" ||
      roleType == "instructor" ||
      roleRed?.role == "instructor" ? (
        <InstructorHome />
      ) : (
        <CustomerHome />
      )}
    </Box>
  );
}

export default LandingPage;
