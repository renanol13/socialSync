import { useContext, useEffect } from "react";
import styles from "./styles/notifications.module.css";
import { SocketContext } from "../context/SocketContext";
import NotificationsCard from "../project/notificationsCard";
import instanceApi from "../api/instancePrivate";

function Notifications() {
  const {
    notificationsData,
    setNotificationsData,
    setIsNotification,
  } = useContext(SocketContext);
  const { instancePriv } = instanceApi();


  useEffect(() => {
    const readNotifications = async () => {
      const response = await instancePriv.patch("/notifications/");
      setNotificationsData(response.data)
    };
    readNotifications()
  }, []);
  
  useEffect(() => {
    setIsNotification(false);
  },[])

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
