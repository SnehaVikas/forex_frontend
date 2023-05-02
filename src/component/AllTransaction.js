import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "./CSS/AllTransaction.css";
import ReactPaginate from "react-paginate";
import { Button } from "@mui/material";
import Admin from "./Admin";
function AllTransaction() {
  const [transactions, setTransactions] = useState([]);
  const [pageNumber, setPageNumber] = useState(0);
  const [transactionsPerPage, setTransactionsPerPage] = useState(10);
  const [searchFromCountry, setSearchFromCountry] = useState('');
  const [searchToCountry, setSearchToCountry] = useState('');
  const [searchSenderName, setSenderName] = useState('');
  const [searchReceiverName, setReceiverName] = useState('');
 
  const [searchSendingCurrency, setSendingCurrency] = useState('');
  const [searchReceivingCurrency, setReceivingCurrency] = useState('');

  const handleRecordsPerPageChange = (event) => {
    setTransactionsPerPage(parseInt(event.target.value));
    setPageNumber(0); // reset to first page when number of records per page changes
  };
  const [sortDirection, setSortDirection] = useState("asc");
  const [sortField, setSortField] = useState("sendingAmount");
  const pagesVisited = pageNumber * transactionsPerPage;
  const sortedTransactions = transactions.sort((a, b) => {
    let comparison = 0;

    if (sortField === "fromCountry") {
      comparison = a.fromCountry.localeCompare(b.fromCountry);
    } else if (sortField === "toCountry") {
      comparison = a.toCountry.localeCompare(b.toCountry);
    } else if (sortField === "senderName") {
      comparison = a.senderName.localeCompare(b.senderName);
    } else if (sortField === "receiverName") {
      comparison = a.receiverName.localeCompare(b.receiverName);
    } else if (sortField === "sendingCurrency") {
      comparison = a.sendingCurrency.localeCompare(b.sendingCurrency);
    } else if (sortField === "receivingCurrency") {
      comparison = a.receivingCurrency.localeCompare(b.receivingCurrency);
    } else if (sortField === "sendingAmount") {
      comparison = a.sendingAmount - b.sendingAmount;
    }

    return sortDirection === "desc" ? comparison * -1 : comparison;
  })
  .filter((transaction) => {
    return (
      transaction.fromCountry &&
      transaction.fromCountry.toLowerCase().includes(searchFromCountry.toLowerCase()) &&
      transaction.toCountry &&
      transaction.toCountry.toLowerCase().includes(searchToCountry.toLowerCase())&&
      transaction.senderName &&
      transaction.senderName.toLowerCase().includes(searchSenderName.toLowerCase())&&
      transaction.receiverName &&
      transaction.receiverName.toLowerCase().includes(searchReceiverName.toLowerCase())&&
      
      transaction.sendingCurrency &&
      transaction.sendingCurrency.toLowerCase().includes(searchSendingCurrency.toLowerCase())&&
      transaction.receivingCurrency &&
      transaction.receivingCurrency.toLowerCase().includes(searchReceivingCurrency.toLowerCase())
    
    );
  })
  
      const pageCount = Math.ceil(sortedTransactions.length / transactionsPerPage);
      const displayTransactions = sortedTransactions
        .slice(pagesVisited, pagesVisited + transactionsPerPage)
        .map((transaction, index) => {
          return (
            <tr key={index}>
              <td>{transaction.fromCountry}</td>
              <td>{transaction.toCountry}</td>
              <td>{transaction.senderName}</td>
              <td>{transaction.receiverName}</td>
              <td>{transaction.senderAccNo}</td>
              <td>{transaction.receiverAccNo}</td>
              <td>{transaction.sendingCurrency}</td>
              <td>{transaction.receivingCurrency}</td>
              <td>{transaction.sendingAmount}</td>
            </tr>
          );
        });
      const changePage = ({ selected }) => {
        setPageNumber(selected);
      };
      const handleSort = (field) => {
        setSortDirection(sortDirection === "asc" ? "desc" : "asc");
        setSortField(field);
      };
      
      
      useEffect(() => {
        axios.get("http://localhost:8081/forex/transcation/all").then((response) => {
          setTransactions(response.data);
        });
      }, []);
      return (
      <div>
        <Admin/>
        <div className="flex-container">
         
          <div className="flex-item">
            <h1>Transaction List</h1>
          </div>
          <div className="header_fixed"></div>
          <br></br>
          
          <div className="search-container">
            <input
              id="searchFromCountry"
              type="text"
              value={searchFromCountry}
              onChange={(e) => setSearchFromCountry(e.target.value)}
              style={{ width: "120px",marginLeft:"-28%"}}
              placeholder="   Search"
              className="search-input"
            />
          

            <input
              id="searchToCountry"
              type="text"
              value={searchToCountry}
              onChange={(e) => setSearchToCountry(e.target.value)}
              style={{ width: "120px" }}
              placeholder="     Search"
              className="search-input"
            />

              <input
              id="searchSenderName"
              type="text"
              value={searchSenderName}
              onChange={(e) => setSenderName(e.target.value)}
              style={{ width: "120px" }}
              placeholder="     Search"
              className="search-input"
            />

<input
              id="searchReceiverName"
              type="text"
              value={searchReceiverName}
              onChange={(e) => setReceiverName(e.target.value)}
              style={{ width: "120px" }}
              placeholder="     Search"
              className="search-input"
            />

            <input
              id="searchSendingCurrency"
              type="text"
              value={searchSendingCurrency}
              onChange={(e) => setSendingCurrency(e.target.value)}
              style={{ width: "130px",marginLeft:"38%"}}
              placeholder="     Search"
              className="search-input"
            />
<input
              id="searchReceivingCurrency"
              type="text"
              value={searchReceivingCurrency}
              onChange={(e) => setReceivingCurrency(e.target.value)}
              style={{ width: "130px",marginRight:"-20%" }}
              placeholder="     Search"
              className="search-input"
            />


          </div>



                    <table>
            <thead>
              <tr>
                <th onClick={() => handleSort("fromCountry")}>
                  From Country {sortField === "fromCountry" && sortDirection === "asc" ? "▲" : "▼"}
                </th>
                <th onClick={() => handleSort("toCountry")}>
                  To Country {sortField === "toCountry" && sortDirection === "asc" ? "▲" : "▼"}
                </th>
                <th onClick={() => handleSort("senderName")}>
                  Sender's Name {sortField === "senderName" && sortDirection === "asc" ? "▲" : "▼"}
                </th>
                <th onClick={() => handleSort("receiverName")}>
                  Receiver's Name {sortField === "receiverName" && sortDirection === "asc" ? "▲" : "▼"}
                </th>
                <th>Sender's Account No</th>
                <th>Receiver's Account No</th>
                <th onClick={() => handleSort("sendingCurrency")}>
                  Sending Currency {sortField === "sendingCurrency" && sortDirection === "asc" ? "▲" : "▼"}
                </th>
                <th onClick={() => handleSort("receivingCurrency")}>
                  Receiving Currency {sortField === "receivingCurrency" && sortDirection === "asc" ? "▲" : "▼"}
                </th>
                <th onClick={() => handleSort("sendingAmount")}>
                  Sending Amount {sortField === "sendingAmount" && sortDirection === "asc" ? "▲" : "▼"}
                </th>
              </tr>
            </thead>
            <tbody>{displayTransactions}</tbody>
          </table>
          <div>
            <label htmlFor="recordsPerPage">Records per page:</label>
            <select
              id="recordsPerPage"
              value={transactionsPerPage}
              onChange={handleRecordsPerPageChange}

            >
              <option value={3}>3</option>
              <option value={5}>5</option>
              <option value={10}>10</option>
              <option value={15}>15</option>
              <option value={20}>20</option>
              <option value={25}>25</option>
              <option value={30}>30</option>
            </select>
          </div>

          <ReactPaginate
            previousLabel={"Previous"}
            nextLabel={"Next"}
            pageCount={pageCount}
            onPageChange={changePage}
            containerClassName={"pagination"}
            previousLinkClassName={"previous-page"}
            nextLinkClassName={"next-page"}
            disabledClassName={"pagination-disabled"}
            activeClassName={"pagination-active"}
          />
          <Link to ="/Admin_Index"><Button type="button" variant="contained" color="secondary"style={{marginLeft:"50px"}}>Back</Button></Link>
        </div>
        </div>  
      );
      }
    
      
export default AllTransaction;