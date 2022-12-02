import React from "react";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import moment from "moment";

import StarIcon from "@mui/icons-material/Star";
import { useDispatch, useSelector } from "react-redux";
import {
  getUserDashAction,
  modalVisible,
  wishlistAction,
} from "../../redux/actions";
import { Modules } from "../../constants/modules";
const getSymbolFromCurrency = require("currency-symbol-map");

export const ClassCard = (props) => {
  const { past, data, wish } = props;

  const dispatch = useDispatch();
  const isAuthorised = useSelector((state) => state.commonReducer.isAuthorised);
  const filterData = useSelector((state) => state.commonReducer.tempData);
  const temporaryData = useSelector((state) => state.commonReducer.tempData);

  const addWish = (e) => {
    e.stopPropagation();
    let body = {
      classId: data?.classes?._id,
      type: data?.iswishlists ? "REMOVE" : "ADD",
    };
    let arr = [];
    const input = {
      arr:
        filterData?.globalSearch?.arr ||
        filterData?.filterTempData?.arr ||
        JSON.stringify(arr),
      sortFilter:
        filterData?.globalSearch?.sortFilter ||
        filterData?.filterTempData?.sortFilter ||
        null,
      priceFilter:
        filterData?.globalSearch?.priceFilter ||
        filterData?.filterTempData?.priceFilter ||
        null,
      startTime:
        filterData?.globalSearch?.startTime ||
        filterData?.filterTempData?.startTime ||
        null,
      endTime:
        filterData?.globalSearch?.endTime ||
        filterData?.filterTempData?.endTime ||
        null,

      schoolName:
        filterData?.globalSearch?.schoolName ||
        filterData?.filterTempData?.schoolName ||
        null,
      className:
        filterData?.globalSearch?.className ||
        filterData?.filterTempData?.className ||
        null,
      longitude:
        filterData?.globalSearch?.longitude ||
        filterData?.filterTempData?.longitude ||
        null,
      latitude:
        filterData?.globalSearch?.latitude ||
        filterData?.filterTempData?.latitude ||
        null,
    };

    dispatch(wishlistAction.request(body, input));
  };

  const heartClick = (e) => {
    e.stopPropagation();
    dispatch(modalVisible.modalOpen(Modules.LOGIN));
  };

  return (
    <Box className="classCard_con" sx={{ cursor: "pointer" }}>
      <Box className="card_wrapper">
        <Box className="card_img">
          <figure>
            <Image
              width={"100%"}
              height={"100%"}
              src={data?.classes?.image[0] || "/static/images/homeYoga.png"}
              alt=" "
            />
          </figure>
        </Box>
        <Box className="classCard_content">
          <Box className="name_view">
            <Box className="fz-18 fw-bold" style={{ marginBottom: "6px" }}>
              {data?.classes?.name || "Beginners Class"}
            </Box>
            <ul className="rgt_icons">
              {wish && (
                <li>
                  <Image
                    width={"100%"}
                    height={"100%"}
                    src={
                      data?.iswishlists
                        ? "/static/images/heart2.png"
                        : "/static/images/heart.png"
                    }
                    alt=" "
                    onClick={(e) => {
                      isAuthorised ? addWish(e) : heartClick(e);
                    }}
                  />
                </li>
              )}
              {/* <li>
                <Image
                  width={"100%"}
                  height={"100%"}
                  src={"/static/images/map.svg"}
                  alt=" "
                  onClick={(e) => e.stopPropagation()}
                />
              </li> */}
            </ul>
          </Box>
          <p className="fz-16">{data?.categoryId?.name}</p>
          {/* <p className="fz-16">
            {data?.classes?.desc?.slice(0, 30)} {data?.desc?.length > 20 ? "..." : ""}
          </p> */}
          <Box className="rating">
            <StarIcon />
            <p className="fz-14">
              {data?.avgRating || 0}{" "}
              {isAuthorised && data?.dist
                ? "( " + data?.dist?.calculated?.toFixed(1) + " km)"
                : ""}
            </p>
          </Box>
          <Box className="fz-16 classDate">
            {moment(data?.classes?.start_date).format("MMM Do YYYY")}
            {" - "}
            {moment(data?.classes?.end_date).format("MMM Do YYYY")}
          </Box>
          <Box className="fz-16 price">
            Price:
            <span className="fw-bold">
              {data?.currencySymbol}
              {data?.classes?.price_per_head || ""}
            </span>
          </Box>
          {!past && <Button className="btn-design">Book Now</Button>}
        </Box>
      </Box>
    </Box>
  );
};
