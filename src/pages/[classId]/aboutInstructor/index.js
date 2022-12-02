import { Box, Typography, List, ListItem, ListItemText } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import MembershipPlan from "../../../components/BuyMembership/MembershipPlan";
import { Footer } from "../../../layout/Footer";
import Header from "../../../layout/Header";

const AboutInstructor = () => {
  const router = useRouter();

  const { singleClass } = useSelector((state) => state.classReducer);

  useEffect(() => {
    if (!singleClass) {
      router.replace("/");
    }
  }, [singleClass]);

  const reviewData = [
    {
      id: 1,
      key: "Name",
      value: singleClass?.userId?.name || "",
    },
    {
      id: 2,
      key: "Phone No.",
      value:
        singleClass?.userId?.callingCode + " " + singleClass?.userId?.phone ||
        "",
    },
    {
      id: 3,
      key: "Email",
      value: singleClass?.userId?.email || "",
    },
    {
      id: 4,
      key: "Address",
      value: singleClass?.userId?.address || "",
    },
    {
      id: 5,
      key: "School Name",
      value: singleClass?.userId?.schoolName || "",
    },
    {
      id: 6,
      key: "Gender",
      value: singleClass?.userId?.gender || "",
    },
  ];

  return (
    <Box className="about_ins_contain w-100">
      <Header />
      <Box className="cstm_container">
        <Box className="about_ins_wrap" sx={{ marginBottom: 8 }}>
          <Box className="sub_hdg">
            <h3 align="center">Instructor Detail</h3>
          </Box>
          <Box className="review_detail contact">
            <Box className="chat_yoga">
              <figure>
                <Image
                  width={"50%"}
                  height={"100%"}
                  src={singleClass?.userId?.image || "/static/images/yoga.png"}
                  alt=" "
                />
              </figure>
            </Box>

            <Typography variant="h6" sx={{ fontWeight: 600, marginTop: 3 }}>
              Contact Details
            </Typography>
            <Box className="booking_del_Form">
              <List sx={{ width: "100%", maxWidth: "100%" }}>
                {reviewData.map((item, index) => {
                  return (
                    <Box key={index}>
                      <ListItem>
                        <ListItemText
                          primary={item.key}
                          sx={{ m: 0, p: 0 }}
                          className="color_light"
                        />
                        <ListItemText
                          primary={item.value}
                          sx={{ m: 0, p: 0, textAlign: "right" }}
                        />
                      </ListItem>
                    </Box>
                  );
                })}
              </List>
            </Box>
          </Box>
          <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: 3 }}>
            About Instructor
          </Typography>

          <Typography variant="h6" sx={{ marginBottom: 3 }}>
            {singleClass?.about}
          </Typography>

          <Typography variant="h6" sx={{ fontWeight: 600, marginBottom: 3 }}>
            Membership Details
          </Typography>
          <MembershipPlan />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};

export default AboutInstructor;
