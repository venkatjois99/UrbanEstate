import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import ApartmentForm from "./ApartmentForm";
import PGHostelForm from "./PGHostelForm";
import FlatmateForm from "./FlatmateForm";
import "../sellpage.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationArrow,
  faCompass,
  faMapMarkerAlt,
  faFileAlt,
  faUser,
  faRupeeSign,
  faHome,
  faBed,
  faUsers,
  faTimes,
  faUpload,
} from "@fortawesome/free-solid-svg-icons";
import uploadImagesToCloudinary from "../../../RentalServices/Services/cloudinaryService";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../../store/myAppStore";
import { createPropertyThunk } from "../../../RentalServices/Slicer/Property/propertyThunk";
import Modal from "react-bootstrap/Modal";
import MyMap from "../../map/myMap";
import Button from "react-bootstrap/Button";
import { LatLngExpression } from "leaflet";
import MapSearch from "../../map/mapSearch";

// Validation schema for the form
const validationSchema = Yup.object().shape({
  propertyType: Yup.string().required("Property type is required"),
  title: Yup.string().required("Title is required"),
  location: Yup.string().required("Location is required"),
  address: Yup.string().required("Address is required"),
  rent: Yup.number().required("Rent is required"),
  description: Yup.string().required("Description is required"),
});

