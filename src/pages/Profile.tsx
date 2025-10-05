import React, { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 100vh;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

const Card = styled.div`
  background: ${({ theme }) => theme.componentBackground};
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  padding: 2rem;
  text-align: center;
  width: 100%;
  max-width: 400px;
  color: ${({ theme }) => theme.text};
`;

const Title = styled.h1`
  margin-bottom: 1.5rem;
  color: ${({ theme }) => theme.text};
`;

const Input = styled.input`
  width: 100%;
  padding: 0.75rem;
  margin-bottom: 1rem;
  border: 1px solid ${({ theme }) => theme.neutral2};
  border-radius: 4px;
  background: ${({ theme }) => theme.componentBackground};
  color: ${({ theme }) => theme.text};
  font-size: 1rem;

  &:focus {
    outline: none;
    border-color: ${({ theme }) => theme.primary};
  }
`;

const Button = styled.button`
  background: ${({ theme }) => theme.button};
  color: ${({ theme }) => theme.buttonText};
  border: none;
  border-radius: 4px;
  padding: 0.75rem 1.5rem;
  font-size: 1rem;
  font-weight: 500;
  cursor: pointer;
  width: 100%;
  margin-top: 1rem;
  transition: background-color 0.2s;

  &:hover {
    opacity: 0.9;
  }

  &:disabled {
    opacity: 0.6;
    cursor: not-allowed;
  }
`;

const Profile: React.FC = () => {
  const { profile, loadingProfile, updateProfile } = useAuth();
  const [customDisplayName, setCustomDisplayName] = useState(
    profile?.customDisplayName || ""
  );
  const [updating, setUpdating] = useState(false);

  const handleUpdate = async () => {
    if (!customDisplayName.trim()) return;
    setUpdating(true);
    const success = await updateProfile({
      customDisplayName: customDisplayName.trim(),
    });
    if (success) {
      alert("Display name updated successfully!");
    } else {
      alert("Failed to update display name. Please try again.");
    }
    setUpdating(false);
  };

  if (loadingProfile) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container>
      <Card>
        <Title>Profile Settings</Title>
        <p>Update your display name:</p>
        <Input
          type="text"
          placeholder="Enter your display name"
          value={customDisplayName}
          onChange={(e) => setCustomDisplayName(e.target.value)}
        />
        <Button
          onClick={handleUpdate}
          disabled={updating || !customDisplayName.trim()}
        >
          {updating ? "Updating..." : "Update Name"}
        </Button>
      </Card>
    </Container>
  );
};

export default Profile;
