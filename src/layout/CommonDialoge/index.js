import { Box, Dialog, Typography } from "@mui/material";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  Filter,
  LoginCompo,
  MultiDatePicker,
  SeatsSelectCompo,
  SignUpCompo,
  TimeSelectCompo,
  VerificationCompo,
  Forgot,
  DeletePopUp,
  CancelBooking,
} from "../../components/Modals";
import { Modules } from "../../constants/modules";
import { modalVisible } from "../../redux/actions";
import CloseIcon from "@mui/icons-material/Close";
import Discount from "../../components/Modals/Discount";
import DeleteMembership from "../../components/Modals/DeleteMembership";

const CommonDialoge = (props) => {
  const { classDetail, setsteps } = props;

  const dispatch = useDispatch();

  const isDialogeOpen = useSelector(
    (state) => state.commonReducer.isDialogeOpen
  );
  const dialogType = useSelector((state) => state.commonReducer.modalCategory);

  const modalType = () => {
    switch (dialogType) {
      case Modules.LOGIN:
        return <LoginCompo />;

      case Modules.SIGNUP:
        return <SignUpCompo />;

      case Modules.VERIFY:
        return <VerificationCompo />;

      case Modules.DATE:
        return (
          <MultiDatePicker
            classDetail={classDetail ? true : false}
            setsteps={setsteps ? setsteps : ""}
          />
        );
      case Modules.TIME:
        return <TimeSelectCompo />;
      case Modules.SEATS:
        return <SeatsSelectCompo />;
      case Modules.FILTER:
        return <Filter />;
      case Modules.FORGOT_PASSWORD:
        return <Forgot />;
      case Modules.DELETE:
        return <DeletePopUp />;
      case Modules.CANCEL_BOOKING:
        return <CancelBooking />;
      case Modules.DISCOUNT:
        return <Discount />;
      case Modules.DELETE_MEMBERSHIP:
        return <DeleteMembership />;
      default:
        return null;
    }
  };

  return (
    <Dialog
      open={isDialogeOpen}
      className="main_dialog"
      maxWidth="xl"
      onClose={() => dispatch(modalVisible.modalClose())}
    >
      <Box
        className="modalClose"
        onClick={() => dispatch(modalVisible.modalClose())}
      >
        <CloseIcon />
      </Box>
      {modalType()}
    </Dialog>
  );
};

export default CommonDialoge;
