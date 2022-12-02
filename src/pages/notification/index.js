import { Typography } from "@mui/material";
import { Box } from "@mui/system";
import React, { useEffect, useState } from "react";
import { Footer } from "../../layout/Footer";
import Header from "../../layout/Header";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import { useDispatch, useSelector } from "react-redux";
import { notificationListAction, tempData } from "../../redux/actions";
import dayjs from "dayjs";
import { getCookie } from "cookies-next";
import { InstructorFooter } from "../../layout/InstructorFooter";
import InstructorHeader from "../../layout/InstructorHeader";
import moment from "moment";
import { useRouter } from "next/router";

const Notification = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [typeRole, settypeRole] = useState("");

  const notification = useSelector((state) => state.notifReducer.notifData);
  const roleRed = useSelector((state) => state.commonReducer.tempData);

  useEffect(() => {
    dispatch(notificationListAction.request());
  }, [dispatch]);

  useEffect(() => {
    const role = getCookie("type");
    settypeRole(role);
  }, [typeRole]);

  return (
    <Box className="w-100">
      {typeRole == "instructor" || roleRed?.role == "instructor" ? (
        <InstructorHeader />
      ) : (
        <Header />
      )}
      <Box className="cstm_container ntf_sec">
        <Box className="sub_hdg">
          <Typography variant="h3" align="center">
            Notification
          </Typography>
        </Box>
        <Box>
          {notification && notification?.new?.length ? (
            <Typography> Recent Notifications</Typography>
          ) : (
            ""
          )}
        </Box>
        <Box
          className={
            notification && notification?.new?.length ? "ntf_list" : ""
          }
        >
          {notification && notification?.new?.length
            ? notification?.new?.map((item, i) => {
                return (
                  <Box
                    onClick={() => {
                      dispatch(
                        tempData?.updateTempData({ notificationDetail: item })
                      );
                      router.push("/notificationDetail");
                    }}
                    className="ntf_item text_card"
                    key={i}
                  >
                    <Box className="ntf_icon">
                      <NotificationsNoneIcon />
                    </Box>
                    <Box className="ntf_desc">
                      <Typography variant="h6">{item?.tittle}</Typography>
                      <Typography className="fz-14">{item?.message}</Typography>
                    </Box>
                    <Box className="ntf_time">
                      {/* {moment(item?.createdAt).endOf("day").fromNow()} */}
                      {moment(new Date(item?.createdAt).getTime())
                        .startOf("h:mm")
                        .fromNow()}
                    </Box>
                  </Box>
                );
              })
            : ""}
        </Box>
        <Box>
          {notification && notification?.old?.length ? (
            <Typography> Older Notifications</Typography>
          ) : (
            ""
          )}
        </Box>
        <Box
          className={
            notification && notification?.old?.length ? "ntf_list" : ""
          }
        >
          {notification && notification?.old?.length
            ? notification?.old?.map((item, i) => {
                return (
                  <Box
                    onClick={() => {
                      dispatch(
                        tempData?.updateTempData({ notificationDetail: item })
                      );
                      router.push("/notificationDetail");
                    }}
                    className="ntf_item text_card"
                    key={i}
                  >
                    <Box className="ntf_icon">
                      <NotificationsNoneIcon />
                    </Box>
                    <Box className="ntf_desc">
                      <Typography variant="h6">{item?.tittle}</Typography>
                      <Typography className="fz-14">{item?.message}</Typography>
                    </Box>
                    <Box className="ntf_time">
                      {moment(new Date(item?.createdAt).getTime())
                        .startOf("h:mm")
                        .fromNow()}
                    </Box>
                  </Box>
                );
              })
            : ""}
        </Box>
        <Box>
          {notification &&
          notification?.old?.length == 0 &&
          notification?.new?.length == 0 ? (
            <Typography className="empty_text mb-30">
              No Notification found
            </Typography>
          ) : (
            <></>
          )}
        </Box>
      </Box>
      {typeRole == "instructor" || roleRed?.role == "instructor" ? (
        <InstructorFooter />
      ) : (
        <Footer />
      )}
    </Box>
  );
};

export default Notification;
