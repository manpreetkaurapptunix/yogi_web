import { Box, Button, Typography } from "@mui/material";
import dayjs from "dayjs";
import moment from "moment";
import Image from "next/image";
import React from "react";

const BookingCard = (props) => {
  const { data, past } = props;
  return (
    <Box className="card_booking">
      <Box className="name_dtl">
        <figure>
          <Image
            width={"70%"}
            height={"70%"}
            src={
              data?.userId?.image
                ? data?.userId?.image[0]
                : "/static/images/dummy.png"
            }
            alt=" "
          />
        </figure>
        <Box className="usr_dtl">
          <Typography classN ame="usr_nm">
            {data?.userId?.name || ""}
          </Typography>
          <Typography className="dt_tm">
            {/* {data?.date || dayjs().format("HH:mm")}
             */}
            {data?.bookingDates &&
              moment(data?.bookingDates[0]?.date).format("MMM Do YYYY")}
            , {moment(data?.start_time).format("hh:mm")}-
            {moment(data?.end_time).format("hh:mm a")}
          </Typography>
        </Box>
        <Typography className="prc">
          {data?.userId?.currencySymbol + " " + data?.amount || ""}
        </Typography>
      </Box>
      <Box className="bokng_dtl">
        <Typography>
          {data?.class?.name + " ( " + data?.category?.name + " )"}
        </Typography>
        <Typography className="desc">{data?.class?.desc}</Typography>
      </Box>
      <Box>
        {past ? (
          <Box className="bokng_status">
            {data?.status == 2 && (
              <Box className="complete-text">
                <span className="fw-bold">Completed</span>
              </Box>
            )}
            {data?.status == 3 && (
              <Box className="cancel-text">
                <span className="fw-bold">Cancelled</span>
              </Box>
            )}
          </Box>
        ) : (
          <Box className="btn_wpr">
            {/* <Button variant="contained" className="btn-design btn-stroke">
              <Typography>Cancel Booking</Typography>
            </Button> */}
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default BookingCard;
