import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import { styled } from "styled-components";
import { useAuth } from "../contexts/AuthContext";
import { sendDiscordNotification } from "../utils/api/discord";

export type FeedbackType = "Bug" | "Feature Request" | "General";

interface FeedbackModalProps {
  open: boolean;
  onClose: () => void;
}

const NiceBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${({ theme }) => theme.background};
  border: 2px solid ${({ theme }) => theme.newsBlue};
  color: ${({ theme }) => theme.text};
  max-width: 450px;
  width: 90vw;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  h3 {
    color: ${({ theme }) => theme.text};
    margin-bottom: 4px;
  }

  .subtitle {
    color: ${({ theme }) => theme.text}99;
    font-size: 0.85rem;
    margin-bottom: 16px;
  }

  .MuiInputLabel-root {
    color: ${({ theme }) => theme.text}99;
  }

  .MuiOutlinedInput-root {
    color: ${({ theme }) => theme.text};

    .MuiOutlinedInput-notchedOutline {
      border-color: ${({ theme }) => theme.text}33;
    }

    &:hover .MuiOutlinedInput-notchedOutline {
      border-color: ${({ theme }) => theme.text}66;
    }

    &.Mui-focused .MuiOutlinedInput-notchedOutline {
      border-color: ${({ theme }) => theme.newsBlue};
    }
  }

  .MuiSelect-icon {
    color: ${({ theme }) => theme.text}99;
  }

  .MuiMenuItem-root {
    color: ${({ theme }) => theme.text};

    &:hover {
      background-color: ${({ theme }) => theme.newsBlue}22;
    }
  }
`;

const SubmitButton = styled.button`
  border: 1px solid ${({ theme }) => theme.newsBlue};
  border-radius: 8px;
  background: ${({ theme }) => theme.newsBlue};
  height: 3rem;
  width: 100%;
  color: ${({ theme }) => theme.background};
  margin-top: 1rem;
  font-weight: bold;
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:hover {
    background: ${({ theme }) => theme.newsBlue}dd;
  }

  &:disabled {
    background: ${({ theme }) => theme.text}33;
    border-color: ${({ theme }) => theme.text}33;
    cursor: not-allowed;
  }
`;

const StatusMessage = styled.p<{ $error?: boolean }>`
  margin-top: 12px;
  font-size: 0.9rem;
  color: ${({ $error, theme }) => ($error ? "#ff4444" : `${theme.newsBlue}`)};
`;

const FeedbackModal = ({ open, onClose }: FeedbackModalProps) => {
  const { currentUser, profile } = useAuth();
  const location = useLocation();

  const [type, setType] = useState<FeedbackType>("Bug");
  const [subject, setSubject] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<{ message: string; error: boolean } | null>(null);

  // Reset form when modal is opened
  useEffect(() => {
    if (open) {
      setType("Bug");
      setSubject("");
      setDescription("");
      setStatus(null);
    }
  }, [open]);

  const canSubmit = subject.trim() !== "" && description.trim() !== "" && !loading;

  const handleSubmit = async () => {
    if (!canSubmit) return;
    setLoading(true);
    setStatus(null);

    const displayName = profile?.customDisplayName || currentUser?.displayName || "Unknown user";
    const email = currentUser?.email || "no email on file";
    const route = location.pathname;

    const content = [
      `[${type}] ${subject.trim()}`,
      `Submitted by: ${displayName} (${email})`,
      `Page: ${route}`,
      ``,
      description.trim(),
    ].join("\n");

    try {
      await sendDiscordNotification({ name: displayName, content }, "feedback");
      setStatus({ message: "Feedback sent! Thank you.", error: false });
      // Close shortly after success so the user sees confirmation
      setTimeout(() => {
        onClose();
      }, 1200);
    } catch (err) {
      console.error("Failed to send feedback:", err);
      setStatus({ message: "Something went wrong. Please try again.", error: true });
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal open={open} onClose={onClose} aria-labelledby="feedback-modal-title">
      <NiceBox>
        <h3 id="feedback-modal-title">Submit Feedback</h3>
        <p className="subtitle">Found a bug? Have an idea? Let us know.</p>

        <FormControl fullWidth margin="normal">
          <InputLabel id="feedback-type-label">Type</InputLabel>
          <Select<FeedbackType>
            labelId="feedback-type-label"
            label="Type"
            value={type}
            onChange={(e) => setType(e.target.value as FeedbackType)}
          >
            <MenuItem value="Bug">Bug Report</MenuItem>
            <MenuItem value="Feature Request">Feature Request</MenuItem>
            <MenuItem value="General">General Comment</MenuItem>
          </Select>
        </FormControl>

        <TextField
          fullWidth
          margin="normal"
          label="Subject"
          value={subject}
          onChange={(e) => setSubject(e.target.value)}
          placeholder="Brief summary"
        />

        <TextField
          fullWidth
          margin="normal"
          label="Description"
          multiline
          rows={4}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Tell us what happened, or what you'd like to see..."
        />

        <SubmitButton onClick={handleSubmit} disabled={!canSubmit}>
          {loading ? "Sending..." : "Send Feedback"}
        </SubmitButton>

        {status && <StatusMessage $error={status.error}>{status.message}</StatusMessage>}
      </NiceBox>
    </Modal>
  );
};

export default FeedbackModal;
