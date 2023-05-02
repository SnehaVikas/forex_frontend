import React from "react";
import'./CSS/FAQ.css';
import Subheader from "./Subheader";
import Footer from "./Footer";

function FAQ() {
  return ( <>
            {<div>
            <Subheader/>

            <Footer/>
            
        </div> }
    <div class="container" align='center' style={{ marginTop: ' 130px'}}>
  <h1>Frequently Asked Questions</h1>
  <details>
  <summary>What currencies are available for exchange ?</summary>
  <div>
  All major or exotic currencies are available on the website depending upon the location of the customer. List of currencies can be referred to through our full rate card.
  </div>
  </details>
<details>
  <summary>Are there any Service Charges on order?</summary>
  <div>
  Service charges may vary per city to a certain extent. In most cities, Service charges are as follows:
If order total is between Rs. 0 - Rs. 25,000, Rs. 250 Service charge is applied.
If order total is between Rs. 25,001 - Rs. 1,00,000, Rs. 150 Service charge is applied.
If order total is over Rs. 1,00,001 - No Service charge will be applied.
  </div>
</details>
<details>
  <summary>Can I transfer funds from a forex card to my own account held in a bank abroad?
</summary>
  <div>
  Fund Transfer from a forex card to any account online is not possible.
You can, however, transfer money to your account via POS at foreign bank branch. This is known as POS Cash Advance facility which is chargeable as per the terms & conditions of the card issuing bank. 
Please check withForex or the card issuing bank before using this facility to avoid any unforeseen charges.
   </div>
</details>

  <details>
  <summary>Are there any specific categories of travel requiring RBI / Govt of India approvals?
</summary>
  <div>
  Dance troupes, artistes, etc., who wish to undertake cultural tours abroad, should obtain prior approval from the Ministry of Human Resources Development (Department of Education and Culture), Government of India, New Delhi.
   </div>
</details>

<details>
  <summary>What is the foreign exchange entitlement (limit) under the emigration scheme?
</summary>
  <div>
  Up to US$ 250,000 per person. If an individual remits any amount under the Liberalized Remittance Scheme in a financial year, then the applicable limit for such individual would be reduced from USD 250,000 by the amount so remitted.
</div>
</details>


<details>
  <summary>Product Descriptions
</summary>
  <div>
  Currency Notes:
Cash currency. Large amount of currency is unsafe to carry but small amounts of currency notes should be carried for incidental expenses. 
Traveler’s Cheques:
Traveler’s cheques (TCs), are safer than currency but are not accepted at most establishments now. Prepaid Travel cards are a much more recommended method of carrying currency than TCs.
Demand Drafts
Demand drafts are issued in the foreign currency desired for the purposes of remitting (sending) money abroad. Demand drafts can be carried or mailed to the beneficiary.
Wire Transfer
Wire transfers are used to remit (send) money directly from an Indian bank account (of the customer) to the foreign bank account (of the beneficiary).
</div>
</details>

<details>
  <summary>What is your cancellation policy ?
</summary>
  <div>
  Forex orders, where neither the full payment nor the refundable rate guarantee deposit has been paid, can be cancelled without any charge. In case a refundable rate guarantee deposit has been received against a forex order, cancelling the order would result in the forfeiture of the refundable rate guarantee deposit. In case a forex order is cancelled after the full payment against the same is received, Forex would refund the total amount paid after the cancellation fee amounting to 2% of the order total.
</div>
</details>

</div>

 </>
 
  );
}
export default FAQ;