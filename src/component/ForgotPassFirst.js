
import React, { useEffect, useState } from 'react';
import axios from "axios";
import {TextField,Button,MenuItem, Grid, Paper, Avatar} from '@mui/material';
import LockResetIcon from '@mui/icons-material/LockReset';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import UserHeader2 from './UserHeader2';
import Footer from './Footer';
import UserHeader3 from './UserHeader3';

  const avatarStyle = { backgroundColor: '#1bbd7e' }


function ForgotPassFirst() {
 
  const [values, setValues] = useState({
    userName: "",
   
  });
  const [errors, setErrors] = useState({});
  const [isSubmit, setIsSubmit] = useState(false);
  const [bool,setBool]=useState(false);
  const [emailError,setEmailError]=useState();
  const [dispSuccess,setDispSuccess]=useState();
  const [disSuccess,setDisSuccess]=useState(false)
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  
  
  const handleSubmit = (event) => {
    event.preventDefault();
    setErrors(validate(values));
    setIsSubmit(true);
    const errors = validate(values);
    console.log(values);
   
      axios
      .post(`http://localhost:8081/auth/sendEmail/${values.userName}`)
      .then((response)=>{
      console.log(response.data);
      setDispSuccess(response.data);
      setDisSuccess(!disSuccess);
     


      window.location.href = `/verify/${values.userName}`;
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
    const nameRegex=/^[a-zA-Z]{3,20}$/;
    if (!values.userName) {
     // errors.userName ="email is required";
     setEmailError("email is required");
    }
    return errors;
  };
  const validateEmail = (email) => {
    // email validation regex
    const re = /\S+@\S+\.\S+/;
    if (!email) {
     
      setEmailError('email is required');
    } else if(!re.test(email)) {
           setEmailError('Invalid email format')
    }else{
      //errors.userName=('');
      setEmailError('')
      setBool(true)
    }
    if(bool){
      axios
      .get(`http://localhost:8081/forex/auth/verifyEmail/${email}`)
      .then((response)=>{
       setEmailError(response.data);
       })
     .catch((err)=>{

      console.log(err.message)
      alert(err.message);
    })

    }
  };

  const handleEmailChange = (e) => {
    setValues(prevValues => ({
      ...prevValues,
      userName: (e.target.value)
    }));
    validateEmail(e.target.value);
  };

  

    
   

  return (
    <>
    <div><UserHeader3></UserHeader3>
 <Footer></Footer>
 </div>
    <Grid style={{marginTop:"10%"}}>
    <Paper elevation={10} style={{padding : "20px",
 height: "60vh",width: "500px",margin: "20px auto"}}>
<Grid align='center'>
<Avatar style={avatarStyle}><LockResetIcon/></Avatar>
<h2>Forgot password </h2></Grid> 
<form  style={{ display:"flex" , flexDirection:"column",minWidth:"400px",maxWidth:"600px",height:"150px"}}>

   <div style={{marginTop:"5%"}}>
          <TextField
          id="userName"
          label="Registered Email"
          type="email"
          value={values.userName}
          onChange={handleEmailChange}
          error={!!emailError}
          helperText={emailError}
          autoComplete="off"
        />
     
     </div>
    
      <div>
      <div style={{display:"flex",marginTop:"5%" ,justifyContent:"space-between"}}>
        <Button onClick ={handleSubmit} type="submit" variant="contained" color="primary" fullWidth >Submit</Button> 
      
          </div>
          <div  style={{marginTop:"5%"}}>
        <h6><a href="/signin" >go back to login!</a></h6>
        </div>
        </div>
        {/* </div> */}
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

      {/* </div>  */}
      </form>
      </Paper>
      </Grid>
      </>
       )
      }
      
      export default ForgotPassFirst;