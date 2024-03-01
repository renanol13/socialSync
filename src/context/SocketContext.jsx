import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";
import instanceApi from "../api/instancePrivate";
import unreadNotification from "../services/unreadNotification";

export const SocketContext = createContext();

export const SocketProvider = ({ children, user }) => {
  const [socket, setSocket] = useState(null);
  const [notificationsData, setNotificationsData] = useState([]);
  const [isNotification, setIsNotification] = useState(false);
  const { instancePriv } = instanceApi();
  const baseURL = import.meta.env.VITE_BASE_URL;

  useEffect(() => {
    const newSocket = io(baseURL);
    setSocket(newSocket);

    return () => {
      newSocket.disconnect();
    };
  }, [user]);

  useEffect(() => {
    if (socket === null) return;

    socket.emit("addNewUser", user?.id);
  }, [socket]);

  useEffect(() => {
    if (socket === null) return;

    socket.on("notifications", (sender) => {
      setNotificationsData((prev) => [...prev, sender]);
      setIsNotification(true);
    });

    return () => socket.off("notification");
  }, [socket]);

  useEffect(() => {
    const getNotificationsHttp = async () => {
      try {
        const response = await instancePriv.get("/notifications/");
        if (unreadNotification(response.data)) return setIsNotification(true);
        setNotificationsData(response.data);
      } catch (error) {
        console.log("Deu erro no componente SocketContext" + error);
      }
    };
    getNotificationsHttp();
  }, [user]);

  return (
    <SocketContext.Provider
      value={{
        socket,
        notificationsData,
        setNotificationsData,
        isNotification,
        setIsNotification,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
