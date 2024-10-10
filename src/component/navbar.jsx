
// eslint-disable-next-line no-unused-vars
import React from 'react';
import { Link } from 'react-router-dom';

function Navbar() {

return(
  <nav className="navbar navbar-expand-lg  navbar-green">
  <div className="container-fluid">
    <a className="navbar-brand"><h4>Visitor Appointment</h4></a>
   
    <div className="collapse navbar-collapse" id="navbarNav">
      <ul className="navbar-nav">
        <li className="nav-item">
          <Link className="nav-link active" aria-current="page" to="/"><b>Home</b></Link>
        </li>
        
          <Link className="nav-link" to="/add"><b>Appointment</b></Link>
       
        <li className="nav-item">
          <Link className="nav-link" href="#"><b>Contact Us</b></Link>
        </li>
        <li className="nav-item">
          <Link className="nav-link" href="#"><b>Log Out</b></Link>
        </li>
      
        
      </ul>
    </div>
  </div>
</nav>
  
 
)
}

export default Navbar;