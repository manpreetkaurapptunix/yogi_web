/* eslint-disable @next/next/no-img-element */
import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";
import moment from "moment";
import Image from "next/image";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChatList } from "../../redux/actions";

const ChatList = (props) => {
  const { data, setselectedUser, selectedUser, roomJoined, setRoomJoined } =
    props;

  // console.log(data.notification, "data");

  return (
    <Box className="chat_list">
      <Box className="user_img">
        <figure>
          <Image
            width={"50%"}
            height={"50%"}
            src={data?.user?.image || "/static/images/user.png"}
            alt=""
          />
        </figure>
      </Box>
      <Box className="chat_ctnt">
        <Box className="name_time">
          <Typography className="fz-18 fw-bold">
            {data?.user?.name || ""}
          </Typography>
          <Typography className="fz-14 color_light">
            {/* {moment(data?.lastMessage?.createdAt).startOf("day").fromNow()} */}
            {moment(new Date(data?.lastMessage?.createdAt).getTime())
              .startOf("h:mm")
              .fromNow()}
          </Typography>
        </Box>
        <Box className="notif_wpr">
          {data?.lastMessage?.type === "TEXT" ? (
            <Typography className="chatSml_dec color_light chat_desc">
              {data?.lastMessage?.text || ""}
            </Typography>
          ) : (
            <Box className="lst_msg_img">
              <img src={data?.lastMessage?.text} alt="last chat img" />
            </Box>
          )}
          {data?.notification === undefined ? (
            ""
          ) : (
            <Box className="chatNotin">{data?.notification}</Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default ChatList;
