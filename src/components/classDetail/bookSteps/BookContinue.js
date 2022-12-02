import React, { useState, useEffect } from "react";
import { Typography, Box, Button, TextField } from "@mui/material";
import Image from "next/image";
import CalendarMonthOutlinedIcon from "@mui/icons-material/CalendarMonthOutlined";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { isString } from "../../../utils/validations";
import dayjs from "dayjs";
import { colors } from "../../../constants/colors";
import { tempData } from "../../../redux/actions";
import { useDispatch } from "react-redux";
import moment from "moment";
import { toast } from "react-toastify";
const getSymbolFromCurrency = require("currency-symbol-map");

const timeSlots = [
  {
    slot: "9:30-10:30",
  },
  {
    slot: "9:30-10:30",
  },
  {
    slot: "9:30-10:30",
  },
  {
    slot: "9:30-10:30",
  },
  {
    slot: "9:30-10:30",
  },
  {
    slot: "9:30-10:30",
  },
  {
    slot: "9:30-10:30",
  },
  {
    slot: "9:30-10:30",
  },
  {
    slot: "9:30-10:30",
  },
  {
    slot: "9:30-10:30",
  },
];

export const BookContinue = (props) => {
  const { setsteps, data } = props;
  const dispatch = useDispatch();
  const [count, setcount] = useState(1);
  const [notes, setnotes] = useState("");
  const [timeData, settimeData] = useState([]);
  const [dateArray, setdateArray] = useState([]);
  const [selectDay, setSelectDay] = useState([]);
  const [selectStartTime, setselectStartTime] = useState("");
  const [selectEndTime, setselectEndTime] = useState("");
  const [error, setError] = useState(false);
  const [dayCount, setdayCount] = useState(1);

  var month = moment(data?.start_date).format("MM");
  var year = moment(data?.start_date).format("YYYY");
  var endday = moment(data?.end_date).format("D");

  const selectDays = (item) => {
    if (dateArray.includes(item)) {
      let arr = [];
      arr = dateArray.filter((name) => name !== item);
      setdateArray(arr);
    } else {
      setdateArray([...dateArray, new Date(item).toISOString()]);
    }
  };

  useEffect(() => {
    getDatesInRange();
  }, [getDatesInRange]);

  const getDatesInRange = () => {
    const startDate = data?.start_date;
    const endDate = data?.end_date;

    let dates = [];
    const theDate = new Date(startDate);
    while (theDate <= new Date(endDate)) {
      dates = [...dates, new Date(theDate).toISOString()];
      theDate.setDate(theDate.getDate() + 1);
    }
    dates = [...dates, new Date(endDate)];
    setSelectDay(dates);
    return dates;
  };

  const increment = () => {
    if (count > data?.availableSeats) {
      toast.error("No more seats available for this class");
    } else {
      setcount(count + 1);
    }
  };

  const decrement = () => {
    if (count < 2) {
      toast.error("Selected seats must be 1 or more");
    } else {
      setcount(count - 1);
    }
  };

  const timeSelect = (item) => {
    settimeData(item._id);
    setselectStartTime(item?.start_time);
    setselectEndTime(item?.end_time);
  };

  const onContinueClick = () => {
    let arr = [];
    dateArray?.forEach((ele) => {
      arr.push({
        date: ele,
      });
    });
    if (count > data?.availableSeats) {
      toast.error("Class is full");
      return;
    } else if (timeData && count > 0 && dateArray?.length !== 0) {
      setError(false);
      let body = {
        timeData,
        count,
        notes,
        date: arr,
        selectEndTime,
        selectStartTime,
      };

      dispatch(tempData.updateTempData({ booking: body }));
      setsteps(2);
    } else {
      setError(true);
      return;
    }
  };

  return (
    <Box className="book_cont">
      <Box className="book_wrap">
        <Box className="calen_for">
          <Typography>
            {dayjs(data.start_date).format("MMM DD YYYY") +
              " - " +
              dayjs(data.end_date).format("MMM DD YYYY")}
          </Typography>
          <CalendarMonthOutlinedIcon />
        </Box>
        {/* moment(item).format("D") !=
                      moment(new Date()).format("D") */}
        <Box className="time_wrap">
          <Typography className="fz-18 fw-bold">Date</Typography>
          <Box className="time_book tb_date">
            {selectDay &&
              selectDay?.slice(0, selectDay?.length - 1)?.map((item, index) => {
                return (
                  <Box key={index}>
                    {moment(item).format("D") !=
                    moment(new Date()).format("D") ? (
                      <Box
                        onClick={() => selectDays(item, index)}
                        className="timeClass_view"
                        style={{
                          backgroundColor: dateArray.includes(item)
                            ? colors.mainColor
                            : "#ffebeb",
                        }}
                      >
                        <Box>
                          <p> {moment(item).format("ddd")}</p>

                          <p>{moment(item).format("DD-MM-YYYY")}</p>
                        </Box>
                      </Box>
                    ) : (
                      ""
                    )}
                  </Box>
                );
              })}
            {dateArray?.length == 0 && error ? (
              <p>Choose prefered dates</p>
            ) : (
              ""
            )}
          </Box>
        </Box>

        <Box className="time_wrap">
          <Typography className="fz-18 fw-bold">Time</Typography>
          <Box className="time_book">
            {data?.time?.map((item, index) => {
              return (
                <Box
                  key={index}
                  onClick={() => timeSelect(item)}
                  className="timeClass_view"
                  style={{
                    backgroundColor: timeData.includes(item?._id)
                      ? colors.mainColor
                      : "#ffebeb",
                  }}
                >
                  <Typography>
                    {dayjs(item?.start_time).format("h:mm A") +
                      " - " +
                      dayjs(item?.end_time).format("h:mm A")}
                  </Typography>
                </Box>
              );
            })}
          </Box>
          {timeData?.length == 0 && error ? (
            <p>Choose prefered time slots</p>
          ) : (
            ""
          )}
        </Box>
        <Box className="seats_class">
          <Typography className="fz-18 fw-bold">Seats</Typography>
          <Box className="inc_dec">
            <RemoveCircleIcon onClick={decrement} />
            <Typography>{count}</Typography>
            <AddCircleSharpIcon onClick={increment} />
          </Box>
        </Box>
        {count <= 0 && error ? <p>Seats must be greater than 0</p> : ""}
        <Box className="notes_cont">
          <TextField
            type="text"
            multiline
            minRows={5}
            id="outlined-basic"
            variant="outlined"
            maxRows={15}
            className=" form-control "
            placeholder="Notes"
            value={notes}
            fullWidth
            margin="none"
            name="description"
            onChange={(val) => {
              if (isString(val.target.value)) {
                setnotes(val.target.value);
              }
            }}
          />
        </Box>
        <Box className="pice_book">
          <Box>
            Price:{" "}
            <b>
              {data?.userId?.currencySymbol}{" "}
              {data?.price_per_head * dateArray?.length * count ||
                data?.price_per_head}
            </b>
          </Box>
          <Button
            onClick={
              () => onContinueClick()
              // setsteps(2)
            }
            variant="contained"
            className="btn-designthree"
          >
            Continue
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
