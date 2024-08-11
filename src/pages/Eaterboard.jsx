import React, { useEffect, useState } from 'react';
import { db } from "../firebase";
import { getDocs, collection } from "firebase/firestore";
import { styled } from "styled-components";
import LeaderboardResult from "../components/leaderboard/LeaderboardResult";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBurger, faPlus } from "@fortawesome/free-solid-svg-icons";
import { ColorConstants } from "../components/constants/ColorConstants";
import LeaderboardSubmitModal from "../components/leaderboard/LeaderboardSubmitModal";

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
  const [submitModalVisible, setSubmitModalVisible] = useState(false);

  useEffect(() => {
    fetchResults();
  }, []);

  const fetchResults = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "leaderboard-times"));
      const docs = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(), // Assuming doc.data() contains all necessary fields
      }));

      // Add score calculation and sorting here
      const processedResults = docs.map((doc) => ({
        id: doc.id,
        name: doc.name || '',
        minutes: parseInt(doc.minutes) || 0,
        seconds: parseInt(doc.seconds) || 0,
        hs: parseInt(doc.hs) || 0,
        link: doc.link || '',
        score: parseInt(doc.minutes) * 6000 + parseInt(doc.seconds) * 100 + parseInt(doc.hs),
      })).sort((a, b) => a.score - b.score);

      console.log(processedResults);
      setResults(processedResults);
    } catch (error) {
      console.error("Error fetching results: ", error);
    }
  };

  return (
    <>
      {!!submitModalVisible && (<LeaderboardSubmitModal props={{ visible: submitModalVisible, setVisible: setSubmitModalVisible, refresh: fetchResults }} />)}
      <ResultsContainer>
        <ResultsColumn>
          <h2><FontAwesomeIcon icon={faBurger} />&nbsp;Happy Meal Leaders&nbsp;<FontAwesomeIcon icon={faPlus} color={ColorConstants.link} cursor={"pointer"} onClick={() => setSubmitModalVisible(true)} /></h2>
          {results.map((res, iter) => (
            <LeaderboardResult
              props={{ ...res, iter: iter + 1 }}
            />
          ))}
        </ResultsColumn>
      </ResultsContainer>
    </>
  );
};

export default Eaterboard;