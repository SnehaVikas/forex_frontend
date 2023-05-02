import React from "react";
import './CSS/Admin.css';
import {NavLink} from 'react-router-dom';
function Admin() {
	return (
    <div class="header">
          
      
    <a href="#default" class="logo">Forex</a>
     <div class="header-center">
       <div class="menu-bar">
      
      <NavLink exact to="/AllTransaction">Transaction History</NavLink>
      <NavLink exact to="/addCurrency">Save Rates</NavLink>
      <NavLink exact to="/updateRate">Update Rates</NavLink>
      
       
       <div class="header-right">
       <a href="/">Logout</a>
      

       </div>
       </div>
             </div>
</div>
      
              )
}
export default Admin;

