/* eslint-disable @next/next/no-img-element */
import { Box, Typography } from "@mui/material";
import dayjs from "dayjs";
import Image from "next/image";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getChatList } from "../../redux/actions";

const RecentChat = (props) => {
  const { data } = props;

  return (
    <Box className="recentChat_contain">
      <Box className="recentChat_wrap">
        <figure className="chat_img">
          <Image
            width={"65%"}
            height={"65%"}
            src={data?.user?.image || "/static/images/user.png"}
            alt=""
          />
        </figure>

        <Box>
          <Typography className="nm">
            {" "}
            {/* <figure className="crct">
              <Image
                width={"20%"}
                height={"20%"}
                src={data?.correct || "/static/images/correct.png"}
                alt=""
              />
            </figure> */}
            {data?.user?.name}
          </Typography>
          <Box className="recentChat_wrap">
            {/* <figure>
              <Image
                width={"15%"}
                height={"15%"}
                src={data?.sendArrow || "/static/images/sendArrow.png"}
                alt=""
              />
            </figure> */}
            {data?.lastMessage?.type === "TEXT" ? (
              <Typography className="lst_msg">
                {data?.lastMessage?.text || ""}
              </Typography>
            ) : (
              <Box className="lst_msg_img">
                <img src={data?.lastMessage?.text} alt="last chat img" />
              </Box>
            )}
          </Box>
        </Box>
        <Box className="time">
          <Typography className="dat">{data?.time}</Typography>
          {/* <figure>
            <Image
              width={"15%"}
              height={"15%"}
              src={data?.doubleTick || "/static/images/doubleTick.png"}
              alt=""
            />
          </figure> */}
        </Box>
      </Box>
    </Box>
  );
};

export default RecentChat;
