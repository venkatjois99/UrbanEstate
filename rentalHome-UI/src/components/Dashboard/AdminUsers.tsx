import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';
import {deleteUser, getAllUsers} from '../../RentalServices/Services/userService'
import 'react-toastify/dist/ReactToastify.css';
import { toast, ToastContainer } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

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

  const handleDelete = async (email: string) => {
    try {
      // Handle user deletion and await the response
      const response = await deleteUser(email);
      
      if (response.status === 200) {
        toast.success('User deleted successfully');
        setTimeout(() => navigate(0), 1000);
        // console.log('User deleted successfully');
        // Optionally update state/UI here, e.g., removing the user from the list
      } else {
        toast.error('Error deleting user');
      }
    } catch (error: any) {
      // console.error('Error in handleDelete:', error);
      toast.error(error);
    }
  };
  return (
    <div>
      <ToastContainer/>
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
                <Button variant="danger" onClick={() => handleDelete(user.email)}>
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