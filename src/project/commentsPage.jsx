import { Link } from "react-router-dom";

import { IoSend } from "react-icons/io5";
import { RxAvatar } from "react-icons/rx";
import { IoClose } from "react-icons/io5";
import styles from "./styles/comments.module.css";
import TextArea from "../components/textArea";
import { useState } from "react";
import instanceApi from "../api/instancePrivate";

function CommentsPage({ setbut, dataComment }) {
  const [msgComment, setMsgComment] = useState("");
  const { instancePriv } = instanceApi()
  
  const sendComments = async () => {
    if (msgComment) {
      await instancePriv.post(`/comments/${dataComment[0].id}`,
        { content: msgComment })
      
      setbut(false)   
    }
    setMsgComment('')
  };

  return (
    <div className={styles.boxBackground}>
      {dataComment.map((elm) => (
        <div key={elm.id} className={styles.boxCommentsPage}>
          <div id={styles.linkUser}>
            <div id={styles.boxInfoUser}>
              <RxAvatar />
              <Link id={styles.name}>{elm.nameAuthor}</Link>
            </div>
            <IoClose onClick={() => setbut(false)} />
          </div>
          <p id={styles.content}>{elm.content}</p>
          <div id={styles.boxTextArea}>
            <TextArea
              text='Digite seu comentario...'
              labelBtn={<IoSend />}
              value={msgComment}
              setChange={setMsgComment}
              handleClick={sendComments}
            />
          </div>
        </div>
      ))}
    </div>
  );
}

export default CommentsPage;
