import React from 'react'
import Logo from "../assets/images/logo.png"
import  "../assets/css/navbar.css"
const Navbar = ({text}) => {
  return (
    <div className='nav'>
        <img src={Logo} alt='logo'/>
        {
          text && 
        <div className='nav-text'>
          <h3>{text}</h3>
        </div>
        }
    </div>
  )
}

export default Navbar