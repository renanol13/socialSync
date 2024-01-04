import styles from "./styles/signin.module.css";
import Input from "../components/Input";
import { useContext, useState } from "react";
import Button from "../components/button";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import { VerifyForm } from "../components/verifyForm";
import MsgPopUp from "../components/msgPopUp";

function Signin() {
  const [data, setData] = useState({});
  const [message, setMessage] = useState();
  const { setStorageData } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setMessage('')
  };

  const checkForm = async () => {
    const { boolerForm, msgForm } = VerifyForm(data);
    if (boolerForm) {
      const { isLogged, msg } = await setStorageData(data,"login/");
      if (isLogged) navigate('/', {state:{msg: msg}})
      setMessage(msg);
    } else {
      setMessage(msgForm);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (data.email, data.password) {
      checkForm();
      return
    }
    setMessage('Prencha os campos')
  };

  return (
    <div className={styles.boxSignin}>
      <h1>SocialSync</h1>
      <div className={styles.boxForm}>
        <h1>Login</h1>
        <form onSubmit={handleSubmit}>
          <Input
            type="text"
            name="email"
            text="Email"
            stylesCheck= {!!message}
            value={data.email ? data.email : ""}
            handleChange={handleChange}
          />
          <Input
            type="password"
            name="password"
            text="Senha"
            stylesCheck= {!!message}
            value={data.password ? data.password : ""}
            handleChange={handleChange}
          />
          <p>{message ? message : ''}</p>
          <Button text="Entrar" />
        </form>
        <div className={styles.link}>
          <Link to="/register">cadastrar-se</Link>
        </div>
      </div>
    </div>
  );
}

export default Signin;
