import { Link } from 'react-router-dom'
import { GoHome } from "react-icons/go"
import { IoSearchSharp } from "react-icons/io5"
import { CgProfile } from "react-icons/cg"
import { FaUserFriends } from "react-icons/fa"

import styles from './styles/navbar.module.css'

function Navbar() {


  return (
    <nav className={styles.boxNavBar}>
          <ul>
              <li><Link to='/'><GoHome/></Link> </li>
              <li><Link to='/search'><IoSearchSharp/></Link></li>
              <li><Link to="/friends"><FaUserFriends/></Link></li>
              <li><Link to="/profile"><CgProfile/></Link></li>
          </ul>
    </nav>
  )
}

export default Navbar