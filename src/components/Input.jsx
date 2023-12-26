import styles from "./styles/input.module.css";

function Input({
  text,
  placeholder,
  type,
  handleChange,
  name,
  value,
  stylesCheck = null,
}) {
  return (
    <div
      className={`${styles.boxInput} ${stylesCheck && styles["error"]}`}
    >
      <label htmlFor={name}>{text}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        onChange={handleChange}
        value={value}
      />
    </div>
  );
}

export default Input;
