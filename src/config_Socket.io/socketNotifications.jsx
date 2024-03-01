import { useContext } from "react";
import { SocketContext } from "../context/SocketContext";

const SocketNotifications = () => {
  const { socket } = useContext(SocketContext);

  const likeSocket = (user, dataPubli) => {
    socket.emit("liked", user, dataPubli);
  };

  const commentSocket = (user, dataPubli) => {
    socket.emit("commented", user, dataPubli);
  };

  const followed = (user, idFollowing) => {
    socket.emit("followed", user, idFollowing);
  };

  return { likeSocket, commentSocket, followed };
};

export default SocketNotifications;
