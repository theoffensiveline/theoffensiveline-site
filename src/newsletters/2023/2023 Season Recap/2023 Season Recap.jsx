import React, { useContext, useState } from "react";
import {
  RecapPositionTable,
  KickerDefenseChart,
  WorstStartSitsTable,
  FreeAgentTable,
  DualTableViewer,
  MotwRecapTable,
  TeamDropdown,
  BestWorstGameRecapTable,
  BestWorstTeamRecapTable,
  BlowoutRecapTable,
  TransactionRecapTable,
  TradeRecapTable,
  StartSitRecapTable,
  StyledSlider,
  JakeAlecTable,
} from "../../../components/newsletters/recapStyles";
import {
  ArticleHeader,
  ArticleSubheader,
  ArticleCaption,
  AwardsGridV2,
} from "../../../components/newsletters/newsStyles";
import starterData from "./startersPPG.json";
import kickerDefenseData from "./kickerDef.json";
import bestBallBenchData from "./bestBallBench.json";
import freeAgentData from "./freeAgents.json";
import tradeData from "./trades.json";
import recapData from "./recapData.json";
import awardsData from "./awards.json";
import { TeamContext } from "../../../pages/Newsletter";
import matchupData from "./allOpps.json";

export const newsDate = "2024-01-18";

// For the first article
const AwardsArticle = () => {
  return (
    <div>
      <ArticleHeader>Awards</ArticleHeader>
      <ArticleSubheader>2023 Season Awards</ArticleSubheader>
      <AwardsGridV2 awardsData={awardsData} />
    </div>
  );
};

// For the second article
const FirstTeamRecapArticle = () => {
  const { selectedTeam, setSelectedTeam } = useContext(TeamContext);

  return (
    <div>
      <ArticleHeader>Want a more personalized recap?</ArticleHeader>
      <ArticleSubheader>Select Your Team From The Dropdown</ArticleSubheader>
      <TeamDropdown data={recapData} onSelectTeam={setSelectedTeam} />
      <ArticleCaption>
        Tip: Most of the tables below can be sorted by clicking the header you'd like to sort by.
      </ArticleCaption>
      <ArticleSubheader>2023 Matchup of the Week Summary</ArticleSubheader>
      <MotwRecapTable data={recapData} selectedTeam={selectedTeam} />
    </div>
  );
};

const TeamPerformanceOne = () => {
  const { selectedTeam } = useContext(TeamContext);

  return (
    <div>
      <ArticleHeader>Team Performance Recap</ArticleHeader>
      <ArticleSubheader>Best/Worst Win/Loss</ArticleSubheader>
      <BestWorstGameRecapTable data={recapData} selectedTeam={selectedTeam} />
      <ArticleSubheader>Best/Worst On The Week</ArticleSubheader>
      <BestWorstTeamRecapTable data={recapData} selectedTeam={selectedTeam} />
    </div>
  );
};

const TeamPerformanceTwo = () => {
  const { selectedTeam } = useContext(TeamContext);

  const [filteredTeam, setFilteredTeam] = useState("Tim’s Team");

  return (
    <div>
      <ArticleHeader>Team Performance Recap Continued</ArticleHeader>
      <ArticleSubheader>Best/Worst Win/Loss</ArticleSubheader>
      <ArticleCaption>
        Blowout is defined as a point differential &gt; 40. Close game is defined as a point
        differential &lt; 10.
      </ArticleCaption>
      <BlowoutRecapTable data={recapData} selectedTeam={selectedTeam} />
      <ArticleSubheader>Points Against Just Joshin Leaderboard</ArticleSubheader>
      <JakeAlecTable
        data={matchupData.filter((item) => item["team_name.x"] === "Just Joshin")}
        selectedTeam={selectedTeam}
        filteredTeam={filteredTeam}
      ></JakeAlecTable>
      <ArticleSubheader>Points Against {filteredTeam} Leaderboard</ArticleSubheader>
      <label
        style={{
          display: "block",
          fontSize: "12px",
          textAlign: "center",
        }}
      >
        Team to compare to Just Joshin:
      </label>
      <TeamDropdown data={recapData} onSelectTeam={setFilteredTeam} />
      <JakeAlecTable
        data={matchupData.filter((item) => item["team_name.x"] === filteredTeam)}
        selectedTeam={selectedTeam}
        filteredTeam={filteredTeam}
      ></JakeAlecTable>
    </div>
  );
};

