import { Box, Typography, Grid, Container } from "@mui/material";
import React, { useState, useEffect } from "react";
import { styled, alpha } from "@mui/material/styles";
import Header from "../../layout/Header";
import { Footer } from "../../layout/Footer";
import ChatList from "../../components/messages/ChatList";
import ChatCompo from "../../components/messages/ChatCompo";
import SearchIcon from "@mui/icons-material/Search";
import InputBase from "@mui/material/InputBase";
import { getCookie } from "cookies-next";
import InstructorHeader from "../../layout/InstructorHeader";
import { useDispatch, useSelector } from "react-redux";
import { getChatList, tempData } from "../../redux/actions";
import { InstructorFooter } from "../../layout/InstructorFooter";
import { useRouter } from "next/router";

const users = [
  {
    image: "/static/images/chat.png",
    id: 1,
    name: "Shen Rad",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    time: "9 mins ago",
    notification: 1,
  },
  {
    image: "/static/images/user.png",
    id: 1,
    name: "Anna James",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    time: "2mins ago",
    notification: 9,
  },
  {
    image: "/static/images/profile.png",
    id: 1,
    name: "Emma Watson",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    time: "2 hour ago",
  },
  {
    image: "/static/images/chat.png",
    id: 1,
    name: "Shen Rad",
    desc: "Lorem Ipsum is simply dummy text of the printing and typesetting industry.",
    time: "9 mins ago",
  },
];

const Search = styled("div")(({ theme }) => ({
  position: "relative",
  borderRadius: theme.shape.borderRadius,
  backgroundColor: alpha(theme.palette.common.white, 0.15),
  "&:hover": {
    backgroundColor: alpha(theme.palette.common.white, 0.25),
  },
  marginRight: theme.spacing(2),
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(3),
    width: "auto",
  },
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

const Messages = () => {
  const [selectedUser, setselectedUser] = useState(null);
  const [typeRole, settypeRole] = useState("");
  const [roomJoined, setRoomJoined] = useState(false);

  const router = useRouter();

  const dispatch = useDispatch();

  const chatData = useSelector((state) => state.chatReducer.chatList);

  useEffect(() => {
    dispatch(getChatList.request(""));
    dispatch(tempData.updateTempData({ uploadImage: null }));
  }, [dispatch]);

  useEffect(() => {
    const role = getCookie("type");
    settypeRole(role);
  }, [typeRole]);

  const onSearch = (e) => {
    dispatch(getChatList.request(e.target.value));
  };

  /* image preview */
  // document.getElementsByClassName(".chatEdit_desc").onClick =
  //   function myFunction() {
  //     alert("hello");
  //   };

  /* End prev */
  return (
    <Box className="message_cont w-100">
      {typeRole == "instructor" ? <InstructorHeader /> : <Header />}
      <Box className="message_wrap">
        <Box className="sub_hdg whishlist_hdg">
          <h3 align="center">Messages</h3>
        </Box>
        <Box className="cstm_container">
          <Grid container spacing={3}>
            <Grid item xl={6} lg={6} md={5} sm={12} xs={12}>
              <Box className="chatList_wpr">
                <Search className="searchBar">
                  <SearchIconWrapper>
                    <SearchIcon />
                  </SearchIconWrapper>
                  <StyledInputBase
                    placeholder="Search…"
                    inputProps={{ "aria-label": "search" }}
                    onChange={(e) => onSearch(e)}
                  />
                </Search>
                <Box className="listWrap">
                  {chatData?.length ? (
                    chatData?.map((item, index) => {
                      return (
                        <Box
                          onClick={() => {
                            setRoomJoined(false);

                            let data = {
                              receiverId: item?.user?._id,
                              receiverName: item?.user?.name,
                              receiverImage: item?.user?.image,
                              connectionId: item?.connectionId,
                            };
                            setselectedUser(data);
                            dispatch(
                              tempData.updateTempData({ chatData: data })
                            );
                            router.push({
                              pathname: `/messages`,
                              query: {
                                receiverId: item?.user?._id,
                                receiverName: item?.user?.name,
                                receiverImage: item?.user?.image,
                                connectionId: item?.connectionId,
                              },
                            });
                          }}
                          key={index}
                          className="chatList_item"
                        >
                          <ChatList
                            setselectedUser={setselectedUser}
                            selectedUser={selectedUser}
                            data={item}
                            setRoomJoined={setRoomJoined}
                            roomJoined={roomJoined}
                          />
                        </Box>
                      );
                    })
                  ) : (
                    <Typography align="center">Inbox is empty</Typography>
                  )}
                </Box>
              </Box>
            </Grid>
            <Grid item xl={6} lg={6} md={7} sm={12} xs={12}>
              <ChatCompo
                setRoomJoined={setRoomJoined}
                roomJoined={roomJoined}
                setselectedUser={setselectedUser}
                selectedUser={selectedUser}
              />
            </Grid>
          </Grid>
        </Box>
      </Box>
      {/* <Footer /> */}
      {typeRole == "instructor" ? <InstructorFooter /> : <Footer />}
    </Box>
  );
};

export default Messages;
