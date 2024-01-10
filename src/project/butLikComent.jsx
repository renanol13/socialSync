import { FaRegComment } from "react-icons/fa";
import { BiLike } from "react-icons/bi";

import { useContext, useEffect, useState } from "react";
import instanceApi from "../api/instancePrivate";
import { AuthContext } from "../context/AuthContext";

import styles from "./styles/butLikComent.module.css";

function ButLikComent({ setSendComment, data, setShowPageComments }) {
  const [isLike, setIsLike] = useState(false);
  const [Debounce, setDebounce] = useState(false);
  const { user } = useContext(AuthContext);

  const { instancePriv } = instanceApi();

  useEffect(() => {
    const checkLike = data.likes.some((elm) => elm.author == user.id);
    if (checkLike) setIsLike(true);
  }, []);

  const handleComments = () => {
    setShowPageComments(true);
    setSendComment([
      {
        id: data._id,
        author: data.author,
        nameAuthor: data.nameAuthor,
        userNameAuthor: data.userNameAuthor,
        content: data.content,
      },
    ]);
  };

  const fetchLike = async () => {
    if (!Debounce) {
      try {
        //Impede que faça outra requisiçao antes concluir a atua
        setDebounce(true);
        await instancePriv.post(`posts/like/${data._id}`);

        setIsLike(!isLike);

        setTimeout(() => {
          setDebounce(false);
        }, 300);
      } catch (error) {
        console.log("Deu erro" + error);
        setDebounce(false);
      }
    }
  };

  return (
    <div className={styles.boxControllers}>
      <button
        id={styles.comment}
        onClick={(evt) => {
          handleComments(evt);
        }}
      >
        <FaRegComment />
        Comentar
      </button>
      <button
        onClick={() => fetchLike(data.likes)}
        className={`${styles.like} ${isLike ? styles.likeChecked : ""}`}
      >
        <BiLike />
        Curtir
      </button>
    </div>
  );
}

export default ButLikComent;
