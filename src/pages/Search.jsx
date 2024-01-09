import { useEffect, useState } from "react";
import Input from "../components/Input";

import styles from "./styles/search.module.css";
import UseFetch from "../hook/useFetch";
import UsersCards from "../project/UsersCards";
import Loading from "../components/loading";

function Search() {
  const [search, setSearch] = useState("");
  const { loading, data, error, axiosFetch } = UseFetch();

  useEffect(() => {
    let time;
    if (search.length != 0) {
      time = setTimeout(() => {
        searchUsers(search);
      }, 100);
    }
    return () => clearTimeout(time);
  }, [search]);


  const searchUsers = () => {
    axiosFetch({
      method: "GET",
      url: `search/${search}`,
    })
  };

  const handleChange = (e) => {
    const inputValue = e.target.value;
    setSearch(inputValue);
  };

  return (
    <div className={styles.boxSearch}>
      <div id={styles.search}>
        <Input
          type="text"
          name=""
          placeholder="Pesquisar por nome de usuário..."
          value={search}
          handleChange={handleChange}
        />
      </div>
      {search &&
        (loading ? (
          <Loading/>
        ) : error ? (
          <p>{error}</p>
        ) : (
          <UsersCards userData={data} />
        ))}
    </div>
  );
}

export default Search;
