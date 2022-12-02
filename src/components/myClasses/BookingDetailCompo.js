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
import React, { useEffect, useState } from "react";
import StarIcon from "@mui/icons-material/Star";
import moment from "moment";
import { getCookie } from "cookies-next";
import { useDispatch } from "react-redux";
import {
  custCancelBookingAction,
  modalVisible,
  tempData,
} from "../../redux/actions";
import RateNow from "./RateNow";
import Report from "./Report";
import { Modules } from "../../constants/modules";
import { useRouter } from "next/router";

const BookingDetailCompo = (props) => {
  const { past, data, rateNow, setrateNow, report, setreport } = props;
  const dispatch = useDispatch();
  const router = useRouter();

  const [userData, setuserData] = useState("");

  useEffect(() => {
    const data = getCookie("userData");
    if (data) {
      setuserData(JSON.parse(data));
    }
  }, [getCookie]);

  const reviewData = [
    {
      id: 1,
      key: "FullName",
      value: userData?.name,
    },
    {
      id: 2,
      key: "Phone No.",
      value: userData?.phone
        ? "+" + userData?.callingCode + " " + userData?.phone
        : "",
    },
    {
      id: 3,
      key: "Email",
      value: userData?.email || "",
    },
    {
      id: 4,
      key: "Address",
      value: userData?.address || "",
    },
    {
      id: 5,
      key: "Attendees",
      value: data?.numOfPersons || "",
    },
  ];

  const onCancelBooking = () => {
    dispatch(modalVisible.modalOpen(Modules.CANCEL_BOOKING));

    let cancelDAta = {
      text: "Are you sure you want to cancel this booking",
      id: data?._id,
    };
    dispatch(tempData.updateTempData({ cancelBookingId: cancelDAta }));
    // const body = {
    //   type: "UPCOMING",
    //   page: 1,
    //   size: 20,
    // };
    // dispatch(custCancelBookingAction.request(data?._id, body));
  };

  return (
    <Box>
      {data ? (
        <Box className="bookCompo_cont">
          <Box className="booking_del">
            <figure>
              <img
                src={
                  data?.classId?.image
                    ? data?.classId?.image[0]
                    : "/static/images/homeYoga.png"
                }
                alt="img"
              />
            </figure>
            <Box>
              <Box className="detal_heading">
                <Box className="text_head">
                  <h6>{data?.classId?.name || "Beginners Class"}</h6>
                  <span className="fz-18">{data?.category?.name || ""}</span>
                </Box>
              </Box>
              <Box className="rating">
                <StarIcon />
                <Typography>{data?.avgRating || "0"}</Typography>
              </Box>
              <Typography className="fz-16">
                {data?.bookingDates &&
                  moment(data?.bookingDates[0]?.date).format("MMM Do YYYY")}
                , {moment(data?.start_time).format("hh:mm")}-
                {moment(data?.end_time).format("hh:mm a")}
              </Typography>
            </Box>
            <Box className="cancel-text">
              {data?.status == 3 && <Typography>Cancelled</Typography>}
            </Box>
            <Box className="complete-text">
              {data?.status == 2 && <Typography>Completed</Typography>}
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

          <Box className="instr_info  booking_del_instr ">
            <Box className="insinfo_tet">
              <h6 className="text-color"> instructor detail</h6>
              <Box className="inst_inf">
                <Typography className="text-color">
                  {"Name: "}
                  {data?.instuctor?.name || "abc"}
                </Typography>
                <Typography className="text-color">
                  {"Email: "}
                  {data?.instuctor?.email || ""}
                </Typography>
                <Typography className="text-color">
                  {"Phone No: "}
                  {data?.instuctor?.callingCode + data?.instuctor?.phone || ""}
                </Typography>
              </Box>
            </Box>
            <Box className="chat_yoga">
              <figure>
                <Image
                  width={"50%"}
                  height={"100%"}
                  src={data?.instuctor?.image || "/static/images/yoga.png"}
                  alt=" "
                />
              </figure>
              <Button
                onClick={() => {
                  let chatData = {
                    receiverId: data?.instuctor?._id,
                    receiverName: data?.instuctor?.name,
                    receiverImage: data?.instuctor?.image,
                    connectionId: data?.connectionId,
                  };

                  router.push("messages");
                  dispatch(tempData.updateTempData({ chatData: chatData }));
                  router.push({
                    pathname: `/messages`,
                    query: {
                      receiverId: data?.instuctor?._id,
                      receiverName: data?.instuctor?.name,
                      receiverImage: data?.instuctor?.image,
                      connectionId: data?.connectionId,
                    },
                  });
                }}
                variant="contained"
                className="btn_Chat"
              >
                <Typography>Chat now</Typography>
              </Button>
            </Box>
          </Box>

          <Divider className="detal_divider"></Divider>

          <Box className="booking_del_cost">
            <h6>Cost Detail</h6>
            <Table size="small" aria-label="purchases" sx={{ mt: 2 }}>
              <TableBody>
                <TableRow>
                  <TableCell align="left" sx={{ p: 0, mb: 1 }}>
                    <Typography>Sub Total :</Typography>
                  </TableCell>

                  <TableCell align="right" sx={{ p: 0, mb: 1 }}>
                    <Typography>
                      {data?.instuctor?.currencySymbol || ""}
                      {data?.amount}
                    </Typography>
                  </TableCell>
                </TableRow>
                {/* <TableRow>
                  <TableCell align="left" sx={{ p: 0, pb: 1 }}>
                    <Typography>Tax Charges :</Typography>
                  </TableCell>
                  <TableCell align="right" sx={{ p: 0, pb: 1 }}>
                    <Typography>$50.12</Typography>
                  </TableCell>
                </TableRow> */}
                <TableRow className="total_row">
                  <TableCell align="left" sx={{ p: 0, pt: 2 }}>
                    <Typography className="fz-18">Grand Total</Typography>
                  </TableCell>
                  <TableCell align="right" sx={{ p: 0, pt: 2 }}>
                    <Typography className="fz-18">
                      {data?.instuctor?.currencySymbol || ""}
                      {data?.amount}
                    </Typography>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </Box>
          <Box className="divider_after"></Box>
          <Box className="attendes" sx={{ mb: 2 }}>
            <h4 align="center" className="mb-30">
              {data?.numOfPersons || "No"}
              {" Attendees"}
            </h4>
            {past ? (
              <Box className="btn_wpr">
                {data?.status == 2 && !data?.isRated && (
                  <Button
                    onClick={() => {
                      setrateNow(true);
                      setreport(false);
                    }}
                    variant="contained"
                    className="btn-design btn-stroke"
                  >
                    <Typography>Rate Now</Typography>
                  </Button>
                )}
                {!data?.isReported && (
                  <Button
                    onClick={() => {
                      setreport(true);
                      setrateNow(false);
                    }}
                    variant="contained"
                    className="btn-design"
                  >
                    <Typography>Report</Typography>
                  </Button>
                )}
              </Box>
            ) : (
              <Button
                onClick={onCancelBooking}
                variant="contained"
                className="btn_cancel"
              >
                Cancel Booking
              </Button>
            )}
          </Box>
          {rateNow && past ? (
            <RateNow setrateNow={setrateNow} data={data} />
          ) : (
            ""
          )}
          {report && past ? <Report setreport={setreport} data={data} /> : ""}
        </Box>
      ) : (
        <Box className="bookCompo_cont">
          <Typography className="empty_text">No Booking Data Found</Typography>
        </Box>
      )}
    </Box>
  );
};

export default BookingDetailCompo;
