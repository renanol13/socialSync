import { Link } from "react-router-dom";

import { RxAvatar } from "react-icons/rx";
import formatTime from "../services/formatTime";
import styles from "./styles/notificationsCard.module.css";

function NotificationsCard({ notificationsData }) {
  const limitingLength = (content) => {
    if (content.length > 40) {
      let newStringContent = content.slice(0, 40);
      return newStringContent + "...";
    }
    return content;
  };

  return (
    <>
      {notificationsData.map((elm, i) => (
        <div key={i} className={styles.boxNotificationsCard}>
          <div>
            <RxAvatar />
          </div>
          <div>
            <p id={styles.info}>
              <Link to={`/profile/${elm.userName}`}>@{elm.userName}</Link>

              {(elm.type === "liked" || elm.type === "commented") && (
                <span>
                  {elm.type === "liked" ? " Curtiu " : " Comentou "} na sua
                  postagem:
                  <Link to={`/postPage/${elm.idPubli}`}>
                    "{limitingLength(elm.content)}"
                  </Link>
                </span>
              )}
            </p>
            <p id={styles.date}>{formatTime(elm.createdAt)}</p>
          </div>
        </div>
      ))}
    </>
  );
}

export default NotificationsCard;
