import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import InstancePublic from "../api/instancePublic";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);

  useEffect(() => {
    const storageUser = localStorage.getItem("@auth_user");
    const storageToken = localStorage.getItem("@auth_token");

    if (storageToken && storageUser) {
      setToken(storageToken);
      setUser(JSON.parse(storageUser));
    }
  }, []);

  const setStorageData = async (dataForm, endPoint) => {
    try {
      const response = await InstancePublic.post(endPoint, dataForm);
      const { dataUser, token, msg } = response.data;
      if (dataUser && token) {
        localStorage.setItem("@auth_user", JSON.stringify(dataUser));
        localStorage.setItem("@auth_token", token);
        setToken(token);
        setUser(dataUser);
        return { isLogged: true, msg: msg };
      }
    } catch (error) {
      return { isLogged: false, msg: error.response.data.msg };
    }
  };

  const Logout = () => {
    setToken("");
    setUser("");
    localStorage.clear();
  };

  return (
    <AuthContext.Provider value={{ user, token, setStorageData, Logout }}>
      {children}
    </AuthContext.Provider>
  );
};
