import { useParams, useNavigate, Link } from "react-router-dom";
import styles from "./styles/postPage.module.css";
import UseFetch from "../hook/useFetch";
import { useEffect, useState } from "react";
import instanceApi from "../api/instancePrivate";
import { RxAvatar } from "react-icons/rx";
import formatTime from "../services/formatTime";
import Loading from "../components/loading";
import CommentsPage from "../project/commentsPage";
import ButLikComent from "../project/butLikComent";
import HeaderNavigate from "../components/headerNavigate";

function PostPage() {
  const { id } = useParams();
  const { loading, data, axiosFetch } = UseFetch();
  const [dataComments, setDataComments] = useState();
  const [sendComment, setSendComment] = useState();
  const { instancePriv } = instanceApi();
  const [showPageComments, setShowPageComments] = useState(false);
  const [butFetch, setButFetch] = useState(null);

  const getPost = () => {
    axiosFetch({
      method: "GET",
      url: `/posts/${id}`,
    });
  };

  const getComments = async () => {
    try {
      const response = await instancePriv.get(`/comments/${id}`);
      setDataComments(response.data);
    } catch (error) {
      console.log("Deu erro " + error);
    }
  };
  
  useEffect(() => {
    getPost();
    getComments();
  }, [butFetch]);

  const handleFetch = () => {
    setButFetch(!butFetch);
  };

  return (
    <>
      {showPageComments && (
        <CommentsPage
          setShowPageComments={setShowPageComments}
          handleFetch={handleFetch}
          dataComment={sendComment}
        />
      )}
      <HeaderNavigate text="Post" />
      {loading ? (
        <Loading />
      ) : (
        data &&
        dataComments &&
        data.map((elm) => (
          <div key={elm._id} className={styles.boxPostPage}>
            <Link
              to={`/profile/${elm.userNameAuthor}`}
              className={styles.infoUser}
            >
              <RxAvatar />
              <div>
                <h2>{elm.nameAuthor}</h2>
                <p>@{elm.userNameAuthor}</p>
              </div>
            </Link>
            <div id={styles.content}>{elm.content}</div>
            <div className={styles.boxInfoNumbers}>
              <p className={styles.time}>{formatTime(elm.createdAt)}</p>
              <p id={styles.likes}>{elm.likes.length} curtidas</p>
              <p id={styles.numbComment}>{dataComments.length} comentarios</p>
            </div>
            <div className={styles.boxButLikComent}>
              <ButLikComent
                data={data[0]}
                setSendComment={setSendComment}
                setShowPageComments={setShowPageComments}
                // handleButClose={handleButClose}
              />
            </div>
            {dataComments.length ? (
              dataComments.map((elm) => (
                <div key={elm._id} className={styles.boxComments}>
                  <div className={styles.boxUserComment}>
                    <Link to={`/profile/${elm.userNameAuthor}`}>
                      <RxAvatar />
                      <p id={styles.userName}>@{elm.userNameAuthor}</p>
                    </Link>
                    <p className={styles.time}>{formatTime(elm.createdAt)}</p>
                  </div>
                  <p id={styles.contentComments}>{elm.content}</p>
                </div>
              ))
            ) : (
              <p id={styles.notFound}>A postagem não há comentarios...</p>
            )}
          </div>
        ))
      )}
    </>
  );
}

export default PostPage;
