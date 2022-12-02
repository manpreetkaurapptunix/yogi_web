/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Calendar from "react-calendar";
import { useRouter } from "next/router";
import InstructorHeader from "../../layout/InstructorHeader";
import {
  Box,
  Grid,
  List,
  Typography,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Button,
  Divider,
} from "@mui/material";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { InstructorFooter } from "../../layout/InstructorFooter";
import { getInsBookingAction } from "../../redux/actions";
import moment from "moment";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import StarIcon from "@mui/icons-material/Star";

const Calender = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [value, setValue] = useState(new Date());
  const [sharedata, setShareData] = useState(null);
  const listData = useSelector(
    (state) => state?.bookingReducer?.instBookingData
  );
  const userData = useSelector((state) => state.authReducer.userData);

  console.log(userData, "listDatalistData");

  const onChange = (val) => {
    setValue(val);
    setShareData("");
    console.log(val, "lplp");
    const payload = {
      type: "",
      date: moment(val).format("YYYY-MM-DD"),
    };
    dispatch(getInsBookingAction.request(payload));
  };

  useEffect(() => {
    const payload = {
      type: "",
      date: moment(new Date()).format("YYYY-MM-DD"),
    };
    dispatch(getInsBookingAction.request(payload));
  }, [dispatch]);

  const datahandler = (item, i) => {
    setShareData(item);
    console.log(item);
  };

  const reviewData = [
    {
      id: 1,
      key: "FullName",
      value: sharedata?.userId?.name || "",
    },
    {
      id: 2,
      key: "Phone No.",
      value:
        sharedata?.userId?.callingCode + " " + sharedata?.userId?.phone || "",
    },
    {
      id: 3,
      key: "Email",
      value: sharedata?.userId?.email || "",
    },
    {
      id: 4,
      key: "Address",
      value: sharedata?.userId?.address || "",
    },
    {
      id: 5,
      key: "Attendees",
      value: sharedata?.numOfPersons || "No",
    },
  ];
  console.log(sharedata?.userId?.currencySymbol, "symbol");
  return (
    <div className="cldr_page  w-100">
      <InstructorHeader />
      <Box className="cstm_container py-80">
        <Box className="sub_hdg">
          <Typography variant="h3" className="fw-bold">
            Calender Booking
          </Typography>
        </Box>
        <Grid container spacing={{ md: 8, sm: 3 }}>
          <Grid item lg={4} md={6} sm={6} xs={12}>
            <Box className="cldr_wpr">
              <Calendar onChange={(val) => onChange(val)} value={value} />
            </Box>
          </Grid>
          <Grid item lg={8} md={6} sm={6} xs={12}>
            {listData && listData?.data?.length ? (
              <Grid container spacing={{ md: 3 }}>
                {listData?.data?.map((item, index) => {
                  return (
                    <Grid item md={6} sm={12} xs={12} key={index}>
                      <Box
                        className="card_booking"
                        onClick={() => datahandler(item)}
                      >
                        <Box className="name_dtl">
                          <figure>
                            <Image
                              width={"70%"}
                              height={"70%"}
                              src={
                                item?.class?.image
                                  ? item?.class?.image[0]
                                  : "/static/images/dummy.png"
                              }
                              alt=" "
                            />
                          </figure>
                          <Box className="usr_dtl">
                            <Typography classN ame="usr_nm">
                              {item?.class?.name || ""}
                            </Typography>
                            <Typography className="dt_tm">
                              {item?.bookingDates &&
                                moment(item?.bookingDates[0]?.date).format(
                                  "MMM Do YYYY"
                                )}
                              , {moment(item?.start_time).format("hh:mm")}-
                              {moment(item?.end_time).format("hh:mm a")}
                            </Typography>
                          </Box>
                          <Typography className="prc">
                            {userData?.currencySymbol + item?.amount || ""}
                          </Typography>
                        </Box>
                        <Box className="bokng_dtl">
                          <Typography>
                            {item?.class?.name +
                              " (  " +
                              item?.category?.name +
                              " )"}
                          </Typography>
                          <Typography className="desc">
                            {item?.class?.desc}
                          </Typography>
                        </Box>
                        <Box></Box>
                      </Box>
                    </Grid>
                  );
                })}
              </Grid>
            ) : (
              <Box className="empty_text h-100 m-0">No data found</Box>
            )}
          </Grid>
        </Grid>

        {sharedata ? (
          <Box className="cldr_dtlm w-100" sx={{ mt: 5 }}>
            {/* <Box className="name_dtl">
              <figure>
                <Image
                  width={"70%"}
                  height={"70%"}
                  src={sharedata?.class?.image || "/static/images/dummy.png"}
                  alt="img"
                />
              </figure>
              <Box className="usr_dtl">
                <Typography className="usr_nm">
                  {sharedata?.class?.name}
                </Typography>
                <Typography className="dt_tm">
                  {moment(sharedata?.class?.start_date).format(
                    "Do-MMM-YYYY"
                  ) +
                    " - " +
                    moment(sharedata?.class?.end_date).format("Do-MMM-YYYY")}
                </Typography>

                <Typography>Amount :- {sharedata?.amount}</Typography>
                <Typography>
                  {sharedata?.class?.availableSeats} seats are available
                </Typography>
                <Typography>Amount :- {sharedata?.amount}</Typography>
              </Box>
            </Box> */}
            {/* ***** */}
            <Box className="bookCompo_cont" sx={{ marginLeft: "0 !important" }}>
              <Box className="booking_del">
                <figure>
                  <img
                    src={
                      sharedata?.class?.image
                        ? sharedata?.class?.image[0]
                        : "/static/images/homeYoga.png"
                    }
                    alt="img"
                  />
                </figure>
                <Box>
                  <Box className="detal_heading">
                    <Box className="text_head">
                      <h6>{sharedata?.class?.name || ""}</h6>
                      <span className="fz-18">{sharedata?.category?.name}</span>
                    </Box>
                  </Box>
                  <Box className="rating">
                    <StarIcon />
                    <Typography>0</Typography>

                    {/* <Typography>(2.5 km)</Typography> */}
                  </Box>
                  <Typography className="fz-16">
                    {sharedata?.bookingDates &&
                      moment(sharedata?.bookingDates[0]?.date).format(
                        "MMM Do YYYY"
                      )}
                    , {moment(sharedata?.start_time).format("hh:mm")}-
                    {moment(sharedata?.end_time).format("hh:mm a")}
                  </Typography>
                </Box>
                <Box className="complete-text">
                  {/* {past && <Typography></Typography>} */}
                </Box>
              </Box>
              {/* <Divider className="detal_divider"></Divider> */}
              <Box className="contact" sx={{ mb: 1 }}>
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Contact Details{" "}
                </Typography>

                <Box className="booking_del_Form">
                  <List sx={{ width: "100%", maxWidth: "100%" }}>
                    <ListItem sx={{ m: 0, p: 0 }}>
                      <ListItemText
                        primary={"Full Name"}
                        sx={{ m: 0, p: 0 }}
                        className="color_light"
                      />
                      <ListItemText
                        primary={sharedata?.userId?.name}
                        sx={{ m: 0, p: 0, textAlign: "right" }}
                      />
                    </ListItem>
                  </List>

                  {sharedata?.userId?.email && (
                    <List sx={{ width: "100%", maxWidth: "100%" }}>
                      <ListItem sx={{ m: 0, p: 0 }}>
                        <ListItemText
                          primary={"Email"}
                          sx={{ m: 0, p: 0 }}
                          className="color_light"
                        />
                        <ListItemText
                          primary={sharedata?.userId?.email}
                          sx={{ m: 0, p: 0, textAlign: "right" }}
                        />
                      </ListItem>
                    </List>
                  )}

                  {sharedata?.userId?.phone && (
                    <List sx={{ width: "100%", maxWidth: "100%" }}>
                      <ListItem sx={{ m: 0, p: 0 }}>
                        <ListItemText
                          primary={"Phone No."}
                          sx={{ m: 0, p: 0 }}
                          className="color_light"
                        />
                        <ListItemText
                          primary={
                            sharedata?.userId?.callingCode +
                            " " +
                            sharedata?.userId?.phone
                          }
                          sx={{ m: 0, p: 0, textAlign: "right" }}
                        />
                      </ListItem>
                    </List>
                  )}

                  {sharedata?.userId?.address && (
                    <List sx={{ width: "100%", maxWidth: "100%" }}>
                      <ListItem sx={{ m: 0, p: 0 }}>
                        <ListItemText
                          primary={"Address"}
                          sx={{ m: 0, p: 0 }}
                          className="color_light"
                        />
                        <ListItemText
                          primary={sharedata?.userId?.address}
                          sx={{ m: 0, p: 0, textAlign: "right" }}
                        />
                      </ListItem>
                    </List>
                  )}

                  {sharedata?.numOfPersons && (
                    <List sx={{ width: "100%", maxWidth: "100%" }}>
                      <ListItem sx={{ m: 0, p: 0 }}>
                        <ListItemText
                          primary={"Attendees"}
                          sx={{ m: 0, p: 0 }}
                          className="color_light"
                        />
                        <ListItemText
                          primary={sharedata?.numOfPersons}
                          sx={{ m: 0, p: 0, textAlign: "right" }}
                        />
                      </ListItem>
                    </List>
                  )}
                </Box>
              </Box>

              <Divider className="detal_divider"></Divider>

              <Box className="booking_del_cost">
                <Table size="small" aria-label="purchases">
                  <TableBody>
                    <TableCell align="left" sx={{ p: 0 }}>
                      <Typography className="fz-18 fw-bold">
                        Grand Total
                      </Typography>
                    </TableCell>
                    <TableCell align="right" sx={{ p: 0 }}>
                      <Typography className="fz-18">
                        {sharedata?.userId?.currencySymbol + sharedata?.amount}
                      </Typography>
                    </TableCell>
                  </TableBody>
                </Table>
              </Box>
            </Box>
          </Box>
        ) : (
          " "
        )}
      </Box>
      <InstructorFooter />
    </div>
  );
};

export default Calender;
