import { Typography, Box } from "@mui/material";
import dayjs from "dayjs";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserDashAction, modalVisible, tempData } from "../../redux/actions";

const timeSlots = [
  {
    id: 1,
    startTime: "12:00am",
    endTime: "03:00am",
    start: "00:00",
    end: "03:00",
  },
  {
    id: 2,
    startTime: "03:00am",
    endTime: "06:00am",
    start: "03:00",
    end: "06:00",
  },
  {
    id: 3,
    startTime: "06:00am",
    endTime: "09:00am",
    start: "06:00",
    end: "09:00",
  },
  {
    id: 4,
    startTime: "09:00am",
    endTime: "12:00pm",
    start: "09:00",
    end: "12:00",
  },
  {
    id: 5,
    startTime: "12:00pm",
    endTime: "03:00pm",
    start: "12:00",
    end: "15:00",
  },
  {
    id: 6,
    startTime: "03:00pm",
    endTime: "06:00pm",
    start: "15:00",
    end: "18:00",
  },
  {
    id: 7,
    startTime: "06:00pm",
    endTime: "09:00pm",
    start: "18:00",
    end: "21:00",
  },
  {
    id: 8,
    startTime: "09:00pm",
    endTime: "12:00am",
    start: "21:00",
    end: "24:00",
  },
];

export const TimeSelectCompo = () => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState("");

  const seatSelect = useSelector((state) => state.commonReducer.tempData);

  useEffect(() => {
    if (seatSelect?.time) {
      setSelected(seatSelect?.time);
    }
  }, [seatSelect]);

  const handleSelected = (item) => {
    setSelected(item);
    let arr = [];
    dispatch(tempData.updateTempData({ time: item }));
    dispatch(modalVisible.modalClose());
    // const body = {
    //   arr: JSON.stringify(arr),
    //   sortFilter: "POPULARITY",
    //   priceFilter: item?.start || null,
    //   startTime: item?.end || null,
    //   endTime: null,
    //   seats: null,
    //   startDate: dayjs().format("YYYY-MM-DD"),
    //   endDate: dayjs().format("YYYY-MM-DD"),
    // };

    // let params = {
    //   page: 1,
    //   limit: 20,
    //   guestMode: isAuthorised ? false : true,
    // };

    // dispatch(getUserDashAction.request(body, params));
    // let filterSeats = {
    //   count,
    // };
    // dispatch(tempData.updateTempData({ filterSeats: filterSeats }));
  };

  return (
    <Box className="time_cont">
      <Typography>Time</Typography>
      <Box className="slots">
        {timeSlots.map((item, index) => {
          return (
            <Box
              onClick={() => handleSelected(item)}
              key={index}
              className="slot_view"
              style={{
                backgroundColor: selected == item ? "#FF637D" : "#fdf0f7",
              }}
            >
              <Typography>{item.startTime + "-" + item.endTime}</Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};
