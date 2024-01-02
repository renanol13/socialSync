import { useParams, useNavigate, Link } from "react-router-dom";
import styles from "./styles/postPage.module.css";
import UseFetch from "../hook/useFetch";
import { useEffect, useState } from "react";
import instanceApi from "../api/instancePrivate";
import { FaArrowLeft } from "react-icons/fa";
import { RxAvatar } from "react-icons/rx";
import formatTime from "../services/formatTime";
import Loading from "../components/loading";
import CommentsPage from "../project/commentsPage";
import ButLikComent from "../project/butLikComent";

function PostPage() {
  const { id } = useParams();
  const { loading, data, axiosFetch } = UseFetch();
  const [dataComments, setDataComments] = useState();
  const [sendComment, setSendComment] = useState();
  const { instancePriv } = instanceApi();
  const [but, setBut] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    axiosFetch({
      method: "GET",
      url: `/posts/${id}`,
    });

    const getComments = async () => {
      const response = await instancePriv.get(`/comments/${id}`);
      setDataComments(response.data);
    };
    getComments();
  }, []);
  return (
    <>
      {but && <CommentsPage setbut={setBut} dataComment={sendComment}/>}
      <p id={styles.header}>
        <FaArrowLeft onClick={() => navigate(-1)} />
        Post
      </p>
      {loading ? (
        <Loading />
      ) : (
        data &&
        dataComments &&
        data.map((elm) => (
          <div key={elm._id} className={styles.boxPostPage}>
            <Link to="/" className={styles.infoUser}>
              <RxAvatar />
              <h2>{elm.nameAuthor}</h2>
            </Link>
            <div id={styles.content}>{elm.content}</div>
            <div className={styles.boxInfoNumbers}>
              <p className={styles.time}>{formatTime(elm.createdAt)}</p>
              {/* <p id={styles.likes}>{elm.likes.length} curtidas</p> */}
              <p id={styles.numbComment}>{dataComments.length} comentarios</p>
            </div>
            <div className={styles.boxButLikComent}>
              <ButLikComent
                setSendComment={setSendComment}
                data={data[0]}
                setBut={setBut}
              />
            </div>
            {dataComments.length ? (
              dataComments.map((elm) => (
                <div key={elm._id} className={styles.boxComments}>
                  <div className={styles.boxUserComment}>
                    <Link to="/">
                      <RxAvatar/>
                      <p>{elm.nameAuthor}</p>
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
