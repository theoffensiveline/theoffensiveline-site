import styled from 'styled-components';
import { VictoryChart, VictoryHistogram, VictoryStack, VictoryAxis, VictoryLegend, VictoryBar, VictoryLabel, VictoryLine, VictoryScatter, VictoryContainer } from 'victory';
import React from 'react';

export const NewsletterContainer = styled.div`
    max-width: 100%;
    margin: 0 auto;
    padding: 4px;
    font-family: 'Droid Serif', serif;
    font-size: 14px;
    color: #2E2E2E;
    background-color: #ECECDF;
`;

export const NewsletterTitle = styled.h1`
    font-family: 'Playfair Display', serif;
    font-weight: 900;
    font-size: 80px;
    text-transform: uppercase;
    line-height: 60px;
    margin-bottom: 10px;
    max-width: 100%;
    text-align: center;

    @media (max-width: 600px) {
        font-size: 48px; /* Adjust the font size for small screens */
        line-height: 36px; /* Adjust the line height accordingly */
    }
`;

export const DateBar = styled.div`
    text-transform: uppercase;
    border-bottom: 2px solid #2E2E2E;
    border-top: 2px solid #2E2E2E;
    padding: 12px 0 12px 0;
    text-align: center;
`;

export const ArticleHeader = styled.h2`
    font-weight: 500;
    font-style: italic;
    font-size: 30px;
    box-sizing: border-box;
    padding: 10px 0 10px 0;
    text-align: center;
    line-height: normal;
    font-family: 'Droid Serif', serif;
    display: block;
    margin: 0 auto;
`;

export const ArticleSubheader = styled.div`
    font-weight: 500;
    font-size: 16px;
    box-sizing: border-box;
    padding: 10px 0 10px 0;
    text-align: center;
    line-height: normal;
    font-family: 'Droid Serif', serif;
    display: block;
    margin: 0 auto;

    &:before {
        border-top: 1px solid #2E2E2E;
        content: '';
        width: 250px;
        height: 7px;
        display: block;
        margin: 0 auto;
    }

    &:after {
        border-bottom: 1px solid #2E2E2E;
        content: '';
        width: 250px;
        height: 7px;
        display: block;
        margin: 0 auto;
    }
`;

export const StyledTable = styled.table`
    table-layout: auto;
    max-width: 100%;
    width: 100%;
    border-collapse: collapse;
    margin-bottom: 20px;

    th, td {
        border: 1px solid #000;
        padding: 5px;
        text-align: left;
    }

    th {
        color: #2E2E2E;
        background-color: #d6d6d6;
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

export const ArticleBlock = styled.div`
    padding: 4px;
    margin: 4px;
    max-width: calc(100% - 8px); /* Consider padding and margin within max-width */
    text-align: justify;
`;

export const LeagueQuote = styled.div`
    font-weight: 500;
    font-size: 24px;
    box-sizing: border-box;
    display: block;
    font-style: italic;
    padding: 10px 0 10px 0;
    text-align: center;
`

export const ImageWrapper = styled.div`
    max-width: 100%;
`;

export const ArticleImage = styled.img`
    max-width: 100%;
    width: 100%;
`;

export const ArticleCaption = styled.figcaption`
    text-align: center;
    font-style: italic;
    font-size: 12px;
    font-family: 'Droid Serif', serif;
    color: #2E2E2E;
