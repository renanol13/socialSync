import { Outlet } from "react-router-dom";
import Signin from "../pages/Signin";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

const AuthRouter = () => {
  const {token} = useContext(AuthContext)
  return token ? <Outlet /> : <Signin />;
};

export default AuthRouter;
