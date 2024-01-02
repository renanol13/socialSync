import { Link, useNavigate } from "react-router-dom";
import formatTime from "../services/formatTime";

import { RxAvatar } from "react-icons/rx";

import styles from "./styles/postsCards.module.css";

import ButLikComent from "./butLikComent";

function PostsCard({ setSendComment, setBut, data }) {
  const navigate = useNavigate();



  return (
    <>
      {data.map((elm) => (
        <div
          key={elm._id}
          className={styles.boxPostCard}
          onClick={() => navigate("/postPage/" + elm._id)}>
          <div className={styles.boxInfoUser}>
            <div id={styles.linkUser}>
              <RxAvatar />
              <Link id={styles.name}>{elm.nameAuthor}</Link>
            </div>
            <p id={styles.date}>{formatTime(elm.createdAt)}</p>
          </div>
          <div className={styles.boxContent}>{elm.content}</div>
          <ButLikComent
            data={elm}
            setSendComment={setSendComment}
            setBut={setBut}
          />
        </div>
      ))}
    </>
  );
}

export default PostsCard;
