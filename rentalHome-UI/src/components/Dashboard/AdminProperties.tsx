import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import { AppDispatch,RootState } from "../../store/myAppStore";
import { useDispatch, useSelector } from 'react-redux';
import { Property } from "../../models/propertyModel";
import { getPropertiesThunk,deletePropertyThunk } from "../../RentalServices/Slicer/Property/propertyThunk";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';

const AdminProperties: React.FC = () => {
  const properties: Property[] = useSelector((state: RootState) => state.property.properties);
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getPropertiesThunk());
  }, [dispatch]);


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

  return (
    <div>
      <h3>Properties</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Title</th>
            <th>Property Type</th>
            <th>Location</th>
            <th>Address</th>
            <th>Rent</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {properties.map((property) => (
            <tr key={property.id}>
              <td>{property.title}</td>
              <td>{property.propertyType}</td>
              <td>{property.location}</td>
              <td>{property.address}</td>
              <td>{property.rent}</td>
              <td>
                <Button variant="danger" onClick={() => handleDeleteClick(property.id)}>
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default AdminProperties;
