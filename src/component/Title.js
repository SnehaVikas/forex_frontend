import React from 'react';
import Slider from 'react-slick';
import './CSS/title.css';






function Title() {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    centerMode: true,
    centerPadding: '10%',
    prevArrow: <button type="button" className="slick-prev">Previous</button>,
    nextArrow: <button type="button" className="slick-next">Next</button>
  };

  return (
    <div className="title-container">
      <div className="carousel-container">
        <Slider {...settings}>
          <div>
            <img src={process.env.PUBLIC_URL + './Images/c1.png'} alt="24*7 Online International Money Transfer" style={{width: '50%', height: '20%'}}/>
            <div className="point-text">24*7 Online International Money Transfer</div>
          </div>
          <div>
            <img src={process.env.PUBLIC_URL + './Images/c2.png '} alt="Buy & Sell Foreign Currency Notes Online at Best Rates" style={{width: '50%', height: '20%'}}/>
            <div className="point-text">Buy & Sell Foreign Currency Notes Online at Best Rates</div>
          </div>
          
        </Slider>
      </div>
      <h1 className="title">How To Buy Forex Online</h1>
      <div className="points-container">
        <div className="point">
          <img src={process.env.PUBLIC_URL + '/images/cart.png'} alt="Select your city, enter your forex requirements and complete a forex order booking online" className="point-image" />
          <div className="point-text">Select your city, enter your forex requirements and complete a forex order booking online</div>
        </div>
        <div className="point">
          <img src={process.env.PUBLIC_URL + '/images/bank.png'} alt="The bank or money exchanger with the best and the most reliable service standards around you will be selected" className="point-image" />
          <div className="point-text">The bank or money exchanger with the best and the most reliable service standards around you will be selected</div>
        </div>
        <div className="point">
          <img src={process.env.PUBLIC_URL + '/images/img3.png'} alt="The bank or money exchanger selected will schedule your door delivery or you can pick up the order from their location" className="point-image" />
          <div className="point-text">The bank or money exchanger selected will schedule your door delivery or you can pick up the order from their location</div>
        </div>
        <div className="point">
          <img src={process.env.PUBLIC_URL + '/images/location.jpg'} alt="Track your forex order online all the way until the final delivery or pick up is completed" className="point-image" />
          <div className="point-text">Track your forex order online all the way until the final delivery or pick up is completed</div>
        </div>
      </div>
      {/* <div class="video" align="center">
                <iframe width="560" height="315" 
                src="https://www.youtube.com/embed/SHSj5cqOmVs" title="YouTube video player" frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen>

                </iframe>
</div>
 */}
    </div>
  );
}

export default Title;
