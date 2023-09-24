import { db } from '../firebase';
import { collection, addDoc } from "firebase/firestore";
import { useState } from "react";
import { Button } from "@mui/material";
import { styled } from "styled-components"
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
                sendDiscordNoti().then(() => {
                    setSubmission("");
                    setName("");
                });
            } catch (e) {
                console.error("Error during submission: ", e);
            } finally {
                setLoading(false);
            }
        } else {
            //TODO: bully user
        }
    }

    const sendDiscordNoti = async () => {
        const request = new XMLHttpRequest();
        request.open("POST", "https://discord.com/api/webhooks/1154621303152705587/v37_IuEpCgQZyjn5Za4T-nChIiUGakhWB_eq2bfSWjFScRwgJIpphUZ-RRAG6uNRWL9V");
        request.setRequestHeader('Content-type', 'application/json');
        const params = {
            username: name || "Anonymous League Manager",
            content: submission
        }
        request.send(JSON.stringify(params));
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
