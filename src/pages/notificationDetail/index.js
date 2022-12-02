import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
  Container,
  Grid,
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import Image from "next/image";
import StarIcon from "@mui/icons-material/Star";
import { useDispatch, useSelector } from "react-redux";
import { InstructorFooter } from "../../layout/InstructorFooter";
import CommonDialoge from "../../layout/CommonDialoge";
import { colors } from "../../constants/colors";
import InstructorHeader from "../../layout/InstructorHeader";
import moment from "moment";
import { getCookie } from "cookies-next";
import Header from "../../layout/Header";
import { Footer } from "../../layout/Footer";
import { ImageSlider } from "../../components/Common/ImageSlider";

const NotificationDetail = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [steps, setsteps] = useState(0);
  const [roleType, setroleType] = useState("");
  const { singleClass } = useSelector((state) => state.classReducer);
  const data = useSelector(
    (state) => state.commonReducer.tempData?.notificationDetail
  );
  const roleRed = useSelector((state) => state.commonReducer.tempData);
  console.log(data, data?.class?.image, "notification");

  useEffect(() => {
    const type = getCookie("type");
    setroleType(type);
  }, [dispatch]);

  useEffect(() => {
    if (!data) {
      router.back();
    }
  }, [data]);

  const reviewData = [
    {
      id: 1,
      key: "FullName",
      value: data?.userId?.name || "******",
    },
    {
      id: 2,
      key: "Phone No.",
      value: data?.userId?.callingCode + " " + data?.userId?.phone,
    },
    {
      id: 3,
      key: "Email",
      value: data?.userId?.email || "******",
    },
    {
      id: 4,
      key: "Address",
      value: data?.userId?.address || "******",
    },
    {
      id: 5,
      key: "Attendees",
      value: data?.booking?.numOfPersons || "No",
    },
  ];

  return (
    <Box className={"classDetail_page w-100"}>
      {roleType == "instructor" || roleRed?.role == "instructor" ? (
        <InstructorHeader />
      ) : (
        <Header />
      )}
      <CommonDialoge classDetail setsteps={setsteps} />
      <Box className="content_cont">
        <Box className="cstm_container">
          <Grid container spacing={8}>
            <Grid item xl={6} lg={6} sm={12} xs={12}>
              <Box className="class_fetureImg">
                {/* <figure>
                  <Image
                    width={"200%"}
                    height={"200%"}
                    src={
                      data?.class?.image
                        ? data?.class?.image[0]
                        : "/static/images/homeYoga.png"
                    }
                    alt=" "
                  />
                </figure> */}
                <ImageSlider data={data?.class?.image} />
              </Box>
            </Grid>
            <Grid item xl={6} lg={6} sm={12} xs={12}>
              <Box className="class_details class_details_ntf ">
                <Box className="contentImg_Bx">
                  <Box className="contentImg_left">
                    <h3>{data?.class?.name || "Class Name"}</h3>
                    <Typography className="fz-14 color_light">
                      {data?.class?.availableSeats || "0"} Seats Available
                    </Typography>
                  </Box>
                </Box>
                <Box className="book_wrap">
                  <Box className="book_wrap_hdg">
                    <h6>Selected Dates</h6>
                    {data?.booking?.bookingDates?.map((item, index) => {
                      return (
                        <Typography key={index}>
                          {moment(item?.date).format("MMM Do YYYY")}
                        </Typography>
                      );
                    })}
                  </Box>
                  <h6>Selected Time Slot</h6>
                  <Box className="time_book">
                    <Box className="timeClass_view">
                      <Typography>
                        {" "}
                        {moment(data?.bookingId?.start_time).format("h:mm A") +
                          " - " +
                          moment(data?.bookingId?.end_time).format("h:mm A")}
                      </Typography>
                    </Box>
                  </Box>

                  <Box className="exercise_box">
                    <h6>Exercise Include</h6>
                    <Box className="exer_view_wpr" sx={{ marginTop: 1 }}>
                      {data?.class?.excercises?.map((item, index) => {
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
                            {/* <Typography align="center">{item?.name}</Typography> */}
                          </Box>
                        );
                      })}
                    </Box>
                    <Box className="pice_book">
                      <Box className="pice_book_text">
                        Total Amount:{" "}
                        <b>
                          {data?.instructor?.currencySymbol +
                            " " +
                            data?.booking?.amount || "0"}
                        </b>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Grid>
          </Grid>

          <Box>
            <Box className="contact" sx={{ mb: 1 }}>
              {/* <Typography variant="h6" sx={{ fontWeight: 600 }}>
                Contact Details{" "}
              </Typography> */}
              {/* <Box className="booking_del_Form">
                {reviewData.map((item, index) => {
                  return (
                    <List key={index} sx={{ width: "100%", maxWidth: "100%" }}>
                      <ListItem sx={{ m: 0, p: 0 }}>
                        <ListItemText
                          primary={item.key}
                          sx={{ m: 0, p: 0 }}
                          className="color_light"
                        />
                        <ListItemText
                          primary={item.value}
                          sx={{ m: 0, p: 0, textAlign: "right" }}
                        />
                      </ListItem>
                    </List>
                  );
                })}
              </Box> */}
            </Box>
            <Box className="class_decbx">
              <h6>Description</h6>
              <p>{data?.class?.desc || ""}</p>
            </Box>
            <Box className="class_decbx mt-20">
              <h6>Cancellation Policy</h6>
              <p>{data?.class?.cancel_policy || ""}</p>
            </Box>
          </Box>
        </Box>
      </Box>
      {roleType == "instructor" || roleRed?.role == "instructor" ? (
        <InstructorFooter />
      ) : (
        <Footer />
      )}
    </Box>
  );
};

export default NotificationDetail;
