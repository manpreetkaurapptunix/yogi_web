import { TabsUnstyled } from "@mui/base";
import { Box, Grid, Container, Typography } from "@mui/material";

import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClassCard } from "../../components/home/ClassCard";
import { Loader } from "../../components/Loader";
import { BookingData } from "../../components/myClasses/BookingData";
import BookingDetailCompo from "../../components/myClasses/BookingDetailCompo";
import { colors } from "../../constants/colors";
import { Modules } from "../../constants/modules";
import { Footer } from "../../layout/Footer";
import Header from "../../layout/Header";
import { getCustBookingAction, modalVisible } from "../../redux/actions";

const MyClasses = () => {
  const dispatch = useDispatch();
  const [isUpcomingBooking, setisUpcomingBooking] = useState(true);
  const [listData, setlistData] = useState("");
  const [rateNow, setrateNow] = useState(false);
  const [report, setreport] = useState(false);

  const custBookingData = useSelector(
    (state) => state.bookingReducer.custBookingData
  );

  const isAuthorised = useSelector((state) => state.commonReducer.isAuthorised);

  // useEffect(() => {

  // }, [dispatch]);

  useEffect(() => {
    if (isAuthorised) {
      getUpcoming();
      setisUpcomingBooking(true);
    } else {
      dispatch(modalVisible.modalOpen(Modules.LOGIN));
    }
  }, [isAuthorised, dispatch]);

  useEffect(() => {
    if (custBookingData?.data) {
      setlistData(custBookingData?.data[0]);
    }
  }, [custBookingData]);

  const getUpcoming = () => {
    const payload = {
      type: "UPCOMING",
      page: 1,
      size: 20,
    };
    dispatch(getCustBookingAction.request(payload));
  };

  const getPast = () => {
    const payload = {
      type: "PAST",
      page: 1,
      size: 20,
    };
    dispatch(getCustBookingAction.request(payload));
  };

  return (
    <Box className="myClass_page w-100">
      <Header />
      <Box className="content_cont cstm_container">
        <Box className="myClass_wrap">
          <Box className="sub_hdg">
            <h3 align="center">My Classes</h3>
          </Box>
          <Box className="cstm_Row">
            <Grid container spacing={3}>
              <Grid item xl={6} lg={6} md={7} sm={12} xs={12}>
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
                        setisUpcomingBooking(true), getUpcoming();
                      }}
                      className="email_text"
                    >
                      UpComing Booking
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
                        setisUpcomingBooking(false), getPast();
                      }}
                      className="email_text"
                    >
                      Past Booking
                    </Typography>
                  </Box>
                </Box>
                {isUpcomingBooking ? (
                  <Box className="card_compo myclassCards cstm_grid">
                    {custBookingData && custBookingData?.data?.length ? (
                      custBookingData?.data?.map((item, index) => {
                        return (
                          <Box
                            key={index}
                            onClick={() => setlistData(item)}
                            className="cstm_grid_item"
                          >
                            <BookingData data={item} />
                          </Box>
                        );
                      })
                    ) : (
                      <Typography className="empty_text">
                        No Bookings Found
                      </Typography>
                    )}
                  </Box>
                ) : (
                  <Box className="card_compo myclassCards cstm_grid">
                    {custBookingData && custBookingData?.data?.length ? (
                      custBookingData?.data?.map((item, index) => {
                        return (
                          <Box
                            key={index}
                            onClick={() => {
                              setlistData(item);
                              setreport(false);
                              setrateNow(false);
                            }}
                            className="cstm_grid_item"
                          >
                            {/* <ClassCard data={item} past /> */}
                            <BookingData data={item} />
                          </Box>
                        );
                      })
                    ) : (
                      <Typography className="empty_text">
                        No Bookings Found
                      </Typography>
                    )}
                  </Box>
                )}
              </Grid>
              <Grid item xl={6} lg={6} md={5} sm={12} xs={12}>
                {isUpcomingBooking ? (
                  <BookingDetailCompo
                    rateNow={rateNow}
                    setrateNow={setrateNow}
                    report={report}
                    setreport={setreport}
                    data={listData}
                  />
                ) : (
                  <BookingDetailCompo
                    rateNow={rateNow}
                    setrateNow={setrateNow}
                    report={report}
                    setreport={setreport}
                    data={listData}
                    past
                  />
                )}
              </Grid>
            </Grid>
          </Box>
        </Box>
        <Box className="toogle_Class"></Box>
      </Box>
      <Footer />
      {/* <Loader /> */}
    </Box>
  );
};

export default MyClasses;
