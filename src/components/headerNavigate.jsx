import { useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa";


import styles from './styles/headerNavigate.module.css'
function HeaderNavigate({text}) {

  const navigate = useNavigate();
  return (
    <>
        <p id={styles.header}>
        <FaArrowLeft onClick={() => navigate(-1)} />
        {text}
      </p>
    </>
  )
}

export default HeaderNavigate