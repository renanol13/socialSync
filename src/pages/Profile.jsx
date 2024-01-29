import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { Link, useParams } from "react-router-dom";

import { RxAvatar } from "react-icons/rx";
import { FaCalendarAlt } from "react-icons/fa";
import { MdLocationOn } from "react-icons/md";
import { IoLinkSharp } from "react-icons/io5";

import PostsCard from "../project/PostsCard";
import Button from "../components/button";
import ButFollower from "../project/butFollower";
import HeaderNavigate from "../components/headerNavigate";
import formatTime from "../services/formatTime";
import CommentsPage from "../project/commentsPage";
import Loading from "../components/loading";
import EditInfoUser from "../project/editInfoUser";

import instanceApi from "../api/instancePrivate";
import UseFetch from "../hook/useFetch";

import styles from "./styles/profile.module.css";

function Profile() {
  const { name } = useParams();

  const { user } = useContext(AuthContext);

  const [dataUser, setDataUser] = useState(null);
  const [sendComment, setSendComment] = useState([]);
  const [showPageComments, setShowPageComments] = useState(false);
  const [butEdit, setEditBut] = useState(false);
  const [butFetch, setButFetch] = useState(false);

  const { instancePriv } = instanceApi();
  const { loading, data, axiosFetch } = UseFetch();

  const getPosts = () => {
    axiosFetch({
      method: "POST",
      url: "posts/user",
      configs: { userName: name || user.userName },
    });
  };

  const getUser = async () => {
    try {
      const response = await instancePriv.get(`/${name || user.userName}`);
      setDataUser(response.data);
    } catch (error) {
      console.log("Deu erro no componente: Profile" + error);
    }
  };


  useEffect(() => {
    getUser();
    getPosts();
  }, [name, butFetch]);

  const handleFetch = () => {
    setButFetch(!butFetch);
  };

  return (
    <div className={styles.boxProfile}>
      {loading && !dataUser ? (
        <Loading />
      ) : (
        dataUser && (
          <div>
            {butEdit && (
              <EditInfoUser
                name={dataUser.name}
                description={dataUser.description}
                address={dataUser.address}
                links={dataUser.links}
                setEditBut={setEditBut}
                handleFetch={handleFetch}
              />
            )}
            {showPageComments && (
              <CommentsPage
                setShowPageComments={setShowPageComments}
                dataComment={sendComment}
              />
            )}
            <HeaderNavigate text="Perfil" />
            <div className={styles.infoUser}>
              <RxAvatar />
              <p>{dataUser?.name}</p>
              <p id={styles.userName}>@{dataUser?.userName}</p>
              {name == user.userName || name === undefined ? (
                <Button
                  text="Editar perfil"
                  handleClick={() => setEditBut(true)}
                />
              ) : (
                <ButFollower userData={dataUser} />
              )}

              <div id={styles.friends}>
                <Link to={`/friendsPage/${dataUser.userName}/following`}>
                  <strong>{dataUser?.followings.length}</strong> seguindo
                </Link>
                <Link to={`/friendsPage/${dataUser.userName}/followers`}>
                  <strong>{dataUser?.followers.length}</strong> seguidores
                </Link>
              </div>
            </div>
            <div className={styles.moreInfo}>
              <p id={styles.description}>{dataUser?.description}</p>
              <p>
                <FaCalendarAlt />
                Ingressou {formatTime(dataUser?.createdAt)}
              </p>
              {dataUser?.address && (
                <p>
                  <MdLocationOn />
                  {dataUser?.address}
                </p>
              )}

              {dataUser?.links && (
                <p id={styles.link}>
                  <IoLinkSharp />
                  <a href={`https://${dataUser?.links}`} target="_blank">
                    {dataUser.links}
                  </a>
                </p>
              )}
              <p id={styles.numberPosts}>{data.length} posts</p>
            </div>
            <div className={styles.boxPosts}>
              <PostsCard
                data={data}
                setSendComment={setSendComment}
                setShowPageComments={setShowPageComments}
                handleFetch={handleFetch}
                butDelEdit={
                  name == user.userName || name === undefined ? true : false
                }
              />
            </div>
          </div>
        )
      )}
    </div>
  );
}

export default Profile;
