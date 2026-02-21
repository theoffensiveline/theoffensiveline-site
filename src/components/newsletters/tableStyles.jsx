import styled from "styled-components";
import { ColorConstants } from "../constants/ColorConstants.ts";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowUp, faArrowDown, faMinus } from "@fortawesome/free-solid-svg-icons";
import PropTypes from "prop-types";
import React from "react";
import { useState } from "react";
import { ArticleSubheader, StyledButton } from "./newsStyles.jsx";
import { useTheme } from "../../ThemeContext.tsx";

// Base Table Components
const BaseTable = styled.table`
  table-layout: auto;
  max-width: 100%;
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;

  th,
  td {
    border: 1px solid #000;
    padding: 8px 4px;
    color: ${({ theme }) => theme.text};
    text-align: left;
    font-size: 12px;
  }

  th {
    color: ${({ theme }) => theme.background};
    background-color: ${({ theme }) => theme.text};
    text-align: center;
  }

  .wrap-cell {
    white-space: normal;
    word-break: break-word;
  }
  .center-column {
    text-align: center;
  }
  .positive-trend {
    color: green;
  }
  .negative-trend {
    color: red;
  }
`;

export const StyledTable = styled(BaseTable)``;

export const StickyTable = styled(BaseTable)`
  overflow-x: auto;
  display: block;

  thead th {
    position: sticky;
    top: 0;
    z-index: 1;
  }

  /* Sticky styles for the first column */
  tbody td:nth-child(1),
  thead th:nth-child(1) {
    position: sticky;
    background-color: ${({ theme }) => theme.text};
    color: ${({ theme }) => theme.background};
    text-align: left;
    left: 0;
    z-index: 2;
    width: 120px;
    min-width: 120px;
    max-width: 120px;
  }
`;

