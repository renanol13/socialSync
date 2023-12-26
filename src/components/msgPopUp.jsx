import { useState } from "react";
import styles from "./styles/msgPopUp.module.css";

function MsgPopUp({ msg }) {
  const [visibility, setVisibility] = useState(true);
  setTimeout(() => {
    setVisibility(false);
  }, 3000);

  return (
    <>
      {visibility && (
        <div className={styles.msgPopUp}>
          <p>{visibility && msg}</p>
        </div>
      )}
    </>
  );
}

export default MsgPopUp;
