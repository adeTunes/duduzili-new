import { socketConnection, userDetails, wsReconnection } from "@/store";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import React, { useEffect, useState } from "react";
import WebSocket from "isomorphic-ws";
import { showNotification } from "@mantine/notifications";

const useWebsocketConnection: (friend: any) => {
  wsocket: WebSocket;
  setWs: React.Dispatch<React.SetStateAction<WebSocket>>;
} = (friend) => {
  const user: any = useAtomValue(userDetails);
  const [wsocket, setWs] = useState<WebSocket>(null);
  const [reconnectionCount, setReconnectionCount] = useState(0);

  useEffect(() => {
    if (!friend || wsocket) return;

    const ws = new WebSocket(
      `${process.env.NEXT_PUBLIC_SOCKET_URL}/ws/chat/${friend?.username}?token=${user?.token}`
    );
    let intervalID;

    ws.onopen = () => {
      // Perform any necessary join or initial setup actions
      const joinRoom = {
        command: "join",
        username: user?.user?.username,
      };
      try {
        ws.send(JSON.stringify(joinRoom));
      } catch (error) {
        showNotification({ message: "Something went wrong" });
      }
      const receive = {
        command: "receive",
      };
      intervalID = setInterval(() => {
        try {
          ws.send(JSON.stringify(receive));
        } catch (error) {}
      }, 5000);
    };

    ws.onclose = () => {
      console.warn("WebSocket connection closed");
      // Handle any necessary cleanup or reconnection logic
      setTimeout(() => {
        setReconnectionCount((prevCount) => prevCount + 1);
      }, 3000);
    };
    setWs(ws);
    return () => {
      clearInterval(intervalID);
      // if (ws) ws.close();
    };
  }, [friend, reconnectionCount, wsocket]);
  

  return { wsocket, setWs };
};

export default useWebsocketConnection;
