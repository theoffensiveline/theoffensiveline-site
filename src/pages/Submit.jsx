import { db } from '../firebase';
import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";
import { Button } from "@mui/material";
import { styled } from "styled-components"
import { sendDiscordNotification } from '../utils/api/discord';

const StyledForm = styled.div`
  max-width: 400px;
  margin: 0 auto;
  padding: 20px;
`;

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 10px;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
`;

const StyledTextarea = styled.textarea`
  width: 100%;
  padding: 8px;
  margin-bottom: 10px;
`;

const StyledButton = styled(Button)`
  background-color: #007bff;
  color: #fff;
  padding: 10px 20px;
  border: none;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }
`;

export default function Submit() {
    const [submission, setSubmission] = useState("");
    const [name, setName] = useState("");
    const [loading, setLoading] = useState(false);

    const isBlank = (str) => {
        return (!str || /^\s*$/.test(str));
    };

    const submit = async () => {
        if (!isBlank(submission)) {
            try {
                setLoading(true);
                await addDoc(collection(db, "submissions"), {
                    name: name,
                    content: submission,
                });

                // Send Discord notification
                await sendDiscordNotification({
                    name: name || "Anonymous League Manager",
                    content: submission
                }, "submissions");

                setSubmission("");
                setName("");
            } catch (e) {
                console.error("Error during submission: ", e);
            } finally {
                setLoading(false);
            }
        } else {
            //TODO: bully user
        }
    }

    return (
        <StyledForm>
            <StyledLabel>
                Name (optional):
                <StyledInput
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
            </StyledLabel>
            <StyledTextarea
                name="postContent"
                rows={4}
                cols={40}
                value={submission}
                onChange={(event) => setSubmission(event.target.value)}
            />
            <StyledButton onClick={submit} disabled={loading}>Submit</StyledButton>
        </StyledForm>
    );
}