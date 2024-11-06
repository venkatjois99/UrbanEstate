import React, { useEffect, useState } from 'react';
import { Table, Button } from 'react-bootstrap';
import axios from 'axios';

interface User {
  userId: number;
  userName: string;
  email: string;
  phoneNumber: string;
  userRole: string;
}

const AdminUsers: React.FC = () => {
  const [users, setUsers] = useState<User[]>([]);

  useEffect(() => {
    // Fetch users from the API
    axios.get('/api/users').then((response) => setUsers(response.data));
  }, []);

  const handleDelete = (userId: number) => {
    // Delete user by ID
    axios.delete(`/api/users/${userId}`).then(() => {
      setUsers(users.filter((user) => user.userId !== userId));
    });
  };

  return (
    <div>
      <h3>Users</h3>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Name</th>
            <th>Email</th>
            <th>Phone Number</th>
            <th>User Role</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.userId}>
              <td>{user.userName}</td>
              <td>{user.email}</td>
              <td>{user.phoneNumber}</td>
              <td>{user.userRole}</td>
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
