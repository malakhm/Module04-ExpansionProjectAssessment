import React from 'react'
import Logo from '../assets/logo.jpg'
import './Styles/Header.css'
const Header= () =>{
  return (
    <>
    <div className='Header-Main-Component '>
      <img  className="logoLogo" src={Logo}/>
      <ul className='header-list-main'>
        <li>Home</li>
        <li>Dashboard</li>
      </ul>

    </div>
    
    </>
  )
}

export default Header