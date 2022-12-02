import { Box, Button, Typography } from "@mui/material";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteInstructorClassAction, modalVisible } from "../../redux/actions";

const DeletePopUp = () => {
  const dispatch = useDispatch();

  const data = useSelector((state) => state.commonReducer.tempData);

  console.log(data?.deleteClassId?.id, "lllll");

  const onDelete = () => {
    let id = data?.deleteClassId?.id;
    dispatch(deleteInstructorClassAction.request(id));
  };

  return (
    <Box className="delete_pop" sx={{ paddingTop: 3 }}>
      <Box className="text_delete">
        <Typography>{data?.deleteClassId?.text}</Typography>
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

export default DeletePopUp;
