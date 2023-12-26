import { useState } from "react";
import { useFetcher } from "react-router-dom";

function UseFetch() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [data, setData] = useState([]);

  const axiosFetch = async (configsrequest) => {
    const { instance, method, url, configs = {} } = configsrequest;
    setLoading(true);
    try {
      const response = await instance[method.toLowerCase()](url, {
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
