// SellPage.tsx
import React from 'react';
import NavBars from '../header/header';
import InfoSection from './InfoCards/InfoCards';
import Footer from '../footer/footer';
import PropertyListing from './Forms/propertylistingform';
import './sellpage.css';

const SellPage: React.FC = () => {
  return (
    <>
      <NavBars />
      <div className="proppage">
        <div className="property-listing-container">
          <PropertyListing />
        </div>
      </div>
      <InfoSection />
      <Footer />
    </>
  );
};

export default SellPage;
