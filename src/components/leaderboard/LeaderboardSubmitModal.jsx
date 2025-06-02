import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import { styled } from "styled-components";
import {
  Checkbox,
  Input,
  Modal,
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from "@mui/material";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase";

const NiceBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: indianred;
  border: 2px solid #000;
  color: white;
  max-width: 350px;
  padding: 16px;
`;

const ButtonButton = styled.button`
  border: 1px solid saddlebrown;
  border-radius: 1px;
  background: whitesmoke;
  height: 3rem;
  width: 5rem;
  color: black;
  margin-top: 1rem;
  font-weight: bold;
  cursor: pointer;
`;

const LeaderboardSubmitModal = ({ props }) => {
  const { visible, setVisible, refresh, sortType, leaderboardId } = props;

  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [score, setScore] = useState(null);
  const [minutes, setMinutes] = useState(null);
  const [seconds, setSeconds] = useState(null);
  const [hours, setHours] = useState(null);
  const [milliseconds, setMilliseconds] = useState(null);
  const [dnf, setDnf] = useState(false);
  const [canSave, setCanSave] = useState(false);
  const [leagueMembers, setLeagueMembers] = useState([]);
  const [loading, setLoading] = useState(false);

  const isEmpty = (val) => val === "" || val === null || val === undefined;

  useEffect(() => {
    const canSaveResult = () => {
      if (isEmpty(name)) return false;

      if (sortType?.includes("score")) {
        return !isEmpty(score) || dnf;
      } else if (sortType.includes("time")) {
        return (
          dnf ||
          !isEmpty(hours) ||
          !isEmpty(minutes) ||
          !isEmpty(seconds) ||
          !isEmpty(milliseconds)
        );
      }
      return false;
    };
    setCanSave(canSaveResult());
  }, [name, score, hours, minutes, seconds, milliseconds, link, dnf, sortType]);

  useEffect(() => {
    const fetchLeagueMembers = async () => {
      setLoading(true);
      try {
        // Get the league ID from localStorage or use the hardcoded one from LeaderboardsHome
        const leagueId =
          localStorage.getItem("selectedLeagueId") || "1124831356770058240";

        // Fetch league users
        const response = await fetch(
          `https://api.sleeper.app/v1/league/${leagueId}/users`
        );
        const data = await response.json();

        if (data && Array.isArray(data)) {
          // Extract display_name or username from each user
          const members = data.map((user) => ({
            id: user.user_id,
            name: user.display_name || user.username,
          }));
          setLeagueMembers(members);
        }
      } catch (error) {
        console.error("Error fetching league members:", error);
      } finally {
        setLoading(false);
      }
    };

    if (visible) {
      fetchLeagueMembers();
    }
  }, [visible]);

  const submit = async () => {
    // Get current date in ISO format (YYYY-MM-DD)
    const currentDate = new Date().toISOString().split("T")[0];

    const submissionData = {
      leaderboard_id: leaderboardId,
      name: name,
      link: link,
      dnf: dnf,
      submission_date: currentDate,
    };

    if (sortType.includes("score") && !dnf) {
      submissionData.score = parseFloat(score);
    } else if (sortType.includes("time") && !dnf) {
      submissionData.hours = parseInt(hours || "0");
      submissionData.minutes = parseInt(minutes || "0");
      submissionData.seconds = parseInt(seconds || "0");
      submissionData.milliseconds = parseInt(milliseconds || "0");
    }

    await addDoc(collection(db, "leaderboard-results"), submissionData);

    setVisible(false);
    refresh();
  };

  const handleDnfChange = (checked) => {
    setDnf(checked);
    if (checked) {
      setScore("");
      setHours("");
      setMinutes("");
      setSeconds("");
      setMilliseconds("");
    }
  };

  return (
    <Modal open={visible} onClose={() => setVisible(false)}>
      <NiceBox>
        <h3>Submit New Result</h3>

        <h4>Name</h4>
        <FormControl fullWidth size="small">
          <InputLabel id="name-select-label">Select Name</InputLabel>
          <Select
            labelId="name-select-label"
            id="name-select"
            value={name}
            label="Select Name"
            onChange={(event) => setName(event.target.value)}
            disabled={loading}
          >
            {leagueMembers.map((member) => (
              <MenuItem key={member.id} value={member.name}>
                {member.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        <h4>Link</h4>
        <TextField
          value={link}
          placeholder="youtube.com/"
          onChange={(event) => setLink(event.target.value)}
          fullWidth
          size="small"
          rows={1}
          inputProps={{
            style: { fontSize: "14px" },
          }}
        />

        <h4>Result</h4>
        {sortType.includes("score") ? (
          <Input
            type="number"
            value={score}
            placeholder="score"
            onChange={(e) => setScore(e.target.value)}
            disabled={dnf}
          />
        ) : (
          <>
            <Input
              type="number"
              value={hours}
              placeholder="hours"
              onChange={(e) => setHours(e.target.value)}
              disabled={dnf}
            />
            <Input
              type="number"
              value={minutes}
              placeholder="minutes"
              onChange={(e) => setMinutes(e.target.value)}
              disabled={dnf}
            />
            <Input
              type="number"
              value={seconds}
              placeholder="seconds"
              onChange={(e) => setSeconds(e.target.value)}
              disabled={dnf}
            />
            <Input
              type="number"
              value={milliseconds}
              placeholder="milliseconds"
              onChange={(e) => setMilliseconds(e.target.value)}
              disabled={dnf}
            />
          </>
        )}

        <br />
        <label>
          DNF
          <Checkbox
            checked={dnf}
            onChange={(e) => handleDnfChange(e.target.checked)}
            sx={{ color: "white", "&.Mui-checked": { color: "white" } }}
          />
        </label>

        <br />
        {!!canSave ? (
          <ButtonButton onClick={submit}>SUBMIT</ButtonButton>
        ) : (
          <ButtonButton disabled>you are disabled</ButtonButton>
        )}
      </NiceBox>
    </Modal>
  );
};

export default LeaderboardSubmitModal;
