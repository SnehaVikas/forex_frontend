import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {
	faYoutube,
	faFacebook,
	faTwitter,
	faInstagram,
} from '@fortawesome/free-brands-svg-icons';
import'./CSS/FooterCss.css';



function Footer() {
	return (
		<footer id="footer" class="bg-dark text-white d-flex-column text-center">
			<div class="container p-4" >
				<section class="">
					<div class="row">
						<div class="col-lg-4 col-md-12 mb-4 mb-md-0" >
							<div class="bg-image hover-overlay ripple shadow-1-strong rounded" data-ripple-color="light" style={{marginLeft :'-5%'}}>

                            <div class="col-md-3 mx-auto shfooter "  style={{marginLeft:'-45%',color:'white',marginTop:'-7%'}}>
                            <h5 class="my-2 font-weight-bold d-none d-md-block">Services</h5>
                            <a href="/CurrencyConverter ">CurrencyConverter</a><br></br>
                            <a href=" /saveTransaction"> Transactions</a><br></br>
							<a href=" /AddBank">BankDetails</a>
                       </div>
					   </div>
						</div>
                       
					   		
							<div class="row">
						<div class="col-md-3 mx-auto shfooter" style={{ marginLeft: ' 70%',marginTop:'-8%',marginRight:'20%',color:'white' }}>
							<h5 class="my-2 font-weight-bold d-none d-md-block ">SocialMedia</h5>
							<ul>
								<li>
									<a
										href='https://youtu.be/ne8hoBK9p4U'
										className='youtube social'
										style={{ marginLeft: '-65px' }}>
										<FontAwesomeIcon icon={faYoutube} size='lg' />
									</a>
								</li>
								<li>
									<a
										href='https://www.facebook.com/login.php/'
										className='facebook social'
										style={{ marginLeft: '-20px' }}>
										<FontAwesomeIcon icon={faFacebook} size='lg' />
									</a>
								</li>
								<li>
									{' '}
									<a
										href='https://twitter.com/login?lang=en'
										className='twitter social'
										style={{ marginLeft: '10px',marginTop:'-145%'}}>
										<FontAwesomeIcon icon={faTwitter} size='lg' />
									</a>
								</li>
								{/* <li>
									{' '}
									<a
										href='https://www.instagram.com/accounts/login/'
										className='instagram social'
										style={{ marginLeft: '1%',marginTop:'9%'}}>
										<FontAwesomeIcon icon={faInstagram} size='lg' />
									</a>
								</li> */}
							</ul>
						</div>
                        
						<div class="row "style={{marginLeft:'150%',marginRight:'90%',marginTop:'-30%'}}>
							
                            <div class="col-md-3 mx-auto shfooter " style={{marginTop:'-1%',marginRight:'100%',marginLeft:'90%',color:'white'}} >
                            <h5 class="my-2 font-weight-bold d-none d-md-block">Company</h5>
                            <a href=" /AboutUs">About  </a><br></br>
                            {/* <a href="/Contact ">Contact </a><br></br> */}
							<a href=" /FAQ">FAQ's</a>

                       </div>
                       </div>
						
						
</div>
</div>


				</section>
			</div>
			<div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)',marginTop:'-1%' }}>
								<a className='text-reset fw-bold' href='https://mdbootstrap.com/' style={{color:'black'}}>
					Forex @ 2023 Copyright

				</a>
			
			</div>

		</footer >
	)
}
export default Footer;
