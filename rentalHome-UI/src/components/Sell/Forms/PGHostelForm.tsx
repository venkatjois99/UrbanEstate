import React from 'react';
import '../sellpage.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBed, faDoorOpen,  faThLarge } from '@fortawesome/free-solid-svg-icons';

interface Props {
  formData: any;
  setFieldValue: (field: string, value: any) => void;
}

const PGHostelForm: React.FC<Props> = ({ formData, setFieldValue }) => {
  return (
    <div className="child-container">
      <div className="child-form-row">
        <div className="child-field">
          <label>
            <FontAwesomeIcon icon={faBed}className="iconp" />
            PG Sharing Type:
            <select
            className="child-select"
              name="pgSharingType"
              value={formData.pgSharingType}
              onChange={(e) => setFieldValue("pgSharingType", e.target.value)}
            >
              <option value="">Select PG Sharing Type</option>
              <option value="single">Single</option>
              <option value="double">Double</option>
              <option value="triple">Triple</option>
            </select>
          </label>
        </div>

        <div className="child-field">
          <label>
            <FontAwesomeIcon icon={faDoorOpen} className="iconp"/>
            PG Living Type:
            <select
            className="child-select"
              name="pgLivingType"
              value={formData.pgLivingType}
              onChange={(e) => setFieldValue("pgLivingType", e.target.value)}
            >
              <option value="">Select Living Type</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Colive">Co-living</option>
            </select>
          </label>
        </div>
      </div>

      <div className="child-form-row">
        <div className="child-field">
          <label>   <FontAwesomeIcon icon={faThLarge} className="iconp"/>
            Number of Available Rooms:
            <input
             className="child-input"
              type="number"
              name="availableRooms"
              value={formData.availableRooms}
              onChange={(e) => setFieldValue("availableRooms", Number(e.target.value))}
            />
          </label>
        </div>
      </div>
    </div>
  );
};

export default PGHostelForm;
