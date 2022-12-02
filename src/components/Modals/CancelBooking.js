import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  custCancelBookingAction,
  deleteInstructorClassAction,
  modalVisible,
} from "../../redux/actions";

const CancelBooking = () => {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.commonReducer.tempData);

  const onDelete = () => {
    let id = data?.cancelBookingId?.id;
    // dispatch(deleteInstructorClassAction.request(id));
    const body = {
      type: "UPCOMING",
      page: 1,
      size: 20,
    };
    dispatch(custCancelBookingAction.request(id, body));
  };

  return (
    <Box className="delete_pop">
      <Box className="text_delete">
        <Typography>{data?.cancelBookingId?.text}</Typography>
      </Box>
      <Box className="btn_delete">
        <Button
          variant="text"
          onClick={() => dispatch(modalVisible.modalClose())}
        >
          <Typography>No</Typography>
        </Button>
        <Button variant="text" onClick={onDelete}>
          <Typography>Yes</Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default CancelBooking;
