import { useContext } from "react";
import { SocketContext } from "../context/SocketContext";


const SocketNotifications = () => {
  const { socket } = useContext(SocketContext);

  const likeSocket = (dataPubli) => {
    socket.emit("liked", dataPubli)
  };


  const commentSocket = (dataPubli) => {
    socket.emit("commented", dataPubli);
  };

  const followed = (idFollowing) => {
    socket.emit("followed", idFollowing);
    console.log(idFollowing);
  }

  return { likeSocket, commentSocket, followed };
};

export default SocketNotifications;
