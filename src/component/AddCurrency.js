import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {TextField,Button,MenuItem, Grid, Paper, Avatar, Dialog, DialogTitle, DialogContent,DialogContentText,DialogActions} from '@mui/material';

import SaveIcon from '@mui/icons-material/Save';
import Admin from "./Admin";
import Footer from "./Footer";
const config = require("./Config");
function AddCurrency()
{
const[fromCurrency,setFromCurrency]=useState("");
const[toCurrency,setToCurrency]=useState("");
const[rate,setRate]=useState("");
const [date,setDate]=useState(null);

const [dialogOpen, setDialogOpen] = useState(false);
  const [dialogMessage, setDialogMessage] = useState('');
const [formErrors, setFormErrors] = useState({});
const user = JSON.parse(localStorage.getItem("mytoken"));


const handleSubmit = (event) => {

    
     let errors = {};


     if (!fromCurrency) {
         errors['FromCurrencyError'] = "From Currency is required."
     }
     if (!toCurrency) {
         errors['ToCurrencyError'] = "To Currency is required."
       } 
    
     if (!rate) {
         
     errors['RateError'] = "Rate is required."
     } else if (isNaN(rate) || rate < 0) {
          errors['RateError'] = "Rate must be a number greater than or equal to zero."
      }
      


     setFormErrors(errors);
     const noErrors = Object.keys(errors).length === 0;
     // if no errors then  call the api
     if (noErrors) {
         const payload = {
            fromCurrency:fromCurrency,
            toCurrency:toCurrency,
             rate: rate,
             date: date,
             adminId: user.adminId,
 }

         axios.post("http://localhost:8081/forex/rate/save",payload)
         .then(resp => {
          setDialogMessage("Currency Details Saved: " + resp.data.id);
          setDialogOpen(true);
        
        })
        .catch((error) => {
          setDialogMessage("Error: " + error.response.data);
          setDialogOpen(true);
         
        });
     }
  }

  const handleCloseDialog = () => {
    setDialogOpen(false);
  }
  const paperStyle = { padding: 20, height: '70vh', width: 280, margin: "20px auto"}
  const avatarStyle = { backgroundColor: '#1bbd7e' }









return(
<>
{<div>
     <Admin/>
    {/* <Footer/> */}
</div> }

<Grid>
<Paper elevation={10} style={{padding : "20px",
 height: "100vh",width: "500px",margin: "20px auto"}}>
<Grid align='center'>
 <Avatar style={avatarStyle}><SaveIcon/></Avatar>
  <h2>Add Currency Details</h2></Grid>  
<form  style={{ display:"flex" ,flexDirection:"column",minWidth:"400px",maxWidth:"600px",height:"150px"}}>


  
<TextField
             label=" Enter From Currency" value={fromCurrency} onChange={(event)=>setFromCurrency(event.target.value)}required
             error={!!formErrors.FromCurrencyError} helperText={formErrors.FromCurrencyError}
             style={{marginBottom:"10px"}}>
        </TextField>

  
        <TextField
             label=" Enter To Currency " value={toCurrency} onChange={(event)=>setToCurrency(event.target.value)}required
             error={!!formErrors.ToCurrencyError} helperText={formErrors.ToCurrencyError}
             style={{marginBottom:"10px"}}>
        </TextField>

        <TextField
             label="Enter Rate" value={rate} onChange={(event)=>setRate(event.target.value)}required
             error={!!formErrors.RateError} helperText={formErrors.RateError}
             style={{marginBottom:"10px"}}>
        </TextField>

<div className="form-group" class="col-8">

            <input style={{width:"460px",height:"50px",marginLeft:"1%"}}
              type="date"
              name="date"
              value={date}
              className="form-control"
              id="date"
              onChange={(event) => setDate(event.target.value)}/>
              {/* {
                formErrors.DateError && <div style={{color: "red", fontFamily: "Arial"  }}>{formErrors.DateError}</div>
              } */}
            </div>

{/* <Date label="Select Date" value={date} onChange={(event)=>setRate(event.target.value)}required ></Date> */}
<div style={{display:"flex",justifyContent:"space-between"}}>
          <Button onClick ={handleSubmit} type="submit" variant="contained" color="primary" fullWidth >Submit</Button>
          </div>
          <div style={{marginTop:"5%"}}>
            <Link to="/Admin_index"><Button type="button"variant="contained" color="secondary" fullWidth>Cancel</Button></Link>
        
        </div>

        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
  <DialogTitle>Success!</DialogTitle>
  <DialogContent autoHideDuration={10000}>
    <p>Currency Details Saved !!!!!!!!!</p>
  </DialogContent>
  <DialogActions>
    <Button onClick={() => setDialogOpen(false)}>OK</Button>
  </DialogActions>
</Dialog>

</form>
</Paper>
</Grid>







</>);



}
export default AddCurrency;