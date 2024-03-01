import { Link, useLocation } from "react-router-dom";
import { MdHomeFilled } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { FaUserFriends } from "react-icons/fa";
import { IoNotificationsSharp } from "react-icons/io5";

import styles from "./styles/navbar.module.css";
import { useContext} from "react";
import { SocketContext } from "../context/SocketContext";

function Navbar() {
  const { pathname } = useLocation();
  const { isNotification } = useContext(SocketContext);


  return (
    <nav className={styles.boxNavBar}>
      <ul>
        <li>
          <Link to="/" className={pathname === "/" ? styles["activeNav"] : ""}>
            <MdHomeFilled />
            <span>Home</span>
          </Link>
        </li>
        <li>
          <Link
            to="/notification"
            className={pathname === "/notification" ? styles["activeNav"] : ""}
          >
            {isNotification && <div id={styles.activeNofication}></div>}
            <IoNotificationsSharp />
            <span>Notificações</span>
          </Link>
        </li>
        <li>
          <Link
            to="/search"
            className={pathname === "/search" ? styles["activeNav"] : ""}
          >
            <IoSearchSharp />
            <span>Pesquisar</span>
          </Link>
        </li>
        <li>
          <Link
            to="/friends"
            className={pathname === "/friends" ? styles["activeNav"] : ""}
          >
            <FaUserFriends />
            <span>Amigos</span>
          </Link>
        </li>
        <li>
          <Link
            to="/profile"
            className={pathname === "/profile" ? styles["activeNav"] : ""}
          >
            <CgProfile />
            <span>Perfil</span>
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
