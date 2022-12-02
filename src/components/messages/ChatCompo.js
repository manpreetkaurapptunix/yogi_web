import { Box, TextField, Typography } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import React, { useState, useEffect, useCallback } from "react";
import AddRoundedIcon from "@mui/icons-material/AddRounded";
import Image from "next/image";
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
let rmid = null;
const ChatCompo = (props) => {
  const { setRoomJoined, selectedUser } = props;
  const dispatch = useDispatch();
  const socket = useSelector((state) => state.commonReducer.socket);
  const chatHistory = useSelector((state) => state.chatReducer.chatHistory);
  const userData = useSelector((state) => state.authReducer.userData);
  const chatTempData = useSelector((state) => state.commonReducer.tempData);
  const router = useRouter();
  const [sendMsg, setSendMsg] = useState("");
  const [roomData, setRoomData] = useState(null);
  const [imageSend, setimageSend] = useState("");
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
    if (router.isReady) {
      console.log(router.query, "query param   ===");
      let params = {
        receiverId: router.query?.receiverId,
        receiverName: router.query?.receiverName,
        receiverImage: router.query?.receiverImage,
        connectionId: router.query?.connectionId,
      };
      rmid = params;
      setRoomData(params);
    }
    console.log(rmid, "rmid=====");
    return () => {
      // rmid = null;
      // setRoomData(null);
      leaveRoom();
      // delete router.query.receiverId;
      // delete router.query?.connectionId;
      // delete router.query?.receiverImage;
      // delete router.query?.receiverName;

      // router.push(router)
      // router.query.receiverId = null;
      // router.query.receiverName = null;
      // router.query?.receiverImage = null;
      // router.query?.connectionId = null;
      // router.replace('/messages', undefined, { shallow: true });
    };
  }, [router]);

  useEffect(() => {
    const connect = async () => {
      const connection = await callSocket();
      if (connection) {
        dispatch(updateSocket.connectSocket(connection));
      }
    };
    if (!socket || !socket?.connected) {
      connect();
      // recieveChat();
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
    }
  }, [socket, roomData]);

  const joinRoom = async () => {
    const data = {
      connectionId: rmid?.connectionId,
    };
    socket?.emit("connectToChat", data);
    socket?.on("connectToChatOk", async (data) => {
      console.log(data, "===room jon====");
      if (data?.status == 200) {
        setRoomJoined(true);
      }
    });
  };

  const leaveRoom = async () => {
    const data = {
      connectionId: roomData?.connectionId,
    };
    console.log(data, "leaveeeeData");
    socket?.emit("disConnectToChat", data);
    socket?.on("disConnectToChatOk", async (data) => {
      console.log(data, "===room left====");
    });
  };

  const recieveChat = () => {
    socket?.on("receiveMessage", async (data) => {
      console.log("rood-----------------------", rmid);
      if (data?.senderId?._id === rmid?.receiverId) {
        dispatch(getChatHistory.addToChat(data));
        setText("");
      } else {
        console.log(" null case  send message");
      }
      // window.scrollTo({ bottom: 0, behavior: "smooth" });
      // dispatch(getChatList.update(data?.recieverId?._id, data?.text));
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
      dispatch(tempData.updateTempData({ uploadImage: null }));
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
                {chat?.senderId?._id == roomData?.receiverId ? (
                  <Box className="receiver_msg ">
                    <Box className="user_img">
                      <figure>
                        <Image
                          width={"50%"}
                          height={"50%"}
                          src={
                            roomData?.receiverImage ||
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
                          src={userData?.image || "/static/images/dummy.png"}
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
              <span className="add-icon">
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
