import React from "react";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import moment from "moment";

import StarIcon from "@mui/icons-material/Star";

export const BookingData = (props) => {
  const { past, data } = props;

  return (
    <Box className="classCard_con" sx={{ cursor: "pointer" }}>
      <Box className="card_wrapper">
        <Box className="card_img">
          <figure>
            <Image
              width={"100%"}
              height={"100%"}
              src={data?.classId?.image[0] || "/static/images/homeYoga.png"}
              alt=" "
            />
          </figure>
        </Box>
        <Box className="classCard_content">
          <Box className="name_view">
            <Box className="fz-18 fw-bold" style={{ marginBottom: "6px" }}>
              {data?.classId?.name || "Beginners Class"}
            </Box>
            <ul className="rgt_icons">
              {data?.isBlocked && (
                <li>
                  <Image
                    width={"100%"}
                    height={"100%"}
                    src={"/static/images/heart.svg"}
                    alt=" "
                  />
                </li>
              )}
              <li>
                <Image
                  width={"100%"}
                  height={"100%"}
                  src={"/static/images/map.svg"}
                  alt=" "
                />
              </li>
            </ul>
          </Box>
          <p className="fz-16">{data?.category?.name || ""}</p>
          <Box className="rating">
            <StarIcon />
            <p className="fz-14">{data?.avgRating || "0"}</p>
          </Box>
          <Box className="fz-16 classDate">
            {data?.bookingDates &&
              moment(data?.bookingDates[0]?.date).format("MMM Do YYYY")}
            , {moment(data?.start_time).format("hh:mm")}-
            {moment(data?.end_time).format("hh:mm a")}
          </Box>
          <Box className="fz-16 price">
            Price:{" "}
            <span className="fw-bold">
              {data?.instuctor?.currencySymbol}
              {data?.amount}
            </span>
          </Box>

          {data?.status == 3 && (
            <Box className="cancel-text">
              <span className="fw-bold">Cancelled</span>
            </Box>
          )}
          {data?.status == 2 && (
            <Box className="complete-text">
              <span className="fw-bold">Completed</span>
            </Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};