`;

export const AwardsTable = ({ awardsData }) => {
    return (
        <StyledTable>
            <thead>
                <tr>
                    <th>Superlative</th>
                    <th>Winner + Description</th>
                </tr>
            </thead>
            <tbody>
                {awardsData.map((award, index) => (
                    <tr key={index}>
                        <td>{award.Superlative}</td>
                        <td>{award["Winner + Description"]}</td>
                    </tr>
                ))}
            </tbody>
        </StyledTable>
    );
};

export const EfficiencyChart = ({ chartData }) => {
    const teamNames = chartData.map(item => item.team_name);
    const maxPoints = chartData.map(item => item.max_points);
    const actualPoints = chartData.map(item => item.actual_points);

    const data = teamNames.map((name, index) => ({
        team_name: name,
        'Actual Points': actualPoints[index],
        'Max Points': maxPoints[index],
        'Percentage': actualPoints[index] / maxPoints[index]
    }));

    // calculate the maximum maxPoints
    const maxPointsValue = Math.max(...maxPoints);

    // list of values from 0 to 25 more than maxPointsValue by 25
    const bins = [];
    for (let i = 0; i <= maxPointsValue + 25; i += 25) {
        bins.push(i);
    }

    return (
        <VictoryChart
            containerComponent={
                <VictoryContainer
                    style={{
                        touchAction: "auto"
                    }}
                />
            }
            horizontal
            padding={{ top: 25, bottom: 25, left: 10, right: 50 }}
            domainPadding={{ x: 10 }}
        >
            <VictoryAxis
                dependentAxis
                style={{ axis: { width: 0, height: 0 } }}
                tickValues={bins}
                gridComponent={<line
                    style={{ stroke: 'grey', strokeDasharray: '4 4' }}
                />}
            />
            <VictoryLegend x={100} y={0}
                orientation="horizontal"
                gutter={20}
                data={[
                    { name: 'Actual Points', symbol: { fill: '#20A4F4' } },
                    { name: 'Max Points', symbol: { fill: '#7D8491' } },
                ]}
            />
            <VictoryBar
                barWidth={15}
                cornerRadius={3}
                style={{ data: { fill: '#7D8491' } }}
                data={data}
                x="team_name"
                y="Max Points"
                sortKey={"Actual Points"}
                sortOrder={"ascending"}
                labels={({ datum }) => `${(datum.Percentage * 100).toFixed(1)}%`}
            />
            <VictoryBar
                barWidth={15}
                cornerRadius={3}
                style={{ data: { fill: '#20A4F4' } }}
                data={data}
                x="team_name"
                y="Actual Points"
                labels={({ datum }) => `${datum.team_name}`}
                labelComponent={<VictoryLabel x={5} />}
            />

        </VictoryChart >
    );
};

export const StackedHistogram = ({ chartData }) => {
    const maxScore = Math.ceil(Math.max(...chartData.map(entry => entry.team_points)));
    const minScore = Math.floor(Math.min(...chartData.map(entry => entry.team_points)));

    const bins = [];
    for (let i = minScore - 5; i <= maxScore; i += 5) {
        bins.push(Math.round(i / 5) * 5);
    }

    // Find the maximum week value
    const maxWeek = chartData.reduce((max, entry) => Math.max(max, entry.week), -Infinity);

    // Subset the data into two datasets
    const thisWeekData = chartData.filter(entry => entry.week === maxWeek);
    const historicData = chartData.filter(entry => entry.week !== maxWeek);

    return (
        <VictoryChart
            containerComponent={
                <VictoryContainer
                    style={{
                        touchAction: "auto"
                    }}
                />
            }
        >
            <VictoryLegend x={125} y={0}
                orientation="horizontal"
                gutter={20}
                data={[
                    { name: 'This Week', symbol: { fill: '#20A4F4' } },
                    { name: 'Historic', symbol: { fill: '#7D8491' } },
                ]}
            />
            <VictoryAxis
                tickCount={Math.round(bins.length / 2.5)}
            />
            <VictoryAxis
                dependentAxis
                tickCount={8}
                gridComponent={<line
                    style={{ stroke: 'grey', strokeDasharray: '4 4' }}
                />}
            />
            <VictoryStack colorScale="qualitative">
                <VictoryHistogram
                    style={{ data: { fill: '#20A4F4' } }}
                    cornerRadius={3}
                    data={thisWeekData}
                    x="team_points"
                    bins={bins} />
                <VictoryHistogram
                    style={{ data: { fill: '#7D8491' } }}
                    cornerRadius={3}
                    data={historicData}
                    x="team_points"
                    bins={bins} />
            </VictoryStack>

        </VictoryChart>
    );
};

export const ShotsDistributionChart = ({ chartData }) => {
    // Assuming bins is an array of your desired bin values
    const bins = [1, 2, 3, 4, 5, 6, 7, 8, 9]; // Update with your actual bin values

    return (
        <VictoryChart
            containerComponent={
                <VictoryContainer
                    style={{
                        touchAction: "auto"
                    }}
                />
            }
            domainPadding={{ x: 0, y: 0 }}
            padding={{ top: 40, bottom: 25, left: 40, right: 20 }}
        >
            <VictoryLegend
                x={140} y={0}
                orientation="horizontal"
                gutter={20}
                data={[
                    { name: 'MotW', symbol: { fill: '#20A4F4' } },
                    { name: 'Not MotW', symbol: { fill: '#7D8491' } },
                ]}
            />
            <VictoryAxis
                tickValues={bins}
                tickFormat={() => ''}
            />
            <VictoryAxis
                dependentAxis
                tickCount={7}
                gridComponent={<line
                    style={{ stroke: 'grey', strokeDasharray: '4 4' }}
                />}
            />
            <VictoryStack colorScale="qualitative">
                <VictoryHistogram
                    style={{ data: { fill: '#20A4F4' } }}
                    cornerRadius={3}
                    data={chartData.filter(entry => entry.group === 'MotW')}
                    x="x"
                    bins={bins}
                />
                <VictoryHistogram
                    style={{ data: { fill: '#7D8491' } }}
                    cornerRadius={3}
                    data={chartData.filter(entry => entry.group === 'Not MotW')}
                    x="x"
                    bins={bins}
                />
            </VictoryStack>
            {bins.map((bin, index) => (
                <VictoryLabel
                    key={index}
                    text={`${bin}`}
                    x={index * 49.2 + 62.5} // Adjust this value for proper positioning
                    y={287} // Adjust this value for proper vertical positioning
                    textAnchor="middle"
                />
            ))}
        </VictoryChart>
    );
};

export const WeeklyScoringChart = ({ chartData }) => {
    const data = chartData.map(({ week, team_points, Average, Median, Maximum, Minimum }) => ({
        week,
        team_points,
        Average,
        Median,
        Maximum,
        Minimum,
    }));

    return (
        <VictoryChart
            containerComponent={
                <VictoryContainer
                    style={{
                        touchAction: "auto"
                    }}
                />
            }
        >
            <VictoryLegend
                x={50}
                y={10}
                orientation="horizontal"
                gutter={20}
                data={[
                    { name: 'Maximum', symbol: { fill: '#20A4F4' } },
                    { name: 'Average', symbol: { fill: '#668F80' } },
                    { name: 'Median', symbol: { fill: '#7E6551' } },
                    { name: 'Minimum', symbol: { fill: '#FF3366' } },
                ]}
            />
            <VictoryAxis dependentAxis
                tickValues={[50, 70, 90, 110, 130, 150, 170, 190]}
            />
            <VictoryAxis
                tickCount={data.length / 12}
            />
            <VictoryLine
                data={data}
                x="week"
                y="Maximum"
                style={{ data: { stroke: '#20A4F4', strokeWidth: 2 } }}
            />
            <VictoryLine
                data={data}
                x="week"
                y="Average"
                style={{ data: { stroke: '#668F80', strokeWidth: 2 } }}
            />
            <VictoryLine
                data={data}
                x="week"
                y="Median"
                style={{ data: { stroke: '#7E6551', strokeWidth: 2 } }}
            />
            <VictoryLine
                data={data}
                x="week"
                y="Minimum"
                style={{ data: { stroke: '#FF3366', strokeWidth: 2 } }}
            />
            <VictoryScatter
                data={data}
                x="week"
                y="team_points"
            />
        </VictoryChart>
    );
};

// Define colors for each position
const colorsByPosition = {
    QB: '#E1676F',
    RB: '#11D677',
    WR: '#4DB6F0',
    TE: '#E9AC53',
    K: '#D959FF',
    DEF: '#65645A',
};

// Define the order for sorting positions
const positionOrder = ["QB", "RB", "WR", "TE", "K", "DEF"];

export const MatchupPlot = ({ data, matchupId }) => {
    // Filter data based on the provided matchupId
    const filteredData = data.filter((team) => team.matchup_id === matchupId);

    // Get unique positions for creating legend, sorted in reverse order
    const uniquePositions = positionOrder
        .filter((position) => filteredData.some((team) => team.entries.some((entry) => entry.position === position)))
        .reverse();

    return (
        <div>
            <VictoryChart
                containerComponent={
                    <VictoryContainer
                        style={{
                            touchAction: "auto"
                        }}
                    />
                }
                domainPadding={{ x: 90 }} // Adjust the x and y domainPadding values
                padding={{ top: 10, bottom: 30, left: 40, right: 20 }}
            >
                <VictoryAxis
                    tickValues={filteredData.map((team, index) => index + 0.5)}
                    tickFormat={filteredData.map((team) => team.team_name)}
                />
                <VictoryAxis
                    dependentAxis
                    gridComponent={<line
                        style={{ stroke: 'grey', strokeDasharray: '4 4' }}
                    />}
                />
                <VictoryStack colorScale={Object.values(colorsByPosition)}>
                    {uniquePositions.flatMap((position) =>
                        filteredData.flatMap((team) =>
                            team.entries
                                .filter((entry) => entry.position === position)
                                .map((entry, index) => ({
                                    team_name: team.team_name,
                                    points: entry.points,
                                    full_name: entry.full_name,
                                    label: `${entry.points}`,
                                    position: entry.position,
                                    index, // Adding index for unique key
                                }))
                        )
                    ).map((entry) => (
                        <VictoryBar
                            key={entry.index}
                            data={[entry]}
                            x="team_name"
                            y="points"
                            barWidth={150}
                            style={{
                                data: {
                                    fill: colorsByPosition[entry.position],
                                    stroke: '#000',
                                    strokeWidth: 1,
                                },
                                labels: { fill: '#000' },
                            }}
                            labels={({ datum }) => `${datum.full_name} ${datum.label}`}
                            labelComponent={<CustomLabel />}
                        />
                    ))}
                </VictoryStack>
            </VictoryChart>
        </div>
    );
};

// Custom label component to position the label in the middle of the bar segment
const CustomLabel = (props) => {
    const { x, y, datum } = props;

    // Check if both full_name and label are defined before concatenating
    const labelContent = datum.full_name && datum.label ? `${datum.full_name} - ${datum.label}` : '';

    // Assuming points represent the height of the bar segment
    const points = datum.label || 0; // Use the points value from the label or default to 0

    // Define a threshold value for positioning the label outside the bar
    const threshold = -5;

    // Calculate the y position based on the threshold
    const yPos = points < threshold ? y - 15 : y + (2 * points) / 2 + 3;

    return (
        <g transform={`translate(${x}, ${yPos})`}>
            <text textAnchor="middle" fontSize={10} fill="#000">
                {labelContent}
            </text>
        </g>
    );
};

export const MotwTable = ({ motwHistoryData }) => {
    return (
        <StyledTable>
            <thead>
                <tr>
                    <th>Week</th>
                    <th>Winner Team</th>
                    <th>Winner Score</th>
                    <th>Loser Score</th>
                    <th>Loser Team</th>
                    <th># of Shots / Dogs</th>
                </tr>
            </thead>
            <tbody>
                {motwHistoryData.map((weekData, index) => (
                    <tr key={index}>
                        <td className="center-column">{weekData.Week}</td>
                        <td className="wrap-cell">
                            {weekData["Winner Team"]}
                        </td>
                        <td className="center-column"
                            style={{
                                backgroundColor: weekData.WinnerScoreColor
                            }}>
                            {weekData["Winner Score"]}
                        </td>
                        <td className="center-column"
                            style={{
                                backgroundColor: weekData.LoserScoreColor
                            }}>
                            {weekData["Loser Score"]}</td>
                        <td className="wrap-cell">{weekData["Loser Team"]}</td>
                        <td className="center-column"
                            style={{
                                backgroundColor: weekData.ShotsDogsColor
                            }}>
                            {weekData["# of Shots/Dogs"]}</td>
                    </tr>
                ))}
            </tbody>
        </StyledTable>
    );
};

export const LeaderboardTable = ({ leaderboardData }) => {
    return (
        <StyledTable>
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Trend</th>
                    <th>Team</th>
                    <th>W</th>
                    <th>L</th>
                    <th>PF</th>
                    <th>PA</th>
                </tr>
            </thead>
            <tbody>
                {leaderboardData.map((teamData, index) => (
                    <tr key={index}>
                        <td className="center-column">{teamData.Rank}</td>
                        <td className={`center-column ${teamData.Trend > 0 ? 'positive-trend' : (teamData.Trend < 0 ? 'negative-trend' : '')}`}>
                            {teamData.Trend}
                        </td>
                        <td className="wrap-cell">{teamData.Team}</td>
                        <td className="center-column">{teamData.W}</td>
                        <td className="center-column">{teamData.L}</td>
                        <td className="center-column"
                            style={{ backgroundColor: teamData.PFColor }}
                        >{teamData.PF}</td>
                        <td className="center-column"
                            style={{ backgroundColor: teamData.PAColor }}
                        >{teamData.PA}</td>
                    </tr>
                ))}
            </tbody>
        </StyledTable>
    );
};

export const PowerRankingsTable = ({ powerRankingsData }) => {
    return (
        <StyledTable>
            <thead>
                <tr>
                    <th>Power Rank</th>
                    <th>Trend</th>
                    <th>Team</th>
                    <th>Play All W</th>
                    <th>Play All L</th>
                    <th>Team Ability</th>
                    <th>Str of Sched</th>
                </tr>
            </thead>
            <tbody>
                {powerRankingsData.map((teamData, index) => (
                    <tr key={index}>
                        <td className="center-column">{teamData['P Rank']}</td>
                        <td className={`center-column ${teamData.Trend > 0 ? 'positive-trend' : (teamData.Trend < 0 ? 'negative-trend' : '')}`}>
                            {teamData.Trend}
                        </td>
                        <td className="wrap-cell">{teamData.Team}</td>
                        <td className="center-column">{teamData['Play All W']}</td>
                        <td className="center-column">{teamData['Play All L']}</td>
                        <td className="center-column"
                            style={{ backgroundColor: teamData.TaColor }}
                        >{teamData['Team Ability']}</td>
                        <td className="center-column"
                            style={{ backgroundColor: teamData.SosColor }}
                        >{teamData['Str of Sched']}</td>
                    </tr>
                ))}
            </tbody>
        </StyledTable>
    );
};

export const PlayoffTable = ({ playoffData }) => {
    return (
        <StyledTable>
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Team</th>
                    <th>W</th>
                    <th>L</th>
                    <th>Play-off %</th>
                    <th>Play-off #</th>
                    <th>Last %</th>
                    <th>Last #</th>
                </tr>
            </thead>
            <tbody>
                {playoffData.map((teamData, index) => (
                    <tr key={index}>
                        <td className="center-column">{teamData.Rank}</td>
                        <td className="wrap-cell">{teamData.Team}</td>
                        <td className="center-column">{teamData.W}</td>
                        <td className="center-column">{teamData.L}</td>
                        <td className="center-column"
                            style={{ backgroundColor: teamData.PlayoffColor }}
                        >{teamData['Play-off %']}</td>
                        <td className="wrap-cell"
                            style={{
                                backgroundColor: teamData.PlayoffMagicColor,
                                whiteSpace: 'nowrap', // Prevent text wrapping
                            }}
                        >{teamData['Play-off #']}</td>
                        <td className="center-column"
                            style={{ backgroundColor: teamData.LastColor }}
                        >{teamData['Last %']}</td>
                        <td className="wrap-cell"
                            style={{
                                backgroundColor: teamData.LastMagicColor,
                                whiteSpace: 'nowrap', // Prevent text wrapping
                            }}
                        >{teamData['Last #']}</td>
                    </tr>
                ))}
            </tbody>
        </StyledTable>
    );
};

const CustomDataComponent = (props) => {
    const { x, y, datum } = props;

    return (
        <g transform={`translate(${x}, ${y})`}>
            <image
                x="-15"
                y="-15"
                width="30"
                height="30"
                href={datum.image_or_text}
                alt=""
            />
        </g>
    );
};

export const PfPaScatter = ({ leaderboardData }) => {
    return (
        <VictoryChart
            containerComponent={
                <VictoryContainer
                    style={{
                        touchAction: "auto"
                    }}
                />
            }
            domainPadding={{ x: 20, y: 20 }}
            padding={{ top: 10, bottom: 50, left: 70, right: 10 }}
        >
            <VictoryLine
                data={[
                    { x: Math.min(...leaderboardData.map((d) => d.PF)), y: Math.min(...leaderboardData.map((d) => d.PA)) },
                    { x: Math.max(...leaderboardData.map((d) => d.PF)), y: Math.max(...leaderboardData.map((d) => d.PA)) },
                ]}
                style={{
                    data: { stroke: 'grey', strokeWidth: 0.5, strokeDasharray: '4, 4' },
                }}
            />
            <VictoryScatter
                data={leaderboardData}
                x="PF"
                y="PA"
                dataComponent={<CustomDataComponent />}
            />
            {/* X-axis */}
            <VictoryAxis
                label="Points For"
                style={{
                    axisLabel: { padding: 30 },
                }}
            />
            {/* Y-axis */}
            <VictoryAxis
                dependentAxis
                label="Points Against"
                style={{
                    axisLabel: { padding: 50 },
                }}
            />
        </VictoryChart>
    );
};

export const AltLeaderboardTable = ({ data }) => {
    return (
        <StyledTable>
            <thead>
                <tr>
                    <th>Rank</th>
                    <th>Diff</th>
                    <th>Team</th>
                    <th>W</th>
                    <th>L</th>
                    <th>PF</th>
                    <th>PA</th>
                </tr>
            </thead>
            <tbody>
                {data.map((teamData, index) => (
                    <tr key={index}>
                        <td className="center-column">{teamData.Rank}</td>
                        <td className={`center-column ${teamData.Diff > 0 ? 'positive-trend' : (teamData.Diff < 0 ? 'negative-trend' : '')}`}>
                            {teamData.Diff}
                        </td>
                        <td className="wrap-cell">{teamData.Team}</td>
                        <td className="center-column">{teamData.W}</td>
                        <td className="center-column">{teamData.L}</td>
                        <td className="center-column"
                            style={{ backgroundColor: teamData.PFColor }}
                        >{teamData.PF}</td>
                        <td className="center-column"
                            style={{ backgroundColor: teamData.PAColor }}
                        >{teamData.PA}</td>
                    </tr>
                ))}
            </tbody>
        </StyledTable>
    );
}

export const ScheduleTable = ({ data }) => {
    return (
        <div>
            <StyledTable>
                <thead>
                    <tr>
                        <th>Team</th>
                        <th>Best Possible Record <br />(Schedule(s))</th>
                        <th>Current Record</th>
                        <th>Worst Possible Record <br />(Schedule(s))</th>
                    </tr>
                </thead>
                <tbody>
                    {data.current_records.map((team) => (
                        <tr key={team.team1}>
                            <td className="wrap-cell">{team.team1}</td>
                            <td className="center-column"
                                dangerouslySetInnerHTML={{
                                    __html: `${findTeamRecord(data.best_records, team.team1)}(${getOpponentList(
                                        data.best_records,
                                        team.team1
                                    )})`,
                                }}
                            ></td>
                            <td className="center-column">{`${team.wins}-${team.losses}${team.ties > 0 ? `-${team.ties}` : ''}`}</td>
                            <td className="center-column"
                                dangerouslySetInnerHTML={{
                                    __html: `${findTeamRecord(data.worst_records, team.team1)}(${getOpponentList(
                                        data.worst_records,
                                        team.team1
                                    )})`,
                                }}
                            ></td>
                        </tr>
                    ))}
                </tbody>
            </StyledTable>
        </div>
    );
};

// Helper function to find a team's record in the best/worst records array
const findTeamRecord = (records, teamName) => {
    const teamRecord = records.find((record) => record.team1 === teamName);
    return teamRecord
        ? `${teamRecord.wins}-${teamRecord.losses}${teamRecord.ties > 0 ? `-${teamRecord.ties}` : ''} <br />`
        : 'N/A';
};

// Helper function to get a formatted string of opponent teams
const getOpponentList = (records, teamName) => {
    const teamRecord = records.find((record) => record.team1 === teamName);
    return teamRecord
        ? teamRecord.team2_list
            .filter((opponent) => opponent !== 'N/A')
            .map((opponent) => (opponent.ties > 0 ? `${opponent} (${opponent.ties} ties)` : opponent))
            .join(', <br>')
        : 'N/A';
};