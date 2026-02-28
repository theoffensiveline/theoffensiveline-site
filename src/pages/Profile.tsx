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

const GoogleIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
    <path
      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
      fill="#4285F4"
    />
    <path
      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
      fill="#34A853"
    />
    <path
      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 s.43 3.45 1.18 4.93l3.66-2.84z"
      fill="#FBBC05"
    />
    <path
      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
      fill="#EA4335"
    />
  </svg>
);

const EditIcon = () => (
  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
    <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7" />
    <path d="m18.5 2.5 3 3L12 15l-4 1 1-4 9.5-9.5z" />
  </svg>
);
const Profile: React.FC = () => {
  const { profile, loadingProfile, updateProfile, linkSleeper } = useAuth();
  const [customDisplayName, setCustomDisplayName] = useState(profile?.customDisplayName || "");
  const [isEditing, setIsEditing] = useState(false);
  const [updating, setUpdating] = useState(false);

  const [sleeperInput, setSleeperInput] = useState("");
  const [sleeperLinking, setSleeperLinking] = useState(false);
  const [sleeperError, setSleeperError] = useState<string | null>(null);
  const [sleeperEditMode, setSleeperEditMode] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    if (!customDisplayName.trim()) return;
    setUpdating(true);
    const success = await updateProfile({
      customDisplayName: customDisplayName.trim(),
    });
    if (success) {
      setIsEditing(false);
    } else {
      alert("Failed to update display name. Please try again.");
    }
    setUpdating(false);
  };

  const handleCancel = () => {
    setCustomDisplayName(profile?.customDisplayName || "");
    setIsEditing(false);
  };

  const handleLinkSleeper = async () => {
    if (!sleeperInput.trim()) return;
    setSleeperLinking(true);
    setSleeperError(null);
    const result = await linkSleeper(sleeperInput.trim());
    if (result.success) {
      setSleeperInput("");
      setSleeperEditMode(false);
    } else {
      setSleeperError(result.error ?? "Something went wrong");
    }
    setSleeperLinking(false);
  };

  if (loadingProfile) {
    return <Container>Loading...</Container>;
  }

  return (
    <Container>
      <Card>
        <Title>Profile</Title>
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", marginBottom: "0.5rem" }}>Email:</label>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <GoogleIcon />
            <span>{profile?.email}</span>
          </div>
        </div>
        <div style={{ marginBottom: "1rem" }}>
          <label style={{ display: "block", marginBottom: "0.5rem" }}>Display Name:</label>
          {!isEditing ? (
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
              <span>{profile?.customDisplayName || "Not set"}</span>
              <button
                onClick={handleEdit}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "inherit",
                }}
              >
                <EditIcon />
              </button>
            </div>
          ) : (
            <div>
              <Input
                type="text"
                placeholder="Enter your display name"
                value={customDisplayName}
                onChange={(e) => setCustomDisplayName(e.target.value)}
              />
              <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                <Button onClick={handleSave} disabled={updating}>
                  {updating ? "Saving..." : "Save"}
                </Button>
                <Button onClick={handleCancel} disabled={updating} style={{ background: "#ccc" }}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </div>

        <div
          style={{
            borderTop: "1px solid rgba(128,128,128,0.2)",
            paddingTop: "1rem",
            marginTop: "0.5rem",
            textAlign: "left",
          }}
        >
          <label style={{ display: "block", marginBottom: "0.75rem", fontWeight: 600 }}>
            Linked Accounts
          </label>
          <div>
            <label style={{ display: "block", marginBottom: "0.5rem", fontSize: "0.875rem" }}>
              Sleeper:
            </label>
            {profile?.sleeperUsername && !sleeperEditMode ? (
              <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
                <span>@{profile.sleeperUsername}</span>
                <button
                  onClick={() => {
                    setSleeperEditMode(true);
                    setSleeperError(null);
                  }}
                  style={{
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    color: "inherit",
                  }}
                >
                  <EditIcon />
                </button>
              </div>
            ) : (
              <div>
                <Input
                  type="text"
                  placeholder="Sleeper username"
                  value={sleeperInput}
                  onChange={(e) => setSleeperInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleLinkSleeper()}
                />
                <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.5rem" }}>
                  <Button onClick={handleLinkSleeper} disabled={sleeperLinking}>
                    {sleeperLinking ? "Linking..." : "Link Account"}
                  </Button>
                  {sleeperEditMode && (
                    <Button
                      onClick={() => {
                        setSleeperEditMode(false);
                        setSleeperInput("");
                        setSleeperError(null);
                      }}
                      disabled={sleeperLinking}
                      style={{ background: "#ccc" }}
                    >
                      Cancel
                    </Button>
                  )}
                </div>
                {sleeperError && (
                  <p style={{ color: "#bc293d", fontSize: "0.875rem", marginTop: "0.5rem" }}>
                    {sleeperError}
                  </p>
                )}
              </div>
            )}
          </div>
        </div>
      </Card>
    </Container>
  );
};

export default Profile;
