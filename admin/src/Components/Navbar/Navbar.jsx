import React from 'react'
import './Navbar.css'
import navlogo from '../../assets/Logo.jpeg'
import navProfile from '../../assets/Profile.jpg'


const Navbar = () => {
  return (
    <div className='navbar'>
        <img src={navlogo} width={110} height={70} alt="" className="nav-logo" />
        <img src={navProfile} width={60} height={60} className='nav-profile' alt="" />
    </div>
  )
}

export default Navbar