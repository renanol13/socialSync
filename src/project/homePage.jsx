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
  const [but, setBut] = useState(false);

  const { instancePriv } = instanceApi();

  const { loading, data, axiosFetch } = UseFetch();

  useEffect(() => {
    axiosFetch({
      method: "GET",
      url: "/posts",
    });
  }, [fetchPost]);

  const sendPosts = async (evt) => {
    if (msgPost) {
      await instancePriv.post("/posts", { content: msgPost });
      setMsgPost("");
      setFetchPost(!fetchPost);
    }
    setMsgPost("");
  };

  return (
    <div className={styles.boxHomePage}>
      {but && <CommentsPage setbut={setBut} dataComment={sendComment} />}
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
          <Loading/>
        ) : (
            data &&
            <PostsCard data={data} setBut={setBut} setSendComment={setSendComment}/>
          // data.map((elm) => (
          //   <PostsCard
          //     key={elm._id}

          //     setDataComments={setDataComment}
          //     setBut={setBut}
          //     id={elm._id}
          //     author={elm.author}
          //     nameAuthor={elm.nameAuthor}
          //     createdAt={elm.createdAt}
          //     likes={elm.likes}
          //     content={elm.content}
          //   />
          // ))
        )}
      </div>
    </div>
  );
}

export default HomePage;
