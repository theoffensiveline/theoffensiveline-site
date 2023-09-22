import {db} from '../firebase';
import { collection, addDoc } from "firebase/firestore";
import {useState} from "react";
import {Button} from "@mui/material";
export default function Submit() {
    const [submission, setSubmission] = useState("");
    const [name, setName] = useState("");

    const isBlank = (str) => {
        return (!str || /^\s*$/.test(str));
    };

    const submit = async () => {
        if (!isBlank(submission)) {
            try {
                await addDoc(collection(db, "submissions"), {
                    name: name,
                    content: submission,
                });
                await sendDiscordNoti();
            } catch (e) {
                console.error("Error during submission: ", e);
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
        <>
            <label>
                Name:
                <input
                    type="text"
                    value={name}
                    onChange={(event) => setName(event.target.value)}
                />
            </label>
            <textarea
                name="postContent"
                rows={4}
                cols={40}
                value={submission}
                onChange={(event) => setSubmission(event.target.value)}
            />
            <Button onClick={submit}>Submit</Button>
        </>
    );
}