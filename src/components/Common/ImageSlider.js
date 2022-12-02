/* eslint-disable @next/next/no-img-element */
import React from "react";
import Image from "next/image";
import { Box } from "@mui/material";
import Slider from "react-slick";

export const ImageSlider = (props) => {
  const settings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Box className="ImgSldr_wpr">
      <Slider {...settings}>
        {props?.data?.map((item, i) => {
          return (
            <Box className="ImgSldr_slide" key={i}>
              <figure>
                <Image src={item} width="100%" height="100%" alt="text" />
              </figure>
            </Box>
          );
        })}
      </Slider>
    </Box>
  );
};
