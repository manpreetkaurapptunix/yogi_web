import React, { useState, useEffect } from "react";
import { Container, Grid, Box, Typography } from "@mui/material";
import Image from "next/image";
import StarIcon from "@mui/icons-material/Star";
import { useRouter, withRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { InstructorFooter } from "../../layout/InstructorFooter";

import { AboutInstructor } from "../../components/classDetail/AboutInstructor";
import { BookNow } from "../../components/classDetail/bookSteps/BookNow";
import { BookContinue } from "../../components/classDetail/bookSteps/BookContinue";
import { PayNow } from "../../components/classDetail/bookSteps/PayNow";
import { BookDetail } from "../../components/classDetail/bookSteps/BookDetail";
import CommonDialoge from "../../layout/CommonDialoge";
import { classAction, singleClassAction } from "../../redux/actions";
import { colors } from "../../constants/colors";
import InstructorHeader from "../../layout/InstructorHeader";
import moment from "moment";
import { ImageSlider } from "../../components/Common/ImageSlider";

const InstructorClass = () => {
  const dispatch = useDispatch();
  const [steps, setsteps] = useState(0);
  const { singleClass } = useSelector((state) => state.classReducer);
  const data = useSelector((state) => state.classReducer.instClassByIDData);
  const router = useRouter();
  console.log(data, "kml");

  useEffect(() => {
    if (!data) {
      router.back();
    }
  }, []);

  return (
    <Box
      className={
        steps === 2
          ? "classDetail_page  classPayment_page w-100"
          : "classDetail_page w-100"
      }
    >
      <InstructorHeader />
      <CommonDialoge classDetail setsteps={setsteps} />
      <Box className="content_cont">
        <Box className="cstm_container">
          <Grid container spacing={8}>
            <Grid item xl={6} lg={6} sm={12} xs={12}>
              <Box className="class_fetureImg ">
                {/* <figure>
                  <Image
                    width={"200%"}
                    height={"200%"}
                    src={data?.image[0] || "/static/images/homeYog1a.png"}
                    alt=" "
                  />
                </figure> */}
                <ImageSlider data={data?.image || []} />
              </Box>
            </Grid>
            <Grid item xl={6} lg={6} sm={12} xs={12}>
              <Box className="class_details">
                <Box className="contentImg_Bx">
                  <Box className="contentImg_left">
                    <h3>{data?.name || "Class Name"}</h3>
                    {/* <span className="fz-18">Yoga</span> */}
                    <Box className="rating mb-0">
                      <StarIcon
                        color={
                          singleClass?.avgRating ? colors.mainColor : "grey"
                        }
                      />
                      <Typography>{singleClass?.avgRating || "0"}</Typography>
                    </Box>
                  </Box>
                  <Box className="contentImg_right">
                    <figure className="map_img">
                      <Image
                        width={"100%"}
                        height={"100%"}
                        src={"/static/images/map.png"}
                        alt=" "
                      />
                    </figure>
                  </Box>
                </Box>
                <Box className="book_wrap">
                  <Box className="book_wrap_hdg">
                    <h6>
                      {moment(data?.start_date).format("MMM Do YYYY") +
                        " - " +
                        moment(data?.end_date).format("MMM Do YYYY")}
                    </h6>
                    <Typography className="fz-14 color_light">
                      {data?.availableSeats || "0"} Seats Available
                    </Typography>
                  </Box>
                  <Box className="time_book">
                    {data?.time?.map((item, index) => {
                      return (
                        <Box key={index} className="timeClass_view">
                          {/* <Typography>{"2"}</Typography> */}
                          <Typography>
                            {" "}
                            {moment(item?.start_time).format("h:mm A") +
                              " - " +
                              moment(item?.end_time).format("h:mm A")}
                          </Typography>
                        </Box>
                      );
                    })}
                  </Box>

                  <Box className="exercise_box">
                    <h6>Exercise Include</h6>
                    <Box className="exer_view_wpr" sx={{ marginTop: 1 }}>
                      {data?.excercises?.map((item, index) => {
                        return (
                          <Box className="exer_view" key={index}>
                            <figure>
                              <Image
                                width={"50%"}
                                height={"50%"}
                                src={item?.image || "/static/images/map.png"}
                                alt=" "
                              />
                            </figure>
                          </Box>
                        );
                      })}
                    </Box>
                    <Box className="pice_book">
                      <Box className="pice_book_text">
                        Price: <b>${data?.price_per_head || "0"}</b>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>

              {/* {steps == 0 ? (
                <BookNow setsteps={setsteps} data={singleClass} />
              ) : steps == 1 ? (
                <BookContinue setsteps={setsteps} />
              ) : (
                <BookDetail setsteps={setsteps} />
              )} */}
            </Grid>
          </Grid>

          <Box>
            <Box className="class_decbx">
              <h6>Description</h6>
              <p>{singleClass?.desc || ""}</p>
              <p>{data?.desc}</p>
            </Box>
            <Box className="class_decbx mt-20">
              <h6>Cancellation Policy</h6>
              <p>{data?.cancel_policy}</p>
            </Box>
          </Box>
        </Box>
      </Box>
      <InstructorFooter />
    </Box>
  );
};

export default InstructorClass;
