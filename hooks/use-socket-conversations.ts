import { userDetails } from "@/store";
import WebSocket from "isomorphic-ws";
import { useAtomValue } from "jotai";
import { useEffect, useState } from "react";

function useSocketConversations() {
  const user: any = useAtomValue(userDetails);
  const [data, setData] = useState(null);
  const [reconnectionCount, setReconnectionCount] = useState(0);
  const [isLoading, setisLoading] = useState(true)

  useEffect(() => {
    if (user?.token) {
      const ws = new WebSocket(
        `${process.env.NEXT_PUBLIC_SOCKET_URL}/ws/user-convo?token=${user?.token}`
      );
      ws.onopen = () => {
        // Perform any necessary join or initial setup actions
        const getConversations = {
          command: "fetch",
        };
        try {
          ws.send(JSON.stringify(getConversations));
        } catch (error) {}
      };

      ws.onmessage = (event) => {
        const message = JSON.parse(event.data as string);
        setData(message?.conversations)
      };
      let timeoutID
      ws.onclose = () => {
        console.warn("WebSocket connection closed");
        // Handle any necessary cleanup or reconnection logic
        timeoutID = setTimeout(() => {
          setReconnectionCount((prevCount) => prevCount + 1);
        }, 3000);
      };

      return () => {
        clearTimeout(timeoutID)
      }
    }
  }, [user?.token, reconnectionCount]);

  useEffect(() => {
    if(data) setisLoading(false)
  }, [data])

  return { data, isLoading };
}

export default useSocketConversations;
