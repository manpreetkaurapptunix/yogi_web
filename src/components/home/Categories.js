import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import React from "react";

export const Categories = (props) => {
  const { data } = props;
  return (
    <>
      <figure>
        <Image width={"100%"} height={"100%"} src={data?.image} alt=" " />
      </figure>
      <Typography className="cat_txt">{data?.name}</Typography>
    </>
  );
};
