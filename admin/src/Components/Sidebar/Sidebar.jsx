import React from 'react'
import './Sidebar.css'
import {Link} from 'react-router-dom'

const Sidebar = () => {
  return (
    <div className='sidebar'>
        <Link to={'/addproduct'} style={{textDecoration:"Home"}}>
            <div className="sidebar-item">
                <p>Add Event/Workshop</p>
            </div>
        </Link>
        <Link to={'/listproduct'} style={{textDecoration:"Home"}}>
            <div className="sidebar-item">
                <p>List Event/Workshop</p>
            </div>
        </Link>
    </div>
  )
}

export default Sidebar