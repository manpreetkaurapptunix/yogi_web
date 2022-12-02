import React, { useState, useEffect } from "react";
import { Box, Button, TextField } from "@mui/material";
import { DateRangePicker } from "react-date-range";
import { addDays } from "date-fns";
import "react-date-range/dist/styles.css"; // main css file
import "react-date-range/dist/theme/default.css";
import EastOutlinedIcon from "@mui/icons-material/EastOutlined";
import { useDispatch, useSelector } from "react-redux";
import { getUserDashAction, modalVisible, tempData } from "../../redux/actions";
import dayjs from "dayjs";

export const MultiDatePicker = (props) => {
  const { classDetail, setsteps } = props;
  const dispatch = useDispatch();
  const [value, setValue] = useState([null, null]);
  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: "selection",
    },
  ]);

  const seatSelect = useSelector((state) => state.commonReducer.tempData);

  useEffect(() => {
    if (seatSelect?.date) {
      setState(seatSelect?.date);
    }
  }, [seatSelect]);

  const handleSelect = (range) => {
    console.log(range, "range"); // native Date object
  };

  const selectionRange = {
    startDate: new Date(),
    endDate: new Date(),
    key: "selection",
  };

  const onApplyClick = () => {
    let arr = [];
    dispatch(tempData.updateTempData({ date: state }));
    dispatch(modalVisible.modalClose());

    // const body = {
    //   arr: JSON.stringify(arr),
    //   sortFilter: "POPULARITY",
    //   priceFilter: null,
    //   startTime: null,
    //   endTime: null,
    //   seats: null,
    //   startDate: state ? dayjs(state[0].startDate).format("YYYY-MM-DD") : null,
    //   endDate: state ? dayjs(state[0].endDate).format("YYYY-MM-DD") : null,
    // };

    // let params = {
    //   page: 1,
    //   limit: 20,
    //   guestMode: isAuthorised ? false : true,
    // };

    // dispatch(getUserDashAction.request(body, params));
    // let filter = {
    //   categoryFilter,
    //   sortFilter,
    //   priceFilter,
    //   timeFilter,
    // };
    // dispatch(tempData.updateTempData({ filters: filter }));
  };

  return (
    <Box className="container" style={{ textAlign: "right" }}>
      <DateRangePicker
        onChange={(item) => setState([item.selection])}
        showSelectionPreview={true}
        moveRangeOnFirstSelection={false}
        months={2}
        ranges={state}
        direction="horizontal"
        minDate={new Date()}
      />

      <Button onClick={onApplyClick} variant="contained" className="btn_book">
        <EastOutlinedIcon
          onClick={() => {
            onApplyClick();
          }}
        />
      </Button>
    </Box>
  );
};
