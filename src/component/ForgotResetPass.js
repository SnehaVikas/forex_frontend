import React, { useEffect, useState } from "react";
import axios from "axios";
import { Checkbox, TextField, Button, Grid, Paper, Avatar, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Swal from 'sweetalert2';

import { Link } from "react-router-dom";
function ForgotResetPass() {

  const [email, setEmail] = useState("");
  const [newPassword, setnewPassword] = useState("");
  const [confirmPassword, setconfirmPassword] = useState("");

  const [formErrors, setFormErrors] = useState({});
  const [message, setMessage] = useState("");
  const [users, setUsers] = useState(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);
  // const [dialogOpen, setDialogOpen] = useState(false);
  // const [dialogMessage, setDialogMessage] = useState('');


  const paperStyle = { padding: 20, height: '70vh', width: 280, margin: "20px auto" }
  const avatarStyle = { backgroundColor: '#1bbd7e' }
  //Handling the submit button

  const validatedata = (key, value) => {


    formErrors[key] = !value;
    //console.log(formErrors[key], value);
    if (key.toLowerCase().includes("email")) formErrors['invalidMail']
        = (value && (!/\S+@\S+\.\S+/.test(value)));
    if (key.toLowerCase().includes("password")) formErrors['invalidpassword']
        = (value && (value.length < 5));
    if (key.toLowerCase().includes("newPassword")) formErrors['invalidnewPassword']
        = (value && (value.length < 5));


}

const handleSubmit = (e, value) => {
    e.preventDefault();
    let temp = {};


    temp['emailError'] = !email;
    temp['invalidMail'] = (email && (!/\S+@\S+\.\S+/.test(email)));
    temp['newPasswordError'] = !newPassword
    temp['confirmPasswordError'] = !confirmPassword
    //temp['invalidpassword']=(password && (value.length<8));


    // console.log(temp);
    setFormErrors(temp);

    const noErrors = Object.keys(formErrors).filter(x => formErrors[x] === true).length === 0;
    // debugger;
    if (noErrors) {

        const payload = {
            email: email,
            newPassword: newPassword,
            confirmPassword: confirmPassword

        }
        
        axios
            .put(`http://localhost:8081/forgotpassword/resetpassword?email=${email}&newPassword=${newPassword}&confirmPassword=${confirmPassword}`, payload)
            .then(resp => {
                setUsers(resp.data);
                const obj = {
                    email: resp.data.email,
                    newPassword: resp.data.newPassword,
                    confirmPassword: resp.data.confirmPassword,

                }
                Swal.fire({
                  title: 'Do you want to save the changes?',
                  showDenyButton: true,
                  showCancelButton: true,
                  confirmButtonText: 'Save',
                  denyButtonText: `Don't save`,
                }).then((result) => {
                  /* Read more about isConfirmed, isDenied below */
                  if (result.isConfirmed) {
                    Swal.fire('Password Reset Sucessfully!', '', 'success')
                  } else if (result.isDenied) {
                    Swal.fire('Changes are not saved', '', 'info')
                  }
                })

                localStorage.setItem('mytoken', JSON.stringify(obj));

                // alert('Password reset Successfully');

                setMessage(resp.data);

                //         // navigate('/');
            })
            .catch((error) => {
                Swal.fire('password reset failed!!!!!');

                setMessage(error.reponse.data);

            });

    }
    else {
        Swal.fire("form contains Invalid data");
    }
}



const handleCloseDialog = () => {
    setOpenDialog(false);
};

return (
  //  <Container maxWidth="sm" style={{display:'flex',justifyContent:"center",alignItems:"center",height:"100vh"}}>
  <Grid>
    <Paper elevation={10} style={{
      paperStyle, padding: "20px",
      height: "84vh", width: "387px", margin: "20px auto"
    }}>
      <Grid align='center'>
        <Avatar style={avatarStyle}><LockOpenIcon /></Avatar>
        <h2>Reset Password</h2></Grid>
      <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", minWidth: "285px", maxWidth: "150px", height: "150px" }}>


        <div style={{ display: "flex", flexDirection: "row", width: "69%px", marginLeft: "53px", marginRight: "8px" }}>
          <TextField
            label="email" value={email} onChange={(event) => { setEmail(event.target.value); validatedata("emailError", event.target.value) }}


            error={formErrors.emailError || formErrors.invalidMail}

            helperText={formErrors.emailError ? "Email is required" : (formErrors.invalidMail ? "Email is invalid" : "")} required
            style={{ marginBottom: "10px", width: "400px", marginRight: "4px", marginLeft: "-35" }}></TextField>

        </div>
        <div style={{ display: "flex", flexDirection: "row", width: "96%" }}>


          <TextField
            label="newPassword" value={newPassword} type="password" onChange={(event) => { setnewPassword(event.target.value); validatedata("newPasswordError", event.target.value) }}


            error={formErrors.newPasswordError}

            helperText={formErrors.newPasswordError ? "newPassword is required" : (formErrors.invalidnewPassword ? "Password must have a minimum 5 characters" : "")} required
            style={{ marginBottom: "10px", width: "400px", marginLeft: "55px" }}></TextField>


        </div>
        <div style={{ display: "flex", flexDirection: "row", width: "96%" }}>


          <TextField
            label="Confirm Password" value={confirmPassword} type="password" onChange={(event) => { setconfirmPassword(event.target.value); validatedata("confirmPasswordError", event.target.value) }}


            error={formErrors.confirmPasswordError}

            helperText={formErrors.confirmPasswordError ? "confirmPassword is required" : (formErrors.invalidconfirmPassword ? "Password must have a minimum 5 characters" : "")} required
            style={{ marginBottom: "10px", width: "400px", marginLeft: "55px" }}></TextField>


        </div>
        
        <div style={{ paddingLeft: "56px", marginRight: "-34px" }}>
          
        </div>


        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <Button onClick={handleSubmit} variant="contained" color="primary" style={{ marginLeft: "75px", marginTop: "42px", paddingLeft: "22px", paddingRight: "18px", paddingTop: "8px", paddingBottom: "gpx" }}>Submit</Button>
          <Link to="/signIn"><Button type="button" variant="contained" color="secondary" style={{ marginLeft: "56x", marginTop: "43px" }} >Cancel</Button></Link>

        </div>
      </form>
      {/* </Container>   */}
    </Paper>
  </Grid>
);

}
export default ForgotResetPass;