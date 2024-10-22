import React, { ChangeEvent, useState } from "react";
import classNames from "classnames";
import ApartmentForm from "./ApartmentForm";
import PGHostelForm from "./PGHostelForm";
import FlatmateForm from "./FlatmateForm";
import "../sellpage.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMapMarkerAlt,
  faFileAlt,
  faImage,
  faUser,
  faRupeeSign,
  faBuilding,
  faHome,
  faUserFriends,
} from "@fortawesome/free-solid-svg-icons";

// import { saveProperty } from '../../../services/Propertyservice'

interface FormData {
  propertyType: string;
  title: string;
  location: string;
  address: string;
  rent: number;
  description: string;
  images: string[];
  pgSharingType: string;
  meals: string;
  pgLivingType: string;
  availableRooms: number;
  sharingType: string;
  sharedBedrooms: number;
  furnishing: string;
  preferredFlatmate: string;
  bhkType: string;
}

const initialFormData: FormData = {
  propertyType: "",
  title: "",
  location: "",
  address: "",
  rent: 0,
  description: "",
  images: [],
  pgSharingType: "",
  meals: "",
  pgLivingType: "",
  availableRooms: 0,
  sharingType: "",
  sharedBedrooms: 0,
  furnishing: "",
  preferredFlatmate: "",
  bhkType: "",
};

const PropertyListing: React.FC = () => {
  const [images, setImages] = useState<string[]>([]);
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<FormData>(initialFormData);

  const handleChange = (
    event: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;
    const imageArray: string[] = [];
    let filesRead = 0;
    for (let i = 0; i < files.length; i++) {
      const reader = new FileReader();
      reader.onloadend = () => {
        if (reader.result) {
          imageArray.push(reader.result as string);
        }
        filesRead += 1;
        if (filesRead === files.length) {
          setImages(imageArray);
        }
      };
      reader.onerror = () => {
        console.error("File reading error");
      };
      reader.readAsDataURL(files[i]);
    }
  };

  const handleSubmit = async (event: { preventDefault: () => void }) => {
    event.preventDefault();

    // Combine formData and images into one object
    const dataToSubmit = {
      ...formData,
      images: images, // Add images to the payload
    };

    try {
      // const response = await saveProperty(dataToSubmit); // Use the service
      // console.log('Data saved successfully:', response);
      console.log("datasaved");
      setFormData(initialFormData);
      setImages([]);
      setStep(1);
    } catch (error) {
      console.error("Error saving data:", error);
    }
  };

  const handleNext = () => {
    if (!formData.propertyType) {
      alert("Please select a property type.");
    } else {
      setStep(2);
    }
  };

  return (
    <>
      <div className="proppage">
        <div className="property-listing-container">
          <div className="property-listing">
            <form className="property-form" onSubmit={handleSubmit}>
              {step === 1 ? (
                <>
                  <div className="property-type-section">
                    <label className="property-type-label">
                      Select Property Type:
                    </label>
                    <div className="property-type-buttons">
                      {[
                        { type: "apartment", icon: faBuilding },
                        { type: "pg", icon: faHome },
                        { type: "flatmate", icon: faUserFriends },
                      ].map(({ type, icon }) => (
                        <button
                          key={type}
                          type="button"
                          className={classNames("property-type-button", {
                            active: formData.propertyType === type,
                          })}
                          onClick={() =>
                            setFormData((prev) => ({
                              ...prev,
                              propertyType: type,
                            }))
                          }
                        >
                          <FontAwesomeIcon icon={icon} className="large-icon" />
                          {type.charAt(0).toUpperCase() + type.slice(1)}
                        </button>
                      ))}
                    </div>
                  </div>

                  <div className="form-row">
                    <label>
                      <FontAwesomeIcon icon={faUser} className="iconp" />
                      Title:
                      <input
                        type="text1"
                        name="title"
                        className="inputfield"
                        value={formData.title}
                        onChange={handleChange}
                        required
                      />
                    </label>
                  </div>
                  <div className="form-row">
                    <label>
                      <FontAwesomeIcon
                        icon={faMapMarkerAlt}
                        className="iconp"
                      />
                      Location:
                      <select
                        name="location"
                        className="inputfield"
                        value={formData.location}
                        onChange={handleChange}
                        required
                      >
                        <option value="">Select Location</option>
                        {[
                          "Mumbai",
                          "Bangalore",
                          "Pune",
                          "Chennai",                        
                          "Hyderabad",
                          "Delhi",
                          
                        ].map((city) => (
                          <option key={city} value={city}>
                            {city}
                          </option>
                        ))}
                      </select>
                    </label>
                  </div>

                  <div className="form-row">
                    <label>
                      <FontAwesomeIcon icon={faFileAlt} className="iconp" />
                      Address:
                      <input
                        type="text1"
                        name="address"
                        className="inputfield"
                        value={formData.address}
                        onChange={handleChange}
                        required
                      />
                    </label>
                  </div>
                  <div className="form-row">
                    <label>
                      <FontAwesomeIcon icon={faRupeeSign} className="iconp" />
                      Rent Price:
                      <input
                        type="number"
                        name="rent"
                        className="inputfield"
                        value={formData.rent}
                        onChange={handleChange}
                        required
                      />
                    </label>
                  </div>

                  <button
                    type="button"
                    className="next-button"
                    onClick={handleNext}
                  >
                    Next
                  </button>
                </>
              ) : (
                <>
                  <div className="form-row">
                    <label>
                      <FontAwesomeIcon icon={faFileAlt} className="iconp" />
                      Description:
                      <textarea
                        name="description"
                        className="inputfield"
                        value={formData.description}
                        onChange={handleChange}
                        required
                      />
                    </label>
                  </div>

                  <div className="form-row">
                    <label>
                      <FontAwesomeIcon icon={faImage} className="iconp" />
                      Upload Images:
                      <input
                        type="file"
                        multiple
                        accept="image/*"
                        className="inputfield"
                        onChange={handleFileChange}
                      />
                    </label>
                  </div>

                  {images.length > 0 && (
                    <div className="image-preview-container">
                      {images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Preview ${index}`}
                          className="image-preview"
                        />
                      ))}
                    </div>
                  )}

                  {formData.propertyType === "apartment" && (
                    <ApartmentForm
                      formData={formData}
                      handleChange={handleChange}
                    />
                  )}
                  {formData.propertyType === "pg" && (
                    <PGHostelForm
                      formData={formData}
                      handleChange={handleChange}
                    />
                  )}
                  {formData.propertyType === "flatmate" && (
                    <FlatmateForm
                      formData={formData}
                      handleChange={handleChange}
                    />
                  )}

                  <div className="form-actions">
                    <button
                      type="button"
                      className="back-button"
                      onClick={() => setStep(1)}
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      className="reset-button"
                      onClick={() => setFormData(initialFormData)}
                    >
                      Reset
                    </button>
                    <button type="submit" className="submit-button">
                      Submit
                    </button>
                  </div>
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default PropertyListing;
