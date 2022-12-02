/* eslint-disable @next/next/no-img-element */
import {
  Box,
  List,
  Typography,
  ListItem,
  ListItemText,
  Table,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
  Button,
  Divider,
} from "@mui/material";
import Image from "next/image";
import React from "react";
import StarIcon from "@mui/icons-material/Star";
import moment from "moment";

const DetailCompo = (props) => {
  const { past, data } = props;

  const reviewData = [
    {
      id: 1,
      key: "FullName",
      value: data?.userId?.name || "******",
    },
    {
      id: 2,
      key: "Phone No.",
      value: data?.userId?.callingCode + " " + data?.userId?.phone,
    },
    {
      id: 3,
      key: "Email",
      value: data?.userId?.email || "******",
    },
    {
      id: 4,
      key: "Address",
      value: data?.userId?.address || "******",
    },
    {
      id: 5,
      key: "Attendees",
      value: data?.numOfPersons || "No",
    },
  ];

  return (
    <Box className="bookCompo_cont">
      <Box className="booking_del">
        <figure>
          <img
            src={
              data?.class?.image
                ? data?.class?.image[0]
                : "/static/images/homeYoga.png"
            }
            alt="img"
          />
        </figure>
        <Box>
          <Box className="detal_heading">
            <Box className="text_head">
              <h6>{data?.class?.name || "ABC"}</h6>
              <span className="fz-18">{data?.category?.name}</span>
            </Box>
          </Box>
          <Box className="rating">
            <StarIcon />
            <Typography>{data?.avgRating || "0"}</Typography>

            {/* <Typography>(2.5 km)</Typography> */}
          </Box>
          <Typography className="fz-16">
            {data?.bookingDates &&
              moment(data?.bookingDates[0]?.date).format("MMM Do YYYY")}
            , {moment(data?.start_time).format("hh:mm")}-
            {moment(data?.end_time).format("hh:mm a")}
          </Typography>
        </Box>
        <Box className="complete-text">
          <Box className="complete-text">
            {data?.status == 2 && <Typography>Completed</Typography>}
          </Box>
          <Box className="cancel-text">
            {data?.status == 3 && <Typography>Cancelled</Typography>}
          </Box>
        </Box>
      </Box>
      <Divider className="detal_divider"></Divider>
      <Box className="contact" sx={{ mb: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Contact Details{" "}
        </Typography>

        <Box className="booking_del_Form">
          {reviewData.map((item, index) => {
            return (
              <List key={index} sx={{ width: "100%", maxWidth: "100%" }}>
                <ListItem sx={{ m: 0, p: 0 }}>
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
              </List>
            );
          })}
        </Box>
      </Box>

      <Divider className="detal_divider"></Divider>

      <Box className="contact" sx={{ mb: 1 }}>
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Selected Dates
        </Typography>

        <Box className="booking_del_Form">
          {data?.bookingDates &&
            data?.bookingDates?.map((item, index) => {
              return (
                <Box key={index}>
                  <p>{moment(item?.date).format("MMM Do YYYY")}</p>
                </Box>
              );
            })}
        </Box>
      </Box>

      <Divider className="detal_divider"></Divider>

      <Box className="booking_del_cost">
        <h6>Cost Detail</h6>
        <Table size="small" aria-label="purchases" sx={{ mt: 2 }}>
          <TableBody>
            {/* <TableRow>
              <TableCell align="left" sx={{ p: 0, mb: 1 }}>
                <Typography>Amount :</Typography>
              </TableCell>

              <TableCell align="right" sx={{ p: 0, mb: 1 }}>
                <Typography>
                  {data?.userId?.currencySymbol + " " + data?.amount}
                </Typography>
              </TableCell>
            </TableRow> */}
            {/* <TableRow>
              <TableCell align="left" sx={{ p: 0, pb: 1 }}>
                <Typography>Discount :</Typography>
              </TableCell>
              <TableCell align="right" sx={{ p: 0, pb: 1 }}>
                <Typography>
                  {data?.userId?.currencySymbol + " " + data?.discountValue}
                </Typography>
              </TableCell>
            </TableRow> */}
            <TableRow className="total_row">
              <TableCell align="left" sx={{ p: 0, pt: 2 }}>
                <Typography className="fz-18">Grand Total</Typography>
              </TableCell>
              <TableCell align="right" sx={{ p: 0, pt: 2 }}>
                <Typography className="fz-18">
                  {data?.userId?.currencySymbol + " " + data?.amount}
                </Typography>
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Box>
      <Box className="divider_after"></Box>
      <Box className="attendes">
        <h4 align="center" className="mb-30">
          {data?.numOfPersons + " Attendees"}
        </h4>
      </Box>
    </Box>
  );
};

export default DetailCompo;
