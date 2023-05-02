
import React, { useState }  from "react";
import axios from "axios";
import { Link } from "react-router-dom";
function MakePayment(){
    const [vCardNumber, setVCardNumber] = useState("");
    const [vExpiryDate, setVExpiryDate] = useState("");
    const [vCvv, setVCvv] = useState("");
    const [formErrors, setFormErrors] = useState({});
    
   const handleSubmit = () => {
        let errors = {};
        if(!vCardNumber) {
          errors['vCardNumberError'] = "Card Number is required."
        }
        if(!vExpiryDate){
          errors['vExpiryDateError'] = "Expiry Date is required"
        }
        if(!vCvv){
          errors['vCvvError'] = "Cvv is required"
        }
        setFormErrors(errors);

        const noErrors = Object.keys(errors).length === 0;
        if(noErrors){
            const payload = {
                cardNumber: vCardNumber,
                expiryDate: vExpiryDate,
                cvv: vCvv,
               
            };
            //call the api to save the vitals
     axios
     .post("http://localhost:8081/staff/saveVitals", payload)
     .then((resp) => alert("Vitals are saved with id: " + resp.data.SenderAccNo));
        }
    }
    const handleClick=()=>{
      alert('Payment successful!');
     };             
    return(
        <div class="container bg-image">
        <div className="payment" class="jumbotron" align="center"  style={{marginTop:'5%'}}>
        <img
            src="images\pay.png"
            class="thumbnail"
            alt="xx"
            style={{ marginTop: "-10%"}}
          />
          <h1 style={{position:'relative',marginTop:"-2%"}}>Payment</h1>
          <div class="row" >
            <div className="form-group" class="col-8" >
              <label htmlFor="vCardNumber">Card Number</label><br></br>
              <input
              type="text" 
              name="vCardNumber"
              value={vCardNumber}
              className="form-control"
              id="vCardNumber"
              onChange={(event) => setVCardNumber(event.target.value)}/>
              {
                formErrors.vCardNumberError && <div style={{color: "red"}}>{formErrors.vCardNumberError}</div>
              }
            </div>
            <div className="form-group" class="col-8">
            <label htmlFor="vExpiryDate">Expiry Date</label><br></br>
            <input style={{width:"150px"}}
              type="date"
              name="vExpiryDate"
              value={vExpiryDate}
              className="form-control"
              id="vExpiryDate"
              onChange={(event) => setVExpiryDate(event.target.value)}/>
              {
                formErrors.vExpiryDateError && <div style={{color: "red"}}>{formErrors.vExpiryDateError}</div>
              }
            </div>
            <div className="form-group" class="col-8">  
            <label htmlFor="vCvv">CVV</label><br></br>
            <input
              type="number"
              name="vCvv"
              value={vCvv}
              className="form-control"
              id="vCvv"
              onChange={(event) => setVCvv(event.target.value)}/>
              {
                formErrors.vCvvError && <div style={{color: "red"}}>{formErrors.vCvvError}</div>
              }  
          </div>
            
           </div>
           <br></br>
           {/* <Link to ="/"><button onclick={handleClick}>Pay Now</button></Link> */}
           <button onClick={handleSubmit} className="btn-btn-primary">
          Pay
        </button>
           <Link to ="/"><button style={{backgroundColor:'red',marginLeft:'5%'}}>Cancel</button></Link>
            
            
        </div>
    </div>    
    );
}
export default MakePayment;