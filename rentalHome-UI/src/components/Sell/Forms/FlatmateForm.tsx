import React from 'react';
import '../sellpage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faCouch, faUserFriends } from '@fortawesome/free-solid-svg-icons';
interface Props {
  formData: any;
  handleChange: (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
}

const FlatmateForm: React.FC<Props> = ({ handleChange }) => {
 


return (
  <>
    <div className="form-row">
      <label>
        <FontAwesomeIcon icon={faBed} className="iconp" />
        Shared Bedrooms:
        <select name="sharedBedrooms" className="inputfield" onChange={handleChange}>
          <option value="">Select Shared Bedrooms</option>
          {[1, 2, 3, 4].map((num) => (
            <option key={num} value={num}>
              {num}
            </option>
          ))}
        </select>
      </label>
    </div>

    <div className="form-row">
      <label>
        <FontAwesomeIcon icon={faCouch} className="iconp" />
        Furnishing:
        <select name="furnishing" className="inputfield" onChange={handleChange}>
          <option value="">Select Furnishing</option>
          <option value="furnished">Furnished</option>
          <option value="semi-furnished">Semi-Furnished</option>
          <option value="unfurnished">Unfurnished</option>
        </select>
      </label>
    </div>

    <div className="form-row">
      <label>
        <FontAwesomeIcon icon={faUserFriends} className="iconp" />
        Preferred Flatmate:
        <select name="preferredFlatmate" className="inputfield" onChange={handleChange}>
          <option value="">Select Preference</option>
          <option value="any">Any</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
        </select>
      </label>
    </div>
  </>
);
};


export default FlatmateForm;
