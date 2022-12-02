import { Box, Button, Typography } from "@mui/material";
import React, { useState, useEffect } from "react";
import AddCircleSharpIcon from "@mui/icons-material/AddCircleSharp";
import RemoveCircleIcon from "@mui/icons-material/RemoveCircle";
import { useDispatch, useSelector } from "react-redux";
import { getUserDashAction, modalVisible, tempData } from "../../redux/actions";

export const SeatsSelectCompo = () => {
  const dispatch = useDispatch();
  const [count, setcount] = useState(1);

  const seatSelect = useSelector((state) => state.commonReducer.tempData);

  useEffect(() => {
    if (seatSelect?.seats) {
      setcount(seatSelect?.seats);
    }
  }, [seatSelect]);

  const increment = () => {
    setcount(count + 1);
  };

  const decrement = () => {
    if (count <= 1) {
      return;
    } else {
      setcount(count - 1);
    }
  };

  const onApplyClick = () => {
    let arr = [];
    if (count >= 1) {
      // const body = {
      //   arr: JSON.stringify(arr),
      //   sortFilter: "POPULARITY",
      //   priceFilter: null,
      //   startTime: null,
      //   endTime: null,
      //   seats: count || null,
      //   startDate: null,
      //   endDate: null,
      // };

      // let params = {
      //   page: 1,
      //   limit: 20,
      //   guestMode: isAuthorised ? false : true,
      // };

      // dispatch(getUserDashAction.request(body, params));

      dispatch(tempData.updateTempData({ seats: count }));
      dispatch(modalVisible.modalClose());
    } else {
      dispatch(modalVisible.modalClose());
    }
  };

  return (
    <Box className="seats_main">
      <Typography>Seats</Typography>
      <Box className="inc_dec">
        <RemoveCircleIcon onClick={decrement} />
        <Typography>{count}</Typography>
        <AddCircleSharpIcon onClick={increment} />
      </Box>
      <Box>
        <Button onClick={onApplyClick} className="apply_btn">
          Apply
        </Button>
      </Box>
    </Box>
  );
};
