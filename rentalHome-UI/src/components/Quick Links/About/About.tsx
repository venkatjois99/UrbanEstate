import './About.css';
import Footer from '../../footer/footer';

const About= () => {
   
  return (
    <>
        <div className="overview-wrapper">
            <div className="text-area" data-aos="fade-up" data-aos-delay="200">
                <h1>About Us</h1>
                <p>Welcome to UrbanEstate!</p>
                <p>
                    UrbanEstate is a disruptive rental home booking platform designed to simplify your search for housing solutions without the burden of hefty brokerage fees. We believe that finding a new home should be straightforward and cost-effective, which is why we created a space where tenants can connect directly with landlords and shared accommodations.
                </p>
                <h1>Our Mission</h1>
                <p>
                    Our mission is to remove the information asymmetry in the rental market. We understand the frustration of paying brokerages year after year without seeing any real benefit. UrbanEstate is here to provide a transparent marketplace where you can discover and secure your ideal living space hassle-free.
                </p>
                <h1>What We Offer</h1>
                <ol>
                    <li>
                        <strong>Verified Listings:</strong> We meticulously verify every listing to ensure you are connecting directly with property owners or potential flatmates, eliminating the need for middlemen. Our rigorous vetting process guarantees a completely broker-free experience.
                    </li>
                    <li>
                        <strong>Comprehensive Information:</strong> We strive to provide maximum information in an easy-to-use format. This allows you to get a detailed understanding of each property before visiting. You can effortlessly shortlist 4-5 options from the comfort of your home, saving you both time and effort.
                    </li>
                    <li>
                        <strong>User-Friendly Experience:</strong> Our platform is designed to enhance your rental journey, allowing you to discover, compare, and book rental homes efficiently.
                    </li>
                </ol>
                <p>
                    If you’re a landlord interested in posting your property on UrbanEstate, please email us at <a href="mailto:hello@urbanestate.com">hello@urbanestate.com</a>, and we’ll assist you in showcasing your listing.
                </p>
                <p>
                    Happy house hunting! We're here to help you find your perfect home.
                </p>
            </div>
        </div>
        <Footer showExtra />
    </>
);
};
 
export default About