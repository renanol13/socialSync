import { useState } from "react";
import instanceApi from "../api/instancePrivate";

function UseFetch() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();
  const [data, setData] = useState([]);
  const {instancePriv} = instanceApi()

  const axiosFetch = async (configsrequest) => {
    const { method, url, configs = {} } = configsrequest;
    setLoading(true);
    try {
      const response = await instancePriv[method.toLowerCase()](url, {
        ...configs,
      });
      setData(response.data);

    } catch (error) {
      setError(error.response.data.msg);
    } finally {
      setLoading(false);
    }
  };
    return {data, error, loading, axiosFetch}
}

export default UseFetch
