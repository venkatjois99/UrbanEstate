import React from 'react';
import styles from './PrivacyPolicy.module.css';
import NavBars from '../../header/header';
import Footer from '../../footer/footer';

const PrivacyPolicy: React.FC = () => {
  return (
    <>
    <NavBars></NavBars>
    <div className={styles.container}>
      <h1 className={styles.title}>Privacy Policy </h1>
      <p className={`${styles.paragraph} ${styles.bold}`}>
        Effective Date: [25-10-2024]
      </p>

      <h2 className={styles.sectionTitle}>1. Introduction</h2>
      <p className={styles.paragraph}>
        Welcome to UrbanEstate (the “App”). We are committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our App.
      </p>

      <h2 className={styles.sectionTitle}>2. Information We Collect</h2>
      <p className={styles.paragraph}>We may collect the following types of information:</p>
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <strong>Personal Information:</strong> This includes your name, email address, phone number, and any other information you provide directly to us when you register or interact with UrbanEstate.
        </li>
        <li className={styles.listItem}>
          <strong>Usage Data:</strong> We automatically collect information about your interactions with UrbanEstate, such as IP address, browser type, device type, and pages visited.
        </li>
        <li className={styles.listItem}>
          <strong>Cookies:</strong> UrbanEstate may use cookies and similar tracking technologies to enhance user experience. You can manage cookie preferences through your browser settings.
        </li>
      </ul>

      <h2 className={styles.sectionTitle}>3. How We Use Your Information</h2>
      <p className={styles.paragraph}>We may use the information we collect for various purposes, including:</p>
      <ul className={styles.list}>
        <li className={styles.listItem}>To provide and maintain UrbanEstate</li>
        <li className={styles.listItem}>To improve, personalize, and expand UrbanEstate</li>
        <li className={styles.listItem}>To understand and analyze how you use UrbanEstate</li>
        <li className={styles.listItem}>To communicate with you, including for customer service</li>
        <li className={styles.listItem}>To process transactions and send you transaction-related information</li>
      </ul>

      <h2 className={styles.sectionTitle}>4. Disclosure of Your Information</h2>
      <p className={styles.paragraph}>We may share your information in the following situations:</p>
      <ul className={styles.list}>
        <li className={styles.listItem}>
          <strong>With Service Providers:</strong> We may share your information with third-party vendors who assist us in providing our services.
        </li>
        <li className={styles.listItem}>
          <strong>For Legal Reasons:</strong> We may disclose your information if required to do so by law or in response to valid requests by public authorities.
        </li>
      </ul>

      <h2 className={styles.sectionTitle}>5. Security of Your Information</h2>
      <p className={styles.paragraph}>
        We implement reasonable security measures to protect your information. However, no method of transmission over the Internet or method of electronic storage is 100% secure.
      </p>

      <h2 className={styles.sectionTitle}>6. Your Rights</h2>
      <p className={styles.paragraph}>Depending on your location, you may have the following rights regarding your personal information:</p>
      <ul className={styles.list}>
        <li className={styles.listItem}>The right to access</li>
        <li className={styles.listItem}>The right to rectification</li>
        <li className={styles.listItem}>The right to erasure</li>
        <li className={styles.listItem}>The right to restrict processing</li>
        <li className={styles.listItem}>The right to data portability</li>
      </ul>

      <h2 className={styles.sectionTitle}>7. Third-Party Links</h2>
      <p className={styles.paragraph}>
        UrbanEstate may contain links to third-party websites. We are not responsible for the privacy practices of these websites. We encourage you to read their privacy policies.
      </p>

      <h2 className={styles.sectionTitle}>8. Changes to This Privacy Policy</h2>
      <p className={styles.paragraph}>
        We may update our Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the effective date.
      </p>

      <h2 className={styles.sectionTitle}>9. Contact Us</h2>
      <p className={styles.paragraph}>
        If you have any questions or concerns about this Privacy Policy, please contact us at:<br />
        <p>example@urbanestate.com<br/>
           (+91) 456-789-0768</p>
            <h6>Address</h6>
           <p>8A, La Vature, Kormangala<br/>
           Bengaluru - 560064</p>
          
      </p>
    </div>
    <Footer></Footer>
    </>
  );
};

export default PrivacyPolicy;
