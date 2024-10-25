import React from 'react';
import './terms.css';
import Footer from '../../footer/footer';
import NavBars from '../../header/header';

const TermsAndConditions: React.FC = () => {
  return (
    <>
    <NavBars />
    <div className="terms-wrapper">
      <h2>Terms and Conditions</h2>
      <p>
        Welcome to Urban Estate! By accessing and using our platform, you agree to comply with and be bound by the following terms and conditions:
      </p>
      <ul>
        <li><strong>Registration:</strong> Users must register an account to list or book properties. Ensure all information is accurate and up to date.</li>
        <li><strong>Property Listings:</strong> Property owners must provide accurate and complete information regarding their listings. False or misleading information may result in account suspension or permanent removal.</li>
        <li><strong>Booking Confirmation:</strong> All bookings are confirmed based on the availability provided by the property owner. Property owners are responsible for maintaining up-to-date availability of their listings.</li>
        <li><strong>Payments:</strong> Payment options for property booking include pay on arrival. Any other payment methods (if available) will be disclosed during booking. No refunds are offered for last-minute cancellations without notice.</li>
        <li><strong>Security Deposits:</strong> Some property owners may require a security deposit. It will be clearly stated in the property details if applicable.</li>
        <li><strong>Reviews:</strong> Tenants are encouraged to leave honest reviews after their stay. Offensive language, slander, or false claims are prohibited and may result in account suspension.</li>
        <li><strong>Platform Integrity:</strong> Admins reserve the right to suspend or terminate accounts or listings that violate platform rules, engage in fraudulent activity, or receive multiple complaints.</li>
        <li><strong>User Data Protection:</strong> User data is protected under our Privacy Policy. By using the platform, you consent to the collection and use of your data as outlined in our policy.</li>
        <li><strong>Amendments:</strong> Urban Estate reserves the right to modify these terms and conditions at any time. Continued use of the platform implies acceptance of the modified terms.</li>
      </ul>
      <p>
        For more details on how we handle user data, please refer to our <a href="/privacy-policy">privacy policy</a>.
      </p>
    </div>
    <Footer />
    </>
  );
};

export default TermsAndConditions;
