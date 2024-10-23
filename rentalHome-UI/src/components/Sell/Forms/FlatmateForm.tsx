import React from 'react';
import '../sellpage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faCouch, faUserFriends } from '@fortawesome/free-solid-svg-icons';

interface Props {
  formData: any;
  setFieldValue: (field: string, value: any) => void;
}

const FlatmateForm: React.FC<Props> = ({ formData, setFieldValue }) => {
  return (
    <div className="child-container">
      <div className="child-form-row">
        <div className="child-field">
          <label>
            <FontAwesomeIcon icon={faBed} className="iconp"/>
            Shared Bedrooms:
            <select
            className="child-select"
              name="sharedBedrooms"
              value={formData.sharedBedrooms}
              onChange={(e) => setFieldValue("sharedBedrooms", Number(e.target.value))}
            >
              <option value="">Select Shared Bedrooms</option>
              {[1, 2, 3, 4].map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </label>
        </div>

        <div className="child-field">
          <label>
            <FontAwesomeIcon icon={faCouch}className="iconp" />
            Furnishing:
            <select
            className="child-select"
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

      <div className="child-form-row">
        <div className="child-field">
          <label>
            <FontAwesomeIcon icon={faUserFriends} className="iconp"/>
            Preferred Flatmate:
            <select
            className="child-select"
              name="preferredFlatmate"
              value={formData.preferredFlatmate}
              onChange={(e) => setFieldValue("preferredFlatmate", e.target.value)}
            >
              <option value="">Select Preference</option>
              <option value="any">Any</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </label>
        </div>
      </div>
    </div>
  );
};

export default FlatmateForm;
