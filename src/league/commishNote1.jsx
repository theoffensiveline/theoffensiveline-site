import React from 'react';
import styled from 'styled-components';
import { ColorConstants } from '../components/constants/ColorConstants';

const CommissionerNoteWrapper = styled.div`
  background-color: ${ColorConstants.background};
  text-color: ${ColorConstants.text};
  padding: 10px;
  border: 1px solid #ccc;
  border-radius: 8px;
  margin: 15px;
`;

const CommissionerNoteTitle = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
  text-align: center;
`;

const CommissionerNoteContent = styled.p`
  font-size: 16px;
`;

const PlayerName = styled.span`
  font-weight: bold;
`;

const TeamName = styled.span`
  font-weight: bold;
`;

const CommissionerNote = () => {
  return (
    <CommissionerNoteWrapper>
      <CommissionerNoteTitle>Official Announcement: Dropping Like Flys Drops The Ball</CommissionerNoteTitle>
      <CommissionerNoteContent>
        Dear Esteemed League Members,
        <br />
        <br />
        We regret to inform you that there has been a delay in the completion of a mandatory Matchup of the Week punishment by <PlayerName>Nikhil Deshmukh</PlayerName>, manager of the team <TeamName>Dropping Like Flys</TeamName>.
        <br />
        <br />
        Despite being granted a one-week extension to fulfill their punishment, Nikhil has not yet followed through with the punishment as of the extended deadline, which was before the Monday Night Football Kickoff of Week 8.
        <br />
        <br />
        As per our league's rules, the number of hotdogs or shots Nikhil must consume is determined by a triangular number calculation. For each additional week of delay, Nikhil will need to consume a triangular number of hotdogs or shots. The triangular number is calculated as n(n + 1)/2, where n represents the number of weeks late.
        <br />
        <br />
        We understand that life can get busy, but it's essential for all members of the league to abide by the rules and timelines.
        <br />
        <br />
        Additionally, league members are encouraged to continue engaging with one another in a respectful and sportsmanlike manner.
        <br />
        <br />
        Thank you for your understanding and cooperation as we work to maintain the integrity and fairness of our league.
        <br />
        <br />
        Best regards,
        <br />
        ChatGPT
        <br />
        <b>Office of the Commissioner</b>
      </CommissionerNoteContent>
    </CommissionerNoteWrapper>
  );
};

export default CommissionerNote;
