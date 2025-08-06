import React from 'react'
import Logo from "../assets/images/welcomelogo.png"
import "../assets/css/welcomeNavbar.css"

const WelcomeNavbar = ({text}) => {
  return (
    <div className='nav nav1'>
        <img src={Logo} alt='logo'/>
        <div className='nav-text'>
          <h3>{text}</h3>
        </div>
    </div>
  )
}

export default WelcomeNavbar