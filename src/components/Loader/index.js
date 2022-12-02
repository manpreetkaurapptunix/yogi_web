import { CircularProgress, Box, Modal } from "@material-ui/core";
import React from "react";
import { useSelector } from "react-redux";

export const Loader = (props) => {
  const isLoading = useSelector((state) => state.classReducer.isLoading);
  const isLoadingAuth = useSelector((state) => state.authReducer.isLoading);
  const isLoadingWish = useSelector((state) => state.wishlistReducer.isLoading);
  const isLoadingHome = useSelector((state) => state.homeReducer.isLoading);
  const isLoadingBooking = useSelector(
    (state) => state.bookingReducer.isLoading
  );
  const isLoadingCommon = useSelector((state) => state.commonReducer.isLoading);
  const isLoadingChat = useSelector((state) => state.chatReducer.isLoading);

  return (
    <Box>
      {isLoading ||
      props.isLoad ||
      isLoadingBooking ||
      isLoadingAuth ||
      isLoadingHome ||
      isLoadingCommon ||
      isLoadingChat ||
      isLoadingWish ? (
        <Modal open>
          <Box className="loader_loading">
            <CircularProgress color="secondary" />
          </Box>
        </Modal>
      ) : (
        ""
      )}
    </Box>
  );
};
