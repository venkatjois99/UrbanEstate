import React from "react";
import { Card } from "react-bootstrap";

interface ProfileCardProps {
  userName: string;
  email: string;
  phoneNumber: string;
}

const ProfileCard: React.FC<ProfileCardProps> = ({ userName, email, phoneNumber }) => {
  return (
    <Card style={{ width: '18rem' }} className="position-absolute mt-2">
      <Card.Body>
        <Card.Title>{userName}</Card.Title>
        <Card.Subtitle className="mb-2 text-muted">{email}</Card.Subtitle>
        <Card.Text>
          <strong>Phone:</strong> {phoneNumber}
        </Card.Text>
      </Card.Body>
    </Card>
  );
};

export default ProfileCard;
