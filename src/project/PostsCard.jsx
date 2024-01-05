import { useNavigate } from "react-router-dom";
import formatTime from "../services/formatTime";

import { RxAvatar } from "react-icons/rx";

import styles from "./styles/postsCards.module.css";

import ButLikComent from "./butLikComent";
import NavFloat from "./navFloat";

function PostsCard({ setSendComment, butDelEdit, data, setShowPageComments,handleFetch=null }) {
  const navigate = useNavigate();

  const navigateFromProfile = (e, userName) => {
    e.stopPropagation();
    navigate(`/profile/${userName}`);
  };
  return (
    <>
      {data.map((elm) => (
        <div
          key={elm._id}
          className={styles.boxPostCard}
          onClick={() => navigate(`/postPage/${elm._id}`)}
        >
          <div className={styles.boxInfoUser}>
            <div id={styles.linkUser}>
              <RxAvatar />
              <div
                id={styles.name}
                onClick={(e) => navigateFromProfile(e, elm.userNameAuthor)}
              >
                @{elm.userNameAuthor}
              </div>
            </div>
            <p id={styles.date}>{formatTime(elm.createdAt)}</p>
            {butDelEdit && <NavFloat data={elm} handleFetch={handleFetch}/>}
          </div>
          <div className={styles.boxContent}>{elm.content}</div>
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
