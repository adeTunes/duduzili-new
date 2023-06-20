import { socketConnection, userDetails } from "@/store";
import { useAtomValue, useSetAtom } from "jotai";
import React, { useEffect, useState } from "react";
import WebSocket from "isomorphic-ws"

const useWebsocketConnection: (friend: any) => {ws: WebSocket} = (friend) => {
  const user: any = useAtomValue(userDetails);
  const [ws, setWs] = useState<WebSocket>(null);
  const setWsConnect = useSetAtom(socketConnection)
  useEffect(() => {
    if (friend) {
      setWs(
        new WebSocket(
          `${process.env.NEXT_PUBLIC_SOCKET_URL}/${friend?.username}?token=${user?.token}`
        )
      );
    }
  }, [friend]);

  useEffect(() => {
    if (ws) {
      // WebSocket event listeners
      ws.onopen = () => {
        // Perform any necessary join or initial setup actions
        setWsConnect(true)
        const joinRoom = {
          command: "join",
          username: user?.user?.username,
        };
        ws.send(JSON.stringify(joinRoom));
      };

      ws.onclose = () => {
        console.log("WebSocket connection closed");
        // Handle any necessary cleanup or reconnection logic
      };
    }
    // return () => {
    //   // Clean up the WebSocket connection when the component unmounts
    //   if(ws)
    //   ws.close();
    // };
  }, [ws]);

  return { ws };
}

export default useWebsocketConnection;
