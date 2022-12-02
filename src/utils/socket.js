import { getCookie } from "cookies-next";
import SocketIOClient from "socket.io-client";

export const callSocket = async () => {
  const token = getCookie("token");
  let socket = SocketIOClient.connect(
    `https://appgrowthcompany.com:7082/?token=${token}`,
    {
      upgrade: false,
      reconnection: true,
      reconnectionDelay: 1000,
      reconnectionDelayMax: 3000,
      reconnectionAttempts: 10,
      transports: ["websocket", "polling", "flashsocket"],
    }
  );
  socket.on("connect", () => {
    console.log("Chat socket connection", socket);
  });
  return socket;
};
