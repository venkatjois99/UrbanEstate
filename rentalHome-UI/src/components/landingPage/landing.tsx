import Carousel from "react-bootstrap/Carousel";

import NavBars from "../header/header";
import "./landing.css";

export default function Landing() {
  return (
    <>
      <NavBars />

      <div className="landing-cont-2">
        <CarousalItemLanding />
        <div className="info-text-cont">
          <h2>What’s Happening in Your Area</h2>
          <p>
            Whether you're in search of a new residence, an investment
            opportunity, or simply exploring the area, we are here to assist you
            in discovering precisely what meets your needs.
          </p>
          <p>Bengaluru, India</p>
        </div>
        <div className="count-card-cont">
          <div className="count-card">
            <p className="card-title">165</p>
            <p className="card-text">Independent Flat</p>
          </div>
          <div className="count-card">
            <p className="card-title">165</p>
            <p className="card-text">Shared Flat</p>
          </div>
          <div className="count-card">
            <p className="card-title">165</p>
            <p className="card-text">Available PG</p>
          </div>
          <div className="count-card">
            <p className="card-title">165</p>
            <p className="card-text">Hotel Rooms</p>
          </div>
        </div>
        <div className="property-list-cont">
          <h3>How Can We Help?</h3>
          <div>
            <a>
              <img src="src\assets\icons\apartment.svg" />
            </a>
            <a>
              <img src="src\assets\icons\house.svg" />
            </a>
            <a>
              <img src="src\assets\icons\pg.svg" />
            </a>
            <a>
              <img src="src\assets\icons\hotelRoom.svg" />
            </a>
          </div>
        </div>
        <div className="subs-cont">
          <h3>Get Listed Properties</h3>
          <p>
            Here is a compilation of the most memorable real estate company ever
            created.
            <p>
              These engaging catchphrases are paired with the title "Greatest
              Real-Estate of All Time”.
            </p>
          </p>
         <div>
         <input type="text" placeholder="enter your email id"></input>
         <button type="submit">Subscribe</button>
         </div>
        </div>
      </div>
    </>
  );
}

function CarousalItemLanding() {
  return (
    <div className="carousal-container">
      <Carousel slide={true} controls={false} fade>
        <Carousel.Item>
          <div className="img-holder bg-image-1"></div>
          <Carousel.Caption>
            <h2>Move-In Made Easy: Book Your Ideal Space!</h2>
            <p>Helping renters find their perfect fit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div className="img-holder bg-image-2"></div>
          <Carousel.Caption>
            <h2>Move-In Made Easy: Book Your Ideal Space!</h2>
            <p>Helping renters find their perfect fit.</p>
          </Carousel.Caption>
        </Carousel.Item>
        <Carousel.Item>
          <div className="img-holder bg-image-3"></div>
          <Carousel.Caption>
            <h2>Move-In Made Easy: Book Your Ideal Space!</h2>
            <p>Helping renters find their perfect fit.</p>
          </Carousel.Caption>
        </Carousel.Item>
      </Carousel>
    </div>
  );
}
