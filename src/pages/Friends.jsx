import { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'


function Friends() {
  const {Logout} = useContext(AuthContext)

  return (
    <div>
       <button onClick={()=>Logout()}>Deslogar</button>
    </div>
  )
}

export default Friends