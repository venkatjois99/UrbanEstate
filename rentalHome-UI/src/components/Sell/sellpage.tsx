// SellPage.tsx
import React from 'react';
import InfoSection from './InfoCards/InfoCards';
import Footer from '../footer/footer';
import PropertyListing from './Forms/propertylistingform';
import './sellpage.css';

const SellPage: React.FC = () => {
  return (
    <>
      <div className="proppage">
  
          <PropertyListing />
          <img src="src/assets/sideBar.svg" alt="Description of the image" className="sell-image" />
       
      </div>
      <InfoSection />
      <Footer showExtra/>
    </>
  );
};

export default SellPage;
