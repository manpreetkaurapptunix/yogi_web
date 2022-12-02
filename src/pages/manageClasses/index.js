import { Box, Grid, TextField } from "@mui/material";
import React, { useState, useEffect } from "react";
import { InstructorFooter } from "../../layout/InstructorFooter";
import InstructorHeader from "../../layout/InstructorHeader";
import ClassCompo from "../../components/manageClass/ClassCompo";
import AddClass from "../../components/manageClass/AddClass";
import AboutInstructor from "../../components/manageClass/AboutInstructor";
import { useDispatch, useSelector } from "react-redux";
import { getInstructorClassAction } from "../../redux/actions";
import EditClass from "../../components/manageClass/EditClass";
import EditAboutInstructor from "../../components/manageClass/EditAboutInstructor";
import { Typography } from "@material-ui/core";

const ManageClasses = () => {
  const dispatch = useDispatch();
  const [steps, setsteps] = useState(0);
  const [formType, setformType] = useState(0);

  const InsClassData = useSelector(
    (state) => state.classReducer.instructorClassData
  );

  useEffect(() => {
    dispatch(getInstructorClassAction.request());
  }, [dispatch]);

  return (
    <Box className="manage_contain w-100">
      <InstructorHeader />
      <Box className="manage_wrap">
        <Box className="cstm_container">
          <Box className="sub_hdg whishlist_hdg">
            <h3 align="center">Manage Classes</h3>
          </Box>
          <Grid container spacing={3}>
            <Grid item xl={6} lg={6} sm={12} xs={12}>
              {InsClassData?.data && InsClassData?.data?.length ? (
                InsClassData?.data?.map((item, index) => {
                  return (
                    <Box key={index}>
                      <ClassCompo data={item} setformType={setformType} />
                    </Box>
                  );
                })
              ) : (
                <Typography className="empty_text">No Classes Found</Typography>
              )}
            </Grid>
            <Grid item xl={6} lg={6} sm={12} xs={12}>
              {/* <Box>
                formType == 0 ?
                {steps == 0 ? (
                  <AddClass setsteps={setsteps} />
                ) : (
                  <AboutInstructor setsteps={setsteps} />
                )}
                <EditClass />
              </Box> */}
              {formType == 0 ? (
                steps == 0 ? (
                  <AddClass setsteps={setsteps} />
                ) : (
                  <AboutInstructor setsteps={setsteps} />
                )
              ) : steps == 0 ? (
                <EditClass setformType={setformType} setsteps={setsteps} />
              ) : (
                <EditAboutInstructor
                  setformType={setformType}
                  setsteps={setsteps}
                />
              )}
            </Grid>
          </Grid>
        </Box>
      </Box>
      <InstructorFooter />
    </Box>
  );
};

export default ManageClasses;
