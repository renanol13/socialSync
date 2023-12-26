import axios from "axios";
import { useContext } from "react";

const baseURL = import.meta.env.BASE_URL;

function instanceApi() {
  //const {token} = useContext(AuthContext)
    
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
