import React from 'react';
import { useState } from 'react';
import DatePicker from "react-datepicker";

import { Avatar, MenuItem, Grid, Paper, TextField, Button, Typography } from '@mui/material';
import { CurrencyBitcoin } from "@mui/icons-material";
import { Link } from 'react-router-dom';
import axios from 'axios';
import UserHeader from './UserHeader';
import { getRateByDate } from './Config';

function GetRates() {

    const paperStyle = { padding: 20, height: '70vh', width: 280, margin: "20px auto" }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    const btnstyle = { margin: '8px 0' }
    const [fromCurrency, setFromCurrency] = useState("");
    const [toCurrency, setToCurrency] = useState("");
    const [date, setDate] = useState("");
    const [rate, setRate] = useState([]);
    const [message, setMessage] = useState("");
    const [formErrors, setFormErrors] = useState("");
    const [dateError, setDateError] = useState("");

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
    const validateForm = () => {
        let errors = {};
        let isValid = true;

        if (!fromCurrency) {
            errors.form = "Please fill out this fields";
            isValid = false;
        }

        if (!toCurrency) {
            errors.form = "Please Fill out this fields";
            isValid = false;
        }

        if (!date) {
            errors.date = "Date is required";
            isValid = false;
        } else if (new Date(date) > new Date()) {
            errors.date = "Date cannot be in the future";
            isValid = false;
        }

        setFormErrors(errors);

        return isValid;
    };

    const handleFromCurrencyChange = (event) => {
        setFromCurrency(event.target.value);
        setFormErrors({});
        setRate(null);

    }
    const handleToCurrencyChange = (event) => {
        setToCurrency(event.target.value);
        setFormErrors({});
        setRate(null);

    }
    const handleSubmit = async (e) => {
        e.preventDefault();
      
        if (!validateForm()) {
          return;
        }
      // Reset message state variable
         setMessage("");
        try {
          const resp = await axios.get(
           `${getRateByDate}`+
              fromCurrency +
              "/" +
              toCurrency +
              "/" +
              date
          );
          console.log(resp);
      
          if (resp && resp.data) {
            setRate(resp.data);
            
          } else {
            setRate(null);
            
          }
        } catch (error) {
           
            console.log(error);
            
            if (error.response && error.response.data) {
                setMessage(error.response.data);
              } else {
                setMessage("An error occurred while fetching rate data");
              }
          }
        
      };
    
    

    return (
        <>
        <div>
            <UserHeader></UserHeader>
        </div>
        <Grid>
            <Paper elevation={10} style={{
                paperStyle, padding: "40px",
                height: "95vh",
                width: "576px",
                margin: "20px auto"
            }}>
                <Grid align='center'>
                    <Avatar style={avatarStyle}><CurrencyBitcoin /></Avatar>
                    <h2>Get rates</h2>
                </Grid>

                <form onSubmit={handleSubmit}>
                    <div style={{ display: "flex", flexDirection: "row", width: "500px" }}>
                        <TextField
                            label="From Currency" value={fromCurrency} onChange={handleFromCurrencyChange}
                            select
                            required
                            error={!!formErrors.form} helperText={formErrors.form}
                            style={{ marginBottom: "10px", width: "400px", marginRight: "-32px" }}>
                            <MenuItem value="EUR">EUR</MenuItem>
                            <MenuItem value="USD">USD</MenuItem>
                            <MenuItem value="GBP">GBP</MenuItem>
                            <MenuItem value="BHD">BHD</MenuItem>
                            <MenuItem value="AED">AED</MenuItem>
                            <MenuItem value="BDT">BDT</MenuItem>
                            <MenuItem value="INR">INR</MenuItem>
                        </TextField>

                        <TextField

                            label="To Currency" value={toCurrency} onChange={handleToCurrencyChange}
                            select
                            required
                            error={!!formErrors.form} helperText={formErrors.form}
                            style={{ marginBottom: "10px", width: "400px", marginLeft: "50px" }}>
                            <MenuItem value="INR" disabled={fromCurrency === "INR"}>INR</MenuItem>
                            <MenuItem value="EUR" disabled={fromCurrency === "EUR"}>EUR</MenuItem>
                            <MenuItem value="GBP" disabled={fromCurrency === "GBP"}>GBP</MenuItem>
                            <MenuItem value="BHD" disabled={fromCurrency === "BHD"}>BHD</MenuItem>
                            <MenuItem value="USD" disabled={fromCurrency === "USD"}>USD</MenuItem>
                            <MenuItem value="AED" disabled={fromCurrency === "AED"}>AED</MenuItem>
                            <MenuItem value="BDT" disabled={fromCurrency === "BDT"}>BDT</MenuItem>
                        </TextField>
                    </div>
                    <label htmlFor="date">Date</label><br />
                    <input type="date" id="date" value={date} onChange={(event) => { setDate(event.target.value); validate(); }} />
                    <br></br>
                    {dateError.date && <span className="error" style={{ color: "red" }}>{dateError.date}</span>}
                    <br></br>
                    <Button type='submit' onClick={handleSubmit} color='primary' variant="contained" style={btnstyle} fullWidth>Confirm</Button>

                    {
                        rate !== null ? <div>
                            <h5>Rate</h5>

                            {
                                rate.map(p =>
                                    <div className="card" style={{ width: "288px", display: "contents" }}>

                                        <h4 className="card-text">Rate:{p.rate}</h4>
                                        <h4 className="card-text">Date:{p.date}</h4>

                                    </div>
                                )

                            }

                        </div>
                            : <h3>{message}</h3>
                    }
                </form>

                <br></br>
               
                {message && <div className='err' style={{ color: "red" }}>{message}  </div>}
                

                <Link to="/">
                    <button type="button" className="btn btn-primary" style={{ marginLeft: "10px" }} >Cancel</button>
                </Link>
            </Paper>
        </Grid>
        </>
    )
}

export default GetRates;
