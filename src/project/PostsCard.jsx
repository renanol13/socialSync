import { Link } from "react-router-dom";
import formatTime from "../services/formatTime";

import { RxAvatar } from "react-icons/rx";

import styles from "./styles/postsCards.module.css";

import ButLikComent from "./butLikComent";
import NavFloat from "./navFloat";

function PostsCard({
  setSendComment,
  butDelEdit,
  data,
  setShowPageComments,
  handleFetch = null,
}) {

  return (
    <>
      {data.map((elm) => (
        <div key={elm._id} className={styles.boxPostCard}>
          <div className={styles.boxInfoUser}>
            <Link to={`/profile/${elm.userNameAuthor}`} id={styles.linkUser}>
              <RxAvatar />
              <p id={styles.name}>
                @{elm.userNameAuthor}
              </p>
            </Link>
            <p id={styles.date}>{formatTime(elm.createdAt)}</p>
            {butDelEdit && <NavFloat data={elm} handleFetch={handleFetch} />}
          </div>
          <Link to={`/postPage/${elm._id}`} className={styles.boxContent}>
            <p>{elm.content}</p>
          </Link>
            <ButLikComent
              data={elm}
              setSendComment={setSendComment}
              setShowPageComments={setShowPageComments}
            />
        </div>
      ))}
    </>
  );
}

export default PostsCard;
