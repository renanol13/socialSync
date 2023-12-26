import styles from "./styles/button.module.css";

function Button({ handleClick = null, text }) {
  return (
    <button className={styles.button} onClick={handleClick}>
      {text}
    </button>
  );
}

export default Button;
