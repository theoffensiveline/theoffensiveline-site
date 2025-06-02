import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc, query, collection, getDocs, where } from "firebase/firestore";
import { db } from "../../firebase";
import { formatResult, fetchAndSortResults, POINTS_MAP, getMedalEmoji, getAllSubmissions } from "../../utils/leaderboardUtils";
import styled from "styled-components";
import { Plus } from "lucide-react";
import LeaderboardSubmitModal from "./LeaderboardSubmitModal";
import Modal from "@mui/material/Modal";
import { Switch, FormControlLabel } from "@mui/material";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 20px;
  gap: 16px;
`;

const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

const ActionButtonsContainer = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 24px;
`;

const SubmitButton = styled.button`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 12px 20px;
  background-color: #007acc;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
  font-size: 0.9em;
  transition: background-color 0.2s ease;

  &:hover {
    background-color: #005fa3;
  }
`;

const RulesButton = styled(SubmitButton)`
  background-color: #4a4a4a;

  &:hover {
    background-color: #333333;
  }
`;

const Title = styled.h1`
  font-size: 2em;
  font-weight: 700;
  text-align: center;
`;

const Card = styled.div`
  background-color: white;
  padding: 16px;
  border-radius: 12px;
  width: 100%;
  max-width: 350px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  display: flex;
  justify-content: space-between;
  transition: transform 0.2s ease;
  cursor: pointer;

  &:hover {
    transform: translateY(-4px);
  }
`;

const Position = styled.div`
  font-size: 1.2em;
  font-weight: 600;
  min-width: 40px;
`;

const Name = styled.div`
  font-size: 1.1em;
  color: #333;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 4px;
`;

const SubmissionDate = styled.div`
  font-size: 0.8em;
  color: #888;
`;

const Score = styled.div`
  font-size: 1.1em;
  font-weight: 500;
  color: #333;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  gap: 4px;
`;

const Points = styled.div`
  font-size: 0.8em;
  color: ${props => props.hasPoints ? '#007acc' : '#666'};
  font-weight: ${props => props.hasPoints ? '500' : '400'};
`;

const ConfirmationModalContent = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: white;
  padding: 24px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  display: flex;
  flex-direction: column;
  gap: 16px;
  max-width: 400px;
  width: 90%;
`;

const ModalTitle = styled.h3`
  font-size: 1.2em;
  margin: 0;
`;

const ModalText = styled.p`
  margin: 0;
  color: #555;
`;

const ButtonContainer = styled.div`
  display: flex;
  gap: 12px;
  justify-content: flex-end;
  margin-top: 8px;
`;

const Button = styled.button`
  padding: 8px 16px;
  border-radius: 8px;
  border: none;
  cursor: pointer;
  font-weight: 500;
  transition: background-color 0.2s ease;
`;

const CancelButton = styled(Button)`
  background-color: #e0e0e0;
  color: #333;

  &:hover {
    background-color: #d0d0d0;
  }
`;

const ContinueButton = styled(Button)`
  background-color: #007acc;
  color: white;

  &:hover {
    background-color: #005fa3;
  }
`;

const ToggleContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
`;

const ToggleLabel = styled.span`
  font-size: 0.9em;
  color: ${props => props.active ? '#007acc' : '#666'};
  font-weight: ${props => props.active ? '600' : '400'};
`;