// Base Table Component for reuse
const BaseDataTable = ({ headers, data, renderCell }) => (
  <StyledTable>
    <thead>
      <tr>
        {headers.map((header) => (
          <th key={header}>{header}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map((row, index) => (
        <tr key={index}>{headers.map((header) => renderCell(row, header))}</tr>
      ))}
    </tbody>
  </StyledTable>
);

// Utility function for trend styling
const getTrendClass = (value) => {
  return value > 0 ? "positive-trend" : value < 0 ? "negative-trend" : "";
};

// Table Components
export const LeaderboardTable = ({ leaderboardData }) => {
  const headers = ["Rank", "Trend", "Team", "W", "L", "PF", "PA"];

  const renderCell = (row, header) => {
    const baseStyle = "center-column";

    switch (header) {
      case "Trend":
        return <td className={`${baseStyle} ${getTrendClass(row.Trend)}`}>{row.Trend}</td>;
      case "PF":
      case "PA":
        return (
          <td
            className={baseStyle}
            style={{
              backgroundColor: row[`${header}Color`],
              color: ColorConstants["light"].text,
            }}
          >
            {row[header]}
          </td>
        );
      case "Team":
        return <td className="wrap-cell">{row[header]}</td>;
      default:
        return <td className={baseStyle}>{row[header]}</td>;
    }
  };

  return <BaseDataTable headers={headers} data={leaderboardData} renderCell={renderCell} />;
};

export const PowerRankingsTable = ({ powerRankingsData }) => {
  const headers = [
    "Power Rank",
    "Trend",
    "Team",
    "Play All W",
    "Play All L",
    "Team Ability",
    "Str of Sched",
  ];

  const renderCell = (row, header) => {
    const baseStyle = "center-column";

    switch (header) {
      case "Power Rank":
        return <td className={baseStyle}>{row["P Rank"]}</td>;
      case "Trend":
        return <td className={`${baseStyle} ${getTrendClass(row.Trend)}`}>{row.Trend}</td>;
      case "Team Ability":
        return (
          <td
            className={baseStyle}
            style={{
              backgroundColor: row.TaColor,
              color: ColorConstants["light"].text,
            }}
          >
            {row["Team Ability"]}
          </td>
        );
      case "Str of Sched":
        return (
          <td
            className={baseStyle}
            style={{
              backgroundColor: row.SosColor,
              color: ColorConstants["light"].text,
            }}
          >
            {row["Str of Sched"]}
          </td>
        );
      case "Team":
        return <td className="wrap-cell">{row[header]}</td>;
      default:
        return <td className={baseStyle}>{row[header]}</td>;
    }
  };

  return <BaseDataTable headers={headers} data={powerRankingsData} renderCell={renderCell} />;
};

export const AwardsTable = ({ awardsData }) => {
  const headers = ["Superlative", "Winner + Description"];

  const renderCell = (row, header) => (
    <td className={header === "Superlative" ? "wrap-cell" : ""}>{row[header]}</td>
  );

  return <BaseDataTable headers={headers} data={awardsData} renderCell={renderCell} />;
};

export const MotwTable = ({ motwHistoryData }) => {
  const headers = [
    "Week",
    "Winner Team",
    "Winner Score",
    "Loser Score",
    "Loser Team",
    "# of Shots / Dogs",
  ];

  const renderCell = (row, header) => {
    switch (header) {
      case "Winner Score":
        return (
          <td
            className="center-column"
            style={{
              backgroundColor: row.WinnerScoreColor,
              color: ColorConstants["light"].text,
            }}
          >
            {row[header]}
          </td>
        );
      case "Loser Score":
        return (
          <td
            className="center-column"
            style={{
              backgroundColor: row.LoserScoreColor,
              color: ColorConstants["light"].text,
            }}
          >
            {row[header]}
          </td>
        );
      case "# of Shots / Dogs":
        return (
          <td
            className="center-column"
            style={{
              backgroundColor: row.ShotsDogsColor,
              color: ColorConstants["light"].text,
            }}
          >
            {row["# of Shots/Dogs"]}
          </td>
        );
      case "Winner Team":
      case "Loser Team":
        return <td className="wrap-cell">{row[header]}</td>;
      default:
        return <td className="center-column">{row[header]}</td>;
    }
  };

  return <BaseDataTable headers={headers} data={motwHistoryData} renderCell={renderCell} />;
};

export const DivisionRecordTable = ({ data, standings = [] }) => {
  const headers = ["Team", "Hubbell", "Glizzy", "Avon"];
  const divisions = ["Hubbell", "Glizzy", "Avon"];

  const standingsOrder = standings.map((entry) => entry.Team).filter(Boolean);
  const standingsRank = standingsOrder.reduce((acc, teamName, index) => {
    if (!(teamName in acc)) {
      acc[teamName] = index;
    }
    return acc;
  }, {});

  const createDivisionTemplate = () =>
    divisions.reduce((acc, team_division) => {
      acc[team_division] = { wins: 0, losses: 0 };
      return acc;
    }, {});

  const teamRecordsMap = (data || []).reduce((acc, entry) => {
    const { team_name, opponent_division, wins = 0, losses = 0 } = entry;
    if (!team_name) {
      return acc;
    }

    if (!acc[team_name]) {
      acc[team_name] = {
        teamName: team_name,
        totalWins: 0,
        totalLosses: 0,
        records: createDivisionTemplate(),
      };
    }

    const teamRecord = acc[team_name];
    teamRecord.totalWins += wins;
    teamRecord.totalLosses += losses;

    if (opponent_division && teamRecord.records[opponent_division]) {
      teamRecord.records[opponent_division].wins += wins;
      teamRecord.records[opponent_division].losses += losses;
    }

    return acc;
  }, {});

  const formatRecord = (record) => {
    const wins = record?.wins ?? 0;
    const losses = record?.losses ?? 0;
    return `${wins}-${losses}`;
  };

  const sortedTeams = Object.values(teamRecordsMap).sort((a, b) => {
    const rankA = standingsRank.hasOwnProperty(a.teamName) ? standingsRank[a.teamName] : Infinity;
    const rankB = standingsRank.hasOwnProperty(b.teamName) ? standingsRank[b.teamName] : Infinity;

    if (rankA !== rankB) {
      return rankA - rankB;
    }

    if (b.totalWins !== a.totalWins) {
      return b.totalWins - a.totalWins;
    }
    if (a.totalLosses !== b.totalLosses) {
      return a.totalLosses - b.totalLosses;
    }
    return a.teamName.localeCompare(b.teamName);
  });

  const tableData = sortedTeams.map((team) => ({
    Team: team.teamName,
    Hubbell: formatRecord(team.records.Hubbell),
    Glizzy: formatRecord(team.records.Glizzy),
    Avon: formatRecord(team.records.Avon),
  }));

  const renderCell = (row, header) => (
    <td className={header === "Team" ? "wrap-cell" : "center-column"}>{row[header] ?? "-"}</td>
  );

  return <BaseDataTable headers={headers} data={tableData} renderCell={renderCell} />;
};

export const DivisionOverallRecordsTable = ({ data }) => {
  const headers = ["Division", "Teams", "Games", "Wins", "Losses", "Win %"];

  const tableData = (data || []).map((row) => ({
    Division: row.team_division,
    Teams: row.teams,
    Games: row.games,
    Wins: row.wins,
    Losses: row.losses,
    "Win %": row.win_pct !== undefined ? `${(row.win_pct * 100).toFixed(1)}%` : "-",
  }));

  const renderCell = (row, header) => (
    <td className={header === "Division" ? "wrap-cell" : "center-column"}>{row[header] ?? "-"}</td>
  );

  return <BaseDataTable headers={headers} data={tableData} renderCell={renderCell} />;
};

export const PlayoffTable = ({ playoffData }) => {
  const headers = [
    "Rank",
    "Team",
    "W",
    "L",
    "Playoff %",
    "WP Playoff %",
    "Play-off #",
    "Last %",
    "Last #",
  ];

  const renderCell = (row, header) => {
    const baseStyle = "center-column";

    switch (header) {
      case "Playoff %":
        return (
          <td
            className={baseStyle}
            style={{
              backgroundColor: row.PlayoffColor,
              color: ColorConstants["light"].text,
            }}
          >
            {row["Play-off %"]}
          </td>
        );
      case "WP Playoff %":
        return (
          <td
            className={baseStyle}
            style={{
              backgroundColor: row.WPPlayoffColor,
              color: ColorConstants["light"].text,
            }}
          >
            {row["WP Playoff %"]}
          </td>
        );
      case "Play-off #":
        return (
          <td
            className={baseStyle}
            style={{
              backgroundColor: row.PlayoffMagicColor,
              whiteSpace: "nowrap",
            }}
          >
            {row["Play-off #"]}
          </td>
        );
      case "Last %":
        return (
          <td
            className={baseStyle}
            style={{
              backgroundColor: row.LastColor,
              color: ColorConstants["light"].text,
            }}
          >
            {row["Last %"]}
          </td>
        );
      case "Last #":
        return (
          <td
            className={baseStyle}
            style={{
              backgroundColor: row.LastMagicColor,
              whiteSpace: "nowrap",
            }}
          >
            {row["Last #"]}
          </td>
        );
      case "Team":
        return <td className="wrap-cell">{row[header]}</td>;
      default:
        return <td className={baseStyle}>{row[header]}</td>;
    }
  };

  return <BaseDataTable headers={headers} data={playoffData} renderCell={renderCell} />;
};

export const AltLeaderboardTable = ({ data }) => {
  const headers = ["Rank", "Diff", "Team", "W", "L", "PF", "PA"];

  const renderCell = (row, header) => {
    const baseStyle = "center-column";

    switch (header) {
      case "Diff":
        return <td className={`${baseStyle} ${getTrendClass(row.Diff)}`}>{row.Diff}</td>;
      case "PF":
      case "PA":
        return (
          <td
            className={baseStyle}
            style={{
              backgroundColor: row[`${header}Color`],
              color: ColorConstants["light"].text,
            }}
          >
            {row[header]}
          </td>
        );
      case "Team":
        return <td className="wrap-cell">{row[header]}</td>;
      default:
        return <td className={baseStyle}>{row[header]}</td>;
    }
  };

  return <BaseDataTable headers={headers} data={data} renderCell={renderCell} />;
};

export const DangerTable = ({ data }) => {
  // Extract headers excluding color columns and Team
  const headers = Object.keys(data[0]).filter(
    (header) => !header.endsWith("_color") && header !== "Team"
  );
  headers.unshift("Team"); // Add Team back as first column

  const headerToolTips = {
    NPG: "Next Possible Game",
    RPA: "Remaining Possible Appearances",
    DM: "Danger Metric",
  };

  const renderCell = (row, header) => {
    const isTeam = header === "Team";
    const colorColumn = `${header}_color`;
    const backgroundColor = isTeam ? "transparent" : row[colorColumn];

    return (
      <td
        style={{
          backgroundColor: backgroundColor || "transparent",
          textAlign: isTeam ? "left" : "center",
          color: isTeam ? "inherit" : ColorConstants["light"].text,
        }}
      >
        {row[header]}
      </td>
    );
  };

  return (
    <StyledTable>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header} title={headerToolTips[header]}>
              {header}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((row, index) => (
          <tr key={index}>{headers.map((header) => renderCell(row, header))}</tr>
        ))}
      </tbody>
    </StyledTable>
  );
};

