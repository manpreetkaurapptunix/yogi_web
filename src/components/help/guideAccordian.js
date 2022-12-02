import React from "react";
import { Box, Container, Grid } from "@mui/material";
import Image from "next/image";
import guideYoga from "../../../public/static/images/guideYoga.png";
import { styled } from "@mui/material/styles";
import ArrowForwardIosSharpIcon from "@mui/icons-material/ArrowForwardIosSharp";
import MuiAccordion from "@mui/material/Accordion";
import MuiAccordionSummary from "@mui/material/AccordionSummary";
import MuiAccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

/*********/
const Accordion = styled((props) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => ({
  border: `1px solid ${theme.palette.divider}`,
  "&:not(:last-child)": {
    borderBottom: 0,
  },
  "&:before": {
    display: "none",
  },
}));

const AccordionSummary = styled((props) => (
  <MuiAccordionSummary
    expandIcon={<ArrowForwardIosSharpIcon sx={{ fontSize: "0.9rem" }} />}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiAccordionSummary-content": {
    marginLeft: theme.spacing(1),
  },
}));

const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => ({
  padding: theme.spacing(2),
  borderTop: "1px solid rgba(0, 0, 0, .125)",
}));
/*********/

export const GuideAccordian = () => {
  const [expanded, setExpanded] = React.useState("panel1");

  const handleChange = (panel) => (event, newExpanded) => {
    setExpanded(newExpanded ? panel : false);
  };
  return (
    <Box className="guideAccordian_Sec">
      <Container className="cstm_container">
        <Grid container spacing={{ lg: 4, md: 3, xs: 2 }}>
          <Grid item md={6} sm={12} xs={12}>
            <Box className="guideImg">
              <Image src={guideYoga} alt="image" />
            </Box>
          </Grid>
          <Grid item md={6} sm={12} xs={12}>
            <Box className="accordianWpr">
              <Accordion
                expanded={expanded === "panel1"}
                onChange={handleChange("panel1")}
              >
                <AccordionSummary
                  aria-controls="panel1d-content"
                  id="panel1d-header"
                  expandIcon={
                    expanded != "panel1" ? <AddIcon /> : <RemoveIcon />
                  }
                >
                  <Typography className="fz-20 fw-bold">
                    GOOGLE MOBILE CAN MONETIZE YOUR APP
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className="fz-16">
                    Click edit button to change this text. Lorem ipsum dolor sit
                    amet, consectetur adipiscing elit. Ut elit tellus, luctus
                    nec ullamcorper mattis, pulvinar dapibus leo.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expanded === "panel2"}
                onChange={handleChange("panel2")}
              >
                <AccordionSummary
                  aria-controls="panel2d-content"
                  id="panel2d-header"
                  expandIcon={
                    expanded != "panel2" ? <AddIcon /> : <RemoveIcon />
                  }
                >
                  <Typography className="fz-20 fw-bold">
                    PERFORMANCE SHARED HOSTING IN YOUR ACCOUNT
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className="fz-16">
                    Click edit button to change this text. Lorem ipsum dolor sit
                    amet, consectetur adipiscing elit. Ut elit tellus, luctus
                    nec ullamcorper mattis, pulvinar dapibus leo.
                  </Typography>
                </AccordionDetails>
              </Accordion>
              <Accordion
                expanded={expanded === "panel3"}
                onChange={handleChange("panel3")}
              >
                <AccordionSummary
                  aria-controls="panel3d-content"
                  id="panel3d-header"
                  expandIcon={
                    expanded != "panel3" ? <AddIcon /> : <RemoveIcon />
                  }
                >
                  <Typography className="fz-20 fw-bold">
                    TRACK THE LOCATION OF YOUR CARS
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography className="fz-16">
                    Click edit button to change this text. Lorem ipsum dolor sit
                    amet, consectetur adipiscing elit. Ut elit tellus, luctus
                    nec ullamcorper mattis, pulvinar dapibus leo.
                  </Typography>
                </AccordionDetails>
              </Accordion>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};
