import { FaRegComment } from "react-icons/fa";
import { BiLike } from "react-icons/bi";

import { useContext, useEffect, useState } from "react";
import instanceApi from "../api/instancePrivate";
import { AuthContext } from "../context/AuthContext";

import styles from "./styles/butLikComent.module.css";

function ButLikComent({ setSendComment, data, setShowPageComments }) {
  const [isLike, setIsLike] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const { user } = useContext(AuthContext);

  const { instancePriv } = instanceApi();

  useEffect(() => {
    const checkLike = data.likes.some((elm) => elm.author == user.id);
    checkLike ? setIsLike(true) : setIsLike(false);
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
    if (!isFetching) {
      try {
        //Impede que faça outra requisiçao antes concluir a atua
        setIsFetching(true)
        await instancePriv.post(`posts/like/${data._id}`);

        setIsLike(!isLike);
        
        setTimeout(() => {
          setIsFetching(false);
        }, 300);

      } catch (error) {
        console.log("Deu erro" + error);
        setIsFetching(false)
      }
    }
  };

  const handleClickPage = (evt) => {
    evt.stopPropagation();
  };

  return (
    <div
      className={styles.boxControllers}
      onClick={(evt) => handleClickPage(evt)}
    >
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