const RosterDecisions = () => {
  const { selectedTeam } = useContext(TeamContext);

  const [filteredTeam, setFilteredTeam] = useState(null);
  const [showCount, setShowCount] = useState(12);

  return (
    <div>
      <ArticleHeader>Roster Decisions</ArticleHeader>
      <ArticleSubheader>Team Management</ArticleSubheader>
      <TransactionRecapTable data={recapData} selectedTeam={selectedTeam} />
      <ArticleSubheader>Free Agents</ArticleSubheader>
      <label
        style={{
          display: "block",
          fontSize: "12px",
          textAlign: "center",
        }}
      >
        Team to show:
      </label>
      <TeamDropdown data={recapData} onSelectTeam={setFilteredTeam} />
      <label
        style={{
          display: "block",
          fontSize: "12px",
          textAlign: "center",
        }}
      >
        Rows to show: {showCount}
      </label>
      {/* Use a slider to set the showCount value */}
      <StyledSlider
        value={showCount}
        onChange={(e) => setShowCount(Number(e.target.value))}
        min="1"
        max="267" // Set the maximum value based on your requirement
      />
      <FreeAgentTable
        data={
          filteredTeam
            ? freeAgentData.filter((item) => item.team_name === filteredTeam).slice(0, showCount)
            : freeAgentData.slice(0, showCount)
        }
        selectedTeam={selectedTeam}
      />
    </div>
  );
};

const StartSitDecisions = () => {
  const { selectedTeam } = useContext(TeamContext);

  const [filteredTeam, setFilteredTeam] = useState(null);
  const [showCount, setShowCount] = useState(20);

  return (
    <div>
      <ArticleHeader>Start/Sit Decision Recap</ArticleHeader>
      <ArticleSubheader>Start/Sit Decisions</ArticleSubheader>
      <StartSitRecapTable data={recapData} selectedTeam={selectedTeam} />
      <ArticleSubheader>Worst Start Sits</ArticleSubheader>
      <label
        style={{
          display: "block",
          fontSize: "12px",
          textAlign: "center",
        }}
      >
        Team to show:
      </label>
      <TeamDropdown data={recapData} onSelectTeam={setFilteredTeam} />
      <label
        style={{
          display: "block",
          fontSize: "12px",
          textAlign: "center",
        }}
      >
        Rows to show: {showCount}
      </label>
      {/* Use a slider to set the showCount value */}
      <StyledSlider
        value={showCount}
        onChange={(e) => setShowCount(Number(e.target.value))}
        min="1"
        max="191" // Set the maximum value based on your requirement
      />
      <WorstStartSitsTable
        bestBallBenchData={
          filteredTeam
            ? bestBallBenchData
                .filter((item) => item.team_name === filteredTeam)
                .slice(0, showCount)
            : bestBallBenchData.slice(0, showCount)
        }
        selectedTeam={selectedTeam}
        filteredTeam={filteredTeam}
      />
    </div>
  );
};

const TradeRecapArticle = () => {
  const { selectedTeam } = useContext(TeamContext);

  return (
    <div>
      <ArticleHeader>Trade Recap</ArticleHeader>
      <ArticleSubheader>Trade Summary</ArticleSubheader>
      <TradeRecapTable data={recapData} selectedTeam={selectedTeam} />
      <ArticleSubheader>Individual Trade Recap</ArticleSubheader>
      <DualTableViewer data={tradeData} selectedTeam={selectedTeam}></DualTableViewer>
    </div>
  );
};

