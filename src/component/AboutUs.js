import React from "react";
import'./CSS/AboutUs.css';
import Subheader from "./Subheader";
import Footer from "./Footer";
function AboutUs() {
	return (<>
        {<div>
        <Subheader/>
        <Footer/>
    </div> }

<section class="about-us">
<div class="about">
<div class="video" align="center">
                <iframe width="560" height="315" 
                src="https://www.youtube.com/embed/SHSj5cqOmVs" title="YouTube video player" frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen>

                </iframe>
</div>
  <div class="text">
    <h3>About Us</h3><hr></hr>
    <p>Forex.com is India's first e-commerce initiative in the retail foreign exchange and international money transfer space.  Customers can buy forex for several purposes such as Personal Travel, Business Travel, Education, Emigration, Employment, Medical, and Maintenance of closed relatives staying abroad.
    Forex.com operates as a market place for foreign exchange. 
    We partner with select Banks and reputed exchange companies to fulfill the forex requirements of our customers.Read our FAQs to learn more about how to book your order with Forex.com and other foreign exchange related queries.
 
    </p>
     <hr></hr>     
  </div>
</div>
</section>
</>

)
        }
export default AboutUs;
