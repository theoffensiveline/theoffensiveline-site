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
    width: 75%;
    background: indianred;
    border: 2px solid #000;
    color: white;
    padding-left: 10%;
    padding-bottom: 10%;
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
  const { visible, setVisible, refresh } = props;

  const [minutes, setMinutes] = React.useState(null);
  const [seconds, setSeconds] = React.useState(null);
  const [hs, setHs] = React.useState(null);
  const [dnf, setDnf] = React.useState(false);
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');
  const [canSave, setCanSave] = React.useState(false);

  const isEmpty = (val) => {
    return val === "" || val === null || val === undefined;
  };

  useEffect(() => {
    const canSaveResult = () => {
      return !isEmpty(name) && !isEmpty(link) && (dnf || (!isEmpty(minutes) && !isEmpty(seconds) && !isEmpty(hs)));
    };
    setCanSave(canSaveResult());
  }, [name, seconds, minutes, hs, link, dnf]);

  const submit = async () => {
    const submissionData = {
      name: name,
      link: link,
      dnf: dnf,
    };

    if (!dnf) {
      submissionData.minutes = parseInt(minutes);
      submissionData.seconds = parseInt(seconds);
      submissionData.hs = parseInt(hs);
    }

    addDoc(collection(db, "leaderboard-times"), submissionData).then(() => {
      setVisible(false);
      refresh();
    });

    sendDiscordNoti();
  };

  const sendDiscordNoti = async () => {
    const request = new XMLHttpRequest();
    request.open("POST", "https://discord.com/api/webhooks/1272751517106962493/96rcRzRoToKlHZ1bXCqeB77sxECbCOLGV9UAYEnXP2prr7Hn9-NIwaJQekFSJSst8tGC");
    request.setRequestHeader('Content-type', 'application/json');
    const params = {
      username: name,
      content: dnf
        ? `I just submitted a DNF to the happy meal leaderboard at: ${link}`
        : `I just submitted a new time to the happy meal leaderboard: ${minutes}m ${seconds}.${hs}s at: ${link}`
    };
    request.send(JSON.stringify(params));
  };

  const handleDnfChange = (checked) => {
    setDnf(checked);
    if (checked) {
      setMinutes('');
      setSeconds('');
      setHs('');
    }
  };

  return (
    <Modal open={visible} onClose={() => setVisible(false)}>
      <NiceBox>
        <h3>Submit New Time</h3>
        <h4>Name</h4>
        <TextField
          value={name}
          placeholder="name"
          onChange={(event) => setName(event.target.value)}
          size='small'
        />
        <h4>Time</h4>
        <Input
          type="number"
          value={minutes}
          placeholder="minutes"
          onChange={(e) => setMinutes(e.target.value)}
          disabled={dnf}
        />
        <Input
          type="number"
          placeholder="seconds"
          value={seconds}
          onChange={(e) => setSeconds(e.target.value)}
          disabled={dnf}
        />
        <Input
          type="number"
          value={hs}
          placeholder="hundredths of a second"
          onChange={(e) => setHs(e.target.value)}
          disabled={dnf}
        />
        <br />
        <label>
          DNF
          <Checkbox
            checked={dnf}
            onChange={(e) => handleDnfChange(e.target.checked)}
            sx={{ color: 'white', '&.Mui-checked': { color: 'white' } }}
          />
        </label>
        <h4>Video Link</h4>
        <TextField
          value={link}
          placeholder="youtube.com/"
          onChange={(event) => setLink(event.target.value)}
          size='small'
        />
        <br />
        {!!canSave ?
          <ButtonButton onClick={submit}>SUBMIT</ButtonButton> :
          <ButtonButton onClick={() => console.log("Cannot submit yet")}>you are disabled</ButtonButton>}
      </NiceBox>
    </Modal>
  );
};

export default LeaderboardSubmitModal;