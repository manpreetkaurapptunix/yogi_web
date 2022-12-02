import React, { useState, useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import InfoIcon from "@mui/icons-material/Info";
import DoneIcon from "@mui/icons-material/Done";
import { useSelector, useDispatch } from "react-redux";
import {
  buySubscriptionAction,
  getInstSubscriptionAction,
} from "../../redux/actions";
import { useRouter } from "next/router";
const getSymbolFromCurrency = require("currency-symbol-map");

const MembershipPlan = () => {
  const dispatch = useDispatch();
  const router = useRouter();
  const [selected, setSelected] = useState([]);

  const { singleClass } = useSelector((state) => state.classReducer);
  const { instSubData } = useSelector((state) => state.membershipReducer);

  useEffect(() => {
    let params = {
      id: singleClass?.userId?._id,
    };

    dispatch(getInstSubscriptionAction.request(params));
  }, [dispatch]);

  const handleSelected = (id) => {
    if (selected.includes(id)) {
      setSelected((selected) => selected.filter((s) => s !== id));
    } else {
      setSelected((selected) => [...selected, id]);
    }
  };

  const onBuyClick = (item) => {
    let body = {
      subscriptionId: item,
    };
    dispatch(buySubscriptionAction.request(body));
    router.back();
  };

  return (
    <Box className="member_con" style={{ width: "100%" }}>
      <Box>
        {instSubData && instSubData?.data?.length ? (
          instSubData?.data?.map((item, index) => {
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
                        alt=""
                      />
                    </figure>
                    <h6 className="text-cap">{item?.name}</h6>
                  </Box>
                  <Box className="membr_price">
                    {getSymbolFromCurrency(item?.instructorId?.currencyCode)}
                    {item?.price}
                  </Box>
                </Box>

                <Box className="membr_card_dtl">
                  <p>{item?.notes}</p>
                </Box>
                {selected.includes(item._id) && (
                  <Box>
                    <Box className="membr_card_dtl">
                      <p>{"Instructor Name: " + item?.instructorId?.name}</p>
                    </Box>
                    <Box className="membr_card_dtl">
                      <p>{"Total Attendees: " + item?.entry}</p>
                    </Box>
                  </Box>
                )}
                <Box>
                  <Typography className="fz-18 ">
                    {item?.entryClass + " Classes"}
                  </Typography>
                  <Typography className="fz-18 ">
                    {item?.duration + " Months"}
                  </Typography>
                </Box>

                {item?.isBuy ? (
                  <Typography className="fz-18 ">{"Active"}</Typography>
                ) : (
                  <Box
                    onClick={() => onBuyClick(item?._id)}
                    className="edit_icons"
                  >
                    <Button>Buy Now</Button>
                  </Box>
                )}
              </Box>
            );
          })
        ) : (
          <Typography>No Membership Found</Typography>
        )}
      </Box>
    </Box>
  );
};

export default MembershipPlan;
