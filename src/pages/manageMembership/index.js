import React, { useEffect, useState } from "react";
import Image from "next/image";
import {
  membershipDeleteAction,
  membershipGetAction,
  modalVisible,
  tempData,
} from "../../redux/actions";
import { useSelector, useDispatch } from "react-redux";
import { InstructorFooter } from "../../layout/InstructorFooter";
import InstructorHeader from "../../layout/InstructorHeader";
import AddMembership from "../../components/manageMembership/AddMembership";
import { Box, Grid, Typography } from "@mui/material";
import {
  membershipGetIDAction,
  membershipUpdateAction,
} from "../../redux/actions/membershipAction";
import { Modules } from "../../constants/modules";

const ManageMembership = () => {
  const [memberId, setMemberId] = useState();
  // const [memberData, setMemberData] = useState({});
  const dispatch = useDispatch();

  /*************/
  // const getMemberID = (id) => {
  //   setMemberId(id);
  //   dispatch(membershipDeleteAction.request(id));
  //   console.log(id, "member is");
  // };

  const onDeleteClass = (id) => {
    // e.stopPropagation();
    // console.log(e.target.value);
    dispatch(modalVisible.modalOpen(Modules.DELETE_MEMBERSHIP));

    let data = {
      text: "Are you sure you want to delete this Membership",
      id: id,
    };
    dispatch(tempData.updateTempData({ deleteMembership: data }));
  };

  useEffect(() => {
    dispatch(membershipGetAction.request());
  }, [dispatch, memberId]);

  const { getData } = useSelector((state) => state.membershipReducer);

  /*************/
  const updateMembership = (data) => {
    // setMemberData(data);
    dispatch(membershipGetIDAction.request(data));
  };

  return (
    <Box className="membership_contain w-100">
      <InstructorHeader />
      <Box className="member_con cstm_container" style={{ width: "100%" }}>
        <Box className="sub_hdg">
          <h3 align="center">Manage Memberships</h3>
        </Box>
        <Grid container spacing={3} className="mbr_mn">
          <Grid item xl={6} lg={6} sm={12} xs={12}>
            {getData && getData?.data?.length ? (
              getData?.data?.map((item, index) => {
                return (
                  <Box key={index} className="membership_card">
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
                        <h6 className="text-cap txt_nm">{item?.name}</h6>
                      </Box>
                      <Typography className="itm">
                        {item?.duration === 12
                          ? "1 Year"
                          : item.duration + " Months"}
                      </Typography>
                      <Box className="membr_price">
                        {item?.instructorId?.currencySymbol + item?.price}
                      </Box>
                    </Box>
                    <p classname="member_desc">
                      {"Total Attendees: " + item?.entry}
                    </p>
                    <p classname="member_desc">
                      {"Total Classes: " + item?.entryClass}
                    </p>

                    <Box className="membr_card_dtl">
                      <p classname="member_desc">{item?.notes}</p>
                      <Box className="edit_icons">
                        <figure onClick={() => updateMembership(item._id)}>
                          <Image
                            width={"20%"}
                            height={"20%"}
                            src={"/static/images/edit.png"}
                            alt="logo"
                          />
                        </figure>
                        <figure onClick={() => onDeleteClass(item._id)}>
                          <Image
                            width={"20%"}
                            height={"20%"}
                            src={"/static/images/delete.png"}
                            alt="logo"
                          />
                        </figure>
                      </Box>
                    </Box>
                  </Box>
                );
              })
            ) : (
              <Typography className="empty_text">
                No Memberships Found
              </Typography>
            )}
          </Grid>
          <Grid item xl={6} lg={6} sm={12} xs={12}>
            <AddMembership />
          </Grid>
        </Grid>
      </Box>
      <InstructorFooter />
    </Box>
  );
};

export default ManageMembership;
