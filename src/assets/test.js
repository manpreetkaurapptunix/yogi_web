/* eslint-disable react/no-unescaped-entities */
import { Box, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect } from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Image from "next/image";
import DoneAllIcon from "@mui/icons-material/DoneAll";
import { useRouter } from "next/router";
import { callSocket } from "../../utils/socket";
import {
  getChatHistory,
  getChatList,
  imageUploadAction,
  tempData,
  updateSocket,
} from "../../redux/actions";
import dayjs from "dayjs";
import SocketIOClient from "socket.io-client";
import { getCookie } from "cookies-next";

// let socket = {};
const ChatCompo = (props) => {
  const { data, roomJoined, setRoomJoined } = props;
  const dispatch = useDispatch();

  const socket = useSelector((state) => state.commonReducer.socket);
  const chatHistory = useSelector((state) => state.chatReducer.chatHistory);

  const userData = useSelector((state) => state.authReducer.userData);

  const chatTempData = useSelector((state) => state.commonReducer.tempData);

  const router = useRouter();
  const [sendMsg, setSendMsg] = useState("");
  const [roomData, setRoomData] = useState("");
  const [imageSend, setimageSend] = useState({
    receiverId: router.query?.receiverId,
    receiverName: router.query?.receiverName,
    receiverImage: router.query?.receiverImage,
    connectionId: router.query?.connectionId,
  });

  const [text, setText] = useState("");

  const chatData = useSelector((state) => state.chatReducer.chatList);
  const imageData = useSelector((state) => state.commonReducer.uploadImage);

  useEffect(() => {
    const img = imageData;

    if (img) {
      onSendImage(img);
      setimageSend(img);
    }
  }, [imageData]);

  useEffect(() => {
    routeDta();
  }, [router]);

  const routeDta = () => {
    if (router.isReady) {
      let params = {
        receiverId: chatTempData?.chatData?.receiverId,
        receiverName: chatTempData?.chatData?.receiverName,
        receiverImage: chatTempData?.chatData?.receiverImage,
        connectionId: chatTempData?.chatData?.connectionId,
      };

      setRoomData(params);
    }
  };

  useEffect(() => {
    if (roomData?.receiverId) {
      console.log("request");
      dispatch(
        getChatHistory.request({
          id: roomData?.receiverId,
        })
      );
    }
  }, [roomData]);

  useEffect(() => {
    const connect = async () => {
      const connection = await callSocket();
      if (connection) {
        dispatch(updateSocket.connectSocket(connection));
      }
    };

    if (!socket || !socket?.connected) {
      connect();
    } else {
    }
  }, []);

  useEffect(() => {
    if (socket) {
      recieveChat();
    }
  }, [socket]);

  useEffect(() => {
    if (socket) {
      console.log("trying to join");
      joinRoom();

      if (!roomJoined) {
      }
    }
  }, [socket, router]);

  const joinRoom = async () => {
    const data = {
      connectionId:
        roomData?.connectionId || chatTempData?.chatData?.connectionId,
    };

    console.log(data, ">>>vgsdgsgyffd");
    socket?.emit("connectToChat", data);
    socket?.on("connectToChatOk", async (data) => {
      console.log(data, "<====rommmmmm");
      if (data?.status == 200) {
        setRoomJoined(true);
      }
    });
  };

  const recieveChat = async () => {
    const recieverData =
      roomData?.receiverId || chatTempData?.chatData?.receiverId;
    console.log(recieverData, "roomDataroomData");

    socket?.on("receiveMessage", async (data) => {
      console.log(
        data?.senderId?._id,
        recieverData,
        chatTempData?.chatData?.receiverId,
        "recieveCheck"
      );

      if (data?.senderId?._id === roomData?.receiverId) {
        console.log(data, "<====recieve message");
        dispatch(getChatHistory.addToChat(data));
        dispatch(getChatList.update(chatTempData?.chatData?.receiverId, text));
        setText("");
      } else {
        dispatch(getChatList.update(chatTempData?.chatData?.receiverId, text));
        console.log("sendMessgae Receive");
      }
    });
  };

  const uploadImage = (val) => {
    const files = val.target;
    const file = files?.files[0];
    const formData = new FormData();
    formData.append("image", file);
    dispatch(imageUploadAction.request(formData));
  };

  const sendMessage = async () => {
    const body = {
      connectionId: roomData?.connectionId,
      recieverId: roomData?.receiverId,
      message: text,
      type: "TEXT",
    };
    const data = {
      connectionId: roomData?.connectionId,
      recieverId: roomData?.receiverId,
      text: text,
      type: "TEXT",
      senderId: {
        image: userData?.image,
      },
    };
    console.log("chala", body);
    socket?.emit("sendMessage", body);
    if (body) {
      dispatch(getChatHistory.addToChat(data));
      window.scrollTo({ bottom: 50, behavior: "smooth" });
      setText("");
    }
  };

  const onSendImage = async (img) => {
    const body = {
      connectionId: roomData?.connectionId,
      recieverId: roomData?.receiverId,
      message: img,
      type: "IMAGE",
    };
    const data = {
      connectionId: roomData?.connectionId,
      recieverId: roomData?.receiverId,
      text: img,
      type: "IMAGE",
      senderId: {
        image: userData?.image,
      },
    };
    console.log("chala", body);
    socket?.emit("sendMessage", body);
    if (body) {
      dispatch(getChatHistory.addToChat(data));
      setText("");
      window.scrollTo({ bottom: 0, behavior: "smooth" });
      // setimageSend("");
      // dispatch(tempData.updateTempData({ uploadImage: null }));
    }
  };

  const handleMessageInput = (e) => {
    setText(e.target.value);
  };

  const keyDownHandler = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      sendMessage();
    }
  };

  return (
    <Box className="chat_contain">
      <Typography className="fz-20 fw-bold" sx={{ mb: 5 }}>
        {roomData?.receiverName || ""}
      </Typography>
      <Box className="chat_wrap">
        {router?.query?.receiverId ? (
          chatHistory?.length ? (
            chatHistory?.map((chat, index) => (
              <>
                {chat?.senderId?._id === roomData?.receiverId ? (
                  <Box className="receiver_msg ">
                    <Box className="user_img">
                      <figure>
                        <Image
                          width={"50%"}
                          height={"50%"}
                          src={
                            chat?.recieverId?.image ||
                            "/static/images/dummy.png"
                          }
                          alt=""
                        />
                      </figure>
                    </Box>
                    <Box className="chatEdit_desc">
                      {chat?.type == "TEXT" ? (
                        <Typography>{chat?.text}</Typography>
                      ) : (
                        <Image
                          width={"50%"}
                          height={"50%"}
                          src={chat?.text}
                          alt=""
                        />
                      )}
                      <span className="chat_time">
                        {chat?.createdAt
                          ? dayjs(chat.createdAt).format("HH:mm")
                          : null}
                      </span>
                    </Box>
                  </Box>
                ) : (
                  <Box key={index} className="receiver_msg sender_msg">
                    <Box className="user_img">
                      <figure>
                        <Image
                          width={"50%"}
                          height={"50%"}
                          src={
                            chat?.senderId?.image || "/static/images/dummy.png"
                          }
                          alt=""
                        />
                      </figure>
                    </Box>
                    <Box className="chatEdit_desc">
                      {chat?.type == "TEXT" ? (
                        <Typography>{chat?.text}</Typography>
                      ) : (
                        <Image
                          width={"50%"}
                          height={"50%"}
                          src={chat?.text}
                          alt=""
                        />
                      )}
                      <span className="chat_time">
                        <span>
                          {chat?.createdAt
                            ? dayjs(chat.createdAt).format("HH:mm")
                            : null}{" "}
                        </span>
                      </span>
                    </Box>
                  </Box>
                )}
              </>
            ))
          ) : (
            <Typography>No Chat History found</Typography>
          )
        ) : (
          <Typography
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "100%",
            }}
          >
            Go Ahead and start the conversation
          </Typography>
        )}
        {router?.query?.receiverId ? (
          <Box className="send_input_wpr">
            <Box className="send_input">
              <span className="add-icon" style={{ cursor: "pointer" }}>
                <AddRoundedIcon />
                <label htmlFor="icon-button-file">
                  <TextField
                    inputProps={{
                      accept: "image/jpeg, image/jpg, image/png",
                    }}
                    id="icon-button-file"
                    type="file"
                    sx={{ display: "none" }}
                    onChange={(val) => {
                      uploadImage(val);
                    }}
                  />
                </label>
              </span>
              <TextField
                className="line_form"
                placeholder="Type your message"
                fullWidth
                margin="none"
                name="passwordConfirmation"
                onChange={(e) => handleMessageInput(e)}
                type="text"
                value={text}
                variant="outlined"
                onKeyDown={(e) => keyDownHandler(e)}
              />
              {text && (
                <figure onClick={sendMessage}>
                  <Image
                    width={"50%"}
                    height={"50%"}
                    src={"/static/images/send.png"}
                    alt=""
                  />
                </figure>
              )}
            </Box>
          </Box>
        ) : (
          ""
        )}
      </Box>
    </Box>
  );
};

export default ChatCompo;
