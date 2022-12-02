import { Box, Button, Grid, Typography } from "@mui/material";
import { setCookie } from "cookies-next";
import { useRouter } from "next/router";
import React from "react";
import { useDispatch } from "react-redux";
import { tempData } from "../../redux/actions";

export const GetInTouch = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  return (
    <Box className="getIn_touch py-80">
      <Box className="cstm_container mx-1170">
        <Grid container spacing={{ lg: 10, md: 3, xs: 2 }}>
          <Grid item md={6} sm={12} xs={12}>
            <Box className="get_imgContent">
              <Box className="sprt_pill">Support</Box>
              <Typography variant="h3" className="uppercase">
                Have a question?
                <br />
                You’re covered.
              </Typography>
            </Box>
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <Box className="get_Content">
              <Typography variant="h3" className="uppercase">
                Get In Touch
              </Typography>
              <Typography>
                Yogi is bringing sunshine to fitness groups around the world,
                our goal is for groups like you to have all the tools you need
                to easily manage your fitness business, without the huge costs
                involved. We want to spread the word of your amazing classes to
                all potential customers, so if there is anything that we can do
                to help... then just ask 🙂
              </Typography>
              <Button
                onClick={() => {
                  dispatch(tempData.updateTempData({ role: "instructor" }));
                  router.push(`/help`);
                  setCookie("type", "instructor");
                }}
                className="getIn_button"
              >
                I Want more info
              </Button>
            </Box>
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
};
