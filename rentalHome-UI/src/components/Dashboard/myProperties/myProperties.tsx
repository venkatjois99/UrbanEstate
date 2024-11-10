import { AppDispatch,RootState } from "../../../store/myAppStore";
import { useDispatch, useSelector } from 'react-redux';
import { getPropertiesThunk,updatePropertyThunk,deletePropertyThunk } from "../../../RentalServices/Slicer/Property/propertyThunk";
import { Property } from "../../../models/propertyModel";
import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import ListPageCard from "../../additional-Components/listPageCard/listPageCard";
import './myProperties.css';
import Swal from 'sweetalert2';

const MyProperties =()=>{
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    const userIdFromStore = useSelector((state: RootState) => state.user.userId);
  
    const [editingPropertyId, setEditingPropertyId] = useState<number | null>(null);
    const [formData, setFormData] = useState<Partial<Property>>({});
  
    const properties: Property[] = useSelector((state: RootState) => state.property.properties);
    const myProperties = properties.filter((property) => property.userId === userIdFromStore);
  
    // Fetch properties once on component mount
    useEffect(() => {
      dispatch(getPropertiesThunk());
    }, [dispatch]);
  
    // Handle edit button click
    const handleEditClick = (property: Property) => {
        setEditingPropertyId(property.id);  // Set the property being edited
        setFormData({
          rent: property.rent,
          description: property.description,
          // Conditionally populate fields based on the property type
          ...(property.propertyType === 'house' || property.propertyType === 'apartment'
            ? { bhkType: property.bhkType, furnishing: property.furnishing }
            : {}),
          ...(property.propertyType === 'pg'
            ? { pgSharingType: property.pgSharingType, pgLivingType: property.pgLivingType, availableRooms: property.availableRooms }
            : {}),
          ...(property.propertyType === 'flatmates'
            ? {  sharedBedrooms: property.sharedBedrooms, preferredFlatmate: property.preferredFlatmate }
            : {}),
        });
      };
    
      // Handle form field changes
      const handleFieldChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;  
      
      
        // Ensure numerical fields are parsed as numbers
        if (name === 'rent') {
          setFormData((prevData) => ({ ...prevData, [name]: parseFloat(value) || 0 })); // Set to 0 if parsing fails
        } else {
          setFormData((prevData) => ({ ...prevData, [name]: value }));
        }
      };
      const handleDeleteClick = async (propertyId: number) => {
        // Use SweetAlert2 for a custom confirmation modal
        const result = await Swal.fire({
          title: 'Are you sure?',
          text: 'This action cannot be undone.',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonText: 'Yes, delete it!',
          cancelButtonText: 'Cancel',
        });
        if (result.isConfirmed) {
          try {
            // Dispatch the delete thunk action
            await dispatch(deletePropertyThunk(propertyId));
            toast.success("Property deleted successfully!"); // Show success toast
            setTimeout(() => navigate(0), 1000);
          } catch (error) {
            // console.error("Error deleting property:", error);
            toast.error("Failed to delete property. Please try again."); // Show error toast
          }
        }
      };
      // Handle form submit (send data to backend)
      const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
      
        // Find the original property that we're editing
        const propertyToUpdate = myProperties.find(p => p.id === editingPropertyId);
      
        if (!propertyToUpdate) {
          toast.error("Property not found.");
          return;
        }
      
        // Merge updated fields with the existing property details
        const updatedProperty = {
          ...propertyToUpdate,  // Include all the unchanged values
          ...formData,  // Include only the updated fields
        };
      
        // The backend expects every property to have these fields
        const propertyForBackend = {
          id: updatedProperty.id,
          userId: updatedProperty.userId,
          propertyType: updatedProperty.propertyType,
          title: updatedProperty.title,
          location: updatedProperty.location,
          address: updatedProperty.address,
          rent: updatedProperty.rent,
          description: updatedProperty.description,
          images: updatedProperty.images || [],  // If no images, pass an empty array
          pgSharingType: updatedProperty.pgSharingType,
          pgLivingType: updatedProperty.pgLivingType,
          availableRooms: updatedProperty.availableRooms,
          sharedBedrooms: updatedProperty.sharedBedrooms,
          furnishing: updatedProperty.furnishing,
          preferredFlatmate: updatedProperty.preferredFlatmate,
          bhkType: updatedProperty.bhkType,
          postingDate: updatedProperty.postingDate,
          latitude: updatedProperty.latitude ?? null,  // Handle null values
          longitude: updatedProperty.longitude ?? null, // Handle null values
        };
      
        // console.log(updatedProperty);
        // console.log(propertyForBackend);
      
        try {
          // Dispatch the update action
          const res = await dispatch(updatePropertyThunk(updatedProperty));
      
          // Check if the update was successful
          if (res.type === 'property/updatePropertyThunk/fulfilled') {
            toast.success("Property updated successfully!"); // Success toast
          } else {
            toast.error("Failed to update property. Please try again."); // Error toast if update fails
          }
      
          setEditingPropertyId(null); // Reset the edit state after submitting
        } catch (error) {
          // console.error("Error updating property:", error);
          toast.error("An error occurred while updating the property. Please try again."); // Error toast for catching any errors
        }
      };
      if(myProperties.length == 0){
        return(
          <p>No Properties</p>
        )
      }
      return (
        <div>
                 <ToastContainer />

          {editingPropertyId === null ? (
            <div className="myProperties-card-cont">
              {myProperties.map((property) => (
                <div key={property.id} className="property-card-container">
                  <div className="property-card-content d-flex gap-2">
                    <ListPageCard item={property} extraShow={false} />
                    <div className="property-card-buttons">
                      <button onClick={() => handleEditClick(property)}>Edit</button>
                      {/* <button>Delete</button> */}
                      <button 
              onClick={() => handleDeleteClick(property.id)} 
             
            >
              Delete
            </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            // Show the edit form for the property being edited
            <form onSubmit={handleSubmit} className="edit-property-form">
              {myProperties
                .filter((property) => property.id === editingPropertyId)
                .map((property) => (
                  <div key={property.id}>
                    <h2>{property.title}</h2> {/* Display property title at the top */}
                    <div className="edit-property-field">
                      <label>Rent:</label>
                      <input
                        type="number"
                        className="edit-property-input"
                        name="rent"
                        value={formData.rent || ''}
                        onChange={handleFieldChange}
                      />
                    </div>
    
                    <div className="edit-property-field">
                      <label>Description:</label>
                      <textarea
                        className="edit-property-textarea"
                        name="description"
                        value={formData.description || ''}
                        onChange={handleFieldChange}
                      />
                    </div>
    
                    {/* Conditional Fields Based on Property Type */}
                    {property.propertyType === 'house' || property.propertyType === 'apartment' ? (
                      <>
                        <div className="edit-property-field">
                          <label>BHK Type:</label>
                          <select
                            className="edit-property-select"
                            name="bhkType"
                            value={formData.bhkType || ''}
                            onChange={handleFieldChange}
                          >
                            <option value="">Select BHK Type</option>
                            {['1 BHK', '2 BHK', '3 BHK', '4 BHK', '5 BHK'].map((type) => (
                              <option key={type} value={type}>
                                {type}
                              </option>
                            ))}
                          </select>
                        </div>
    
                        <div className="edit-property-field">
                          <label>Furnishing:</label>
                          <select
                            className="edit-property-select"
                            name="furnishing"
                            value={formData.furnishing || ''}
                            onChange={handleFieldChange}
                          >
                            <option value="">Select Furnishing</option>
                            <option value="furnished">Furnished</option>
                            <option value="semi-furnished">Semi-Furnished</option>
                            <option value="unfurnished">Unfurnished</option>
                          </select>
                        </div>
                      </>
                    ) : property.propertyType === 'pg' ? (
                      <>
                        <div className="edit-property-field">
                          <label>PG Sharing Type:</label>
                          <select
                            className="edit-property-select"
                            name="pgSharingType"
                            value={formData.pgSharingType || ''}
                            onChange={handleFieldChange}
                          >
                            <option value="">Select PG Sharing Type</option>
                            <option value="1 Sharing">1 Sharing</option>
                            <option value="2 Sharing">2 Sharing</option>
                            <option value="3 Sharing">3 Sharing</option>
                            <option value="4 Sharing">4 Sharing</option>
                          </select>
                        </div>
    
                        <div className="edit-property-field">
                          <label>PG Living Type:</label>
                          <select
                            className="edit-property-select"
                            name="pgLivingType"
                            value={formData.pgLivingType || ''}
                            onChange={handleFieldChange}
                          >
                            <option value="">Select PG Living Type</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Co-living">Co-living</option>
                          </select>
                        </div>
    
                        <div className="edit-property-field">
                          <label>Available Rooms:</label>
                          <input
                            className="edit-property-input"
                            type="number"
                            name="availableRooms"
                            value={formData.availableRooms || ''}
                            onChange={handleFieldChange}
                          />
                        </div>
                      </>
                    ) : property.propertyType === 'flatmates' ? (
                      <>
                        <div className="edit-property-field">
                          <label>Shared Bedrooms:</label>
                          <select
                            className="edit-property-select"
                            name="sharedBedrooms"
                            value={formData.sharedBedrooms || ''}
                            onChange={handleFieldChange}
                          >
                            <option value="">Select Shared Bedrooms</option>
                            {[1, 2, 3, 4].map((num) => (
                              <option key={num} value={num}>
                                {num}
                              </option>
                            ))}
                          </select>
                        </div>
    
                        <div className="edit-property-field">
                          <label>Preferred Flatmate:</label>
                          <select
                            className="edit-property-select"
                            name="preferredFlatmate"
                            value={formData.preferredFlatmate || ''}
                            onChange={handleFieldChange}
                          >
                            <option value="">Select Preferred Flatmate</option>
                            <option value="any">Any</option>
                            <option value="male">Male</option>
                            <option value="female">Female</option>
                          </select>
                        </div>
                      </>
                    ) : null}
    
                    <div className="edit-property-buttons">
                      <button type="submit" className="submit-button">Update</button>
                      <button
                        type="button"
                        className="cancel-button"
                        onClick={() => setEditingPropertyId(null)}
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                ))}
            </form>
          )}
        </div>
      );
    };
    
  
export default MyProperties;