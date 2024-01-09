import styles from "./styles/friendsPage.module.css";
import HeaderNavigate from "../components/headerNavigate";
import { useParams } from "react-router-dom";
import UseFetch from "../hook/useFetch";
import { useEffect, useState } from "react";
import Loading from "../components/loading";
import UsersCards from "../project/UsersCards";

function FriendsPage() {
  const { name, selectOption } = useParams();
  const [showFollowers, setShowFollowers] = useState(false);

  const { loading, data, axiosFetch } = UseFetch();  
  
  useEffect(() => {
    selectOption == 'followers' && setShowFollowers(true)    

    axiosFetch({
      method: "GET",
      url: `/${name}`,
    });
    
  }, []);

  const handleShowFollowers = () => {
    setShowFollowers(true);
  };

  const handleShowFollowings = () => {
    setShowFollowers(false);
  };
  return (
    <div className={styles.boxFriendsPage}>
      <HeaderNavigate text="Amigos" />
      <nav>
        <ul>
          <li
            className={!showFollowers ? styles["customStyle"] : ""}
            onClick={() => handleShowFollowings()}
          >
            Seguindo
          </li>
          <li
            className={showFollowers ? styles["customStyle"] : ""}
            onClick={() => handleShowFollowers()}
          >
            Seguidores
          </li>
        </ul>
      </nav>
      {loading ? (
        <Loading />
      ) : showFollowers ? (
        data.followers.length > 0 ? (
            <UsersCards userData={data?.followers} showButFollowers={false}/>
        ) : (
          <p>Ainda não há seguidores...</p>
        )
      ) : data.followings.length > 0 ? (
        <UsersCards userData={data?.followings} showButFollowers={false}/>
      ) : (
        <p>Ainda não segue ninguém...</p>
      )}
    </div>
  );
}

export default FriendsPage;
