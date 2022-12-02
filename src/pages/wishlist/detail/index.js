import React, { useState, useEffect } from "react";
import { Container, Grid, Box, Typography } from "@mui/material";
import Image from "next/image";
import StarIcon from "@mui/icons-material/Star";
import { useRouter, withRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { Footer } from "../../../layout/Footer";

import CommonDialoge from "../../../layout/CommonDialoge";
import { classAction, singleClassAction } from "../../../redux/actions";
import { colors } from "../../../constants/colors";
import moment from "moment";
import Header from "../../../layout/Header";
import { ImageSlider } from "../../../components/Common/ImageSlider";

const Detail = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [steps, setsteps] = useState(0);
  const { singleClass } = useSelector((state) => state.classReducer);
  // const data = useSelector((state) => state.classReducer.instClassByIDData);
  const data = useSelector((state) => state.wishlistReducer.getWishlistData);

  useEffect(() => {
    if (!data) {
      router.back();
    }
  }, [data]);

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
      <Box className="content_cont">
        <Box className="cstm_container">
          <Grid container spacing={8}>
            <Grid item xl={6} lg={6} sm={12} xs={12}>
              <Box className="class_fetureImg">
                {/* <figure>
                  <Image
                    width={"200%"}
                    height={"200%"}
                    src={data?.image || "/static/images/homeYoga.png"}
                    alt=" "
                  />
                </figure> */}
                <ImageSlider data={data ? data[0]?.class?.image : []} />
              </Box>
            </Grid>
            <Grid item xl={6} lg={6} sm={12} xs={12}>
              <Box className="class_details">
                <Box className="contentImg_Bx">
                  <Box className="contentImg_left">
                    <h3>{data?.name || "Class Name"}</h3>
                    {/* <span className="fz-18">Yoga</span> */}
                    <Box className="rating mb-0">
                      <StarIcon
                        color={
                          singleClass?.avgRating ? colors.mainColor : "grey"
                        }
                      />
                      <Typography>{singleClass?.avgRating || "0"}</Typography>
                    </Box>
                  </Box>
                  <Box className="contentImg_right">
                    <figure className="map_img">
                      <Image
                        width={"100%"}
                        height={"100%"}
                        src={"/static/images/map.png"}
                        alt=" "
                      />
                    </figure>
                  </Box>
                </Box>
                <Box className="book_wrap">
                  <Box className="book_wrap_hdg">
                    <h6>
                      {moment(data?.start_date).format("MMM Do YYYY") +
                        " - " +
                        moment(data?.end_date).format("MMM Do YYYY")}
                    </h6>
                    <Typography className="fz-14 color_light">
                      {data?.seats || "0"} Seats Available
                    </Typography>
                  </Box>
                  {/* <Box className="time_book">
                    {data?.time.map((item, index) => {
                      return (
                        <Box key={index} className="timeClass_view">
                          <Typography>
                            {" "}
                            {moment(item?.start_time).format("h:mm A") +
                              " - " +
                              moment(item?.end_time).format("h:mm A")}
                          </Typography>
                        </Box>
                      );
                    })}
                  </Box> */}

                  <Box className="exercise_box">
                    <h6>Exercise Include</h6>
                    <Box className="exer_view_wpr" sx={{ marginTop: 1 }}>
                      {data?.excercises?.map((item, index) => {
                        return (
                          <Box className="exer_view" key={index}>
                            <figure>
                              <Image
                                width={"50%"}
                                height={"50%"}
                                src={item?.image || "/static/images/map.png"}
                                alt=" "
                              />
                            </figure>
                          </Box>
                        );
                      })}
                    </Box>
                    <Box className="pice_book">
                      <Box className="pice_book_text">
                        Price: <b>${data?.price_per_head || "0"}</b>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>

              {/* {steps == 0 ? (
                <BookNow setsteps={setsteps} data={singleClass} />
              ) : steps == 1 ? (
                <BookContinue setsteps={setsteps} />
              ) : (
                <BookDetail setsteps={setsteps} />
              )} */}
            </Grid>
          </Grid>

          <Box>
            <Box className="class_decbx">
              <h6>Description</h6>
              <p>{singleClass?.desc || ""}</p>
              <p>
                {data?.desc}
                {/* There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humour, or randomised words which don’t look even
                slightly believable. If you are going to use a passage of Lorem
                Ipsum, you need to be sure there isn’t anything embarrassing
                hidden in the middle of text. All the Lorem Ipsum generators on
                the Internet tend to repeat predefined chunks as necessary,
                making this the first true generator on the Internet. It uses a
                dictionary of over 200 Latin words, combined with a handful of
                model sentence structures, to generate Lorem Ipsum which looks
                reasonable. */}
              </p>
            </Box>
            <Box className="class_decbx mt-20">
              <h6>Cancellation Policy</h6>
              <p>{data?.cancel_policy}</p>
              {/* <p>
                It is a long established fact that a reader will be distracted
                by the readable content of a page when looking at its layout.
                The point of using Lorem Ipsum is that it has a more-or-less
                normal distribution of letters, as opposed to using ‘Content
                here, content here’, making it look like readable English. Many
                desktop publishing packages and web page editors now use Lorem
                Ipsum as their default model text, and a search for ‘lorem
                ipsum’ will uncover many web sites still in their infancy.
              </p>
              <p>
                There are many variations of passages of Lorem Ipsum available,
                but the majority have suffered alteration in some form, by
                injected humour, or randomised words which don’t look even
                slightly believable. If you are going to use a passage of Lorem
                Ipsum, you need to be sure there isn’t anything embarrassing
                hidden in the middle of text. All the Lorem Ipsum generators on
                the Internet tend to repeat predefined chunks as necessary,
                making this the first true generator on the Internet. It uses a
                dictionary of over 200 Latin words, combined with a handful of
                model sentence structures, to generate Lorem Ipsum which looks
                reasonable.
              </p> */}
            </Box>
          </Box>
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default Detail;
