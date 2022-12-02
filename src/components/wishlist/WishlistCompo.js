import React from "react";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import moment from "moment";

import StarIcon from "@mui/icons-material/Star";
import { useDispatch } from "react-redux";
import { wishlistAction } from "../../redux/actions";

export const WishlistCompo = (props) => {
  const { past, data, wish } = props;
  const dispatch = useDispatch();

  const addWish = (e) => {
    e.stopPropagation();
    let body = {
      classId: data?.class?._id,
      type: "REMOVE",
    };

    dispatch(wishlistAction.request(body));
  };

  return (
    <Box className="classCard_con" sx={{ cursor: "pointer" }}>
      <Box className="card_wrapper">
        <Box className="card_img">
          <figure>
            <Image
              width={"100%"}
              height={"100%"}
              src={
                data?.class?.image
                  ? data?.class?.image[0]
                  : "/static/images/homeYoga.png"
              }
              alt=" "
            />
          </figure>
        </Box>
        <Box className="classCard_content">
          <Box className="name_view">
            <Box className="fz-18 fw-bold" style={{ marginBottom: "6px" }}>
              {data?.class?.name || "Beginners Class"}
            </Box>
            <ul className="rgt_icons">
              {wish && (
                <li>
                  <Image
                    width={"100%"}
                    height={"100%"}
                    src={"/static/images/heart2.png"}
                    alt=" "
                    onClick={(e) => addWish(e)}
                  />
                </li>
              )}
              <li>
                <Image
                  width={"100%"}
                  height={"100%"}
                  src={"/static/images/map.svg"}
                  alt=" "
                  onClick={(e) => e.stopPropagation()}
                />
              </li>
            </ul>
          </Box>
          <p className="fz-16">{data?.categoryId?.name}</p>
          {/* <p className="fz-16">
            {data?.class?.desc?.slice(0, 30)} {data?.desc?.length > 20 ? "..." : ""}
          </p> */}
          <Box className="rating">
            <StarIcon />
            <p className="fz-14">
              {data?.avgRating || 0}{" "}
              {/* {"( " + data?.dist?.calculated?.toFixed(1) + " km)" || ""} */}
            </p>
          </Box>
          <Box className="fz-16 classDate">
            {moment(data?.class?.start_date).format("MMM Do YYYY")}
            {" - "}
            {moment(data?.class?.end_date).format("MMM Do YYYY")}
          </Box>
          <Box className="fz-16 price">
            Price:{" "}
            <span className="fw-bold">
              ${data?.class?.price_per_head || ""}{" "}
            </span>
          </Box>
          {/* {!past && <Button className="btn-design">Book Now</Button>} */}
        </Box>
      </Box>
    </Box>
  );
};
