/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import React, { useState, useEffect } from "react";
import { Typography, Box, Button, Divider } from "@mui/material";
import Image from "next/image";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";
import { LoadingButton } from "@mui/lab";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import { useDispatch, useSelector } from "react-redux";
import {
  createBookingAction,
  discountAction,
  modalVisible,
} from "../../../redux/actions";
import { Modules } from "../../../constants/modules";
import { useRouter } from "next/router";
const getSymbolFromCurrency = require("currency-symbol-map");

const cards = [
  {
    id: 1,
    image: "/static/images/visa.png",
    cardNum: "•••• •••• •••• 4432",
    expiry: "Personal - 06/23",
  },
  {
    id: 2,
    image: "/static/images/visa.png",
    cardNum: "•••• •••• •••• 4432",
    expiry: "Personal - 06/23",
  },
];

export const PayNow = (props) => {
  const { data } = props;
  const dispatch = useDispatch();
  const router = useRouter();

  const [flag, setFlag] = useState(false);

  const selectData = useSelector((state) => state.commonReducer.tempData);
  const createBooking = useSelector(
    (state) => state.bookingReducer.bookingCreate
  );

  const disData = useSelector((state) => state.bookingReducer.discountData);
  const selectCoupon = useSelector((state) => state.commonReducer.tempData);

  useEffect(() => {
    dispatch(createBookingAction.success(null));
    setFlag(true);
  }, [dispatch]);

  useEffect(() => {
    if (flag) {
      if (createBooking?.data) {
        router.push("myClasses");
      }
    }
  }, [createBooking, flag]);

  const amount =
    selectData?.booking &&
    selectData?.booking?.count *
      selectData?.booking?.date?.length *
      data?.price_per_head;

  const totalVal =
    selectCoupon?.selectedDiscount?.type == "1"
      ? amount - selectCoupon?.selectedDiscount?.discountValue
      : amount - (amount / 100) * selectCoupon?.selectedDiscount?.discountValue;

  useEffect(() => {
    dispatch(discountAction.request());
  }, [dispatch]);

  const payClick = () => {
    let body = {
      classId: data?._id || "",
      numOfPersons: selectData?.booking?.count || "",
      notes: selectData?.booking?.notes,
      paymentMode: "NORMAL",
      timeSlotId: selectData?.booking?.timeData,
      bookingDates: selectData?.booking?.date,
      start_time: selectData?.booking?.selectStartTime,

      end_time: selectData?.booking?.selectEndTime,
    };
    body[selectCoupon?.selectedDiscount?.code && "code"] =
      selectCoupon?.selectedDiscount?.code;

    dispatch(createBookingAction.request(body));
    router.push("myClasses");
    // {
    //   createBooking?.data && router.push("myClasses");
    // }
  };

  const openDiscount = () => {
    dispatch(modalVisible.modalOpen(Modules.DISCOUNT));
  };

  return (
    <Box className="book_wrap">
      <Box>
        <Box className="coupon_ui">
          <Button
            variant="contained"
            className="btn_cancel btn_book"
            onClick={openDiscount}
          >
            <span>
              <figure>
                <Image
                  width={"40%"}
                  height={"40%"}
                  src={"/static/images/percent.png"}
                  alt=" "
                />
              </figure>

              <Typography className="fz-20">Use Coupon</Typography>
            </span>
            <EastOutlinedIcon />
          </Button>
        </Box>
        <Box className="total_text">
          <Typography className="fz-20 fw-bold">
            {"Grand Total: "}
            {getSymbolFromCurrency(data?.userId?.currencyCode)}
            {selectCoupon?.selectedDiscount ? totalVal : amount}
          </Typography>
          <CloseOutlinedIcon />
        </Box>
        <Divider className="detal_divider"></Divider>
        <Box className="pay_txt">
          <Typography variant="h4" className="fz-18 fw-bold">
            {" "}
            Online Payments
          </Typography>
          <Typography>
            After your first payment, We will save your details
            <br /> for future use.
          </Typography>
        </Box>
        <Box className="card_display">
          {cards.map((item, index) => {
            return (
              <Box key={index} className="card_view">
                <figure>
                  <img src={item.image} alt="img" />
                </figure>
                <Box className="cad_tetx">
                  <Typography className="fz-16">{item.cardNum}</Typography>
                  <Typography className="fz-14 color-light">
                    {item.expiry}
                  </Typography>
                </Box>
                <ArrowForwardIosOutlinedIcon />
              </Box>
            );
          })}
        </Box>
        <Box className="add_crd">
          <figure>
            <Image
              width={"45%"}
              height={"30%"}
              src={"/static/images/add.png"}
              alt=" "
            />
          </figure>
          <Box className="save_via">
            <Typography className="color-primary fz-16">
              Add New Card
            </Typography>
            <Typography className="color_light fz-16">
              Save and Pay via Cards.
            </Typography>
            <Box className="cards_type">
              <figure>
                <Image
                  width={"35%"}
                  height={"20%"}
                  src={"/static/images/visab.png"}
                  alt=" "
                />
              </figure>
              <figure>
                <Image
                  width={"35%"}
                  height={"20%"}
                  src={"/static/images/masCard.png"}
                  alt=" "
                />
              </figure>
              <figure>
                <Image
                  width={"35%"}
                  height={"20%"}
                  src={"/static/images/discover.png"}
                  alt=" "
                />
              </figure>
            </Box>
          </Box>
        </Box>
        <LoadingButton
          onClick={payClick}
          type="submit"
          variant="contained"
          className="pay_btn"
        >
          Pay Now
        </LoadingButton>
      </Box>
    </Box>
  );
};