export const ScheduleTable = ({ data }) => {
  const headers = ["Team", "Best Possible Record", "Current Record", "Worst Possible Record"];

  // Helper functions
  const findTeamRecord = (records, teamName) => {
    const teamRecord = records.find((record) => record.team1 === teamName);
    return teamRecord
      ? `${teamRecord.wins}-${teamRecord.losses}${teamRecord.ties > 0 ? `-${teamRecord.ties}` : ""} <br />`
      : "N/A";
  };

  const getOpponentList = (records, teamName) => {
    const teamRecord = records.find((record) => record.team1 === teamName);
    return teamRecord
      ? teamRecord.team2_list
          .filter((opponent) => opponent !== "N/A")
          .map((opponent) => (opponent.ties > 0 ? `${opponent} (${opponent.ties} ties)` : opponent))
          .join(", <br>")
      : "N/A";
  };

  const renderCell = (row, header) => {
    switch (header) {
      case "Team":
        return <td className="wrap-cell">{row.team1}</td>;
      case "Best Possible Record":
        return (
          <td
            className="center-column"
            dangerouslySetInnerHTML={{
              __html: `${findTeamRecord(data.best_records, row.team1)}(${getOpponentList(
                data.best_records,
                row.team1
              )})`,
            }}
          />
        );
      case "Current Record":
        return (
          <td className="center-column">
            {`${row.wins}-${row.losses}${row.ties > 0 ? `-${row.ties}` : ""}`}
          </td>
        );
      case "Worst Possible Record":
        return (
          <td
            className="center-column"
            dangerouslySetInnerHTML={{
              __html: `${findTeamRecord(data.worst_records, row.team1)}(${getOpponentList(
                data.worst_records,
                row.team1
              )})`,
            }}
          />
        );
      default:
        return <td className="center-column">{row[header]}</td>;
    }
  };

  return <BaseDataTable headers={headers} data={data.current_records} renderCell={renderCell} />;
};

