import TextArea from "../components/textArea";
import { FaRegComment } from "react-icons/fa";
import { BiLike } from "react-icons/bi";

import styles from "./styles/butLikComent.module.css";
import { useContext, useEffect, useState } from "react";
import instanceApi from "../api/instancePrivate";
import { AuthContext } from "../context/AuthContext";

function ButLikComent({ setSendComment, data, setBut }) {
    const [isLike, setIsLike] = useState(false);
    const [numberLikes, setNumberLikes] = useState(0)
    const [numberComments, setNumberComments] = useState(0)
  const { user } = useContext(AuthContext);

  const { instancePriv } = instanceApi();

  useEffect(() => {
    const checkLike = data.likes.some((elm) => elm.author == user.id);
      checkLike ? setIsLike(true) : setIsLike(false);
      setNumberLikes(data.likes.length)

      const fetchComments = async () => {
          const response = await instancePriv.get(`/comments/${data._id}`);
          setNumberComments(response.data.length)
      }
      fetchComments()
  }, []);

  const handleComments = () => {
    setBut(true);
    setSendComment([
      {
        id: data._id,
        author: data.author,
        nameAuthor: data.nameAuthor,
        content: data.content,
      },
    ]);
  };
  
  const fetchLike = async() => {
      await instancePriv.post(`posts/like/${data._id}`);
      setIsLike(!isLike);
      isLike ? setNumberLikes(numberLikes-1) : setNumberLikes(numberLikes+1)
  };

  const handleClickPage = (evt) => {
    evt.stopPropagation();
  };

  return (
    <div
      className={styles.boxControllers}
      onClick={(evt) => handleClickPage(evt)}>
      <button
        id={styles.comment}
        onClick={(evt) => {
        handleComments(evt);
        }}>
        <FaRegComment />
        Comentar{numberComments}
      </button>
      <button
        onClick={(evt) => fetchLike(data.likes)}
        className={`${styles.like} ${isLike ? styles.likeChecked : ""}`}>
        <BiLike />
        {numberLikes}
      </button>
    </div>
  );
}

export default ButLikComent;
