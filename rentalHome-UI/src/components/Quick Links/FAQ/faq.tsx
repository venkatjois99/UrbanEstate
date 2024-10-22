import React from 'react';
import './faq.css';

const Faq: React.FC = () => {
  return (
    <div className="faq-wrapper">
      <h2>Frequently Asked Questions</h2>
      <div className="faq-item">
        <details>
          <summary>How do I register on the platform?</summary>
          <p>You can create an account by filling out the registration form with your personal details. An email verification is required to activate your account.</p>
        </details>
      </div>
      <div className="faq-item">
        <details>
          <summary>Can I book a property online?</summary>
          <p>Yes, tenants can book properties online by selecting dates and confirming their intent to stay. Payment options include pay on arrival.</p>
        </details>
      </div>
      <div className="faq-item">
        <details>
          <summary>How do property owners list their properties?</summary>
          <p>Owners can add details about their properties, including location, type, price, amenities, and availability, after registering on the platform.</p>
        </details>
      </div>
      <div className="faq-item">
        <details>
          <summary>What payment options are available for booking?</summary>
          <p>Currently, tenants can book properties with the option to pay on arrival. Additional payment options may be introduced in the future.</p>
        </details>
      </div>
      <div className="faq-item">
        <details>
          <summary>How do I reset my password?</summary>
          <p>If you’ve forgotten your password, you can reset it by clicking the "Forgot Password" link on the login page. A reset link will be sent to your registered email.</p>
        </details>
      </div>
      <div className="faq-item">
        <details>
          <summary>How can I contact property owners?</summary>
          <p>Tenants can contact property owners directly through the platform’s messaging system or via the phone number listed in the property details.</p>
        </details>
      </div>
      <div className="faq-item">
        <details>
          <summary>Are reviews moderated on the platform?</summary>
          <p>Yes, all reviews are moderated to ensure they meet our community guidelines. Inappropriate or offensive reviews will be removed.</p>
        </details>
      </div>
      <div className="faq-item">
        <details>
          <summary>How can I edit or delete my property listing?</summary>
          <p>Property owners can edit or remove their listings by visiting the “Manage Listings” section in their account dashboard.</p>
        </details>
      </div>
    </div>
  );
};

export default Faq;