const Leaderboard = () => {
  const { leaderboardId } = useParams();
  const [leaderboard, setLeaderboard] = useState(null);
  const [uniqueResults, setUniqueResults] = useState([]);
  const [allResults, setAllResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitModalVisible, setSubmitModalVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [rulesModalVisible, setRulesModalVisible] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);
  const [showAllSubmissions, setShowAllSubmissions] = useState(false);
  const [hasDuplicateSubmissions, setHasDuplicateSubmissions] = useState(false);

  const fetchLeaderboard = useCallback(async () => {
    try {
      setLoading(true);

      // Fetch leaderboard details
      const leaderboardRef = doc(db, "leaderboards", leaderboardId);
      const leaderboardSnap = await getDoc(leaderboardRef);

      if (leaderboardSnap.exists()) {
        const data = leaderboardSnap.data();
        setLeaderboard(data);

        // Get all results first
        const q = query(
          collection(db, "leaderboard-results"),
          where("leaderboard_id", "==", leaderboardId)
        );
        const resultsSnap = await getDocs(q);
        const rawResults = resultsSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        // Check for duplicate submissions
        const nameCounts = {};
        rawResults.forEach(result => {
          nameCounts[result.name] = (nameCounts[result.name] || 0) + 1;
        });
        const hasDuplicates = Object.values(nameCounts).some(count => count > 1);
        setHasDuplicateSubmissions(hasDuplicates);

        // Get unique results for points calculation
        const uniqueResults = await fetchAndSortResults(leaderboardId, data.sort);
        setUniqueResults(uniqueResults);

        // Get all results with best submission flags
        const allResults = getAllSubmissions(rawResults, data.sort);
        setAllResults(allResults);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  }, [leaderboardId]);

  useEffect(() => {
    fetchLeaderboard();
  }, [fetchLeaderboard]);

  if (loading) return <p>Loading...</p>;
  if (!leaderboard) return <p>Leaderboard not found.</p>;

  const handleCardClick = (result) => {
    if (result.link) {
      setSelectedResult(result);
      setConfirmModalVisible(true);
    }
  };

  const handleConfirmNavigation = () => {
    if (selectedResult && selectedResult.link) {
      // Check if the link already has http/https prefix
      let url = selectedResult.link;
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://" + url;
      }
      window.open(url, "_blank");
    }
    setConfirmModalVisible(false);
  };

  const handleRulesNavigation = () => {
    if (leaderboard?.rules) {
      let url = leaderboard.rules;
      if (!url.startsWith("http://") && !url.startsWith("https://")) {
        url = "https://" + url;
      }
      window.open(url, "_blank");
    }
    setRulesModalVisible(false);
  };

  const calculatePointsForPosition = (index, results) => {
    let currentPlace = 1;
    let currentScore = null;
    let tiedCount = 0;

    // First pass: find the current position and tied count
    for (let i = 0; i < results.length; i++) {
      const score = parseFloat(results[i].score);

      if (currentScore === null) {
        currentScore = score;
        tiedCount = 1;
      } else if (score === currentScore) {
        tiedCount++;
      } else {
        if (i > index) break; // We've passed our target position
        currentPlace += tiedCount;
        currentScore = score;
        tiedCount = 1;
      }
    }

    // Calculate total points for all positions in the tie
    let totalPoints = 0;
    for (let i = 0; i < tiedCount; i++) {
      totalPoints += POINTS_MAP[currentPlace + i] || 0;
    }

    // Return the average points for the tie
    const points = totalPoints / tiedCount;
    return Number.isInteger(points) ? points : points.toFixed(1);
  };

  const displayResults = showAllSubmissions ? allResults : uniqueResults;

  return (
    <>
      {!!submitModalVisible && (
        <LeaderboardSubmitModal
          props={{
            visible: submitModalVisible,
            setVisible: setSubmitModalVisible,
            refresh: fetchLeaderboard,
            sortType: leaderboard.sort,
            leaderboardId: leaderboardId,
          }}
        />
      )}
      <Modal
        open={confirmModalVisible}
        onClose={() => setConfirmModalVisible(false)}
        aria-labelledby="confirmation-modal"
      >
        <ConfirmationModalContent>
          <ModalTitle>External Link</ModalTitle>
          <ModalText>
            You are now leaving The Offensive Line to go to{" "}
            <strong>{selectedResult?.link}</strong>, continue?
          </ModalText>
          <ButtonContainer>
            <CancelButton onClick={() => setConfirmModalVisible(false)}>
              Cancel
            </CancelButton>
            <ContinueButton onClick={handleConfirmNavigation}>
              Continue
            </ContinueButton>
          </ButtonContainer>
        </ConfirmationModalContent>
      </Modal>
      <Modal
        open={rulesModalVisible}
        onClose={() => setRulesModalVisible(false)}
        aria-labelledby="rules-modal"
      >
        <ConfirmationModalContent>
          <ModalTitle>Leaderboard Rules</ModalTitle>
          <ModalText>
            You are now leaving The Offensive Line to view the rules at{" "}
            <strong>{leaderboard?.rules}</strong>, continue?
          </ModalText>
          <ButtonContainer>
            <CancelButton onClick={() => setRulesModalVisible(false)}>
              Cancel
            </CancelButton>
            <ContinueButton onClick={handleRulesNavigation}>
              Continue
            </ContinueButton>
          </ButtonContainer>
        </ConfirmationModalContent>
      </Modal>
      <Container>
        <TitleContainer>
          <Title>{leaderboard.name}</Title>
        </TitleContainer>

        <ActionButtonsContainer>
          {leaderboard.can_submit !== "false" && (
            <SubmitButton onClick={() => setSubmitModalVisible(true)}>
              <Plus size={20} />
              <span>Add your submission</span>
            </SubmitButton>
          )}
          {leaderboard.rules && (
            <RulesButton onClick={() => setRulesModalVisible(true)}>
              <span>View Rules</span>
            </RulesButton>
          )}
        </ActionButtonsContainer>

        {leaderboardId !== "QSv4tImm8DuHqC5wI5rY" && hasDuplicateSubmissions && (
          <ToggleContainer>
            <ToggleLabel active={!showAllSubmissions}>
              Best Submissions
            </ToggleLabel>
            <FormControlLabel
              control={
                <Switch
                  checked={showAllSubmissions}
                  onChange={(e) => setShowAllSubmissions(e.target.checked)}
                  color="primary"
                />
              }
              label=""
            />
            <ToggleLabel active={showAllSubmissions}>
              All Submissions
            </ToggleLabel>
          </ToggleContainer>
        )}

        {displayResults.map((result, index) => {
          // Find the index in uniqueResults for points calculation
          const uniqueIndex = uniqueResults.findIndex(r => r.id === result.id);
          const points = uniqueIndex !== -1 ? calculatePointsForPosition(uniqueIndex, uniqueResults) : "-";

          return (
            <Card
              key={result.id}
              onClick={() => handleCardClick(result)}
              style={{ cursor: result.link ? "pointer" : "default" }}
            >
              <Position>{index < 3 ? getMedalEmoji(index) : `#${index + 1}`}</Position>
              <Name>
                {result.name}
                {result.submission_date && (
                  <SubmissionDate>
                    Submitted: {new Date(result.submission_date).toLocaleDateString()}
                  </SubmissionDate>
                )}
              </Name>
              <Score>
                {formatResult(result, leaderboard.sort)}
                <Points hasPoints={points !== "-"}>
                  {points !== "-" ? `${points} points` : ""}
                </Points>
              </Score>
            </Card>
          );
        })}
      </Container>
    </>
  );
};

export default Leaderboard;
