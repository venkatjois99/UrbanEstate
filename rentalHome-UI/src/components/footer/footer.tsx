import React from "react";
import "./footer.css";

interface FooterProps{
  showExtra:boolean;

}
const Footer: React.FC<FooterProps> = ({showExtra=true}) => {
  const places: string[] = [
    "Delhi",
    "Bengaluru",
    "Chennai",
    "Hyderabad",
    "Pune",
  ];
  const quickLinks: string[] = [
    "About Us",
    "Rent",
    "FAQ's",
    "Privacy Policy",
    "Terms & Conditions",
  ];
  return (
    <div className="footer-cont">
      <div className="footer-title">
        <img src="src\assets\icons\footerLogo.svg" alt="logo"></img>
        <p>Follow Us</p>
      </div>
      {showExtra && (<><div className="footer-body">
        <div className="footer-subs-cont">
          <div className="email-sub-cont">
            <h6>Subscribe</h6>
            <div className="email-form">
              <input type="email" placeholder="Your email"></input>
              <button type="submit">
                Send <img src="src\assets\icons\arrowSubmit.svg"></img>
              </button>
            </div>
            <p>
              Subscribe to our newsletter to receive our weekly
              <br /> updates on latest Real Estates and Houses.
            </p>
          </div>
        </div>
        <div className="d-flex gap-4 col-media">
          <div className="footer-body-part-cont">
            <h6>Discover</h6>
            {places.map((place, index) => (
              <p key={index}>{place}</p>
            ))}
          </div>
          <div className="footer-body-part-cont">
            <h6>Quick Links</h6>
            {quickLinks.map((link, index) => {
              // Create href by converting the link to lowercase and replacing spaces with hyphens
              const href = `/${link.toLowerCase().replace(/\s+/g, "-")}`;

              return (
                <a
                  key={index}
                  href={href}
                  style={{ display: "block", margin: "0 0 1rem 0 " }}
                >
                  {link}
                </a>
              );
            })}
          </div>
          <div className="footer-body-part-cont">
            <h6>Contact Us</h6>
           <p>example@urbanestate.com<br/>
           (+91) 456-789-0768</p>
          </div>
          <div className="footer-body-part-cont">
            <h6>Address</h6>
           <p>8A, La Vature, Kormangala<br/>
           Bengaluru - 560064</p>
          </div>
        </div>
      </div></>)}
      <div className="footer-tail">
            <p>Copyright © 2024. Urban Estate</p>
      </div>
    </div>
  );
};

export default Footer;

{
  /* <div className="subs-cont">
          <h3>Get Listed Properties</h3>
          <div>
            <p>
              Here is a compilation of the most memorable real estate company
              ever created.
            </p>
            <p>
              These engaging catchphrases are paired with the title "Greatest
              Real-Estate of All Time”.
            </p>
          </div>
          <div className="email-sub-cont">
            <input type="email" placeholder="enter your email id"></input>
            <button type="submit">Subscribe</button>
          </div>
        </div> */
}
