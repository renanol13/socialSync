import styles from './styles/conteiner.module.css'

function Conteiner({children}) {
  return (
      <div className={styles.boxConteiner}>
          {children}
    </div>
  )
}

export default Conteiner