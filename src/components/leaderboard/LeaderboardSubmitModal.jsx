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
import { addDoc, collection, doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { sendDiscordNotification } from "../../utils/api/discord";

const NiceBox = styled(Box)`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: ${({ theme }) => theme.background};
  border: 2px solid ${({ theme }) => theme.newsBlue};
  color: ${({ theme }) => theme.text};
  max-width: 350px;
  padding: 16px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);

  h3, h4 {
    color: ${({ theme }) => theme.text};
    margin-bottom: 8px;
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

const ButtonButton = styled.button`
  border: 1px solid ${({ theme }) => theme.newsBlue};
  border-radius: 8px;
  background: ${({ theme }) => theme.newsBlue};
  height: 3rem;
  width: 5rem;
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

const LeaderboardSubmitModal = ({ props }) => {
  const { visible, setVisible, refresh, sortType, leaderboardId, currentResults } = props;

  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [score, setScore] = useState("");
  const [minutes, setMinutes] = useState("");
  const [seconds, setSeconds] = useState("");
  const [hours, setHours] = useState("");
  const [milliseconds, setMilliseconds] = useState("");
  const [dnf, setDnf] = useState(false);
  const [canSave, setCanSave] = useState(false);
  const [leagueMembers, setLeagueMembers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [leaderboardName, setLeaderboardName] = useState("");

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

  useEffect(() => {
    const fetchLeaderboardName = async () => {
      if (leaderboardId) {
        try {
          const leaderboardRef = doc(db, "leaderboards", leaderboardId);
          const leaderboardSnap = await getDoc(leaderboardRef);
          if (leaderboardSnap.exists()) {
            setLeaderboardName(leaderboardSnap.data().name);
          }
        } catch (error) {
          console.error("Error fetching leaderboard name:", error);
        }
      }
    };

    if (visible) {
      fetchLeaderboardName();
    }
  }, [visible, leaderboardId]);

  const checkIfTopThree = (submission) => {
    if (submission.dnf) return false;

    // Add the new submission to the list
    const allSubmissions = [...currentResults, submission];

    // Sort submissions based on sortType
    if (sortType.includes("score")) {
      allSubmissions.sort((a, b) => b.score - a.score); // Higher score is better
    } else if (sortType.includes("time")) {
      allSubmissions.sort((a, b) => {
        // Convert time to milliseconds for comparison
        const timeA = (a.hours * 3600000) + (a.minutes * 60000) + (a.seconds * 1000) + a.milliseconds;
        const timeB = (b.hours * 3600000) + (b.minutes * 60000) + (b.seconds * 1000) + b.milliseconds;
        return timeA - timeB; // Lower time is better
      });
    }

    // Check if the new submission is in top 3
    const newSubmissionIndex = allSubmissions.findIndex(s =>
      s.name === submission.name &&
      (sortType.includes("score") ? s.score === submission.score :
        s.hours === submission.hours &&
        s.minutes === submission.minutes &&
        s.seconds === submission.seconds &&
        s.milliseconds === submission.milliseconds)
    );

    return newSubmissionIndex < 3;
  };

  const submit = async () => {
    try {
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

      // Check if this is a top 3 submission
      const isTopThree = checkIfTopThree(submissionData);

      try {
        // Save the submission
        await addDoc(collection(db, "leaderboard-results"), submissionData);

        // Only send Discord notification for top 3 submissions
        if (isTopThree) {
          const result = dnf
            ? "DNF"
            : sortType.includes("score")
              ? score
              : `${hours}:${minutes}:${seconds}.${milliseconds}`;

          // Get top 3 submissions after adding the new one
          const allSubmissions = [...currentResults, submissionData];
          if (sortType.includes("score")) {
            allSubmissions.sort((a, b) => b.score - a.score);
          } else if (sortType.includes("time")) {
            allSubmissions.sort((a, b) => {
              const timeA = (a.hours * 3600000) + (a.minutes * 60000) + (a.seconds * 1000) + a.milliseconds;
              const timeB = (b.hours * 3600000) + (b.minutes * 60000) + (b.seconds * 1000) + b.milliseconds;
              return timeA - timeB;
            });
          }
          const topThree = allSubmissions.slice(0, 3).map((sub, index) => {
            const subResult = sub.dnf ? "DNF" :
              sortType.includes("score") ? sub.score :
                `${sub.hours}:${sub.minutes}:${sub.seconds}.${sub.milliseconds}`;
            return `${index + 1}. ${sub.name}: ${subResult}`;
          }).join('\n');

          const discordMessage = {
            name: name,
            content: `New Top 3 Leaderboard Submission for ${leaderboardName}:\nResult: ${result}${link ? `\nLink: ${link}` : ''}\n\nCurrent Top 3:\n${topThree}`
          };

          try {
            await sendDiscordNotification(discordMessage, "general");
          } catch (discordError) {
            console.error("Failed to send Discord notification:", discordError);
            // Continue with the submission even if Discord notification fails
          }
        }

        setVisible(false);
        refresh();
      } catch (dbError) {
        console.error("Error saving to database:", dbError);
        throw new Error("Failed to save submission to database. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting result:", error);
      // You might want to show this error to the user in the UI
      alert(error.message || "An error occurred while submitting your result. Please try again.");
    }
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
