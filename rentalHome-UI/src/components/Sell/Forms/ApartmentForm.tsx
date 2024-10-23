import React from 'react';
import '../sellpage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHome, faCouch } from '@fortawesome/free-solid-svg-icons';

interface Props {
  formData: any;
  setFieldValue: (field: string, value: any) => void;
}

const ApartmentForm: React.FC<Props> = ({ formData, setFieldValue }) => {
  return (
    <div className="child-container">
      <div className="child-form-row">
        <div className="child-field">
          <label>
            <FontAwesomeIcon icon={faHome}className="iconp" />
            BHK Type:
            <select
              name="bhkType"
              value={formData.bhkType}
              onChange={(e) => setFieldValue("bhkType", e.target.value)}
            >
              <option value="">Select BHK Type</option>
              {['1 BHK', '2 BHK', '3 BHK', '4 BHK', '5 BHK'].map((type) => (
                <option key={type} value={type}>{type}</option>
              ))}
            </select>
          </label>
        </div>

        <div className="child-field">
          <label>
            <FontAwesomeIcon icon={faCouch} className="iconp"/>
            Furnishing:
            <select
              name="furnishing"
              value={formData.furnishing}
              onChange={(e) => setFieldValue("furnishing", e.target.value)}
            >
              <option value="">Select Furnishing</option>
              <option value="furnished">Furnished</option>
              <option value="semi-furnished">Semi-Furnished</option>
              <option value="unfurnished">Unfurnished</option>
            </select>
          </label>
        </div>
      </div>
    </div>
  );
};

export default ApartmentForm;
