import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';

interface Property {
  userId: number;
  title: string;
  propertyType: string;
  location: string;
  address: string;
  rent: number;
}

const AdminProperties: React.FC = () => {
  const [properties, setProperties] = useState<Property[]>([]);

  useEffect(() => {
    // Fetch properties from the API
    axios.get('/api/properties').then((response) => setProperties(response.data));
  }, []);

  const handleDelete = (propertyId: number) => {
    // Delete property by ID
    axios.delete(`/api/properties/${propertyId}`).then(() => {
      setProperties(properties.filter((property) => property.userId !== propertyId));
    });
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
            <tr key={property.userId}>
              <td>{property.title}</td>
              <td>{property.propertyType}</td>
              <td>{property.location}</td>
              <td>{property.address}</td>
              <td>{property.rent}</td>
              <td>
                <Button variant="danger" onClick={() => handleDelete(property.userId)}>
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
