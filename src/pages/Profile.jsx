import React, { useContext } from 'react'
import { AuthContext } from '../context/AuthContext'


function Profile() {

  const {Logout} = useContext(AuthContext)

  return (
    <button onClick={()=>Logout()}>Deslogar</button>
  )
}

export default Profile