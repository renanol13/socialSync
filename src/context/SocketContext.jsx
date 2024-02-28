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
    socket.on("notificationLike", (sender) => {
      console.log(sender);
    });

    return () => socket.off("notificationLike");
  }, [socket]);

  return (
    <SocketContext.Provider value={{ socket }}>
      {children}
    </SocketContext.Provider>
  );
};
