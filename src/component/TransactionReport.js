import React, { useState } from "react";
import axios from "axios";
import './CSS/TransactionReport.css'
import UserHeader from "./UserHeader";

function TransactionReport() {
  const [transactionId, setTransactionId] = useState('');
  const [error, setError] = useState('');
  
  const handleSubmit = (e) => {
    e.preventDefault();

    if (!transactionId) {
      setError('Please enter a transaction ID.');
      return;
    }

    axios.get(`http://localhost:8081/report/${transactionId}`, { responseType: 'blob' })
      .then((response) => {
        const pdfBlob = new Blob([response.data], { type: 'application/pdf' });
        const url = window.URL.createObjectURL(pdfBlob);
        window.open(url);
      })
      .catch((error) => {
        setError('Invalid transaction ID. Please enter a valid ID.');
        console.log(error);
      });
  }

  return (
    <>
      <div>
        <UserHeader />
      </div>
      <div className="receipt">
        <div className="transaction-header">
          <h2>Transaction Report</h2>
        </div>
        <form onSubmit={handleSubmit}>
          <label>
            Enter Transaction ID:
            <input type="text" value={transactionId} onChange={(e) => setTransactionId(e.target.value)} />
          </label>
          <button type="submit">Generate Report</button>
          {error && <p className="error">{error}</p>}
        </form>
      </div>
    </>
  );
}

export default TransactionReport;


