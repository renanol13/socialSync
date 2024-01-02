import axios from "axios";
import { useContext } from "react";
import {AuthContext} from '../context/AuthContext'

const baseURL = import.meta.env.VITE_BASE_URL;

function instanceApi() {
  const {token} = useContext(AuthContext)
    
  const instancePriv = axios.create({
    baseURL: baseURL,
    headers: {
      "Content-Type": "Application/json",
      Authorization: "Bearer " + token,
    },
  });
  return { instancePriv };
}

export default instanceApi;
