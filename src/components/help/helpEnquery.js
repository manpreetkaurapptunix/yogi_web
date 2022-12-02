import { Box, Container, Typography, Button } from "@mui/material";
import React from "react";
import EastIcon from "@mui/icons-material/East";
import { modalVisible, tempData } from "../../redux/actions";
import { Modules } from "../../constants/modules";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";

export const HelpEnquery = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  return (
    <Box className="helpEnquery_sec">
      <Container className="cstm_container">
        <Box className="wel_text queryBox">
          <Typography variant="h2">
            Still need
            <br /> to contact us?
          </Typography>
          <Button
            onClick={() => {
              dispatch(tempData.updateTempData({ link: 3 }));
              router.push("/settings");
            }}
            variant="contained"
            endIcon={<EastIcon />}
            className="new_btn btn_invert"
          >
            Go To
          </Button>
        </Box>
      </Container>
    </Box>
  );
};
