import React from 'react';
import { Link } from 'react-router-dom'; // Ensure Link is imported
import Logo from '../../Assets/AAC3_1.png';
import './Navbar.css'
const NavBar = () => {
  return (
      <nav>
        <div className="container">
          <div className="logo-sec">
          <Link to="/"><img src={Logo}/></Link>
          </div>

          <div className="topic-bar">
              <p>GEOTAG  DOCUMENTATION</p>
          </div>
          <div className='admin-log'>
            <Link to='/Admin'><button>Admin Login</button></Link>
          </div>
        </div>
      </nav>

  );
};

export default NavBar;
