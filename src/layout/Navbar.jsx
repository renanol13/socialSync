import { Link, useLocation } from "react-router-dom";
import { MdHomeFilled } from "react-icons/md";
import { IoSearchSharp } from "react-icons/io5";
import { CgProfile } from "react-icons/cg";
import { FaUserFriends } from "react-icons/fa";

import styles from "./styles/navbar.module.css";

function Navbar() {
  const { pathname } = useLocation();

  return (
    <nav className={styles.boxNavBar}>
      <h1>Social-Sync</h1>
      <ul>
        <li>
          <Link to="/" className={pathname === "/" ? styles["activeNav"] : ""}>
            <MdHomeFilled />
          </Link>{" "}
        </li>
        <li>
          <Link
            to="/search"
            className={pathname === "/search" ? styles["activeNav"] : ""}
          >
            <IoSearchSharp />
          </Link>
        </li>
        <li>
          <Link
            to="/friends"
            className={pathname === "/friends" ? styles["activeNav"] : ""}
          >
            <FaUserFriends />
          </Link>
        </li>
        <li>
          <Link
            to="/profile"
            className={pathname === "/profile" ? styles["activeNav"] : ""}
          >
            <CgProfile />
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
