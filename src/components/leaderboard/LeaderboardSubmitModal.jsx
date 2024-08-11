import React, { useEffect } from 'react';
import Box from "@mui/material/Box";
import { styled } from "styled-components";
import { Input, Modal } from "@mui/material";
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
  const [name, setName] = React.useState('');
  const [link, setLink] = React.useState('');
  const [canSave, setCanSave] = React.useState(false);

  const isEmpty = (val) => {
    return val === "" || val === null || val === undefined;
  };

  useEffect(() => {
    const canSaveResult = () => {
      return !isEmpty(minutes) && !isEmpty(seconds) && !isEmpty(hs) && !isEmpty(name) && !isEmpty(link);
    };
    setCanSave(canSaveResult());
  }, [name, seconds, minutes, hs, link]);

  const submit = async () => {
    addDoc(collection(db, "leaderboard-times"), {
      name: name,
      minutes: parseInt(minutes),
      seconds: parseInt(seconds),
      hs: parseInt(hs),
      link: link
    }).then(() => {
      setVisible(false);
      refresh();
    });
  }

  return (
    <Modal open={visible} onClose={() => setVisible(false)}>
      <NiceBox>
        <h3>Submit New Time</h3>
        <h4>Name</h4>
        <Input
          type="text"
          value={name}
          placeholder="name"
          onChange={(event) => setName(event.target.value)}
        />
        <h4>Time</h4>
        <Input
          type="number"
          value={minutes}
          placeholder="minutes"
          onChange={(e) => { setMinutes(e.target.value) }}
        />
        <Input
          name="test"
          type="number"
          placeholder="seconds"
          value={seconds}
          onChange={(e) => { setSeconds(e.target.value) }}
        />
        <Input
          type="number"
          value={hs}
          placeholder="hundredths of a second"
          onChange={(e) => { setHs(e.target.value) }}
        />
        <h4>Video Link</h4>
        <Input
          type="text"
          value={link}
          placeholder="youtube.com/"
          onChange={(event) => setLink(event.target.value)}
        />
        <br />
        {!!canSave ?
          <ButtonButton onClick={submit}>SUBMIT</ButtonButton> :
          <ButtonButton onClick={() => console.log("bang!")}>you are disabled</ButtonButton>}
      </NiceBox>
    </Modal>
  );
};

export default LeaderboardSubmitModal;