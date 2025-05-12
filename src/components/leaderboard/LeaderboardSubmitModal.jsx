import React, { useEffect } from 'react';
import Box from "@mui/material/Box";
import { styled } from "styled-components";
import { Checkbox, Input, Modal, TextField } from "@mui/material";
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

  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');
  const [score, setScore] = React.useState(null);
  const [minutes, setMinutes] = React.useState(null);
  const [seconds, setSeconds] = React.useState(null);
  const [hours, setHours] = React.useState(null);
  const [milliseconds, setMilliseconds] = React.useState(null);
  const [dnf, setDnf] = React.useState(false);
  const [canSave, setCanSave] = React.useState(false);

  const isEmpty = (val) => val === "" || val === null || val === undefined;

  useEffect(() => {
    const canSaveResult = () => {
      if (isEmpty(name)) return false;

      if (sortType?.includes('score')) {
        return !isEmpty(score) || dnf;
      } else if (sortType.includes('time')) {
        return dnf || !isEmpty(hours) || !isEmpty(minutes) || !isEmpty(seconds) || !isEmpty(milliseconds);
      }
      return false;
    };
    setCanSave(canSaveResult());
  }, [name, score, minutes, seconds, milliseconds, link, dnf, sortType]);

  const submit = async () => {
    const submissionData = {
      leaderboard_id: leaderboardId,
      name: name,
      link: link,
      dnf: dnf,
    };

    if (sortType.includes('score') && !dnf) {
      submissionData.score = parseFloat(score);
    } else if (sortType.includes('time') && !dnf) {
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
      setScore('');
      setMinutes('');
      setSeconds('');
      setMilliseconds('');
    }
  };

  return (
    <Modal open={visible} onClose={() => setVisible(false)}>
      <NiceBox>
        <h3>Submit New Result</h3>

        <h4>Name</h4>
        <TextField
          value={name}
          placeholder="name"
          onChange={(event) => setName(event.target.value)}
          size='small'
        />

        <h4>Link</h4>
        <TextField
          value={link}
          placeholder="youtube.com/"
          onChange={(event) => setLink(event.target.value)}
          size='small'
        />

        <h4>Result</h4>
        {sortType.includes('score') ? (
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
            sx={{ color: 'white', '&.Mui-checked': { color: 'white' } }}
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
