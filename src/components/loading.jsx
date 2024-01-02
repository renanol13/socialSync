import Svg from '../img/svgLoading.svg'

import styles from './styles/svgLoading.module.css'

function Loading() {
  return (
      <div className={styles.boxLoading}>
        <img src={Svg} alt='loading' />
    </div>
  )
}

export default Loading