const QBArticle = () => {
  const { selectedTeam } = useContext(TeamContext);

  return (
    <div>
      <ArticleHeader>Top Players By Position - Quarterback</ArticleHeader>
      <ArticleSubheader>Best QBs All Season Long</ArticleSubheader>
      <RecapPositionTable
        data={starterData.filter(
          (item) => item.position === "QB" && item.games_played >= 8 && item.ppg >= 20
        )}
        selectedTeam={selectedTeam}
      />
      <ArticleSubheader>Worst QBs All Season Long</ArticleSubheader>
      <RecapPositionTable
        data={starterData
          .filter((item) => item.position === "QB" && item.games_played >= 8 && item.ppg < 20)
          .reverse()}
        selectedTeam={selectedTeam}
      />
      <ArticleSubheader>Best QB Rentals</ArticleSubheader>
      <RecapPositionTable
        data={starterData.filter(
          (item) => item.position === "QB" && item.games_played < 8 && item.ppg >= 20
        )}
        selectedTeam={selectedTeam}
      />
      <ArticleSubheader>Worst QB Rentals</ArticleSubheader>
      <RecapPositionTable
        data={starterData
          .filter((item) => item.position === "QB" && item.games_played < 8 && item.ppg < 10)
          .reverse()}
        selectedTeam={selectedTeam}
      />
    </div>
  );
};

const RBArticle = () => {
  const { selectedTeam } = useContext(TeamContext);

  return (
    <div>
      <ArticleHeader>Top Players By Position - Runningback</ArticleHeader>
      <ArticleSubheader>Best RBs All Season Long</ArticleSubheader>
      <RecapPositionTable
        data={starterData.filter(
          (item) => item.position === "RB" && item.games_played >= 8 && item.ppg >= 16
        )}
        selectedTeam={selectedTeam}
      />
      <ArticleSubheader>Worst RBs All Season Long</ArticleSubheader>
      <RecapPositionTable
        data={starterData
          .filter((item) => item.position === "RB" && item.games_played >= 8 && item.ppg < 14)
          .reverse()}
        selectedTeam={selectedTeam}
      />
      <ArticleSubheader>Best RB Rentals</ArticleSubheader>
      <RecapPositionTable
        data={starterData.filter(
          (item) => item.position === "RB" && item.games_played < 8 && item.ppg >= 15
        )}
        selectedTeam={selectedTeam}
      />
      <ArticleSubheader>Worst RB Rentals</ArticleSubheader>
      <RecapPositionTable
        data={starterData
          .filter((item) => item.position === "RB" && item.games_played < 8 && item.ppg < 5)
          .reverse()}
        selectedTeam={selectedTeam}
      />
    </div>
  );
};

const WRArticle = () => {
  const { selectedTeam } = useContext(TeamContext);

  return (
    <div>
      <ArticleHeader>Top Players By Position - Wide Receiver</ArticleHeader>
      <ArticleSubheader>Best WRs All Season Long</ArticleSubheader>
      <RecapPositionTable
        data={starterData.filter(
          (item) => item.position === "WR" && item.games_played >= 8 && item.ppg >= 18
        )}
        selectedTeam={selectedTeam}
      />
      <ArticleSubheader>Worst WRs All Season Long</ArticleSubheader>
      <RecapPositionTable
        data={starterData
          .filter((item) => item.position === "WR" && item.games_played >= 8 && item.ppg < 13)
          .reverse()}
        selectedTeam={selectedTeam}
      />
      <ArticleSubheader>Best WR Rentals</ArticleSubheader>
      <RecapPositionTable
        data={starterData.filter(
          (item) => item.position === "WR" && item.games_played < 8 && item.ppg >= 17
        )}
        selectedTeam={selectedTeam}
      />
      <ArticleSubheader>Worst WR Rentals</ArticleSubheader>
      <RecapPositionTable
        data={starterData
          .filter((item) => item.position === "WR" && item.games_played < 8 && item.ppg < 5)
          .reverse()}
        selectedTeam={selectedTeam}
      />
    </div>
  );
};

