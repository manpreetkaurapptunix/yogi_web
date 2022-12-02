import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { tempData } from "../../redux/actions";

export const AboutInstructor = (props) => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [read, setread] = useState(false);

  const { singleClass } = useSelector((state) => state.classReducer);

  return (
    <Box className="instr_info">
      <Box className="insinfo_tet">
        <h6>About instructor</h6>

        <Typography className="text">
          {"Hi, my name is " +
            singleClass?.userId?.name +
            ", " +
            props.about?.slice(0, 140)}

          <a
            onClick={() => router.push(`${singleClass?._id}/aboutInstructor`)}
            className="color-primary"
          >
            {" … View more"}
          </a>
        </Typography>

        {/* {read ? (
          <Typography className="text">
            {props.about}
            {props.about?.length > 20 && (
              <a onClick={() => setread(false)} className="color-primary">
                … Read less
              </a>
            )}
          </Typography>
        ) : (
          <Typography className="text">
            {props.about?.slice(0, 140)} {props.about?.length > 20 ? "..." : ""}
            {props.about?.length > 20 && (
              <a onClick={() => setread(true)} className="color-primary">
                … Read more
              </a>
            )}
          </Typography>
        )} */}
      </Box>
      <Box className="chat_yoga">
        <figure>
          <Image
            width={"50%"}
            height={"100%"}
            src={singleClass?.userId?.image || "/static/images/yoga.png"}
            alt=" "
          />
        </figure>
        <Button
          onClick={() => {
            let data = {
              receiverId: singleClass?.userId?._id,
              receiverName: singleClass?.userId?.name,
              receiverImage: singleClass?.userId?.image,
              connectionId: singleClass?.connectionId,
            };
            dispatch(tempData.updateTempData({ chatData: data }));
            router.push({
              pathname: `/messages`,
              query: {
                receiverId: singleClass?.userId?._id,
                receiverName: singleClass?.userId?.name,
                receiverImage: singleClass?.userId?.image,
                connectionId: singleClass?.connectionId,
              },
            });
          }}
          className="btn_Chat p-0"
        >
          Chat now
        </Button>
      </Box>
    </Box>
  );
};
