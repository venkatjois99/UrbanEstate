import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';
import {getAllUsers} from '../../RentalServices/Services/userService'

interface User {
  userId: number;
  userName: string;
  email: string;
  phoneNumber: string;
}

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState<boolean>(true); // Loading state to show a loading indicator
  const [error, setError] = useState<string | null>(null); // Error state to display any potential errors

  useEffect(() => {
    // Fetch users using the getAllUsers function
    const fetchUsers = async () => {
      try {
        const userData = await getAllUsers();
        setUsers(userData);
      } catch (err) {
        setError('Failed to load users. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []); // Empty dependency array to run only once when the component mounts

  const handleDelete = (userId: number) => {
    // Handle user deletion
    axios
      .delete(`/api/users/${userId}`)
      .then(() => {
        setUsers(users.filter((user) => user.userId !== userId));
      })
      .catch((err) => {
        setError('Failed to delete user. Please try again later.');
        console.error(err);
      });
  };

  return (
    <div>
      <h3>Users</h3>
      {loading && <p>Loading...</p>} {/* Display loading message while fetching users */}
      {error && <p style={{ color: 'red' }}>{error}</p>} {/* Display error message if there's an error */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.userId}>
              <td>{user.userName}</td>
              <td>{user.email}</td>
              <td>{user.phoneNumber}</td>
              <td>
                <Button variant="danger" onClick={() => handleDelete(user.userId)}>
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

export default AdminUsers;