import React, { useEffect, useState } from "react";
import axios from "axios";
import Swal from 'sweetalert2';
import {
  Button,
  Grid,
  Paper,
  Avatar,
} from "@mui/material";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import { Link } from "react-router-dom";

import Admin_Index from "./Admin_Index";
import { updateRateUrl, updateUrlSave } from "./Config";

function UpdateRates() {
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [id, setId] = useState("");
  const [rate, setRate] = useState("");
  const [date, setDate] = useState("");

  const [fromError, setFromError] = useState("");
  const [toError, setToError] = useState("");
  const [rateError, setRateError] = useState("");
  const [idError, setIdError] = useState("");
  const [dateError, setDateError] = useState("");
  const paperStyle = {
    padding: 20,
    height: "100vh",
    width: 500,
    margin: "20px auto",
  };
  const avatarStyle = { backgroundColor: "#1bbd7e" };
  const validate = () => {
    let dateError = {};
    if (!date) {
      dateError.date = "Date is required";
    } else if (new Date(date) > new Date()) {
      dateError.date = "Date cannot be in the future";
    }
    setDateError(dateError);
    return Object.keys(dateError).length === 0;
  };
  const handleSubmit = (event) => {
    event.preventDefault();
    let formValid = true;
    // check for the empty fields
    if (id === '') {
      setIdError('Please enter ID');
      formValid = false;
    } else {
      setIdError('');
    }
    if (fromCurrency === '') {
      setFromError('Please enter from currency');
      formValid = false;
    } else {
      setFromError('');
    }
    if (toCurrency === '') {
      setToError('Please enter to currency');
      formValid = false;
    } else {
      setToError('');
    }
    if (rate === '') {
      setRateError('Please enter rate');
      formValid = false;
    } else {
      setRateError('');
    }
    if (date === '') {
      setDateError('Please enter date');
      formValid = false;
    } else {
      setDateError('');
    }
    const isValidDate = validate();
    formValid = formValid && isValidDate;

    if (formValid) {
      axios.get(`${updateRateUrl}${id}`)
        .then((response) => {
          const payload = {
            id: id,
            fromCurrency: fromCurrency,
            toCurrency: toCurrency,
            rate: rate,
            date: date
          };
          Swal.fire({
            title: 'Do you want to save the changes?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Save',
            denyButtonText: `Don't save`,

          }).then((result) => {
            if (result.isConfirmed) {
              axios.put(`${updateUrlSave}`, payload)
                .then((resp) => {
                  Swal.fire('Saved!', `Rate is saved with id: ${resp.data.id}`, 'success');
                })
                .catch(error => {
                  console.log(error.response);
                  Swal.fire({
                    icon: 'error',
                    title: 'Failed to save the rate',
                    text: error.message || "An error occurred",
                  });
                });
            } else if (result.isDenied) {
              Swal.fire('Changes are not saved', '', 'info');
            }
          })
        })
        .catch(error => {
          console.log(error.response);
          if (error.response.status === 404) {
            setIdError("Rate with this ID does not exist");
          }
          Swal.fire({
            icon: 'error',
            title: 'Failed to save the rate',
            text: error.message || "An error occurred",
          });
        });
    }
  }
  return (
    <Grid>
      <div>
      <Admin_Index></Admin_Index>
      </div>
      <Paper elevation={10} style={{
        paperStyle, padding: "8px",
        height: "130vh", width: "500px", margin: "20px auto"
      }}>
        <Grid align='center'>
          <Avatar style={avatarStyle}><CurrencyExchangeIcon /></Avatar>
          <h2>Update Rates</h2></Grid>
        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
          <label>
            Id:
            <br></br>
            <input type="text" name="id" value={id} className="form-control" id="id" placeholder="Enter id" onChange={(event) => {
              setId(event.target.value);
              if (event.target.value === "") {
                setIdError("Please enter Id.");
              } else {
                setIdError("");
              }
            }
            }
              required />
            {
              idError && <div style={{ color: "red" }}>{idError}</div>
            }
          </label>
          <label>
            From Currency:
            <input type="text" name="fromCurrency" value={fromCurrency} className="form-control" id="fromCurrency" placeholder="Enter currency" onChange={(event) => {
              setFromCurrency(event.target.value);
              if (event.target.value === "") {
                setFromError("Please enter currency.");
              } else {
                setFromError("");
              }
            }
            }
              required />
            {
              fromError && <div style={{ color: "red" }}>{fromError}</div>
            }

          </label>
          <label>
            To Currency:
            <br></br>
            <input type="text" name="toCurrency" value={toCurrency} className="form-control" id="toCurrency" placeholder="Enter currency" onChange={(event) => {
              setToCurrency(event.target.value);
              if (event.target.value === "") {
                setToError("Please enter currency.");
              } else {
                setToError("");
              }
            }
            }
              required />
            {
              toError && <div style={{ color: "red" }}>{toError}</div>
            }
          </label>
          <label>
            Rate:
            <input type="text" name="rate" value={rate} className="form-control" id="rate" placeholder="Enter rate" onChange={(event) => {
              setRate(event.target.value);
              if (event.target.value === "") {
                setRateError("Please enter rate.");
              } else {
                setRateError("");
              }
            }
            }
              required />
            {
              rateError && <div style={{ color: "red" }}>{rateError}</div>
            }
          </label>
          <label htmlFor="date">Date</label>
          <input type="date" id="date" value={date} onChange={(event) => { setDate(event.target.value); validate(); }} />
          {dateError.date && <span className="error" style={{ color: "red" }}>{dateError.date}</span>}
        
          <div style={{ display: "flex", justifyContent: "space-between" ,width: "372px",
    }}>
          <Button type='submit' onClick={handleSubmit} color='primary' variant="contained"  style={{ marginLeft: "8px", float: "left",paddingLeft:"21px",paddingRight:"13px" }}>Submit</Button>
          <Link to="/Admin_index"><Button type="button" variant="contained" color="secondary" style={{ marginLeft: "50px", float: "left" }} >Cancel</Button></Link>

          </div>
          
        </form>
      </Paper>
    </Grid>
  );

}
export default UpdateRates;