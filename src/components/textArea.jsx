import styles from "./styles/textArea.module.css";

function TextArea({ text, labelBtn, setChange, value, handleClick }) {
  return (
    <div className={styles.boxTextArea}>
      <textarea
        cols="30"
        rows="10"
        onChange={(e) => setChange(e.target.value)}
        value={value}
        placeholder={text}
      ></textarea>
      <div className={styles.boxControles}>
        <button onClick={() => handleClick()}>{labelBtn}</button>
      </div>
    </div>
  );
}

export default TextArea;
