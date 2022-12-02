import { Box, Typography } from "@mui/material";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ClassCard } from "../../components/home/ClassCard";
import { WishlistCompo } from "../../components/Wishlist/WishlistCompo";
import { Footer } from "../../layout/Footer";
import Header from "../../layout/Header";
import { getWishlistAction } from "../../redux/actions";

const Wishlist = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  const { getWishlistData } = useSelector((state) => state.wishlistReducer);

  useEffect(() => {
    dispatch(getWishlistAction.request());
  }, [dispatch]);

  return (
    <Box className="wishlist_page w-100">
      <Header />
      <Box className="content_cont cstm_container">
        <Box className="sub_hdg whishlist_hdg">
          <h3 align="center">My Wishlist</h3>
        </Box>
        <Box className="card_compo cstm_grid">
          {getWishlistData?.length ? (
            getWishlistData?.map((item, index) => {
              return (
                <Box
                  onClick={() => router.push("wishlist/detail")}
                  className="cstm_grid_item"
                  key={index}
                >
                  <WishlistCompo data={item} wish />
                </Box>
              );
            })
          ) : (
            <Typography className="empty_text">No Classes Found</Typography>
          )}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Wishlist;