const TEArticle = () => {
  const { selectedTeam } = useContext(TeamContext);

  return (
    <div>
      <ArticleHeader>Top Players By Position - Tight End</ArticleHeader>
      <ArticleSubheader>Best TEs All Season Long</ArticleSubheader>
      <RecapPositionTable
        data={starterData.filter(
          (item) => item.position === "TE" && item.games_played >= 8 && item.ppg >= 13
        )}
        selectedTeam={selectedTeam}
      />
      <ArticleSubheader>Worst TEs All Season Long</ArticleSubheader>
      <RecapPositionTable
        data={starterData
          .filter((item) => item.position === "TE" && item.games_played >= 8 && item.ppg < 13)
          .reverse()}
        selectedTeam={selectedTeam}
      />
      <ArticleSubheader>Best TE Rentals</ArticleSubheader>
      <RecapPositionTable
        data={starterData.filter(
          (item) => item.position === "TE" && item.games_played < 8 && item.ppg >= 13
        )}
        selectedTeam={selectedTeam}
      />
      <ArticleSubheader>Worst TE Rentals</ArticleSubheader>
      <RecapPositionTable
        data={starterData
          .filter((item) => item.position === "TE" && item.games_played < 8 && item.ppg < 5)
          .reverse()}
        selectedTeam={selectedTeam}
      />
    </div>
  );
};

const KArticle = () => {
  const { selectedTeam } = useContext(TeamContext);

  return (
    <div>
      <ArticleHeader>Top Players By Position - Kicker</ArticleHeader>
      <ArticleSubheader>Best Ks All Season Long</ArticleSubheader>
      <RecapPositionTable
        data={starterData.filter(
          (item) => item.position === "K" && item.games_played >= 8 && item.ppg >= 9
        )}
        selectedTeam={selectedTeam}
      />
      <ArticleSubheader>Worst Ks All Season Long</ArticleSubheader>
      <RecapPositionTable
        data={starterData
          .filter((item) => item.position === "K" && item.games_played >= 8 && item.ppg < 9)
          .reverse()}
        selectedTeam={selectedTeam}
      />
      <ArticleSubheader>Best K Rentals</ArticleSubheader>
      <RecapPositionTable
        data={starterData.filter(
          (item) => item.position === "K" && item.games_played < 8 && item.ppg >= 11
        )}
        selectedTeam={selectedTeam}
      />
      <ArticleSubheader>Worst K Rentals</ArticleSubheader>
      <RecapPositionTable
        data={starterData
          .filter((item) => item.position === "K" && item.games_played < 8 && item.ppg < 5)
          .reverse()}
        selectedTeam={selectedTeam}
      />
      <ArticleSubheader>Rent or Own Kicker?</ArticleSubheader>
      <KickerDefenseChart
        data={kickerDefenseData.filter((item) => item.position === "K")}
      ></KickerDefenseChart>
    </div>
  );
};

