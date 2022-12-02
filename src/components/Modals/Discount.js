import { Box, Button, Typography, Grid } from "@mui/material";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { modalVisible, tempData } from "../../redux/actions";

const Discount = () => {
  const dispatch = useDispatch();
  const data = useSelector((state) => state?.bookingReducer.discountData);
  const selectData = useSelector((state) => state.commonReducer.tempData);

  const onApplyClick = (item) => {
    dispatch(tempData.updateTempData({ selectedDiscount: item }));
    dispatch(modalVisible.modalClose());
  };
  const removeCoupon = () => {
    dispatch(tempData.updateTempData({ selectedDiscount: null }));
    dispatch(modalVisible.modalClose());
  };
  console.log(data, selectData, "discoount daat");
  return (
    <Box className="discount_mdl">
      <Box className="clr_btn" onClick={removeCoupon}>
        Clear all
      </Box>
      {data ? (
        data?.Discount?.length &&
        data?.Discount?.map((item, index) => {
          return (
            <Box key={index} className="disc_card membership_card">
              <Box className="disc_hdr">
                <Typography variant="h6" className="fw-bold">
                  {item.name}
                </Typography>
                <Typography className="fz-14 membr_price">
                  {item?.type === "2"
                    ? item?.discountValue + "%"
                    : "$" + item?.discountValue}
                </Typography>
              </Box>
              <Typography className="fz-14 disc_code">
                {"Valid for customer who book atleast " +
                  item?.minBooking +
                  " seats"}
              </Typography>
              {selectData?.booking?.count >= item?.minBooking ? (
                <Button onClick={() => onApplyClick(item)} className="disc_btn">
                  {selectData?.selectedDiscount == item ? "Applied" : "Apply"}
                </Button>
              ) : (
                <Button className="disc_btn">Not Eligible</Button>
              )}
            </Box>
          );
        })
      ) : (
        <Typography>No discount Coupons Found</Typography>
      )}
      {/* </Grid> */}
    </Box>
  );
};

export default Discount;
