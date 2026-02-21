import { styled } from "styled-components";

const ResultContainer = styled.div`
  width: 100%;
  height: 3rem;
  align-items: center;
  display: flex;
  border-top: 2px solid indianred;
`;

const Rank = styled.div`
  width: 10%;
`;

const Name = styled.a`
  width: 40%;
`;

const Time = styled.div`
  width: 20%;
`;

const LeaderboardResult = ({ props }) => {
  const { name, hours, minutes, seconds, milliseconds, link, dnf, iter } = props;

  return (
    <ResultContainer>
      <Rank>{iter}</Rank>
      <Name href={link} target="_blank">
        {name}
      </Name>
      <Time>
        {dnf
          ? "DNF"
          : `${hours && hours > 0 ? `${hours}h ` : ""}${minutes || 0}m ${
              seconds || 0
            }s ${String(milliseconds || 0).padStart(3, "0")}ms`}
      </Time>
    </ResultContainer>
  );
};

export default LeaderboardResult;
