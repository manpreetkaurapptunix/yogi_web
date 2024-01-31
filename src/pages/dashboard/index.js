import React, { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { CategoryScale } from "chart.js";
import { colors } from "../../constants/colors";
import Chart from "chart.js/auto";
import InstructorHeader from "../../layout/InstructorHeader";
import RecentChat from "../../components/home/RecentChat";
import Barchart from "../../components/home/BarChart";
import { Box, Grid, Typography, Button } from "@mui/material";
import FormControl from "@mui/material/FormControl";
import { getChatList, insDashAction, tempData } from "../../redux/actions";
import NativeSelect from "@mui/material/NativeSelect";
import { InstructorFooter } from "../../layout/InstructorFooter";
import ChatList from "../../components/messages/ChatList";
import ChatList from "../../components/messages/ChatList";

Chart.register(CategoryScale);

const Dashboard = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [duration, setDuration] = useState("WEEK");
  const isAuthorised = useSelector((state) => state.commonReducer.isAuthorised);
  const { insDashData } = useSelector((state) => state.instDashboard);
  const chatData = useSelector((state) => state.chatReducer.chatList);

  // Graph time dropdown
  const handleChange = (e) => {
    setDuration(e.target.value);
  };

  const graphDuration = [
    { key: "Last Week", value: "WEEK" },
    { key: "Last Month", value: "MONTH" },
    { key: "Last Year", value: "YEAR" },
  ];

  useEffect(() => {
    dispatch(insDashAction.request(duration));
  }, [duration, dispatch]);

  useEffect(() => {
    dispatch(getChatList.request(""));
  }, [dispatch]);

  return (
    <Box>
      <InstructorHeader />
      <Box className="cstm_container mb-100">
        <Box>
          <Box className="sub_hdg whishlist_hdg">
            <h3 className="my_erng">My Earnings</h3>
          </Box>
          <Grid container spacing={3} className="grph_mn">
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12}>
              <Box className="lft_grph">
                <Box className="graph_header" sx={{ mb: 4 }}>
                  <Typography className="wkly">Weekly Average</Typography>
                  <Box className="filter_btn">
                    <FormControl sx={{ m: 1, minWidth: 120 }}>
                      <NativeSelect
                        // defaultValue={1}
                        onChange={(e) => handleChange(e)}
                        displayEmpty
                        inputProps={{ "aria-label": "Without label" }}
                      >
                        {graphDuration.map((item, i) => (
                          <option key={i} value={item.value}>
                            {item.key}
                          </option>
                        ))}
                      </NativeSelect>
                    </FormControl>
                  </Box>
                  {/* <Typography className="dlr_cnt"> $2368.10</Typography> */}
                </Box>
                <Barchart graphData={insDashData?.earning} />
              </Box>
            </Grid>
            <Grid item xl={6} lg={6} md={6} sm={12} xs={12} className="rgt_mn">
              <Box className="right_home">
                <Box className="total_booking">
                  <figure>
                    <Image
                      width={"65%"}
                      height={"65%"}
                      src={"/static/images/booking.png"}
                      alt=""
                    />
                  </figure>
                  <Box className="txt_book">
                    <Typography>Total Bookings</Typography>
                    <Typography className="count">
                      {insDashData?.totalBookings}
                    </Typography>
                  </Box>
                </Box>
                <Box className="total_booking">
                  <figure>
                    <Image
                      width={"65%"}
                      height={"65%"}
                      src={"/static/images/classes.png"}
                      alt=""
                    />
                  </figure>
                  <Box className="txt_book">
                    <Typography>Total Classes</Typography>
                    <Typography className="count">
                      {insDashData?.classes}
                    </Typography>
                  </Box>
                </Box>
                <Box className="btn_wpr">
                  <Button
                    onClick={() => router.push("manageClasses")}
                    variant="contained"
                    className="btn-design"
                  >
                    <Typography>Add New Class</Typography>
                  </Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
        {!chatData || chatData == undefined ? (
          "cbsdjcbhsj"
        ) : (
          <Box>
            <Box className="sub_hdg whishlist_hdg">
              <h3>Recent Chats</h3>
            </Box>

            <Box className="recent_wrap">
              {chatData && chatData?.length ? (
                chatData?.slice(0, 4)?.map((item, index) => {
                  return (
                    <Box
                      onClick={() => {
                        let data = {
                          receiverId: item?.user?._id,
                          receiverName: item?.user?.name,
                          receiverImage: item?.user?.image,
                          connectionId: item?.connectionId,
                        };
                        dispatch(tempData.updateTempData({ chatData: data }));
                        router.push({
                          pathname: `/messages`,
                          query: {
                            receiverId: item?.user?._id,
                            receiverName: item?.user?.name,
                            receiverImage: item?.user?.image,
                            connectionId: item?.connectionId,
                          },
                        });
                      }}
                      key={index}
                      className="outer_cls"
                    >
                      <RecentChat data={item} />
                    </Box>
                  );
                })
              ) : (
                <Typography>No chatlist found</Typography>
              )}
            </Box>
          </Box>
        )}
      </Box>
      <InstructorFooter />
    </Box>
  );
};

export default Dashboard;
