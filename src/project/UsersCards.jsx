import { RxAvatar } from "react-icons/rx";
import Button from "../components/button";

import styles from "./styles/usersCards.module.css";
import { Link } from "react-router-dom";

function UsersCards({ userData }) {
    // console.log(userData);
  return (
    <>
      {userData.map((elm) => (
        <div key={elm._id} className={styles.boxUsersCards}>
          <Link to={`/profile/${elm.userName}`}>
            <RxAvatar />
            <p>{elm.userName}</p>
          </Link>
          <Button text="Seguir" />
        </div>
      ))}
    </>
  );
}

export default UsersCards;
