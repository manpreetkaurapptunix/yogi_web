import React from "react";
import { Box, Container, Grid, Typography } from "@mui/material";
import { GuideCard } from "./guideCard";

export const Guide = () => {
  const data = [
    {
      tab: "Technology",
      code: "JAMESROACH 1 year ago",
      heading: "5 reasons to purchase desktop computers",
      desc: "Hustle and Cashflow is a blog that aims to educate millennials on personal finance.",
    },
    {
      tab: "Business",
      code: "JAMESROACH 2 year ago",
      heading: "Utilizing mobile technology in the field",
      desc: "I think that you should be able to select more than one reason for rating.",
    },
    {
      tab: "Beauty",
      code: "JAMESROACH 2 year ago",
      heading: "SUCCESS STORY: BUSINESSMAN IN HARLEM",
      desc: "I think that you should be able to select more than one reason for rating.",
    },
  ];

  return (
    <Box className="py-80">
      <Container maxWidth="xl">
        <Box className="wel_text" sx={{ textAlign: "center" }}>
          <Typography variant="h2">Guides for getting started</Typography>
          <Typography variant="h4">
            Yogi are passionate about helping local fitness groups grow as
            businesses. Our platform gives you an <br />
            opportunity to reach and inspire more people then ever before.
          </Typography>
        </Box>
        <Grid container spacing={{ md: 7, sm: 5, xs: 2 }} className="guideRow">
          {data.map((item, i) => {
            return (
              <Grid item md={4} sm={6} xs={12} key={i}>
                <GuideCard
                  tab={item.tab}
                  code={item.code}
                  heading={item.heading}
                  desc={item.desc}
                />
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};