const DEFArticle = () => {
  const { selectedTeam } = useContext(TeamContext);

  return (
    <div>
      <ArticleHeader>Top Players By Position - Defense</ArticleHeader>
      <ArticleSubheader>Best DEFs All Season Long</ArticleSubheader>
      <RecapPositionTable
        data={starterData.filter(
          (item) => item.position === "DEF" && item.games_played >= 8 && item.ppg >= 8
        )}
        selectedTeam={selectedTeam}
      />
      <ArticleSubheader>Worst DEFs All Season Long</ArticleSubheader>
      <RecapPositionTable
        data={starterData
          .filter((item) => item.position === "DEF" && item.games_played >= 8 && item.ppg < 8)
          .reverse()}
        selectedTeam={selectedTeam}
      />
      <ArticleSubheader>Best DEF Rentals</ArticleSubheader>
      <RecapPositionTable
        data={starterData.filter(
          (item) => item.position === "DEF" && item.games_played < 8 && item.ppg >= 11
        )}
        selectedTeam={selectedTeam}
      />
      <ArticleSubheader>Worst DEF Rentals</ArticleSubheader>
      <RecapPositionTable
        data={starterData
          .filter((item) => item.position === "DEF" && item.games_played < 8 && item.ppg < 4)
          .reverse()}
        selectedTeam={selectedTeam}
      />
      <ArticleSubheader>Rent or Own Defense?</ArticleSubheader>
      <KickerDefenseChart
        data={kickerDefenseData.filter((item) => item.position === "DEF")}
      ></KickerDefenseChart>
    </div>
  );
};

const YourStartersByPosition = () => {
  const { selectedTeam, setSelectedTeam } = useContext(TeamContext);

  return (
    <div>
      <ArticleHeader>Your Starters By Position</ArticleHeader>
      <TeamDropdown data={recapData} selectedTeam={selectedTeam} onSelectTeam={setSelectedTeam} />
      <ArticleSubheader>QB</ArticleSubheader>
      <RecapPositionTable
        data={starterData.filter(
          (item) => item.position === "QB" && item.team_name === selectedTeam
        )}
        selectedTeam={selectedTeam}
      />
      <ArticleSubheader>RB</ArticleSubheader>
      <RecapPositionTable
        data={starterData.filter(
          (item) => item.position === "RB" && item.team_name === selectedTeam
        )}
        selectedTeam={selectedTeam}
      />
      <ArticleSubheader>WR</ArticleSubheader>
      <RecapPositionTable
        data={starterData.filter(
          (item) => item.position === "WR" && item.team_name === selectedTeam
        )}
        selectedTeam={selectedTeam}
      />
      <ArticleSubheader>TE</ArticleSubheader>
      <RecapPositionTable
        data={starterData.filter(
          (item) => item.position === "TE" && item.team_name === selectedTeam
        )}
        selectedTeam={selectedTeam}
      />
      <ArticleSubheader>K</ArticleSubheader>
      <RecapPositionTable
        data={starterData.filter(
          (item) => item.position === "K" && item.team_name === selectedTeam
        )}
        selectedTeam={selectedTeam}
      />
      <ArticleSubheader>DEF</ArticleSubheader>
      <RecapPositionTable
        data={starterData.filter(
          (item) => item.position === "DEF" && item.team_name === selectedTeam
        )}
        selectedTeam={selectedTeam}
      />
    </div>
  );
};

const ThankYouArticle = () => {
  return (
    <div>
      <ArticleHeader>Thank you for reading!</ArticleHeader>
      <p>
        Thank you for reading the 2023 Season Recap. We hope you enjoyed it, and we are looking
        forward to next season's shenanigans.
      </p>
    </div>
  );
};

export const articles = [
  {
    id: 1,
    content: AwardsArticle,
  },
  {
    id: 2,
    content: FirstTeamRecapArticle,
  },
  {
    id: 3,
    content: TeamPerformanceOne,
  },
  {
    id: 4,
    content: TeamPerformanceTwo,
  },
  {
    id: 5,
    content: RosterDecisions,
  },
  {
    id: 6,
    content: StartSitDecisions,
  },
  {
    id: 7,
    content: TradeRecapArticle,
  },
  {
    id: 8,
    content: QBArticle,
  },
  {
    id: 9,
    content: RBArticle,
  },
  {
    id: 10,
    content: WRArticle,
  },
  {
    id: 11,
    content: TEArticle,
  },
  {
    id: 12,
    content: KArticle,
  },
  {
    id: 13,
    content: DEFArticle,
  },
  {
    id: 14,
    content: YourStartersByPosition,
  },
  {
    id: 15,
    content: ThankYouArticle,
  },
];
