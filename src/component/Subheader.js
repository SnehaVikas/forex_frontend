import React from "react";
import'./CSS/Subheader.css';

function Subheader() {
	return (
        <div class="header">
       <a href="#default" class="logo">Forex</a>
        <div class="header-center">
          <div class="menu-bar">
        <a href="/Index"> Home</a>
           <a href="/AddTransaction">Transaction</a>
          <a href="/CurrencyConverter">Curency Converter</a>
            <a href="/SaveUserBankDetails">Bank Details</a>
            <a href="/TransactionReport">Report</a>

          <div class="header-right">
          <a href="/LoginIn">SignOut</a>
          </div>
          </div>
                </div>
</div>
      
              )
}
export default Subheader;

