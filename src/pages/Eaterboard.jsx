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
      const docs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        name: doc.data().name || '',
        minutes: parseInt(doc.data().minutes) || 0,
        seconds: parseInt(doc.data().seconds) || 0,
        hs: parseInt(doc.data().hs) || 0,
        link: doc.data().link || '',
        score: parseInt(doc.data().minutes) * 6000 + parseInt(doc.data().seconds) * 100 + parseInt(doc.data().hs),
      }));

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
            <FontAwesomeIcon
              icon={faPlus}
              color={ColorConstants.link}
              cursor={"pointer"}
              onClick={() => setSubmitModalVisible(true)}
            />
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
        </ResultsColumn>
      </ResultsContainer>
    </>
  );
};

export default Eaterboard;