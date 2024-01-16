import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'

import Button from '../components/button'

import styles from './styles/friends.module.css'

function Friends() {
  const {Logout} = useContext(AuthContext)

  return (
    <div className={styles.boxFriends}>
      <p>Página ainda não disponível...</p>
      <Button text='Logout' handleClick={()=>Logout()}/>
    </div>
  )
}

export default Friends