const PropertyListing: React.FC = () => {
  const [imageFiles, setImageFiles] = useState<File[]>([]);
  const dispatch = useDispatch<AppDispatch>();
  const propertyForm = useFormik({
    initialValues: {
      propertyType: "",
      title: "",
      location: "",
      address: "",
      rent: 0,
      description: "",
      images: [], // Add this line
      pgSharingType: "",
      pgLivingType: "",
      availableRooms: 0,
      sharingType: "",
      sharedBedrooms: 0,
      furnishing: "",
      preferredFlatmate: "",
      bhkType: "",
      latLng :"",
    },
    validationSchema,
    onSubmit: async (values) => {
      console.log("Form Submitted values:", { ...values, images: imageFiles });
      try {
        const imageUrls = await uploadImagesToCloudinary(imageFiles);
        const submitValues = { ...values, images: imageUrls };
        console.log("Cloudinary Submitted values:", submitValues);
        const res = await dispatch(createPropertyThunk(submitValues));
        console.log(res);
      } catch (error) {
        console.error("Error uploading images:", error);
      }
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files) return;

    const newFiles = Array.from(files);
    setImageFiles((prev) => [...prev, ...newFiles]);
    propertyForm.setFieldValue("images", [
      ...propertyForm.values.images,
      ...newFiles,
    ]);
  };

  const handleRemoveImage = (index: number) => {
    const updatedFiles = imageFiles.filter((_, i) => i !== index);
    setImageFiles(updatedFiles);
    propertyForm.setFieldValue("images", updatedFiles);
  };

  const handleReset = () => {
    propertyForm.resetForm();
    setImageFiles([]);
  };
  const [showMapModal, setShowMapModal] = useState(false);
  const [mapCenter, setMapCenter] = useState<LatLngExpression | null>(null);
  const [selectedLocation, setSelectedLocation] =
    useState<LatLngExpression | null>();
  const handleMapLocationSelect = (position: LatLngExpression) => {
    setSelectedLocation(position);
    console.log(selectedLocation);
  };
  const handleCitySelect = (city: string, location: [number, number]) => {
    // setSelectedCity(city);
    setMapCenter(location); // Set the map center to the selected city location
  };

  //     Bangalore: [
  //       [12.9715987, 77.5945627], // Bangalore City Center
  //     ],
  //     Chennai: [
  //       [13.0827, 80.2707], // Chennai City Center
  //     ],
  //     Delhi: [
  //       [28.6139, 77.209], // Delhi City Center
  //     ],
  //     Mumbai: [
  //       [19.076, 72.8777], // Mumbai City Center
  //     ],
  //     Pune: [
  //       [18.5204, 73.8567], // Pune City Center
  //     ],
  //     Hyderabad: [
  //       [17.385, 78.4867], // Hyderabad City Center
  //     ],
  // };

  return (
    <div className="property-listing">
      <form onSubmit={propertyForm.handleSubmit} className="property-form">
        <div className="property-type-section">
          <label>Select Property Type:</label>
          {propertyForm.errors.propertyType && (
            <div className="error">{propertyForm.errors.propertyType}</div>
          )}
          <div className="property-type-buttons">
            <button
              type="button"
              className={
                propertyForm.values.propertyType === "apartment" ? "active" : ""
              }
              onClick={() =>
                propertyForm.setFieldValue("propertyType", "apartment")
              }
            >
              <FontAwesomeIcon icon={faHome} /> Apartment
            </button>
            <button
              type="button"
              className={
                propertyForm.values.propertyType === "pg" ? "active" : ""
              }
              onClick={() => propertyForm.setFieldValue("propertyType", "pg")}
            >
              <FontAwesomeIcon icon={faBed} /> PG
            </button>
            <button
              type="button"
              className={
                propertyForm.values.propertyType === "flatmates" ? "active" : ""
              }
              onClick={() =>
                propertyForm.setFieldValue("propertyType", "flatmates")
              }
            >
              <FontAwesomeIcon icon={faUsers} /> Flatmates
            </button>
          </div>
        </div>

        {/* Common Fields */}
        <div className="form-row">
          <label>
            <FontAwesomeIcon icon={faUser} className="iconp" />
            Title:
            <input
              type="text"
              name="title"
              value={propertyForm.values.title}
              onChange={propertyForm.handleChange}
              required
            />
          </label>
          {propertyForm.errors.title && (
            <div className="error">{propertyForm.errors.title}</div>
          )}
        </div>

        <div className="form-row">
          <label>
            <FontAwesomeIcon icon={faMapMarkerAlt} className="iconp" />
            Location:
            <select
              name="location"
              value={propertyForm.values.location}
              onChange={propertyForm.handleChange}
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
          {propertyForm.errors.location && (
            <div className="error">{propertyForm.errors.location}</div>
          )}
        </div>

        <div className="form-row">
          <label>
            <FontAwesomeIcon icon={faFileAlt} className="iconp" />
            Address:
            <input
              type="text"
              name="address"
              value={propertyForm.values.address}
              onChange={propertyForm.handleChange}
              required
            />
          </label>
          {propertyForm.errors.address && (
            <div className="error">{propertyForm.errors.address}</div>
          )}
        </div>
        {/* Checkbox to set location on map */}
        <div className="form-row">
          <button
            type="button"
            className="btn btn-secondary" // You can customize the class for styling
            onClick={() => setShowMapModal(!showMapModal)}
          >
            <FontAwesomeIcon icon={faLocationArrow} className="iconp" />
            {showMapModal ? "Close Map" : "Set Location on Map"}
          </button>
        </div>

        {/* Modal for map */}
        <Modal
          show={showMapModal}
          onHide={() => setShowMapModal(false)}
          centered
        >
          <Modal.Header closeButton>
            <Modal.Title>Select Location</Modal.Title>
          </Modal.Header>
          <Modal.Body className="list-modal">
            <div className="map-cont-list-page">
              <MyMap
                positions={[]} // Pass any predefined locations if needed
                allowSelection={true}
                onLocationSelect={handleMapLocationSelect}
                center={mapCenter || [12.9715987, 77.5945627]} // Default center
              />
            </div>
            <div className="list-page-map-search-container">
              <MapSearch onCitySelect={handleCitySelect} />
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => setShowMapModal(false)}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>

        <div className="form-row">
          <label>
            <FontAwesomeIcon icon={faFileAlt} className="iconp" />
            Description:
            <textarea
              name="description"
              value={propertyForm.values.description}
              onChange={propertyForm.handleChange}
              required
              placeholder="Please provide a description about your property"
            />
          </label>
          {propertyForm.errors.description && (
            <div className="error">{propertyForm.errors.description}</div>
          )}
        </div>
        <div className="form-row">
          <label>
            <FontAwesomeIcon icon={faRupeeSign} className="iconp" />
            Rent Price:
            <input
              type="number"
              name="rent"
              value={propertyForm.values.rent}
              onChange={propertyForm.handleChange}
              required
            />
          </label>
          {propertyForm.errors.rent && (
            <div className="error">{propertyForm.errors.rent}</div>
          )}
        </div>

        {/* Enhanced Image Upload Section */}
        <div className="form-row">
          <label>
            <FontAwesomeIcon icon={faUpload} className="iconp" />
            Upload Images:
          </label>
          <input
            type="file"
            multiple
            accept="image/*"
            onChange={handleFileChange}
          />
        </div>

        {/* Image Preview Section */}
        {imageFiles.length > 0 && (
          <div className="image-preview-container">
            {imageFiles.map((file, index) => (
              <div key={index} className="image-preview">
                <img
                  src={URL.createObjectURL(file)}
                  alt={`Preview ${index + 1}`}
                />
                <button
                  type="button"
                  onClick={() => handleRemoveImage(index)}
                  className="remove-button"
                >
                  <FontAwesomeIcon icon={faTimes} />{" "}
                  {/* Using Font Awesome icon */}
                </button>
              </div>
            ))}
          </div>
        )}

        {/* Conditional Form Sections */}
        {propertyForm.values.propertyType === "apartment" && (
          <ApartmentForm
            formData={propertyForm.values}
            setFieldValue={propertyForm.setFieldValue}
          />
        )}
        {propertyForm.values.propertyType === "pg" && (
          <PGHostelForm
            formData={propertyForm.values}
            setFieldValue={propertyForm.setFieldValue}
          />
        )}
        {propertyForm.values.propertyType === "flatmates" && (
          <FlatmateForm
            formData={propertyForm.values}
            setFieldValue={propertyForm.setFieldValue}
          />
        )}
        <div className="rsButton">
          <button type="button" className="reset-button" onClick={handleReset}>
            Reset
          </button>
          <button type="submit" className="submit-button">
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default PropertyListing;
