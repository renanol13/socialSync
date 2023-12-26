import { useLocation } from "react-router-dom";
import MsgPopUp from "../components/msgPopUp";
import { useEffect, useState } from "react";

function Home() {
  const location = useLocation();
  const [message, setMessage] = useState(null);
  useEffect(() => {
    if (location.state) {
      setMessage(location.state.msg);
    }
  }, []);

  return (
    <div style={{ display: "flex", justifyContent: "center" }}>
      {message && <MsgPopUp msg={message} />}
    </div>
  );
}

export default Home;
