import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteInstructorClassAction,
  membershipDeleteAction,
  modalVisible,
} from "../../redux/actions";

const DeleteMembership = () => {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.commonReducer.tempData);

  const onDelete = () => {
    let id = data?.deleteMembership?.id;
    // dispatch(deleteInstructorClassAction.request(id));
    dispatch(membershipDeleteAction.request(id));
  };

  return (
    <Box className="delete_pop" sx={{ paddingTop: 3 }}>
      <Box className="text_delete">
        <Typography>{data?.deleteMembership?.text}</Typography>
      </Box>
      <Box className="btn_delete">
        <Button
          variant="text"
          onClick={() => dispatch(modalVisible.modalClose())}
        >
          <Typography>Cancel</Typography>
        </Button>
        <Button variant="text" onClick={onDelete}>
          <Typography>Yes</Typography>
        </Button>
      </Box>
    </Box>
  );
};

export default DeleteMembership;
