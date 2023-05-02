import React, { useEffect, useState } from "react";

import axios from "axios";
import { Checkbox, TextField, Button, Grid, Paper, Avatar, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import HowToRegIcon from '@mui/icons-material/HowToReg';
import FormControlLabel from '@mui/material/FormControlLabel';

import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';

import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';


import { Link } from "react-router-dom";
import UserHeader2 from "./UserHeader2";
import Footer from "./Footer";
function AdminSignUp() {
   const [adminName, setAdminName] = useState("");
   const [adminEmail, setAdminEmail] = useState("");
   const [adminUsername, setAdminUserName] = useState("");
   const [adminPassword, setAdminPassword] = useState("");

  const [dialogMessage, setDialogMessage] = useState("");
  const [dialogOpen, setDialogOpen] = useState(false);

   const [resp, setResp] = useState("");

   const [formErrors, setFormErrors] = useState({});
   const [users, setUsers] = useState(null);


   const paperStyle = { padding: 20, height: '70vh', width: 280, margin: "20px auto" }
   const avatarStyle = { backgroundColor: '#1bbd7e' }
   //Handling the submit button
   const handleSubmit = () => {
      let errors = {};

      if (!adminName) {
         errors['nameError'] = "Name is required."
      }
      if (!adminEmail) {
         errors['email'] = "Email is required"
      }
      if (!adminUsername) {
        errors['userNameError'] = "UserName is required."
     }
     
      if (!adminPassword) {
         errors['passwordError'] = "Password is required"
      }


      setFormErrors(errors);

      const noErrors = Object.keys(errors).length === 0;


      if (noErrors) {
         const payload = {

            adminName:adminName,
            adminEmail:adminEmail,
            adminUsername:adminUsername,
            adminPassword:adminPassword
         }
            //call the api to save the vitals
               axios
                  .post("http://localhost:8081/forex/admin/save", payload)
                  

                  .then(resp => {
                     setUsers(resp.data);
           
                     const obj = {
                      adminName:resp.data.adminName,
                      adminUsername:resp.data.adminUsername,
                      adminPassword:resp.data.adminPassword,
           
                       adminEmail: resp.data.adminEmail,
                     };
           
                      setDialogMessage(": " + resp.data.id);
           
                     setDialogOpen(true);
                     localStorage.setItem("mytoken", JSON.stringify(obj));
                  
                   })
                    }


      }
      const handleCloseDialog = () => {
         setDialogOpen(false);
     };

      return (
        <>
        <div>
         <UserHeader2/>
         <Footer/></div>
         <Grid>
            <Paper elevation={10} style={{
               paperStyle, padding: "20px",
               height: "103vh", width: "536px", margin: "20px auto"
            }}>
               <Grid align='center'>
                  <Avatar style={avatarStyle}><HowToRegIcon /></Avatar>
                  <h2>Sign Up</h2></Grid>
               <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", minWidth: "150px", maxWidth: "200px", height: "150px" }}>

                  <div style={{ display: "flex", flexDirection: "row", width: "500px", marginTop: "5%" }}>
                     <TextField
                        label="Name" value={adminName} onChange={(event) => setAdminName(event.target.value)}
                        required
                        error={!!formErrors.nameError} helperText={formErrors.nameError}
                        style={{ marginBottom: "10px", width: "400px", marginRight: "-32px" }}>

                     </TextField>

                       </div>

                  <div style={{ display: "flex", flexDirection: "row", width: "500px", marginTop: "5%" }}>
                     <TextField
                        label="email" value={adminEmail} onChange={(event) => setAdminEmail(event.target.value)} required
                        error={!!formErrors.email} helperText={formErrors.email}
                        style={{ marginBottom: "10px", width: "400px", marginRight: "-32px" }}></TextField>
                     {
                        formErrors.emailError && <div style={{ color: "red" }}>{formErrors.emailError}</div>
                     }
                     </div>
                     <div style={{ display: "flex", flexDirection: "row", width: "500px", marginTop: "5%" }}>
                     <TextField
                        label="userName" value={adminUsername} onChange={(event) => setAdminUserName(event.target.value)}
                        required
                        error={!!formErrors.userNameError} helperText={formErrors.userNameError}
                        style={{ marginBottom: "10px", width: "400px", marginRight: "-32px" }}>

                     </TextField>


                     <TextField
                        label="Password" type="password" value={adminPassword} onChange={(event) => setAdminPassword(event.target.value)} required
                        error={!!formErrors.passwordError} helperText={formErrors.passwordError}
                        style={{ marginBottom: "10px", width: "400px", marginLeft: "50px" }}>

                        </TextField>



                  </div>
                  <div style={{ marginRight: "-245px", paddingLeft: "104px", paddingTop: "17px" }}>
                     <FormControlLabel
                        control={<TextField as={Checkbox} name="termsAndConditions" />}
                        label="I accept the terms and conditions." />
                  </div>


                  <div style={{ display: "flex", justifyContent: "space-between" }}>
                     <Button onClick={handleSubmit} variant="contained" color="primary" style={{ marginLeft: "75px", marginTop: "45px", paddingLeft: "49px", paddingRight: "48px", paddingTop: "4px", paddingBottom: "gpx" }}>Submit</Button>
                     <Link to="/"><Button type="button" variant="contained" color="secondary" style={{ marginLeft: "185px", marginTop: "45px" }} >Cancel</Button></Link>
                  </div>
                  { <Dialog open={dialogOpen} onClose={() => setDialogOpen(false)}>

                     <DialogTitle>Success!</DialogTitle>

                     <DialogContent>

                        <p>Admin Registerd Sucessfully !!!!!!!!!</p>

                     </DialogContent>

                     <DialogActions>

                        <Link to="/adminsignin"><Button onClick={() => setDialogOpen(false)}>OK</Button></Link>

                     </DialogActions>

                  </Dialog> }
               </form>
               {/* </Container>   */}
            </Paper>
         </Grid>
        </>
      );

   }
   export default AdminSignUp;