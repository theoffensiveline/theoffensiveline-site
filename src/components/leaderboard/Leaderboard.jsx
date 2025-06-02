import { useEffect, useState, useCallback } from "react";
import { useParams } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../../firebase";
import { formatResult, fetchAndSortResults } from "../../utils/leaderboardUtils";
import styled from "styled-components";
import { Plus } from "lucide-react";
import LeaderboardSubmitModal from "./LeaderboardSubmitModal";
import Modal from "@mui/material/Modal";

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
`;

const Name = styled.div`
  font-size: 1.1em;
  color: #333;
`;

const Score = styled.div`
  font-size: 1.1em;
  font-weight: 500;
  color: #007acc;
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

const Leaderboard = () => {
  const { leaderboardId } = useParams();
  const [leaderboard, setLeaderboard] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(true);
  const [submitModalVisible, setSubmitModalVisible] = useState(false);
  const [confirmModalVisible, setConfirmModalVisible] = useState(false);
  const [rulesModalVisible, setRulesModalVisible] = useState(false);
  const [selectedResult, setSelectedResult] = useState(null);

  const fetchLeaderboard = useCallback(async () => {
    try {
      setLoading(true);

      // Fetch leaderboard details
      const leaderboardRef = doc(db, "leaderboards", leaderboardId);
      const leaderboardSnap = await getDoc(leaderboardRef);

      if (leaderboardSnap.exists()) {
        const data = leaderboardSnap.data();
        setLeaderboard(data);

        const sortedResults = await fetchAndSortResults(leaderboardId, data.sort);
        setResults(sortedResults);
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

        {results.map((result, index) => (
          <Card
            key={result.id}
            onClick={() => handleCardClick(result)}
            style={{ cursor: result.link ? "pointer" : "default" }}
          >
            <Position>#{index + 1}</Position>
            <Name>{result.name}</Name>
            <Score>{formatResult(result, leaderboard.sort)}</Score>
          </Card>
        ))}
      </Container>
    </>
  );
};

export default Leaderboard;
