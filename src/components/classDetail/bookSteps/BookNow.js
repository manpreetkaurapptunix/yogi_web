import { Typography, Box, Button } from "@mui/material";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { AboutInstructor } from "../AboutInstructor";
import dayjs from "dayjs";
import { useRouter } from "next/router";
const getSymbolFromCurrency = require("currency-symbol-map");

const exercises = [
  {
    id: 1,
    image: "/static/images/asan5.png",
  },
  {
    id: 1,
    image: "/static/images/asan4.png",
  },
  {
    id: 1,
    image: "/static/images/asan3.png",
  },
  {
    id: 1,
    image: "/static/images/asan2.png",
  },
  {
    id: 1,
    image: "/static/images/asan1.png",
  },
];

export const BookNow = (props) => {
  const { setsteps, data } = props;
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <Box className="book_cont">
      <Box className="book_wrap">
        <Box className="book_wrap_hdg">
          <h6>
            {dayjs(data?.start_date).format("MMM DD YYYY") +
              " - " +
              dayjs(data?.end_date).format("MMM DD YYYY")}
          </h6>
          <Typography className="fz-14 color_light">
            {data?.seats || "0"} Seats Available
          </Typography>
        </Box>
        <AboutInstructor about={data?.about} />

        <Box className="exercise_box">
          <h6>Exercise Include</h6>
          <Box className="exer_view_wpr" sx={{ marginTop: 1 }}>
            {data?.excercises?.map((item, index) => {
              return (
                <Box className="exer_view" key={index}>
                  <figure>
                    <Image
                      width={"50%"}
                      height={"50%"}
                      src={item?.image || "/static/images/asan5.png"}
                      alt=" "
                    />
                  </figure>
                </Box>
              );
            })}
          </Box>
          <Box className="pice_book">
            <Box className="pice_book_text">
              Price:{" "}
              <b>
                {data?.userId?.currencySymbol || "$"}
                {data?.price_per_head || "0"}
              </b>
            </Box>
            <Button
              // onClick={() => setsteps(1)}
              variant="contained"
              className="btn-designthree"
              onClick={() => {
                setsteps(1);
                // dispatch(modalVisible.modalOpen(Modules.DATE));
              }}
            >
              Book Now
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
