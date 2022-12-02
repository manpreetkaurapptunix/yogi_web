import React, { useState, useEffect } from "react";
import { Box, Typography, Button } from "@mui/material";
import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";
import { getUserMemberAction } from "../../redux/actions";
import dayjs from "dayjs";

const memberships = [
  {
    id: 1,
    crown: "/static/images/crown.png",
    edit: "/static/images/edit.png",
    delete: "/static/images/delete.png",
    name: "Lite",
    time: "3 Months",
    price: "$49",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    id: 2,
    crown: "/static/images/crown.png",
    edit: "/static/images/edit.png",
    delete: "/static/images/delete.png",
    name: "Pro",
    time: "3 Months",
    price: "$49",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
  {
    id: 3,
    crown: "/static/images/crown.png",
    edit: "/static/images/edit.png",
    delete: "/static/images/delete.png",
    name: "basic",
    time: "3 Months",
    price: "$49",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book.",
  },
];
const Membership = () => {
  const dispatch = useDispatch();
  const [selected, setSelected] = useState([]);

  const { userMemberData } = useSelector((state) => state.membershipReducer);
  const isAuthorised = useSelector((state) => state.commonReducer.isAuthorised);
  const userData = useSelector((state) => state.authReducer.userData);

  useEffect(() => {
    if (isAuthorised) {
      if (userData?.role == "user") {
        dispatch(getUserMemberAction.request());
      }
    }
  }, [dispatch, isAuthorised]);

  const handleSelected = (id) => {
    if (selected.includes(id)) {
      setSelected((selected) => selected.filter((s) => s !== id));
    } else {
      setSelected((selected) => [...selected, id]);
    }
  };

  console.log(userMemberData, "memberdata");
  return (
    <Box className="member_con" style={{ width: "100%" }}>
      {userMemberData?.length ? (
        userMemberData?.map((item, index) => {
          return (
            <Box
              onClick={() => handleSelected(item?._id)}
              key={index}
              className="membership_card"
            >
              <Box className="member_card_hdr">
                <Box className="member_type">
                  <figure>
                    <Image
                      width={"30%"}
                      height={"30%"}
                      src={"/static/images/crown.png"}
                      alt="logo"
                    />
                  </figure>
                  <h6 className="text-cap">{item?.subscriptionId?.name}</h6>
                </Box>
                <Box className="membr_price">
                  {item?.instructor?.currencySymbol}
                  {item?.price}
                </Box>
              </Box>

              <Box className="membr_card_dtl">
                <p>{item?.subscriptionId?.notes}</p>
              </Box>
              {selected.includes(item._id) && (
                <Box>
                  <Box className="membr_card_dtl">
                    <Typography>
                      {"Instructor Name: " + item?.instructor?.name}
                    </Typography>
                  </Box>
                  <Typography className="fz-16">
                    {"Valid Till: " +
                      dayjs(item?.expiryDate).format("DD-MM-YYYY")}
                  </Typography>
                  <Box className="membr_card_dtl">
                    <p>{"Total Attendees: " + item?.entryCount}</p>
                  </Box>
                  <Box className="membr_card_dtl">
                    <p>{"Total Classes: " + item?.entryClass}</p>
                  </Box>
                </Box>
              )}
              <Box>
                <Typography className="fz-18 ">
                  {item?.subscriptionId?.duration + " Months Plan"}
                </Typography>
              </Box>
            </Box>
          );
        })
      ) : (
        <Typography>No Membership Found</Typography>
      )}
    </Box>
  );
};

export default Membership;
