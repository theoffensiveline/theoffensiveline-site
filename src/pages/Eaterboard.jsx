import React, { useEffect, useState } from 'react';
import { db } from "../firebase";
import { getDocs, collection } from "firebase/firestore";
import { styled } from "styled-components";
import LeaderboardResult from "../components/leaderboard/LeaderboardResult";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBurger, faPlus } from "@fortawesome/free-solid-svg-icons";
import { ColorConstants } from "../components/constants/ColorConstants";
import LeaderboardSubmitModal from "../components/leaderboard/LeaderboardSubmitModal";
import { Switch, FormControlLabel } from '@mui/material';

const ResultsContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
`;

const ResultsColumn = styled.div`
  width: 75%;
  background: none;
`;

const Eaterboard = () => {
  const [results, setResults] = useState([]);
  const [uniqueResults, setUniqueResults] = useState([]);
  const [submitModalVisible, setSubmitModalVisible] = useState(false);
  const [showUnique, setShowUnique] = useState(false);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "leaderboard-times"));
      const docs = querySnapshot.docs.map((doc) => {
        const dnf = doc.data().dnf || false;
        const minutes = parseInt(doc.data().minutes) || 0;
        const seconds = parseInt(doc.data().seconds) || 0;
        const hs = parseInt(doc.data().hs) || 0;
        const score = dnf ? Infinity : minutes * 6000 + seconds * 100 + hs;

        return {
          id: doc.id,
          name: doc.data().name || '',
          minutes: minutes,
          seconds: seconds,
          hs: hs,
          dnf: dnf,
          link: doc.data().link || '',
          score: score,
        };
      });

      // Processed results
      const processedResults = docs.sort((a, b) => a.score - b.score);

      // Unique results by name
      const uniqueResults = [];
      const nameSet = new Set();

      processedResults.forEach((doc) => {
        if (!nameSet.has(doc.name)) {
          uniqueResults.push(doc);
          nameSet.add(doc.name);
        }
      });

      setResults(processedResults);
      setUniqueResults(uniqueResults);
    } catch (error) {
      console.error("Error fetching results: ", error);
    }
  };

  return (
    <>
      {!!submitModalVisible && (
        <LeaderboardSubmitModal
          props={{
            visible: submitModalVisible,
            setVisible: setSubmitModalVisible,
            refresh: fetchResults
          }}
        />
      )}
      <ResultsContainer>
        <ResultsColumn>
          <h2>
            <FontAwesomeIcon icon={faBurger} />
            &nbsp;Happy Meal Leaders&nbsp;
            {/* <FontAwesomeIcon
              icon={faPlus}
              color={ColorConstants.link}
              cursor={"pointer"}
              onClick={() => setSubmitModalVisible(true)}
            /> */}
          </h2>
          <FormControlLabel
            control={
              <Switch
                checked={showUnique}
                onChange={() => setShowUnique(!showUnique)}
                color="primary"
              />
            }
            label={showUnique ? 'Unique Leaders' : 'All Times'}
            style={{ marginBottom: '10px' }}
          />
          {showUnique
            ? uniqueResults.map((res, iter) => (
              <LeaderboardResult
                key={res.id}
                props={{ ...res, iter: iter + 1 }}
              />
            ))
            : results.map((res, iter) => (
              <LeaderboardResult
                key={res.id}
                props={{ ...res, iter: iter + 1 }}
              />
            ))
          }
          <p>
            Rules:
            <br />
            <ul>
              <li>Must get a burger with whatever comes on it.</li>
              <li>Must get fries and apple slices.</li>
              <li>Must get a non-water drink in the drink cup (no milk or juice box), with a standard amount of ice.</li>
              <li>Timer starts when the box is touched and ends when the mouth is empty.</li>
              <li>Unpackaging is part of the time; no scissors, knives, or other tools are allowed to assist in unpackaging.</li>
              <li>Everyone must submit a rule abiding video by 8/25 at 11:59 PM ET.</li>
              <li>Anyone who does not submit a video will receive the last draft pick selection and lose their last-round pick in the draft.</li>
              <li>After the 8/25 deadline, everyone who submitted a video will have the opportunity to eat additional Happy Meals until 8/28 at 11:59 PM ET.</li>
              <li>Any submissions after 8/25 must have evidence present in the video that it was filmed after 8/25.</li>
            </ul>
          </p>
        </ResultsColumn>
      </ResultsContainer>
    </>
  );
};

export default Eaterboard;