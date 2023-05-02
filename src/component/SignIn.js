import React, { useEffect, useState } from "react";
import axios from "axios";
import { Checkbox, TextField, Button, Grid, Paper, Avatar, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';

import { Link } from "react-router-dom";
import UserHeader2 from "./UserHeader2";
import Footer from "./Footer";
function SignIn() {

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [formErrors, setFormErrors] = useState({});
  const [msg, setMsg] = useState("");
  const [users, setUsers] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  // const [dialogOpen, setDialogOpen] = useState(false);
  // const [dialogMessage, setDialogMessage] = useState('');


  const paperStyle = { padding: 20, height: '70vh', width: 280, margin: "20px auto" }
  const avatarStyle = { backgroundColor: '#1bbd7e' }
  //Handling the submit button
  const handleSubmit = () => {
    let errors = {};



    if (!email) {
      errors['emailError'] = "Please Enter Valid Email"
    }

    if (!password) {
      errors['passwordError'] = "Password  minimum length should be 8"
    }


    setFormErrors(errors);

    const noErrors = Object.keys(errors).length === 0;


    if (noErrors) {
      const payload = {



        email: email,
        password: password



      }
      //  call the api to save the vitals
      axios
        .post("http://localhost:8081/auth/login", payload)
        .then(resp => {
          setUsers(resp.data);

          const obj = {


            email: resp.data.email,
            usersId: resp.data.usersId,
          };

          setDialogMessage(": " + resp.data.id);

          setDialogOpen(true);
          localStorage.setItem("mytoken", JSON.stringify(obj));
          // alert("Login success");
        })
        .catch(error => {
          // handle error
          alert("login failed");

          // setMsg(error.response.data);

        });
    
  };


}
const handleCloseDialog = () => {
  setOpenDialog(false);
};

return (
 <>
 <div><UserHeader2></UserHeader2>
 <Footer></Footer>
 </div>

  <Grid>
    <Paper elevation={10} style={{
      paperStyle, padding: "20px",
      height: "75vh", width: "387px", margin: "20px auto"
    }}>
      <Grid align='center'>
        <Avatar style={avatarStyle}><LockOpenIcon /></Avatar>
        <h2>Sign In</h2></Grid>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", minWidth: "285px", maxWidth: "150px", height: "150px" }}>


        <div style={{ display: "flex", flexDirection: "row", width: "69%px", marginLeft: "53px", marginRight: "8px" }}>
          <TextField
            label="email" value={email} onChange={(event) => setEmail(event.target.value)} required
            error={!!formErrors.emailError} helperText={formErrors.emailError}
            style={{ marginBottom: "10px", width: "400px", marginRight: "4px", marginLeft: "-35" }}></TextField>

        </div>
      
        <div style={{ display: "flex", flexDirection: "row", width: "96%" }}>


          <TextField
            label="Password" value={password} type="password" onChange={(event) => setPassword(event.target.value)} required
            error={!!formErrors.passwordError} helperText={formErrors.passwordError}
            style={{ marginBottom: "10px", width: "400px", marginLeft: "55px" }}></TextField>


        </div>
        
        <div style={{ paddingLeft: "56px", marginRight: "-34px" }}>
          <Link to="/reset" >
            Reset Password ?
          </Link><br></br>
          <Link to="/forgotPassFirst" >
            Forgot Password ?
          </Link><br></br>
          Do you have an account ?
          <Link to="/signUp" >
            Sign Up
          </Link><br></br>
        
        </div>


        <div style={{ display: "flex", justifyContent: "space-between" }}>
        <Button onClick={handleSubmit} variant="contained" color="primary" style={{ marginLeft: "75px", marginTop: "42px", paddingLeft: "22px", paddingRight: "18px", paddingTop: "8px", paddingBottom: "gpx" }}>SignIn</Button>
          <Link to="/"><Button type="button" variant="contained" color="secondary" style={{ marginLeft: "56x", marginTop: "43px" }} >Cancel</Button></Link>

        </div>
        <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>

          <DialogTitle>Success!</DialogTitle>

          <DialogContent>

            <p>Login Sucessfully !!!!!!!!!</p>

          </DialogContent>

          <DialogActions>

          <Link to="/UserHeader"> <Button onClick={() => setDialogOpen(false)}>OK</Button></Link>

          </DialogActions>

        </Dialog>
      </form>
  
    </Paper>
  </Grid>
  </>
);

}
export default SignIn;