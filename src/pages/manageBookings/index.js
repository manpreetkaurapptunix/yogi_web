import { Box, Grid, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import BookingCard from "../../components/manageBookings/BookingCard";
import DetailCompo from "../../components/manageBookings/DetailCompo";
import { colors } from "../../constants/colors";
import { InstructorFooter } from "../../layout/InstructorFooter";
import InstructorHeader from "../../layout/InstructorHeader";
import { getInsBookingAction } from "../../redux/actions";
import { Loader } from "../../components/Loader";

const ManageBookings = () => {
  const dispatch = useDispatch();
  const [isUpcomingBooking, setisUpcomingBooking] = useState(true);
  const [listData, setlistData] = useState("");

  const instBookingData = useSelector(
    (state) => state.bookingReducer.instBookingData
  );

  useEffect(() => {
    getUpcoming();
  }, [dispatch]);

  useEffect(() => {
    if (instBookingData?.data) {
      setlistData(instBookingData?.data[0]);
    }
  }, [instBookingData]);

  const getUpcoming = () => {
    const payload = {
      type: "UPCOMING",
      date: "",
    };
    dispatch(getInsBookingAction.request(payload));
  };

  const getPast = () => {
    const payload = {
      type: "PAST",
      page: 1,
      size: 20,
      date: "",
    };
    dispatch(getInsBookingAction.request(payload));
  };

  return (
    <Box className="myClass_page w-100">
      <InstructorHeader />
      {/* <Loader /> */}
      <Box className="content_cont cstm_container">
        <Box className="myClass_wrap">
          <Box className="sub_hdg">
            <h3 align="center">Manage Bookings</h3>
          </Box>
          <Grid container spacing={3}>
            <Grid item xl={6} lg={6} sm={12} xs={12}>
              <Box className="toggle_myClass">
                <Box
                  style={{
                    backgroundColor: isUpcomingBooking
                      ? colors.mainColor
                      : colors.lightPink,
                    color: !isUpcomingBooking ? "" : colors.white,
                  }}
                  className="toggle_myClassItem"
                >
                  <Typography
                    onClick={() => {
                      getUpcoming(), setisUpcomingBooking(true);
                    }}
                    className="email_text"
                  >
                    Upcoming Booking
                  </Typography>
                </Box>
                <Box
                  style={{
                    backgroundColor: !isUpcomingBooking
                      ? colors.mainColor
                      : colors.lightPink,
                    color: !isUpcomingBooking ? colors.white : "",
                  }}
                  className="toggle_myClassItem"
                >
                  <Typography
                    onClick={() => {
                      getPast(), setisUpcomingBooking(false);
                    }}
                    className="email_text"
                  >
                    Past Booking
                  </Typography>
                </Box>
              </Box>
              <Box>
                {instBookingData && instBookingData?.data?.length ? (
                  instBookingData?.data?.map((item, index) => {
                    return (
                      <Box key={index}>
                        {isUpcomingBooking ? (
                          <Box
                            onClick={() => {
                              setlistData(item);
                            }}
                          >
                            <BookingCard data={item} />
                          </Box>
                        ) : (
                          <Box
                            onClick={() => {
                              setlistData(item);
                            }}
                          >
                            <BookingCard past data={item} />
                          </Box>
                        )}
                      </Box>
                    );
                  })
                ) : (
                  <Typography className="empty_text">
                    No Bookings Found
                  </Typography>
                )}
              </Box>
            </Grid>
            <Grid item xl={6} lg={6} sm={12} xs={12}>
              {instBookingData && instBookingData?.data?.length ? (
                <DetailCompo data={listData} />
              ) : (
                <Box className="bookCompo_cont">
                  <Typography className="empty_text">
                    No Booking Data Found
                  </Typography>
                </Box>
              )}
            </Grid>
          </Grid>
        </Box>
      </Box>
      <InstructorFooter />
    </Box>
  );
};

export default ManageBookings;
