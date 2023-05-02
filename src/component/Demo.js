import React, { useEffect, useState }  from "react";
import axios from "axios";
import {TextField,Button, MenuItem, Grid,Paper,Avatar,Dialog, DialogTitle, DialogContent,DialogContentText,DialogActions} from '@mui/material';
import CurrencyExchangeIcon from '@mui/icons-material/CurrencyExchange';
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
import UserHeader from "./UserHeader";

const config = require('./Config');

function SaveTransaction(){
    const [fromCountry, setFromCountry] = useState("");
    const [toCountry, setToCountry] = useState("");
    const [senderName, setSenderName] = useState("");
    const [receiverName, setReceiverName] = useState("");
    const [senderAccNo, setSenderAccNo] = useState("");
    const [receiverAccNo,setReceiverAccNo] =useState("");
    const [sendingCurrency,setSendingCurrency] = useState("");
    const [receivingCurrency,setReceivingCurrency] = useState("");
    const [sendingAmount,setSendingAmount] = useState("");
     const [transactionDate,setTransactionDate] = useState(new Date());
   
    const [fromCountryError,setFromCountryError] = useState("");
    const [toCountryError,setToCountryError] = useState("");
    const [senderNameError,setSenderNameError] = useState("");
    const [receiverNameError, setReceiverNameError] = useState("");
    const [senderAccNoError, setSenderAccNoError] = useState("");
    const [receiverAccNoError,setReceiverAccNoError] =useState("");
    const [sendingAmountError,setSendingAmountError]=useState("");
    
   

    useEffect(()=>{
        //update the selcted Country value based on selected country value for "From country"
        if(fromCountry === 'USA'){
          setSendingCurrency("USD");
        }
        else if(fromCountry === 'India'){
          setSendingCurrency("INR");
        }
        else if(fromCountry === 'UAE'){
           setSendingCurrency("AED");
        }
        else if(fromCountry === 'EUR'){
          setSendingCurrency("EUR");
        }
        else if(fromCountry === 'Bangladesh'){
          setSendingCurrency("BDT");
        }
        else if(fromCountry === 'UK'){
          setSendingCurrency("GBP");
        }
        else if(fromCountry === 'Bahrain'){
          setSendingCurrency("BHD");
        }
      },[fromCountry]);


      useEffect(()=>{
        //update the selected Country value based on selected country value for "To country"
        if(toCountry === 'USA'){
          setReceivingCurrency("USD");
        }
        else if(toCountry === 'India'){
           setReceivingCurrency("INR");
        }
        else if(toCountry === 'UAE'){
           setReceivingCurrency("AED");
        }
        else if(toCountry === 'EUR'){
           setReceivingCurrency("EUR");
        }
        else if(toCountry === 'Bangladesh'){
          setReceivingCurrency("BDT");
        }
        else if(toCountry === 'UK'){
          setReceivingCurrency("GBP");
        }
        else if(toCountry === 'Bahrain'){
          setReceivingCurrency("BHD");
        }
      },[toCountry]);
     
      const paperStyle = { padding: 20, height: '100vh', width: 280, margin: "20px auto"}
      const avatarStyle = { backgroundColor: '#1bbd7e' }


    
    

    //Handling the submit button
    const handleSubmit = async(event) => {
        event.preventDefault();
        let formValid = true;
        // check for the empty fields
    if (fromCountry === '') {
      setFromCountryError('Please enter From Country');
      formValid = false;
    } else {
      setFromCountryError('');
    }
    if (toCountry === '') {
      setToCountryError('Please enter To Country');
      formValid = false;
    } else {
      setToCountryError('');
    }
    if (senderName === '') {
      setSenderNameError('Please enter Sender Name');
      formValid = false;
    } else {
      setSenderNameError('');
    }
    if (receiverName === '') {
      setReceiverNameError('Enter Receiver Name');
      formValid = false;
    } else {
      setReceiverNameError('');
    }
    if (senderAccNo === '') {
      setSenderAccNoError('Please enter Sender Account No');
      formValid = false;
    } else {
      setSenderAccNoError('');
    }
    if (receiverAccNo === '') {
      setReceiverAccNoError('Enter Receiver AccountNo');
      formValid = false;
    } else {
      setReceiverAccNoError('');
    }
    if (sendingAmount === '') {
      setSendingAmountError('Please enter Sending Amount');
      formValid = false;
    } else if(sendingAmount <=0){
      setSendingAmountError('Sending amount should be greater than 0');
      formValid = false;
    }
    else {
      setReceiverNameError('');
    }
    if (formValid) {
        const payload = {
          
          fromCountry : fromCountry,
          toCountry: toCountry,
          senderName : senderName,
          receiverName: receiverName,
          senderAccNo: senderAccNo,
          receiverAccNo: receiverAccNo,
          sendingCurrency: sendingCurrency,
          receivingCurrency: receivingCurrency,
          sendingAmount: sendingAmount,
          transactionDate: transactionDate,
        };
        Swal.fire({
          title: 'Do you want to proceed?',
          showDenyButton: true,
          showCancelButton: true,
          confirmButtonText: 'Yes',
          denyButtonText: `No`,
        }).then((result) => {
          if (result.isConfirmed) {
            axios.post(config.addTransactionUrl, payload)
              .then((resp) => {
                Swal.fire('Sent!', `Transaction is successful`, 'success');
              })
              .catch(error => {
                console.log(error.response);
                Swal.fire({
                  icon: 'error',
                  title: error.response.data,
                  text: error.message,
                });
              });
          } else if (result.isDenied) {
            Swal.fire('Changes are not saved', '', 'info');
          }
        })
        
        .catch(error => {
          console.log(error.response);
          if (error.response.status === 404) {
            setSenderAccNoError("Sender Acc No. does not exist");
          }
          Swal.fire({
            icon: 'error',
            title: 'Transaction Failed',
            text: error.message || "An error occurred",
          });
        });
               
              } 
            }         
                   
    
    return(
      <>
      <div>
       <UserHeader></UserHeader>
      </div>
       <Grid>
        <Paper elevation={10} style={{paperStyle,padding : "20px",
          height: "120vh",width: "568px",margin: "20px auto"}}>
           <Grid align='center'>
         <Avatar style={avatarStyle}><CurrencyExchangeIcon/></Avatar>
          <h2>Transaction Details</h2></Grid> 
          <form  style={{display:"flex",flexDirection:"column",minWidth:"150px",maxWidth:"200px",height:"150px"}}>
          <div style={{display:"flex",flexDirection:"row"}}>
            <div>
            <TextField
            label="From Country" value={fromCountry} onChange={(event) => {setFromCountry(event.target.value);
            
            if (event.target.value === "") {
              setFromCountryError("Please enter from country.");
            } else {
              setFromCountryError("");
            }
          }}
            required
            select
            style={{marginBottom:"10px",width:"240px",marginRight:"-32px"}}
            >
               <MenuItem value="EUR">EUR</MenuItem>
                <MenuItem value="USA">USA</MenuItem>
                <MenuItem value="UK">UK</MenuItem>
                <MenuItem value="Bahrain">Bahrain</MenuItem>
                <MenuItem value="UAE">UAE</MenuItem>
                <MenuItem value="Bangladesh">Bangladesh</MenuItem>
                <MenuItem value="India">India</MenuItem>
                
            </TextField>
            {
                  fromCountryError && <div style={{ color: "red" }}>{fromCountryError}</div>
           }   
          </div>
        <div>
        <TextField
            label="To Country" value={toCountry} onChange={(event) => {setToCountry(event.target.value);
            
            if (event.target.value === "") {
              setToCountryError("Please enter to country.");
            } else {
              setToCountryError("");
            }
          }}
            required
            select
            style={{marginBottom:"10px",width:"240px",marginLeft:"50px"}}>
            <MenuItem value="EUR" disabled={fromCountry==="EUR"}>EUR</MenuItem>
            <MenuItem value="USA"disabled={fromCountry ==="USA"}>USA</MenuItem>
            <MenuItem value="UK"disabled={fromCountry ==="UK"}>UK</MenuItem>
            <MenuItem value="Bahrain"disabled={fromCountry ==="Bahrain"}>Bahrain</MenuItem>
            <MenuItem value="UAE"disabled={fromCountry ==="UAE"}>UAE</MenuItem>
            <MenuItem value="Bangladesh"disabled={fromCountry ==="Bangladesh"}>Bangladesh</MenuItem>
            <MenuItem value="India"disabled={fromCountry ==="India"}>India</MenuItem>
            </TextField>
           
          {
                  toCountryError && <div style={{ color: "red" }}>{toCountryError}</div>
           } 
           </div>  
         </div> 
         <div style={{display:"flex",flexDirection:"row"}}>
          <div>
        <TextField
           label="Sender Name" value={senderName}  onChange={(event) => {setSenderName(event.target.value);
            if (event.target.value === "") {
              setSenderNameError("Please enter Sender Name.");
            } else {
              setSenderNameError("");
            }
          }}
           required
           
           style={{marginBottom:"10px",width:"240px",marginRight:"-32px"}}>
            
           </TextField>
           
           {
                  senderNameError && <div style={{ color: "red" }}>{senderNameError}</div>
           }
          </div>
         <div>   
        <TextField
           label="Receiver Name" value={receiverName} onChange={(event) => {setReceiverName(event.target.value);
            if (event.target.value === "") {
              setReceiverNameError("Please enter receiver name.");
            } else {
              setReceiverNameError("");
            }
          }}
           required
         
           style={{marginBottom:"10px",width:"240px",marginLeft:"50px"}}></TextField>
          {
                  receiverNameError && <div style={{ color: "red" }}>{receiverNameError}</div>
           } 
          </div>     
         </div>  
         <div style={{display:"flex",flexDirection:"row"}}>
          <div>
        <TextField
           label="Sender Acc No" value={senderAccNo} onChange={(event) => {setSenderAccNo(event.target.value);
            if (event.target.value === "") {
              setSenderAccNoError("Please enter Sender Account No.");
            } else {
              setSenderAccNoError("");
            }
          }} required
           style={{marginBottom:"10px",width:"240px",marginRight:"-32px"}}></TextField>
         {
                  senderAccNoError && <div style={{ color: "red" }}>{senderAccNoError}</div>
        }
        </div>
        <div>  
        <TextField
           label="Receiver Acc No" value={receiverAccNo} onChange={(event) => {setReceiverAccNo(event.target.value);
            if (event.target.value === "") {
              setReceiverAccNoError("Please enter Receiver AccountNo.");
            } else {
              setReceiverAccNoError("");
            }
          }}
           required
          
           style={{marginBottom:"10px",width:"240px",marginLeft:"50px"}}></TextField>
            {
                  receiverAccNoError && <div style={{ color: "red" }}>{receiverAccNoError}</div>
           } 
        </div>   
         </div>  
         <div style={{display:"flex",flexDirection:"row"}}> 
         <div>
         <TextField
           label="Sending Currency" value={sendingCurrency}disabled={!fromCountry} onChange={(event)=>setSendingCurrency(event.target.value)}
           select
           required
           
           style={{marginBottom:"10px",width:"240px",marginRight:"-32px"}}>
             <MenuItem value="EUR">EUR</MenuItem>
             <MenuItem value="USD">USD</MenuItem>
            <MenuItem value="GBP">GBP</MenuItem>
            <MenuItem value="BHD">BHD</MenuItem>
            <MenuItem value="AED">AED</MenuItem>
            <MenuItem value="BDT">BDT</MenuItem>
            <MenuItem value="INR">INR</MenuItem>
           </TextField>
          </div>
          <div>
         <TextField
           label="Receiving Currency" value={receivingCurrency} disabled={!fromCountry}onChange={(event)=>setReceivingCurrency(event.target.value)}
           select
           required
          
           style={{marginBottom:"10px",width:"240px",marginLeft:"50px"}}>
            <MenuItem value="EUR">EUR</MenuItem>
            <MenuItem value="USD">USD</MenuItem>
            <MenuItem value="GBP">GBP</MenuItem>
            <MenuItem value="BHD">BHD</MenuItem>
            <MenuItem value="AED">AED</MenuItem>
            <MenuItem value="BDT">BDT</MenuItem>
            <MenuItem value="INR">INR</MenuItem>
           </TextField>
           </div>  
         </div>
         <div style={{display:"flex",flexDirection:"row",height:'100px'}}>
          <div>
         <TextField
           label="Sending Amount" value={sendingAmount} onChange={(event) => {setSendingAmount(event.target.value);
            if (event.target.value === "") {
              setSendingAmountError("Please enter Sending Amount.");
            } else if(event.target.value <=0){
              setSendingAmountError("Sending Amount should be greater than 0")
            }
             else {
              setSendingAmountError("");
            }
          }}
            required
          
           style={{marginBottom:"10px",width:"240px",marginRight:"-32px"}}><br/>

          </TextField>

          {
                  sendingAmountError && <div style={{ color: "red" }}>{sendingAmountError}</div>
           }
          </div>
          <div style={{marginTop:'-22px'}}>   
          <label htmlFor="transactionDate"></label><br />
          <input type="date" id="transactionDate" value={transactionDate.toISOString().substr(0,10)}
            min={transactionDate.toISOString().substr(0,10)}
            max={transactionDate.toISOString().substr(0,10)}
           onChange={(event) => setTransactionDate(new Date(event.target.value))}
           title="Only today's date can be selected"
           style={{marginBottom:"10px",width:"240px",marginLeft:"50px",height:'54px'}}
          /><br></br>
         </div> 
         </div> 
        <div style={{display:'flex',justifyContent:'space-between'}}> 
        <Button onClick ={handleSubmit} type="submit" variant="contained" color="primary"style={{marginLeft:"150px"}} >Send</Button>
        <Link to="/UserHeader"><Button type="button" variant="contained" color="secondary"style={{marginLeft:"50px"}} >Cancel</Button></Link>
        </div>
        
        
        
          </form>
        </Paper>
       </Grid>
   </>    
    );            

}
export default SaveTransaction;