// First, create a styled version of BaseDataTable that uses StickyTable
const BaseStickyDataTable = ({ headers, data, renderCell }) => (
  <StickyTable>
    <thead>
      <tr>
        {headers.map((header) => (
          <th key={header}>{header}</th>
        ))}
      </tr>
    </thead>
    <tbody>
      {data.map((row, index) => (
        <tr key={index}>
          {headers.map((header) => React.cloneElement(renderCell(row, header), { key: header }))}
        </tr>
      ))}
    </tbody>
  </StickyTable>
);

export const WeeklyMarginTable = ({ matchupData, leaderboardData }) => {
  const weeks = [...new Set(matchupData.map((week) => week.week))];
  const headers = ["Team", "W", "L", ...weeks.map((week) => `Wk ${week}`)];

  // Find unique teams and merge them with leaderboard data
  const teamsWithRecords = leaderboardData.map((teamRecord) => ({
    team_name: teamRecord.Team,
    W: teamRecord.W,
    L: teamRecord.L,
    PF: teamRecord.PF,
    weeks: weeks.reduce((acc, week) => {
      const weekData = matchupData.find(
        (data) => data.team_name === teamRecord.Team && data.week === week
      );
      acc[`Wk ${week}`] = {
        value: weekData?.margin_of_victory || "N/A",
        mov_color: weekData?.mov_color,
        hasData: !!weekData,
      };
      return acc;
    }, {}),
  }));

  // Sort the teams by W and then by PF
  teamsWithRecords.sort((a, b) => {
    if (a.W === b.W) {
      return b.PF - a.PF;
    }
    return b.W - a.W;
  });

  const renderCell = (row, header) => {
    switch (header) {
      case "Team":
        return <td className="wrap-cell">{row.team_name}</td>;
      case "W":
      case "L":
        return (
          <td
            className="center-column"
            style={{
              backgroundColor: ColorConstants["light"].background,
              color: ColorConstants["light"].text,
            }}
          >
            {row[header]}
          </td>
        );
      default: // Week columns
        const weekData = row.weeks[header];

        return (
          <td
            className="center-column"
            style={{
              backgroundColor: weekData.mov_color || ColorConstants["light"].background,
              color: weekData.hasData ? ColorConstants["light"].text : ColorConstants["light"].text,
            }}
          >
            {weekData.value}
          </td>
        );
    }
  };

  return <BaseStickyDataTable headers={headers} data={teamsWithRecords} renderCell={renderCell} />;
};

// Add the TableSortButton component
const TableSortButton = styled.button`
  width: 100%;
  height: 100%;
  padding: 0.25rem 0.15rem 0.35rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 0.2rem;
  text-align: center;
  background: transparent;
  color: ${({ theme }) => theme.text};
  border: none;
  cursor: pointer;
  text-transform: none;
  letter-spacing: normal;
  font-size: 0.78rem;
  font-weight: 600;
  transition: color 0.15s ease;

  &:focus-visible {
    outline: 2px solid ${({ theme }) => theme.buttonText};
    outline-offset: 2px;
  }

  .sort-button-text {
    display: block;
    width: 100%;
    line-height: 1.25;
    white-space: normal;
    color: inherit;
  }

  .sort-indicator {
    display: inline-flex;
    align-items: center;
    justify-content: center;
    font-size: 0.85rem;
    color: inherit;
    opacity: 0.85;
  }
`;

export const SortButton = ({ direction = null, onClick, className, children }) => {
  return (
    <TableSortButton onClick={onClick} className={className}>
      <span className="sort-button-text">{children}</span>
      {direction ? (
        <span className="sort-indicator">
          <FontAwesomeIcon
            icon={direction === "asc" ? faArrowUp : faArrowDown}
            aria-label={direction === "asc" ? "Sorted ascending" : "Sorted descending"}
          />
        </span>
      ) : (
        <span className="sort-indicator" aria-label="Unsorted">
          <FontAwesomeIcon icon={faMinus} />
        </span>
      )}
    </TableSortButton>
  );
};

