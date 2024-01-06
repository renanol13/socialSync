import { useContext } from "react";
import Form from "../components/form";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";


function Register() {
  const { setStorageData } = useContext(AuthContext);
  const navigate = useNavigate();

  const submitRegister = async (dataForm) => {
    const { isLogged, msg } = await setStorageData(dataForm, "register/");
    if (isLogged) navigate("/");
    return msg;
  };
  return <Form funcSubmit={submitRegister} />;
  

}

export default Register;
