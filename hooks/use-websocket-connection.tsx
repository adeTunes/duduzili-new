import { socketConnection, userDetails, wsReconnection } from "@/store";
import { useAtom, useAtomValue, useSetAtom } from "jotai";
import React, { useEffect, useState } from "react";
import WebSocket from "isomorphic-ws";
import { showNotification } from "@mantine/notifications";

const useWebsocketConnection: (friend: any) => {
  ws: WebSocket;
  setWs: React.Dispatch<React.SetStateAction<WebSocket>>;
} = (friend) => {
  const user: any = useAtomValue(userDetails);
  const [ws, setWs] = useState<WebSocket>(null);
  const setWsConnect = useSetAtom(socketConnection);
  const [wsReconnect, setWsReconnect] = useAtom(wsReconnection);
  useEffect(() => {
    if (friend || wsReconnect) {
      setWs(
        new WebSocket(
          `${process.env.NEXT_PUBLIC_SOCKET_URL}/${friend?.username}?token=${user?.token}`
        )
      );
      setWsReconnect(false);
    }
  }, [friend, wsReconnect]);

  useEffect(() => {
    if (ws) {
      // WebSocket event listeners
      ws.onopen = () => {
        // Perform any necessary join or initial setup actions
        setWsConnect(true);
        setWsReconnect(false);
        const joinRoom = {
          command: "join",
          username: user?.user?.username
        };
        try {
          ws.send(JSON.stringify(joinRoom));
        } catch (error) {
          showNotification({message: "Something went wrong"})
        }
      };

      ws.onclose = () => {
        console.log("WebSocket connection closed");
        // Handle any necessary cleanup or reconnection logic
        setWsReconnect(true);
        setWsConnect(false);
      };
    }
    // return () => {
    //   // Clean up the WebSocket connection when the component unmounts
    //   if(ws)
    //   ws.close();
    // };
  }, [ws]);

  return { ws, setWs };
};

export default useWebsocketConnection;
