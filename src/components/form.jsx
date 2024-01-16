import styles from "./styles/form.module.css";
import Input from "./Input";
import Button from "./button";
import { useState } from "react";
import { VerifyForm } from "./verifyForm";

function Register({funcSubmit}) {
  const [data, setData] = useState({});
  const [message, setMessage] = useState();

  const handleChange = (e) => {
    setMessage('')
    setData({ ...data, [e.target.name]: e.target.value });
  };
  
  const checkForm = async () => {
    const { boolerForm, msgForm } = VerifyForm(data)
    if (boolerForm) {
      const response = await funcSubmit(data);
      setMessage(response)
    } else {
      setMessage(msgForm)
    }
  }
    
  const handleSubmit = (e) => {
    e.preventDefault()
    if (data.name, data.email, data.password, data.passwordConfirm) {
      checkForm();
      return
    }
    setMessage('Prencha os campos')
  }

  return (
    <div className={styles.boxMainForm}>
      <h1>Bem vindo ao Social-Sync</h1>
      <div className={styles.boxForm}>
        <h1>Cadastro</h1>
        <form onSubmit={handleSubmit}>
        <Input
            type="text"
            name="userName"
            text="Nome de usuário"
            stylesCheck= {!!message}
            value={data.userName ? data.userName : ""}
            handleChange={handleChange}
          />
        <Input
            type="text"
            name="name"
            text="Nome"
            stylesCheck= {!!message}
            value={data.name ? data.name : ""}
            handleChange={handleChange}
          />
          <Input
            type="text"
            name="email"
            text="Email"
            stylesCheck= {!!message}
            value={data.email ? data.email : ""}
            handleChange={handleChange}
          />
          <Input
            type="text"
            name="password"
            text="Senha"
            stylesCheck= {!!message}
            value={data.password ? data.password : ""}
            handleChange={handleChange}
          />
          <Input
            type="text"
            name="passwordConfirm"
            stylesCheck= {!!message}
            text="Digite novamente sua senha"
            value={data.passwordConfirm ? data.passwordConfirm : ""}
            handleChange={handleChange}
          />
          <p>{message ? message : ''}</p>
          <Button text="Cadastrar" />
        </form>
      </div>
    </div>
  );
}

export default Register;
