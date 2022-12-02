import React, { useState, useEffect } from "react";
import {
  Typography,
  Box,
  Button,
  TextField,
  List,
  ListItem,
  ListItemText,
  Table,
  TableRow,
  TableBody,
  TableHead,
  TableCell,
} from "@mui/material";
import Image from "next/image";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import InboxIcon from "@mui/icons-material/Inbox";
import { AddCard } from "../AddCard";
import dayjs from "dayjs";
import { useSelector } from "react-redux";
import { getCookie } from "cookies-next";
const getSymbolFromCurrency = require("currency-symbol-map");

export const BookDetail = (props) => {
  const { data } = props;
  const [userDetail, setuserDetail] = useState("");

  const selectData = useSelector((state) => state.commonReducer.tempData);

  const selectCoupon = useSelector((state) => state.commonReducer.tempData);

  console.log(selectData, "selectData");

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
    const userData = getCookie("userData");
    setuserDetail(JSON.parse(userData));
  }, []);

  const reviewData = [
    {
      id: 1,
      key: "FullName",
      value: userDetail?.name || "",
    },
    {
      id: 2,
      key: "Phone No.",
      value: "+" + userDetail?.callingCode + " " + userDetail?.phone || "",
    },
    {
      id: 3,
      key: "Email",
      value: userDetail?.email || "",
    },
    {
      id: 4,
      key: "Address",
      value: userDetail?.address || "",
    },
    {
      id: 5,
      key: "Attendees",
      value: selectData?.booking?.count,
    },
  ];

  return (
    <Box className="book_wrap">
      <Box className="calen_for">
        <Typography variant="h6">
          {dayjs(data?.start_date).format("MMM DD YYYY") +
            " - " +
            dayjs(data?.end_date).format("MMM DD YYYY")}
        </Typography>
        <CalendarMonthOutlinedIcon />
      </Box>
      <Box className="review_detail contact">
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Review Details{" "}
        </Typography>
        <Box className="booking_del_Form">
          <List sx={{ width: "100%", maxWidth: "100%" }}>
            {/* {reviewData.map((item, index) => {
              return (
                <Box key={index}>
                  <ListItem>
                    <ListItemText
                      primary={item.key}
                      sx={{ m: 0, p: 0 }}
                      className="color_light"
                    />
                    <ListItemText
                      primary={item.value}
                      sx={{ m: 0, p: 0, textAlign: "right" }}
                    />
                  </ListItem>
                </Box>
              );
            })} */}
            <Box>
              <ListItem>
                <ListItemText
                  primary={"Full Name"}
                  sx={{ m: 0, p: 0 }}
                  className="color_light"
                />
                <ListItemText
                  primary={userDetail?.name || ""}
                  sx={{ m: 0, p: 0, textAlign: "right" }}
                />
              </ListItem>
            </Box>
            {userDetail?.phone && (
              <Box>
                <ListItem>
                  <ListItemText
                    primary={"Phone No."}
                    sx={{ m: 0, p: 0 }}
                    className="color_light"
                  />
                  <ListItemText
                    primary={
                      "+" + userDetail?.callingCode + " " + userDetail?.phone ||
                      ""
                    }
                    sx={{ m: 0, p: 0, textAlign: "right" }}
                  />
                </ListItem>
              </Box>
            )}
            {userDetail?.email && (
              <Box>
                <ListItem>
                  <ListItemText
                    primary={"Email"}
                    sx={{ m: 0, p: 0 }}
                    className="color_light"
                  />
                  <ListItemText
                    primary={userDetail?.email || ""}
                    sx={{ m: 0, p: 0, textAlign: "right" }}
                  />
                </ListItem>
              </Box>
            )}
            {userDetail?.address && (
              <Box>
                <ListItem>
                  <ListItemText
                    primary={"Address"}
                    sx={{ m: 0, p: 0 }}
                    className="color_light"
                  />
                  <ListItemText
                    primary={userDetail?.address || ""}
                    sx={{ m: 0, p: 0, textAlign: "right" }}
                  />
                </ListItem>
              </Box>
            )}
            {selectData?.booking?.count && (
              <Box>
                <ListItem>
                  <ListItemText
                    primary={"Attendees"}
                    sx={{ m: 0, p: 0 }}
                    className="color_light"
                  />
                  <ListItemText
                    primary={selectData?.booking?.count}
                    sx={{ m: 0, p: 0, textAlign: "right" }}
                  />
                </ListItem>
              </Box>
            )}
          </List>
        </Box>
      </Box>
      {selectData?.booking?.notes && (
        <Box className="notes_review">
          <Typography className="fz-18 fw-bold" sx={{ mb: 1 }}>
            Notes
          </Typography>
          <Typography className="fz-14">
            {selectData?.booking?.notes}
          </Typography>
        </Box>
      )}
      <Box className="booking_del_cost">
        <h6>Cost Detail</h6>
        <Table size="small" aria-label="purchases" sx={{ mt: 2 }}>
          <TableBody>
            {selectCoupon?.selectedDiscount && (
              <TableRow>
                <TableCell align="left" sx={{ p: 0, mb: 1 }}>
                  <Typography>Sub Total :</Typography>
                </TableCell>

                <TableCell align="right" sx={{ p: 0, mb: 1 }}>
                  <Typography>
                    {getSymbolFromCurrency(data?.userId?.currencyCode) + amount}
                  </Typography>
                </TableCell>
              </TableRow>
            )}
            {selectCoupon?.selectedDiscount && (
              <TableRow>
                <TableCell align="left" sx={{ p: 0, pb: 1 }}>
                  <Typography>Discount price :</Typography>
                </TableCell>
                <TableCell align="right" sx={{ p: 0, pb: 1 }}>
                  <Typography>
                    {selectCoupon?.selectedDiscount?.type == "1"
                      ? data?.userId?.currencySymbol +
                        selectCoupon?.selectedDiscount?.discountValue
                      : selectCoupon?.selectedDiscount?.discountValue + "%"}
                  </Typography>
                </TableCell>
              </TableRow>
            )}
            <TableRow className="total_row">
              <TableCell align="left" sx={{ p: 0, pt: 2 }}>
                <Typography className="fz-18">Grand Total</Typography>
              </TableCell>
              <TableCell align="right" sx={{ p: 0, pt: 2 }}>
                {selectCoupon?.selectedDiscount ? (
                  <Typography className="fz-18">
                    {data?.userId?.currencySymbol + totalVal}
                  </Typography>
                ) : (
                  <Typography className="fz-18">
                    {data?.userId?.currencySymbol +
                      selectData?.booking?.count *
                        selectData?.booking?.date?.length *
                        data?.price_per_head || "0"}
                  </Typography>
                )}
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>

      <Box className="card_add">
        <AddCard />
      </Box>
    </Box>
  );
};
