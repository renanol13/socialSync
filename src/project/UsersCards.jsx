import { RxAvatar } from "react-icons/rx";

import styles from "./styles/usersCards.module.css";
import { Link } from "react-router-dom";
import ButFollower from "./butFollower";

function UsersCards({ userData, showButFollowers=true }) {
  console.log(userData);

  return (
    <>
      {userData.map((elm) => (
        <div key={elm.name} className={styles.boxUsersCards}>
          <Link to={`/profile/${elm.userName}`}>
            <RxAvatar />
            <p>{elm.userName}</p>
          </Link>
          {showButFollowers && <ButFollower userData={elm}/>}
        </div>
      ))}
    </>
  );
}

export default UsersCards;
