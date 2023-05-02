import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {TextField,Button,MenuItem, Grid, Paper, Avatar, Dialog, DialogTitle, DialogContent,DialogContentText,DialogActions} from '@mui/material';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import Subheader from './Subheader';
import Footer from './Footer';
import { Link } from "react-router-dom";
import UserHeader from './UserHeader';
const config = require("./Config");

const user = JSON.parse(localStorage.getItem("mytoken"));
function SaveUserBankDetails()
{
    
     const[name,setName]=useState(""); 
     const[bankName,setBankName]=useState(""); 
     const[accountNumber,setAccountNumber]=useState("");
     const[ifscCode,setIfscCode]=useState("");
     
     const[contactNumber,setContactNumber]=useState("");
     const [formErrors, setFormErrors] = useState({});
     
     const [dialogOpen, setDialogOpen] = useState(false);
     const [dialogMessage, setDialogMessage] = useState('');
   
     const [message, setMessage] = useState("");
     const user = JSON.parse(localStorage.getItem("mytoken"))

     const handleSubmit = (event) => {

        event.preventDefault();
        let errors = {};


        if (!name) {
            errors['NameError'] = "Name is required."
        }
        if (!accountNumber) {
            errors['AccountNumberError'] = "Account Number is required."
          } else if (!/^[0-9]+$/.test(accountNumber)) {
            errors['AccountNumberError'] = "Account Number can only contain numbers."
          }
       
        if (!ifscCode) {
            
        errors['IFSCCodeError'] = "IFSC Code is required."
        } else if (!/^[A-Za-z]{2}/.test(ifscCode)) {
            errors['IFSCCodeError'] = "IFSC Code must start with a 4-character alphabetic code followed by a 6-digit number."
          }
        if (!bankName) {
            errors['bankNameError'] = "Bank Name is required."
        } 
        if (!contactNumber) {
            errors['contactNumberError'] = "Contact Number is requred."
        }
       


        setFormErrors(errors);
        const noErrors = Object.keys(errors).length === 0;
        // if no errors then  call the api
        if (noErrors) {

            const payload = {
               accountHolderName:name,
               accountNumber:accountNumber,
                bankName: bankName,
                ifscCode:ifscCode,
                contactnumber:contactNumber,
                userId:user.usersId,
              
               
               

            }
            
            axios.post(config.saveUserBankDetailsUrl, payload)
        .then(resp => {
          setDialogMessage("Bank Details Saved: " + resp.data.id);
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
       <div>
        <UserHeader></UserHeader>
       </div>
           <Grid>
         <Paper elevation={10} style={{padding : "20px",
          height: "110vh",width: "500px",margin: "20px auto"}}>
         <Grid align='center'>
          <Avatar style={avatarStyle}><AccountBalanceIcon /></Avatar>
           <h2>Bank Details</h2></Grid>  
         <form  style={{ display:"flex" ,flexDirection:"column",minWidth:"400px",maxWidth:"600px",height:"150px"}}>
        

         
       
         
          <TextField
             label="Account Holder Name" value={name} onChange={(event)=>setName(event.target.value)}required
             error={!!formErrors.NameError} helperText={formErrors.NameError}
             style={{marginBottom:"10px"}}>
        </TextField>
       
          
          <TextField
             label="Bank Name " value={bankName} onChange={(event)=>setBankName(event.target.value)}required
             error={!!formErrors.bankNameError} helperText={formErrors.bankNameError}
             style={{marginBottom:"10px"}}></TextField>
          
          <TextField
             label=" Sender Account  Number " value={accountNumber} onChange={(event)=>setAccountNumber(event.target.value)}required
             error={!!formErrors.AccountNumberError} helperText={formErrors.AccountNumberError}
             style={{marginBottom:"10px"}}></TextField>
          
          <TextField
             label="IFSC Code " value={ifscCode} onChange={(event)=>setIfscCode(event.target.value)}required
             error={!!formErrors.IFSCCodeError} helperText={formErrors.IFSCCodeError}
             style={{marginBottom:"10px"}}></TextField>

              <TextField
             label="Contact Number" value={contactNumber} onChange={(event)=>setContactNumber(event.target.value)} 
             error={!!formErrors.contactNumberError} helperText={formErrors.contactNumberError}
             style={{marginBottom:"10px"}} required></TextField>
           
          
           
           
          
          <div style={{display:"flex",justifyContent:"space-between"}}>
          <Button onClick ={handleSubmit} type="submit" variant="contained" color="primary" fullWidth >Submit</Button>
          </div>
          <div style={{marginTop:"5%"}}>
            <Link to="/UserHeader"><Button type="button"variant="contained" color="secondary" fullWidth>Cancel</Button></Link>
        
        </div>
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>
  <DialogTitle>Success!</DialogTitle>
  <DialogContent>  
    <p>Bank Details Saved !!!!!!!!!</p>
  </DialogContent>
  <DialogActions>
  <Link to="/SaveUserBankDetails"><Button onClick={() => setDialogOpen(false) }>OK</Button> </Link>
  </DialogActions>
</Dialog>
       
         </form>
         </Paper>
         </Grid>
         </>
       
  
);

}
export default SaveUserBankDetails;