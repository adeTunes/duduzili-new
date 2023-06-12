import { userDetails } from "@/store";
import { useAtomValue } from "jotai";
import React, { useEffect, useState } from "react";

const useWebsocketConnection: (friend: any) => {ws: WebSocket} = (friend) => {
  const user: any = useAtomValue(userDetails);
  const [ws, setWs] = useState<WebSocket>(null);
  useEffect(() => {
    if (friend) {
      setWs(
        new WebSocket(
          `wss://duduzili-staging-server.com.ng/ws/chat/${friend?.username}?token=${user?.token}`
        )
      );
    }
  }, [friend]);

  useEffect(() => {
    if (ws) {
      // WebSocket event listeners
      ws.onopen = () => {
        // Perform any necessary join or initial setup actions
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
