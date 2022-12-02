import React, { useState, useEffect } from "react";
import { Container, Grid, Box, Typography } from "@mui/material";
import Image from "next/image";
import StarIcon from "@mui/icons-material/Star";
import { useRouter, withRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { Footer } from "../../layout/Footer";
import Header from "../../layout/Header";
import { AboutInstructor } from "../../components/classDetail/AboutInstructor";
import { BookNow } from "../../components/classDetail/bookSteps/BookNow";
import { BookContinue } from "../../components/classDetail/bookSteps/BookContinue";
import { PayNow } from "../../components/classDetail/bookSteps/PayNow";
import { BookDetail } from "../../components/classDetail/bookSteps/BookDetail";
import CommonDialoge from "../../layout/CommonDialoge";
import {
  classAction,
  discountAction,
  singleClassAction,
  wishlistAction,
} from "../../redux/actions";
import { colors } from "../../constants/colors";
import { Loader } from "../../components/Loader";
import { ImageSlider } from "../../components/Common/ImageSlider";

const ClassDetail = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [steps, setsteps] = useState(0);
  const { singleClass } = useSelector((state) => state.classReducer);
  const dist = useSelector((state) => state.commonReducer.tempData);
  const disData = useSelector((state) => state.bookingReducer.discountData);

  const filterData = useSelector((state) => state.commonReducer.tempData);

  useEffect(() => {
    if (router.isReady) {
      let params = {
        id: router.query?.classId,
      };
      dispatch(singleClassAction.request(params));
    }
  }, [dispatch, router]);

  const addToWish = () => {
    let body = {
      classId: singleClass?._id,
      type: singleClass?.iswishlists ? "REMOVE" : "ADD",
    };
    console.log(body, "pppppp");
    let arr = [];
    const input = {
      arr:
        filterData?.globalSearch?.arr ||
        filterData?.filterTempData?.arr ||
        JSON.stringify(arr),
      sortFilter:
        filterData?.globalSearch?.sortFilter ||
        filterData?.filterTempData?.sortFilter ||
        null,
      priceFilter:
        filterData?.globalSearch?.priceFilter ||
        filterData?.filterTempData?.priceFilter ||
        null,
      startTime:
        filterData?.globalSearch?.startTime ||
        filterData?.filterTempData?.startTime ||
        null,
      endTime:
        filterData?.globalSearch?.endTime ||
        filterData?.filterTempData?.endTime ||
        null,

      schoolName:
        filterData?.globalSearch?.schoolName ||
        filterData?.filterTempData?.schoolName ||
        null,
      className:
        filterData?.globalSearch?.className ||
        filterData?.filterTempData?.className ||
        null,
      longitude:
        filterData?.globalSearch?.longitude ||
        filterData?.filterTempData?.longitude ||
        null,
      latitude:
        filterData?.globalSearch?.latitude ||
        filterData?.filterTempData?.latitude ||
        null,
    };
    dispatch(wishlistAction.request(body, input));
    let params = {
      id: singleClass?._id,
    };
    setTimeout(() => {
      dispatch(singleClassAction.request(params));
    }, 3000);
  };

  return (
    <Box
      className={
        steps === 2
          ? "classDetail_page classPayment_page w-100"
          : "classDetail_page w-100"
      }
    >
      <Header />
      <CommonDialoge classDetail setsteps={setsteps} />
      <Box className="content_contTwo ">
        <Box className="cstm_container">
          <Grid container spacing={8}>
            <Grid item xl={6} lg={6} sm={12} xs={12}>
              <Box className="class_fetureImg ">
                <figure className="absoluteIcon" onClick={addToWish}>
                  <Image
                    width={"30%"}
                    height={"30%"}
                    src={
                      singleClass?.iswishlists
                        ? "/static/images/heart2.png"
                        : "/static/images/heart.png"
                    }
                    alt=" "
                  />
                </figure>
                {/* <figure>
                  <Image
                    width={"200%"}
                    height={"200%"}
                    src={singleClass?.image[0] || "/static/images/homeYoga.png"}
                    alt=" "
                  />
                </figure> */}
                <ImageSlider data={singleClass?.image} />
              </Box>

              {steps == 2 && (
                <Box className="class_instructor">
                  <AboutInstructor about={singleClass?.about || ""} />
                  <PayNow data={singleClass || ""} />
                </Box>
              )}
            </Grid>
            <Grid item xl={6} lg={6} sm={12} xs={12}>
              <Box className="class_details">
                <Box className="contentImg_Bx">
                  <Box className="contentImg_left">
                    <h3>{singleClass?.name || "Class Name"}</h3>
                    <span className="fz-18">
                      {singleClass?.categoryId?.name || ""}
                    </span>
                    <Box className="rating mb-0">
                      {" "}
                      <StarIcon
                        color={
                          singleClass?.avgRating ? colors.mainColor : "grey"
                        }
                      />
                      <Typography>{singleClass?.avgRating || "0"} </Typography>
                    </Box>
                  </Box>
                  {/* <Box className="contentImg_right">
                    <figure className="map_img">
                      <Image
                        width={"100%"}
                        height={"100%"}
                        src={"/static/images/map.png"}
                        alt=" "
                      />
                    </figure>
                  </Box> */}
                </Box>
              </Box>

              {steps == 0 ? (
                <BookNow setsteps={setsteps} data={singleClass} />
              ) : steps == 1 ? (
                <BookContinue setsteps={setsteps} data={singleClass} />
              ) : (
                <BookDetail setsteps={setsteps} data={singleClass} />
              )}
            </Grid>
          </Grid>
          {steps !== 2 ? (
            <Box>
              <Box className="class_decbx">
                <h6>Description</h6>
                <p>{singleClass?.desc || ""}</p>
              </Box>
              <Box className="class_decbx mt-20">
                <h6>Cancellation Policy</h6>
                <p>{singleClass?.cancel_policy || ""}</p>
              </Box>
            </Box>
          ) : (
            ""
          )}
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default ClassDetail;
