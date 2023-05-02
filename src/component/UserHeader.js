import React from "react";
import'./CSS/HeaderCss.css';
import {NavLink} from 'react-router-dom';
function UserHeader() {
	return (
        <div class="header">
          
      
       <a href="#default" class="logo">Forex</a>
        <div class="header-center">
          <div class="menu-bar">
         <NavLink exact to="/" activeClassName="active-link">Home</NavLink>
         <NavLink exact to="/save">Transaction</NavLink>
         <NavLink exact to="/Converter">Currency Converter</NavLink>
         <NavLink exact to="/SaveUserBankDetails">Bank Details</NavLink>
         <NavLink exact to="/getRates">Rates</NavLink>
         <NavLink exact to="/TransactionReport">Report</NavLink>
          
          <div class="header-right">
          <a href="/">Logout</a>
         

          </div>
          </div>
                </div>
</div>
      
              )
}
export default UserHeader;

