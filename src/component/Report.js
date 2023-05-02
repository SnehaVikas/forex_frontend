import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Link } from "react-router-dom";
import './CSS/TransactionReport.css';
import UserHeader from './UserHeader';

function Report({ transactionId }) {
  
    const [transactionData, setTransactionData] = useState(null);
  
    const handleDownload = () => {

        axios.get(`http://localhost:8081/report/${transactionId}`, { responseType: 'blob' })
  .then((response) => {
    const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(pdfBlob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', 'report.pdf');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  })
  .catch((error) => {
    console.log(error);
  });
    };
  
    const handleCancel = () => {};

  
    return (
       
      <div className="receipt">
        <div className="receipt-header">
         
          <h1>FOREX TRANSACTION RECEIPT</h1>
        </div>
        <div className="receipt-details">
        <p>
            <span>Transaction ID:</span> {transactionData?.transactionId}
          </p>
          <p>
            <span>Transaction Date:</span> {transactionData?.transactionDate}
          </p>
          <p>
            <span>Sender Name:</span> {transactionData?.senderName}
          </p>
          <p>
            <span>Receiver Name:</span> {transactionData?.receiverName}
          </p>
          <p>
            <span>Sender Account Number:</span>{' '}
            {transactionData?.senderAccountNumber}
          </p>
          <p>
            <span>Receiver Account Number:</span>{' '}
            {transactionData?.receiverAccountNumber}
          </p>
          
        </div>
        <div className="receipt-summary">
          <p>
            <span>Sending Amount:</span> {transactionData?.sendingAmount}
          </p>
        </div>
        <div className="receipt-footer">
          <p>Thank you for your business.</p>
        </div>
        <div className="btnDiv">
  
                <button type="button" className="btn btn-primary" onClick={handleDownload}>Download</button>
                <Link to="/"><button type="button" className="btn btn-primary" style={{ marginLeft: "10px" }} onClick={handleCancel}>Cancel</button></Link>
            </div>
        </div> 
        
     ); 
           
}

export default Report;
