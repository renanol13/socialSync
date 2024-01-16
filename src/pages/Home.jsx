import { useLocation } from "react-router-dom";
import MsgPopUp from "../components/msgPopUp";
import { useEffect, useState } from "react";

import styles from "./styles/home.module.css";
import HomePage from "../project/homePage";

function Home() {
  const location = useLocation();
  const [message, setMessage] = useState(null);

  useEffect(() => {
    if (location.state) {
      setMessage(location.state.msg);
    }
  }, []);

  return (
    <div className={styles.boxHome}>
      {message && <MsgPopUp msg={message} />}
      <HomePage/>
    </div>
  );
}

export default Home;
