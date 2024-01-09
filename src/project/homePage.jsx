import { useEffect, useState } from "react";
import TextArea from "../components/textArea";
import PostsCard from "./PostsCard";

import styles from "./styles/homePage.module.css";
import instanceApi from "../api/instancePrivate";
import UseFetch from "../hook/useFetch";
import CommentsPage from "./commentsPage";
import Loading from "../components/loading";

function HomePage() {
  const [msgPost, setMsgPost] = useState("");
  const [fetchPost, setFetchPost] = useState(false);
  const [sendComment, setSendComment] = useState([]);
  const [showPageComments, setShowPageComments] = useState(false);

  const { instancePriv } = instanceApi();

  const { loading, data, axiosFetch } = UseFetch();

  useEffect(() => {
    axiosFetch({
      method: "GET",
      url: "/posts",
    });
  }, [fetchPost]);

  const sendPosts = async () => {
    if (msgPost) {
      try {
        await instancePriv.post("/posts", { content: msgPost });
        setMsgPost("");
        setFetchPost(!fetchPost);
      } catch (error) {
        console.log('Deu erro no componente: HomePage'+ error);
      }
    }
    setMsgPost("");
  };

  return (
    <div className={styles.boxHomePage}>
      {showPageComments && (
        <CommentsPage
          setShowPageComments={setShowPageComments}
          dataComment={sendComment}
        />
      )}
      <TextArea
        text="O que você está pensando?"
        labelBtn="Publicar"
        value={msgPost}
        setChange={setMsgPost}
        handleClick={sendPosts}
      />
      <h2>Postagens</h2>
      <div className={styles.boxPosts}>
        {loading ? (
          <Loading />
        ) : (
          data && (
            <PostsCard
              data={data}
              setSendComment={setSendComment}
              setShowPageComments={setShowPageComments}
            />
          )
        )}
      </div>
    </div>
  );
}

export default HomePage;
