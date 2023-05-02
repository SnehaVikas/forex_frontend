import React, { useEffect, useState } from "react";
import axios from "axios";
import { TextField, Button, MenuItem, Grid, Paper, Avatar } from '@mui/material';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import { Link } from "react-router-dom";
import UserHeader from "./UserHeader";
function Converter() {
  const [fromCurrency, setFromCurrency] = useState("");
  const [toCurrency, setToCurrency] = useState("");
  const [amount, setAmount] = useState();
  const [convertedAmount, setConvertedAmount] = useState("");
  const [amountError, setAmountError] = useState("");
  const [formErrors, setFormErrors] = useState({});
  const [message, setMessage] = useState("");
  const config = require('./Config');
  const apiUrl = config.currencyConverterUrl;
  const paperStyle = {
    padding: '30px 20px',
    width: 500,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '84vh'

  };
  const formStyle = {
    width: '100%',
    marginTop: 20,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  };
  const avatarStyle = { backgroundColor: '#1bbd7e' }
  const inputRowStyle = {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between",
    width: "500px",
    marginBottom: "10px",
  };
  const inputStyle = {
    width: "400px",
  };
  const amountInputStyle = {
    width: "250px",
    marginLeft: "20px",
  };

  const convertedAmountStyle = {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    width: "470px",
    marginBottom: "10px",
  };
  const resultStyle = {
    justifyContent: "center",
    alignItems: "center",
    textAlign: "center",
    width: "460px",
  };

  const validateForm = () => {
    let errors = {};
    let isValid = true;

    if (!fromCurrency || !toCurrency || !amount) {
      errors.form = 'Please fill out all fields';
      isValid = false;
    }

   else if (amount <= 0) {
      errors.amount = 'Amount should be greater than 0';
      isValid = false;
    }
    setFormErrors(errors);

    setAmountError(errors.amount || "");
    return isValid;
  };

  const handleFromCurrencyChange = (event) => {
    setFromCurrency(event.target.value);
    setFormErrors({});
    setConvertedAmount(null);
    
  }
  const handleAmountChange = (event) => {
    setAmount(event.target.value);
    setFormErrors({});
    setAmountError("");
    setConvertedAmount(null);
  }
  const handleToCurrencyChange = (event) => {
    setToCurrency(event.target.value);
    setFormErrors({});
    setConvertedAmount(null);
  }

  //Handling the submit button
  const handleSubmit = async (event) => {
    event.preventDefault();


    if (!validateForm()) {
        return;
    }
    setMessage("");
    try {
        const response = await axios.get(`${apiUrl}/rate/convert?amount=${amount}&fromCurrency=${fromCurrency}&toCurrency=${toCurrency}`);

        console.log(response);

        if (response && response.data) {
            setConvertedAmount(response.data);

        } else {
            setConvertedAmount(null);

        }

    } catch (error) {
        console.log(error);
        setConvertedAmount(null);
        if (error.response && error.response.data) {
            setMessage(error.response.data);
        } else {
            setMessage("An error occurred while fetching rate data");
        }
    }

};
  const handleCancel = () => {
    // navigate("/*")#ceffbf
  }
  //  #a2a8a0
  return (
    <>
    <div>
        <UserHeader></UserHeader>
    </div>
    <div style={{ backgroundColor: '#bfe0de', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
      <div style={{ marginLeft: '5rem' }}>
        <p style={{ fontSize: '1.5rem', fontWeight: 'bold' }}>Make your money move, fast.Get accurate and reliable foreign exchange convert......</p>
      </div>
      <div style={{ marginRight: '5rem', width: '50%' }}>
        <Grid container justify="center" style={{ maxWidth: '800px' }} >
          <Paper elevation={10} style={paperStyle}>
            <Grid container direction="column" justify="center" alignItems="center">
              <Grid item>
                <Avatar style={avatarStyle}><CurrencyExchangeIcon /></Avatar></Grid>
              <Grid item>
                <h2>Currency Converter</h2>
              </Grid>
            </Grid>
            <form style={formStyle}>
              <div style={inputRowStyle}>
                <TextField
                  label="From Currency" value={fromCurrency} onChange={handleFromCurrencyChange}
                  select
                  required
                  error={!!formErrors.form} helperText={formErrors.form}
                  style={inputStyle}>
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
                  style={inputStyle}>
                  <MenuItem value="INR" disabled={fromCurrency === "INR"}>INR</MenuItem>
                  <MenuItem value="EUR" disabled={fromCurrency === "EUR"}>EUR</MenuItem>
                  <MenuItem value="GBP" disabled={fromCurrency === "GBP"}>GBP</MenuItem>
                  <MenuItem value="BHD" disabled={fromCurrency === "BHD"}>BHD</MenuItem>
                  <MenuItem value="USD" disabled={fromCurrency === "USD"}>USD</MenuItem>
                  <MenuItem value="AED" disabled={fromCurrency === "AED"}>AED</MenuItem>
                  <MenuItem value="BDT" disabled={fromCurrency === "BDT"}>BDT</MenuItem>
                </TextField>
              </div>
              <TextField

                label="Amount" value={amount} onChange={handleAmountChange}
                error={!!formErrors.form|| !!amountError} helperText={formErrors.form || amountError}
                style={amountInputStyle}>

              </TextField>
              <br></br>
              
              <div style={{display: "flex", justifyContent: "space-between" ,width: "372px",
    }}>
                <Button onClick={handleSubmit} variant="contained" color="primary" style={{marginLeft: "92px", float: "left",paddingLeft:"11px",paddingRight:"11px"}} >Convert</Button>
                <Link to="/"><Button type="button" variant="contained" color="secondary" style={{ marginRight: "50px", float: "left" }} >Cancel</Button></Link>
              </div>
              <br></br>
              <div style={convertedAmountStyle}>
                <h4 style={resultStyle}>Converted Amount:</h4>
              </div>
              <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', textAlign: 'center', width: '460px' }}>
                <p style={{ textAlign: 'center' }}>
                  {convertedAmount &&
                    `${amount} ${fromCurrency} = ${convertedAmount} ${toCurrency}`}
                </p>
              </div>
            </form>
            {message && <div className='errs' style={{ color: "red", padding: "50px" }}>{message}  </div>}
          </Paper>
        </Grid>
      </div>
    </div>
    </>
    // </Grid>
  );
}
export default Converter;