SortButton.propTypes = {
  onClick: PropTypes.func.isRequired,
  className: PropTypes.string,
  children: PropTypes.node.isRequired,
  direction: PropTypes.oneOf(["asc", "desc", null]),
};

// Add the useSortableData hook
export const useSortableData = (items, config = null) => {
  const [sortConfig, setSortConfig] = React.useState(config);

  const sortedItems = React.useMemo(() => {
    let sortableItems = [...items];
    if (sortConfig) {
      sortableItems.sort((a, b) => {
        if (a[sortConfig.key] < b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? -1 : 1;
        }
        if (a[sortConfig.key] > b[sortConfig.key]) {
          return sortConfig.direction === "asc" ? 1 : -1;
        }
        return 0;
      });
    }
    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    let direction = "desc";
    if (sortConfig?.key === key && sortConfig.direction === "desc") {
      direction = "asc";
    }
    setSortConfig({ key, direction });
  };

  return { items: sortedItems, requestSort, sortConfig };
};

// Add the RecapTable component
export const RecapTable = ({ data, selectedTeam, columns, showCount }) => {
  const { theme: themeName } = useTheme();
  const { items, requestSort, sortConfig } = useSortableData(data);
  const displayedItems = showCount ? items.slice(0, showCount) : items;

  const getSortDirection = (key) => {
    if (!sortConfig) return null;
    return sortConfig.key === key ? sortConfig.direction : null;
  };

  const renderCell = (row, column) => {
    const colorCondition = column.colorKey ? true : false;
    const value = row[column.sortKey];

    return (
      <td
        className={`${column.center ? "center-column" : ""} wrap-cell`}
        style={{
          background:
            column.sortKey === "team_name" && row.team_name === selectedTeam
              ? ColorConstants.dark.newsBlue
              : colorCondition && row[column.colorKey]
                ? row[column.colorKey]
                : "transparent",
          color: !colorCondition ? "inherit" : ColorConstants["light"].text,
        }}
      >
        {value}
      </td>
    );
  };

  return (
    <BaseTable>
      <thead>
        <tr>
          {columns.map((column, index) => (
            <th
              key={index}
              className="wrap-cell recap-header"
              style={{
                backgroundColor: ColorConstants[themeName ?? "light"].tableHeaderBackground,
                color: ColorConstants[themeName ?? "light"].buttonText,
              }}
            >
              <SortButton
                onClick={() => requestSort(column.sortKey)}
                direction={getSortDirection(column.sortKey)}
              >
                {column.label}
              </SortButton>
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {displayedItems.map((item, index) => (
          <tr key={index}>{columns.map((column, columnIndex) => renderCell(item, column))}</tr>
        ))}
      </tbody>
    </BaseTable>
  );
};

// recap stuff
export const RecapPositionTable = ({ data, selectedTeam }) => {
  const columns = [
    { label: "Team", sortKey: "team_name" },
    { label: "Player", sortKey: "full_name" },
    { label: "Games Played", sortKey: "games_played", center: true },
    { label: "Points per Game", sortKey: "ppg", center: true, colorKey: "color" },
  ];

  return <RecapTable data={data} selectedTeam={selectedTeam} columns={columns} />;
};

export const WorstStartSitsTable = ({ bestBallBenchData, selectedTeam, showCount }) => {
  const columns = [
    { label: "Team Name", sortKey: "team_name" },
    { label: "Week", sortKey: "week", center: true },
    {
      label: "Points Missed",
      sortKey: "points_over_starter",
      center: true,
      colorKey: "color_points_over_starter",
    },
    { label: "Bench Player", sortKey: "full_name" },
    { label: "Points", sortKey: "points", center: true, colorKey: "color_bench" },
    { label: "Starter Points", sortKey: "points_starter", center: true, colorKey: "color_starter" },
    { label: "Starter", sortKey: "full_name_starter" },
  ];

  return (
    <RecapTable
      data={bestBallBenchData}
      selectedTeam={selectedTeam}
      columns={columns}
      showCount={showCount}
    />
  );
};

export const FreeAgentTable = ({ data, selectedTeam, showCount }) => {
  const columns = [
    { label: "Week", sortKey: "week", center: true },
    { label: "Team Name", sortKey: "team_name" },
    {
      label: "Games Played",
      sortKey: "games_played",
      center: true,
      colorKey: "games_played_color",
    },
    { label: "PPG", sortKey: "ppg", center: true, colorKey: "ppg_color" },
    { label: "Points", sortKey: "points", center: true, colorKey: "points_color" },
    { label: "Full Name", sortKey: "full_name" },
  ];

  return (
    <RecapTable data={data} selectedTeam={selectedTeam} columns={columns} showCount={showCount} />
  );
};

export const MotwRecapTable = ({ data, selectedTeam }) => {
  const columns = [
    { label: "Team Name", sortKey: "team_name" },
    { label: "Wins", sortKey: "motw_wins", center: true, colorKey: "motw_wins_color" },
    { label: "Losses", sortKey: "motw_losses", center: true, colorKey: "motw_losses_color" },
    {
      label: "Hot Dogs / Shots Taken",
      sortKey: "shots_dogs",
      center: true,
      colorKey: "shots_dogs_taken_color",
    },
    {
      label: "Hot Dogs / Shots Given",
      sortKey: "shots_dogs_given_out",
      center: true,
      colorKey: "shots_dogs_given_out_color",
    },
  ];

  return <RecapTable data={data} selectedTeam={selectedTeam} columns={columns} />;
};

export const BestWorstGameRecapTable = ({ data, selectedTeam }) => {
  const columns = [
    { label: "Team Name", sortKey: "team_name" },
    { label: "Best Win", sortKey: "most_points_1", center: true, colorKey: "best_win_color" },
    { label: "Worst Win", sortKey: "least_points_1", center: true, colorKey: "worst_win_color" },
    { label: "Best Loss", sortKey: "most_points_0", center: true, colorKey: "best_loss_color" },
    { label: "Worst Loss", sortKey: "least_points_0", center: true, colorKey: "worst_loss_color" },
  ];

  return <RecapTable data={data} selectedTeam={selectedTeam} columns={columns} />;
};

export const BestWorstTeamRecapTable = ({ data, selectedTeam }) => {
  const columns = [
    { label: "Team Name", sortKey: "team_name" },
    {
      label: "# of Weeks as Top Team",
      sortKey: "best_team_week_count",
      center: true,
      colorKey: "best_team_color",
    },
    {
      label: "# of Weeks as Worst Team",
      sortKey: "worst_team_week_count",
      center: true,
      colorKey: "worst_team_color",
    },
    {
      label: "# of Weeks against Top Team",
      sortKey: "other_team_best_week_count",
      center: true,
      colorKey: "best_other_team_color",
    },
    {
      label: "# of Weeks against Worst Team",
      sortKey: "other_team_worst_week_count",
      center: true,
      colorKey: "worst_other_team_color",
    },
  ];

  return <RecapTable data={data} selectedTeam={selectedTeam} columns={columns} />;
};

export const BlowoutRecapTable = ({ data, selectedTeam }) => {
  const columns = [
    { label: "Team Name", sortKey: "team_name" },
    { label: "Avg Pt Diff in W", sortKey: "pt_diff_1", center: true, colorKey: "pt_diff_1_color" },
    { label: "Avg Pt Diff in L", sortKey: "pt_diff_0", center: true, colorKey: "pt_diff_0_color" },
    { label: "Blowout Wins", sortKey: "blowouts_1", center: true, colorKey: "blowouts_1_color" },
    { label: "Blowout Losses", sortKey: "blowouts_0", center: true, colorKey: "blowouts_0_color" },
    {
      label: "Close Wins",
      sortKey: "close_games_1",
      center: true,
      colorKey: "close_games_1_color",
    },
    {
      label: "Close Losses",
      sortKey: "close_games_0",
      center: true,
      colorKey: "close_games_0_color",
    },
  ];

  return <RecapTable data={data} selectedTeam={selectedTeam} columns={columns} />;
};

export const JakeAlecTable = ({ data, selectedTeam }) => {
  const columns = [
    { label: "Week", sortKey: "week", center: true },
    { label: "Team Name", sortKey: "team_name" },
    { label: "Points Scored", sortKey: "team_points.y", center: true, colorKey: "points_color" },
    { label: "Won", sortKey: "winner.y", center: true, colorKey: "winner_color" },
  ];

  return <RecapTable data={data} selectedTeam={selectedTeam} columns={columns} />;
};

export const TransactionRecapTable = ({ data, selectedTeam }) => {
  const columns = [
    { label: "Team Name", sortKey: "team_name" },
    { label: "Unique Starters", sortKey: "distinct_starters", center: true },
    {
      label: "Completed Waiver Claims",
      sortKey: "completed_waivers",
      center: true,
      colorKey: "completed_waivers_color",
    },
    {
      label: "FAAB Spent",
      sortKey: "total_faab_spent",
      center: true,
      colorKey: "total_faab_spent_color",
    },
    {
      label: "Failed Waiver Claims",
      sortKey: "failed_waivers",
      center: true,
      colorKey: "failed_waivers_color",
    },
    {
      label: "FAAB Failed",
      sortKey: "total_faab_failed",
      center: true,
      colorKey: "total_faab_failed_color",
    },
    {
      label: "Free Agent Adds",
      sortKey: "free_agent_adds",
      center: true,
      colorKey: "free_agent_adds_color",
    },
    { label: "Drops", sortKey: "drops", center: true, colorKey: "drops_color" },
    { label: "Trades", sortKey: "trades", center: true, colorKey: "trades_color" },
  ];

  return <RecapTable data={data} selectedTeam={selectedTeam} columns={columns} />;
};

export const TradeRecapTable = ({ data, selectedTeam }) => {
  const columns = [
    { label: "Team Name", sortKey: "team_name" },
    { label: "Trades Won", sortKey: "trade_wins", center: true, colorKey: "trade_wins_color" },
    { label: "Trades Lost", sortKey: "trade_losses", center: true, colorKey: "trade_losses_color" },
    {
      label: "Points Traded For",
      sortKey: "total_trade_for_points",
      center: true,
      colorKey: "total_trade_for_points_color",
    },
    {
      label: "Points Traded Away",
      sortKey: "total_trade_away_points",
      center: true,
      colorKey: "total_trade_away_points_color",
    },
  ];

  return <RecapTable data={data} selectedTeam={selectedTeam} columns={columns} />;
};

export const StartSitRecapTable = ({ data, selectedTeam, showCount }) => {
  const columns = [
    { label: "Team Name", sortKey: "team_name" },
    {
      label: "Wrong Start Sits",
      sortKey: "wrong_start_sits",
      center: true,
      colorKey: "wrong_start_sits_color",
    },
    {
      label: "Points Lost From Them",
      sortKey: "points_lost_from_wrong_start_sits",
      center: true,
      colorKey: "points_lost_from_wrong_start_sits_color",
    },
  ];

  return (
    <RecapTable data={data} selectedTeam={selectedTeam} columns={columns} showCount={showCount} />
  );
};

export const MostTransactedPlayersTable = ({ data, showCount }) => {
  const columns = [
    { label: "Player", sortKey: "full_name" },
    { label: "Total Adds", sortKey: "adds", center: true, colorKey: "adds_color" },
    {
      label: "Unique Owners",
      sortKey: "unique_owners",
      center: true,
      colorKey: "unique_owners_color",
    },
  ];

  return <RecapTable data={data} columns={columns} showCount={showCount} />;
};

export const BestBallBenchTable = ({ bestBallBenchData, selectedTeam, showCount }) => {
  const columns = [
    { label: "Team Name", sortKey: "team_name" },
    { label: "Week", sortKey: "week", center: true },
    { label: "Points Left", sortKey: "points_left", center: true, colorKey: "color" },
    { label: "Bench Player", sortKey: "full_name" },
    { label: "Points", sortKey: "points", center: true },
    { label: "Position", sortKey: "position", center: true },
  ];

  return (
    <RecapTable
      data={bestBallBenchData}
      selectedTeam={selectedTeam}
      columns={columns}
      showCount={showCount}
    />
  );
};

export const WeeklyRecordTable = ({ weeklyRecordData, selectedTeam }) => {
  const columns = [
    { label: "Team Name", sortKey: "team_name" },
    { label: "Week", sortKey: "week", center: true },
    { label: "Points For", sortKey: "points_for", center: true, colorKey: "color_points_for" },
    {
      label: "Points Against",
      sortKey: "points_against",
      center: true,
      colorKey: "color_points_against",
    },
    { label: "Opponent", sortKey: "opponent" },
    { label: "Result", sortKey: "result", center: true },
  ];

  return <RecapTable data={weeklyRecordData} selectedTeam={selectedTeam} columns={columns} />;
};

export const WeeklyHighLowTable = ({ weeklyHighLowData, selectedTeam }) => {
  const columns = [
    { label: "Team Name", sortKey: "team_name" },
    { label: "High Score", sortKey: "high_score", center: true, colorKey: "color_high" },
    { label: "High Week", sortKey: "high_week", center: true },
    { label: "Low Score", sortKey: "low_score", center: true, colorKey: "color_low" },
    { label: "Low Week", sortKey: "low_week", center: true },
    { label: "Avg Score", sortKey: "avg_score", center: true, colorKey: "color_avg" },
  ];

  return <RecapTable data={weeklyHighLowData} selectedTeam={selectedTeam} columns={columns} />;
};

export const PlayerHighLowTable = ({ playerHighLowData, selectedTeam }) => {
  const columns = [
    { label: "Team Name", sortKey: "team_name" },
    { label: "Player", sortKey: "full_name" },
    { label: "High Score", sortKey: "high_score", center: true, colorKey: "color_high" },
    { label: "High Week", sortKey: "high_week", center: true },
    { label: "Low Score", sortKey: "low_score", center: true, colorKey: "color_low" },
    { label: "Low Week", sortKey: "low_week", center: true },
    { label: "Avg Score", sortKey: "avg_score", center: true, colorKey: "color_avg" },
  ];

  return <RecapTable data={playerHighLowData} selectedTeam={selectedTeam} columns={columns} />;
};

export const TransactionsTable = ({ transactionsData, selectedTeam, showCount }) => {
  const columns = [
    { label: "Team Name", sortKey: "team_name" },
    { label: "Week", sortKey: "week", center: true },
    { label: "Type", sortKey: "type", center: true },
    { label: "Added", sortKey: "added" },
    { label: "Dropped", sortKey: "dropped" },
    { label: "Points", sortKey: "points", center: true, colorKey: "color" },
  ];

  return (
    <RecapTable
      data={transactionsData}
      selectedTeam={selectedTeam}
      columns={columns}
      showCount={showCount}
    />
  );
};

export const TradesTable = ({ tradesData, selectedTeam, showCount }) => {
  const columns = [
    { label: "Week", sortKey: "week", center: true },
    { label: "Team 1", sortKey: "team1" },
    { label: "Received", sortKey: "received1" },
    { label: "Team 2", sortKey: "team2" },
    { label: "Received", sortKey: "received2" },
    { label: "Points Diff", sortKey: "points_diff", center: true, colorKey: "color" },
  ];

  return (
    <RecapTable
      data={tradesData}
      selectedTeam={selectedTeam}
      columns={columns}
      showCount={showCount}
    />
  );
};

export const OptimalLineupTable = ({ optimalLineupData, selectedTeam }) => {
  const columns = [
    { label: "Team Name", sortKey: "team_name" },
    { label: "Actual Points", sortKey: "actual_points", center: true, colorKey: "color_actual" },
    { label: "Optimal Points", sortKey: "optimal_points", center: true, colorKey: "color_optimal" },
    { label: "Points Lost", sortKey: "points_lost", center: true, colorKey: "color_lost" },
    {
      label: "Optimal %",
      sortKey: "optimal_percentage",
      center: true,
      colorKey: "color_percentage",
    },
  ];

  return <RecapTable data={optimalLineupData} selectedTeam={selectedTeam} columns={columns} />;
};

export const DualTableViewer = ({ data, selectedTeam }) => {
  // Initialize state based on whether data is available
  const [currentTransIdIndex, setCurrentTransIdIndex] = useState(data.length > 0 ? 0 : null);

  // Check if data array is not empty
  if (data.length === 0) {
    return <div>No data available.</div>;
  }

  // Extract unique trans_ids and get current transaction
  const uniqueTransIds = [...new Set(data.map((item) => item.trans_id))];
  const currentTransId = uniqueTransIds[currentTransIdIndex];
  const currentTransactionData = data.filter((item) => item.trans_id === currentTransId);

  const handleTransactionChange = (direction) => {
    setCurrentTransIdIndex((prevIndex) => {
      const newIndex =
        direction === "next"
          ? Math.min(prevIndex + 1, uniqueTransIds.length - 1)
          : Math.max(prevIndex - 1, 0);
      return newIndex;
    });
  };

  const columns = [
    { label: "Week", sortKey: "week", center: true },
    { label: "Team Name", sortKey: "team_name" },
    { label: "Full Name", sortKey: "full_name" },
    {
      label: "Games Played",
      sortKey: "games_played",
      center: true,
      colorKey: "games_played_color",
    },
    { label: "Points", sortKey: "points", center: true, colorKey: "points_color" },
    { label: "PPG", sortKey: "ppg", center: true, colorKey: "ppg_color" },
  ];

  const sections = [
    { winner: 1, title: "Winner - Players Acquired" },
    { winner: 0, title: "Loser - Players Acquired" },
    { winner: null, title: "No Winner - Players Acquired" },
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: "10px" }}>
        <StyledButton
          onClick={() => handleTransactionChange("prev")}
          disabled={currentTransIdIndex === 0}
        >
          Previous Trade
        </StyledButton>
        <StyledButton
          onClick={() => handleTransactionChange("next")}
          disabled={currentTransIdIndex === uniqueTransIds.length - 1}
        >
          Next Trade
        </StyledButton>
      </div>
      <div>
        {sections.map(({ winner, title }) => {
          const sectionData = currentTransactionData.filter((item) =>
            winner === null ? item.winner == null : item.winner === winner
          );

          return (
            sectionData.length > 0 && (
              <React.Fragment key={title}>
                <ArticleSubheader>{title}</ArticleSubheader>
                <RecapTable data={sectionData} selectedTeam={selectedTeam} columns={columns} />
              </React.Fragment>
            )
          );
        })}
      </div>
    </div>
  );
};
