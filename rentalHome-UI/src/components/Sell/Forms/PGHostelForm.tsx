import React from 'react';
import '../sellpage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faDoorOpen,  faUtensils } from '@fortawesome/free-solid-svg-icons';

interface Props {
  formData: any;
  handleChange: (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
}

const PGHostelForm: React.FC<Props> = ({ formData, handleChange }) => {

return (
  <div className="pg-hostel-form">
    <div className="form-row">
      <label htmlFor="pgSharingType">
        <FontAwesomeIcon icon={faBed} className="iconp" />
        PGSharingType:
      </label>
      <select
        id="pgSharingType"
        name="pgSharingType"
        className="inputfield"
        value={formData.pgSharingType}
        onChange={handleChange}
        required
      >
        <option value="">Select PG Sharing Type</option>
        <option value="single">Single</option>
        <option value="double">Double</option>
        <option value="triple">Triple</option>
      </select>
    </div>
    <div className="form-row">
      <label htmlFor="pgLivingType">
        <FontAwesomeIcon icon={faBed} className="iconp" />
        PGLivingType:
      </label>
      <select
        id="pgLivingType"
        name="pgLivingType"
        className="inputfield"
        value={formData.pgLivingType}
        onChange={handleChange}
        required
      >
        <option value="">Select PG Living Type</option>
        <option value="boys">Boys</option>
        <option value="girls">Girls</option>
        <option value="colive">Colive</option>
      </select>
    </div>

    <div className="form-row">
      <label htmlFor="availableRooms">
        <FontAwesomeIcon icon={faDoorOpen} className="iconp" />
        Number of Rooms Available:
      </label>
      <input
        type="number"
        id="availableRooms"
        name="availableRooms"
        className="inputfield"
        value={formData.availableRooms}
        onChange={handleChange}
        min={1}
        required
      />
    </div>

    <div className="form-row">
      <label htmlFor="sharingType">
        <FontAwesomeIcon icon={faUtensils} className="iconp" />
        Meals:
      </label>
      <select
        id="sharingType"
        name="sharingType"
        className="inputfield"
        value={formData.sharingType}
        onChange={handleChange}
        required
      >
        <option value="">Select Meal Type</option>
        <option value="2 meal">2 Meal</option>
        <option value="3 meal">3 Meal</option>
      </select>
    </div>
  </div>
);

    };
    

export default PGHostelForm;
