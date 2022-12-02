import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Footer } from "../../layout/Footer";
import { Box } from "@mui/material";
import { getCookie } from "cookies-next";
import InstructorSetting from "../../features/settings/InstructorSetting";
import CustomerSetting from "../../features/settings/CustomerSetting";
import { aboutAction } from "../../redux/actions";
import { Loader } from "../../components/Loader";

const Settings = () => {
  const [value, setValue] = useState(0);

  const [roleType, setroleType] = useState("");
  const dispatch = useDispatch();
  const { aboutData, isLoading } = useSelector((state) => state.aboutReducer);
  const roleRed = useSelector((state) => state.commonReducer.tempData);

  useEffect(() => {
    const type = getCookie("type");
    setroleType(type);
    dispatch(aboutAction.request());
  }, [dispatch]);

  if (isLoading) {
    return <Loader />;
  }

  return (
    <Box className="setting_page w-100">
      {roleType == "instructor" || roleRed?.role == "instructor" ? (
        <InstructorSetting />
      ) : (
        <CustomerSetting />
      )}
    </Box>
  );
};

export default Settings;
