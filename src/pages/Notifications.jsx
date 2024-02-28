import { useContext, useEffect } from "react";
import styles from "./styles/notifications.module.css";
import { SocketContext } from "../context/SocketContext";
import NotificationsCard from "../project/notificationsCard";
import unreadNotification from "../services/unreadNotification";

function Notifications() {
  const {
    notificationsData,
    setNotificationsData,
    isNotification,
    setIsNotification,
  } = useContext(SocketContext);

    useEffect(() => {
      setIsNotification(false)
  }, []);

  return (
    <div className={styles.boxNotifications}>
      <h1>Noficações</h1>
      {notificationsData && (
        <NotificationsCard notificationsData={notificationsData} />
      )}
    </div>
  );
}

export default Notifications;
