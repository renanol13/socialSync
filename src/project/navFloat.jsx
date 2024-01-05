import { MdDelete, MdModeEdit } from "react-icons/md";
import { CiMenuKebab } from "react-icons/ci";

import styles from "./styles/navFloat.module.css";
import { useState } from "react";
import instanceApi from "../api/instancePrivate";

function NavFloat({ data, handleFetch }) {
  const [menu, setMenu] = useState(false);
  const { instancePriv } = instanceApi();

  const handleNavFloat = (e) => {
    e.stopPropagation();
    setMenu(!menu);
  };

  const fetchDelete = async (e) => {
    e.stopPropagation();
    try {
      await instancePriv.delete(`/posts/${data._id}`);
      await instancePriv.delete(`/comments/${data._id}`);
      setMenu(false);
      handleFetch();
    } catch (error) {
      console.log("Deu error" + error);
    }
  };

  return (
    <div className={styles.boxNavFloat}>
      <CiMenuKebab
        className={`${menu ? styles["stylesCustom"] : ""}`}
        onClick={(e) => handleNavFloat(e)}
      />
      {menu && (
        <ul>
          <li onClick={(e) => fetchDelete(e)}>
            <MdDelete />
            Apagar
          </li>
          <li>
            <MdModeEdit />
            Editar
          </li>
        </ul>
      )}
    </div>
  );
}

export default NavFloat;
