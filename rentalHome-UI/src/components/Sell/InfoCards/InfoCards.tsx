import React from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEye, faBullhorn,  faShieldAlt, faUser, faCoins } from '@fortawesome/free-solid-svg-icons';
import "./InfoCards.css";

const infoCards = [
  {
    title: "High Visibility",
    content: "Your property will be featured on our platform.",
    icon: faEye,
  },
  {
    title: "Tailored Marketing",
    content: "We provide customized marketing solutions to highlight your property .",
    icon: faBullhorn,
  },
 
  {
    title: "Tenant Verification",
    content: "We prioritize safety by thoroughly screening tenants .",
    icon: faShieldAlt,
  },
  {
    title: "User-Friendly Interface",
    content: "List your property in just a few clicks and manage your listings effortlessly.",
    icon: faUser,
  },
  {
    title: "Competitive Fees",
    content: "Enjoy low listing fees compared to other platforms .",
    icon: faCoins,
  },
];

const InfoSection: React.FC = () => {
  return (
    <div className="info-section">
      <div className="info-cards">
        {infoCards.map((card, index) => (
          <div key={index} className="info-card">
            <FontAwesomeIcon icon={card.icon} className="card-icon" />
            <h3>{card.title}</h3>
            <p>{card.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InfoSection;
