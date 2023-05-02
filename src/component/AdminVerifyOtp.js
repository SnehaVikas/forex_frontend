import React, { useEffect, useState } from 'react';
import axios from "axios";
import {TextField,Button,MenuItem, Grid, Paper, Avatar} from '@mui/material';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import { Link, useParams } from "react-router-dom";
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';




  const avatarStyle = { backgroundColor: '#1bbd7e' }


function AdminVerifyOtp() {
 
  const { adminEmail} = useParams();
  console.log(adminEmail);
  const [values, setValues] = useState({
    adminEmail:adminEmail,
    otp:"",
   
  });
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [bool,setBool]=useState(false);
  const [emailError,setEmailError]=useState();
  const [dispSuccess,setDispSuccess]=useState();
  const [otpError,setOtpError]=useState();
  const [disSuccess,setDisSuccess]=useState(false)
  const [openSnackbar, setOpenSnackbar] = useState(false);
const [errorMessage, setErrorMessage] = useState('');


  
  
  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validate(values));
    setIsSubmit(true);
    const errors = validate(values);
    console.log(values);
   
      
      axios.delete(`http://localhost:8081/forex/authen/verify/${values.adminEmail}/${values.otp}`)
      .then((response)=>{
      console.log(response.data);
      setDispSuccess(response.data);
      setDisSuccess(!disSuccess);

      
     window.location.href = '/AdminResetPassword';


       })
     .catch((err)=>{
      console.log(err)
  setErrorMessage(err.response.data);
  setOpenSnackbar(true);
    })
  

  };
  useEffect(() => {
   // console.log(errors);
    if (Object.keys(errors).length === 0 && isSubmit) {
       console.log(errors);
}}, [errors]);

const handleChange = (event) => {
  const { name, value } = event.target;
  setValues({ ...values, [name]: value });
  setErrors({ ...errors, [name]: '' });
  
};

  const validate = (values) => {
    let errors = {};
   
    if (!values.adminEmail) {
    
     setEmailError("email is required");
    }
     if (!values.otp) {
     setOtpError("otp required");
    }
  
    return errors;
  };

  const validateOtp=(otp)=>
  {
     if(!otp){
      setOtpError('otp is required ')
     }
  }
  const validateEmail = (adminEmail) => {
   
    const re = /\S+@\S+\.\S+/;
    if (!adminEmail) {
   
      setEmailError('email is required');
    } else if(!re.test(adminEmail)) {
     
      setEmailError('Invalid email format')
    }else{
     
      setEmailError('')
      setBool(true)
    }
    if(bool){
      axios
    
      .get(`http://localhost:8081/forex/authen/verifyEmail/${adminEmail}`)
      .then((response)=>{
       setEmailError(response.data);
       })
     .catch((err)=>{
      console.log(err.message)
      
    })

    }
  };

  const handleEmailChange = (e) => {
    setValues(prevValues => ({
      ...prevValues,
      adminEmail: (e.target.value)
    }));
    validateEmail(e.target.value);
  };

  

    
  const handleOtpChange = (e) => {
    setValues(prevValues => ({
      ...prevValues,
      otp: (e.target.value)
    }));
  validateOtp(e.target.value);
  };

   


    

  return (
    <>
    <Grid>
    <Paper elevation={10} style={{padding : "20px",
 height: "80vh",width: "500px",margin: "20px auto"}}>
<Grid align='center'>
<Avatar style={avatarStyle}><VerifiedUserIcon /></Avatar>
<h2>Verify Otp </h2></Grid> 
<form  style={{ display:"flex" , flexDirection:"column",minWidth:"400px",maxWidth:"600px",height:"150px"}}>


     <div style={{marginTop:"5%"}}>
          <TextField
          id="otp"
          label="Enter Otp"
          type="password"
          value={values.otp}
          onChange={handleOtpChange}
          error={!!otpError}
          helperText={otpError}
          autoComplete="off"
        />
     
     </div>
    
    
      <div>
      <div style={{display:"flex",marginTop:"5%" ,justifyContent:"space-between"}}>
        <Button onClick ={handleSubmit} type="submit" variant="contained" color="primary" fullWidth >Submit</Button>
          </div>
          <div  style={{marginTop:"5%"}}>
        <h6><a href="/adminsignin" >go back to login!</a></h6>
        </div>
        </div>
       
{
  <Snackbar
  open={disSuccess}
  autoHideDuration={3000}
  onClose={()=>setDisSuccess(!disSuccess)}
  anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
>
  <MuiAlert elevation={6} variant="filled" onClose={()=>setDisSuccess(!disSuccess)} severity="success">
   {dispSuccess}
  </MuiAlert>
</Snackbar>
}


<Snackbar
  open={openSnackbar}
  autoHideDuration={5000}
  onClose={() => setOpenSnackbar(false)}
  anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
>
  <MuiAlert
    elevation={6}
    variant="filled"
    onClose={() => setOpenSnackbar(false)}
    severity="error"
  >
    {errorMessage}
  </MuiAlert>
</Snackbar>







     
      </form>
      </Paper>
      </Grid>
      </>
       )
      }
      
export default AdminVerifyOtp;