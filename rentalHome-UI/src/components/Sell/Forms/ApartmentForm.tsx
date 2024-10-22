import React from 'react';
import '../sellpage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCouch } from '@fortawesome/free-solid-svg-icons';
interface Props {
  formData: any;
  handleChange: (event: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => void;
}

const ApartmentForm: React.FC<Props> = ({ handleChange }) => {

  
  return (
    <>
      <div className="form-row">
        <label>
          <FontAwesomeIcon icon={faHome} className="iconp" />
          BHK Type:
          <select name="bhkType" className="inputfield" onChange={handleChange}>
            <option value="">Select BHK Type</option>
            {['1 BHK', '2 BHK', '3 BHK', '4 BHK', '5 BHK'].map((type) => (
              <option key={type} value={type}>
                {type}
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
    </>
  );
  
};

export default ApartmentForm;
