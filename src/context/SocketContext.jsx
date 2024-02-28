import { createContext, useEffect, useState } from "react";
import { io } from "socket.io-client";

export const SocketContext = createContext();

const getSocketConfig = (user) => ({
  query: {
    userString: JSON.stringify(user),
  },
});

export const SocketProvider = ({ children, user }) => {
  const [socket, setSocket] = useState(null);
  const [notificationsData, setNotificationsData] = useState([]);
  const [isNotification, setIsNotification] = useState(false);

  useEffect(() => {
    const newSocket = io("http://localhost:3001/", getSocketConfig(user));
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
