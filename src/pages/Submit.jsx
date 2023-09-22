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
                const docRef = await addDoc(collection(db, "submissions"), {
                    name: name,
                    content: submission,
                });
            } catch (e) {
                console.error("Error during submission: ", e);
            }
        } else {
            //TODO: bully user
        }
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