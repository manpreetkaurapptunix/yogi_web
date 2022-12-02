import { Box, Grid } from "@mui/material";
import Image from "next/image";
import React from "react";
import StarIcon from "@mui/icons-material/Star";
import { colors } from "../../constants/colors";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteInstructorClassAction,
  instClassByIdAction,
  modalVisible,
  tempData,
} from "../../redux/actions";
import { Modules } from "../../constants/modules";
import dayjs from "dayjs";
import { useRouter } from "next/router";

const ClassCompo = (props) => {
  const { data, setformType } = props;
  const dispatch = useDispatch();
  const router = useRouter();
  const userProfileData = useSelector((state) => state.authReducer.userData);

  const onDeleteClass = (e) => {
    e.stopPropagation();
    dispatch(modalVisible.modalOpen(Modules.DELETE));

    let deleteData = {
      text: "Are you sure you want to delete this class",
      id: data?._id,
    };
    console.log(deleteData);

    dispatch(tempData.updateTempData({ deleteClassId: deleteData }));
    // let id = data?._id;
    // dispatch(deleteInstructorClassAction.request(id));
  };

  const onEditClick = (e) => {
    e.stopPropagation();
    setformType(1);

    dispatch(instClassByIdAction.request(data?._id));
  };

  const onCardClick = () => {
    dispatch(instClassByIdAction.request(data?._id));
    router.push("instructorClass");
  };
  return (
    <Box className="classCard_con rgt_img">
      <Box className="card_wrapper">
        <Box className="classCard_content">
          <Box onClick={onCardClick} className="bgnr_mn">
            <Box className="bgnr_lt">
              <Box className="name_view">
                <Box
                  className="fz-18 fw-bold hdng"
                  style={{ marginBottom: "6px" }}
                >
                  {data?.name || "Beginners Class"}
                </Box>
                {/* <ul>
              <li>
                <figure>
                  <Image
                    width={"100%"}
                    height={"100%"}
                    src={"/static/images/homeYogabig.png"}
                    alt=" "
                  />
                </figure>
              </li>
            </ul> */}
              </Box>
              <p className="fz-16">{data?.categoryId?.name}</p>
              <Box className="rating">
                <StarIcon />
                <p className="fz-14">{data?.avgRating || "0"}</p>
              </Box>
              <Box className="fz-16 classDate">
                {dayjs(data?.start_date).format("MMM DD, YYYY") +
                  " - " +
                  dayjs(data?.end_date).format("MMM DD, YYYY")}
              </Box>
              <Box className="fz-16 classDate">
                {data?.time &&
                  dayjs(data?.time[0]?.start_time).format("h:mm A") +
                    " - " +
                    dayjs(data?.time[0]?.end_time).format("h:mm A")}
              </Box>
              <Box className="fz-16 price">
                Price:{" "}
                <span className="fw-bold">
                  {userProfileData?.currencySymbol
                    ? userProfileData?.currencySymbol
                    : data?.instructor?.currencySymbol}
                  {data?.price_per_head}
                </span>
              </Box>
              <Box className="edit_icons">
                <figure className="fltr">
                  <Image
                    width={"25%"}
                    height={"25%"}
                    src={"/static/images/edit.png"}
                    onClick={(e) => onEditClick(e)}
                    alt="logo"
                  />
                </figure>
                <figure className="fltr_rd">
                  <Image
                    width={"25%"}
                    height={"25%"}
                    src={"/static/images/delete.png"}
                    onClick={(e) => onDeleteClass(e)}
                    alt="logo"
                  />
                </figure>
              </Box>
            </Box>
            <Box className="bgnr_rtg">
              <ul>
                <li>
                  <figure>
                    <Image
                      width={"100%"}
                      height={"100%"}
                      src={
                        data?.image
                          ? data?.image[0]
                          : "/static/images/homeYogabig.png"
                      }
                      alt=" "
                    />
                  </figure>
                </li>
              </ul>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ClassCompo;
