import React, { useEffect, useState } from "react";
import axios from "axios";
import { Checkbox, TextField, Button, Grid, Paper, Avatar, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import LockOpenIcon from '@mui/icons-material/LockOpen';
import Swal from 'sweetalert2';
import { Link } from "react-router-dom";
import UserHeader2 from "./UserHeader2";
import Footer from "./Footer";
import UserHeader3 from "./UserHeader3";
function ResetPass() {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newPassword, setnewPassword] = useState("");

    const [formErrors, setFormErrors] = useState({});
    
    const [users, setUsers] = useState(null);
    const [openDialog, setOpenDialog] = useState(false);
    const [dialogMessage, setDialogMessage] = useState("");
    const [dialogOpen, setDialogOpen] = useState(false);
    const [msg, setMessage] = useState("");
    const paperStyle = { padding: 20, height: '70vh', width: 280, margin: "20px auto" }
    const avatarStyle = { backgroundColor: '#1bbd7e' }
    //Handling the submit button

    const validatedata = (key, value) => {


        formErrors[key] = !value;
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
        temp['passwordError'] = !password;
        temp['newPasswordError'] = !newPassword
        
        setFormErrors(temp);

        const noErrors = Object.keys(formErrors).filter(x => formErrors[x] === true).length === 0;
        
        if (noErrors) {

            const payload = {
                email: email,

                password: password,
                newPassword: newPassword

            }
            
            axios
                .put(`http://localhost:8081/resetpassword?email=${email}&password=${password}&newPassword=${newPassword}`, payload)
                .then(resp => {
                    setUsers(resp.data);
                    const obj = {
                        email: resp.data.email,
                        password: resp.data.password,
                        newPassword: resp.data.newPassword

                    }
                    Swal.fire({
                        title: 'Do you want to reset the password?',
                        showDenyButton: true,
                        showCancelButton: true,
                        confirmButtonText: 'reset',
                        denyButtonText: `Don't reset`,
                      }).then((result) => {
                        
                        if (result.isConfirmed) {
                          Swal.fire('done!', '', 'success')
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
        <>
        <div>
            <UserHeader3></UserHeader3>
            <Footer></Footer>
        </div>
        <Grid>
            <Paper elevation={10} style={{
                paperStyle, padding: "20px",
                height: "75vh", width: "387px", margin: "20px auto"
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
                            label="Password" value={password} type="password" onChange={(event) => { setPassword(event.target.value); validatedata("passwordError", event.target.value) }}


                            error={formErrors.passwordError}

                            helperText={formErrors.passwordError ? "password is required" : (formErrors.invalidpassword ? "Password must have a minimum 5 characters" : "")} required

                            style={{ marginBottom: "10px", width: "400px", marginLeft: "55px" }}></TextField>


                    </div>
                    <div style={{ display: "flex", flexDirection: "row", width: "96%" }}>


                        <TextField
                            label="New Password" value={newPassword} type="password" onChange={(event) => { setnewPassword(event.target.value); validatedata("newPasswordError", event.target.value) }}


                            error={formErrors.newPasswordError}

                            helperText={formErrors.newPasswordError ? "newPassword is required" : (formErrors.invalidnewPassword ? "Password must have a minimum 5 characters" : "")} required
                            style={{ marginBottom: "10px", width: "400px", marginLeft: "55px" }}></TextField>


                    </div>

                    <div style={{ paddingLeft: "56px", marginRight: "-34px" }}>
                    </div>


                    <div style={{ display: "flex", justifyContent: "space-between" }}>
                        <Button onClick={handleSubmit} variant="contained" color="primary" style={{ marginLeft: "75px", marginTop: "42px", paddingLeft: "22px", paddingRight: "18px", paddingTop: "8px", paddingBottom: "gpx" }}>Submit</Button>
                        <Link to='/signin'><Button type="button" variant="contained" color="secondary" style={{ marginLeft: "56x", marginTop: "43px" }} >Cancel</Button></Link>

                    </div>
                    
                </form>
            </Paper>
        </Grid>
        </>
    );

}
export default ResetPass;