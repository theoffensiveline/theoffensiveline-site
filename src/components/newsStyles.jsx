import styled from 'styled-components';
import { VictoryChart, VictoryHistogram, VictoryStack, VictoryAxis, VictoryLegend, VictoryBar, VictoryLabel, VictoryLine, VictoryScatter, VictoryContainer } from 'victory';
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { ColorConstants, colorsByPosition } from '../components/constants/ColorConstants.js';

export const NewsletterContainer = styled.div`
    max-width: 100%;
    margin: 0 auto;
    padding: 4px;
    font-family: 'Playfair Display', sans-serif;
    font-size: 14px;
    color: ${ColorConstants.text};
    background-color: ${ColorConstants.background};
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
    border-bottom: 2px solid ${ColorConstants.text};
    border-top: 2px solid ${ColorConstants.text};
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
    font-family: 'Playfair Display', serif;
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
    font-family: 'Playfair Display', serif;
    display: block;
    margin: 0 auto;

    &:before {
        border-top: 1px solid ${ColorConstants.text};
        content: '';
        width: 250px;
        height: 7px;
        display: block;
        margin: 0 auto;
    }

    &:after {
        border-bottom: 1px solid ${ColorConstants.text};
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
        color: ${ColorConstants.text};
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
    font-family: 'Playfair Display', serif;
    color: ${ColorConstants.text};
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
                    { name: 'Actual Points', symbol: { fill: ColorConstants.newsBlue } },
                    { name: 'Max Points', symbol: { fill: ColorConstants.neutral3 } },
                ]}
            />
            <VictoryBar
                barWidth={15}
                cornerRadius={3}
                style={{ data: { fill: ColorConstants.neutral3 } }}
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
                style={{ data: { fill: ColorConstants.newsBlue } }}
                data={data}
                x="team_name"
                y="Actual Points"
                labels={({ datum }) => `${datum.team_name}`}
                labelComponent={<VictoryLabel x={5} />}
            />

        </VictoryChart >
    );
};

export const MotWRules = () => {
    return (
        <div>
            <ArticleHeader>Matchup of the Week Rules</ArticleHeader>
            <p>1. The loser must send their video before next Monday Nights's kickoff.</p>
            <p>2. The loser must count their starters below 10 points, and add another for any under 0 points,
                and
                do that number of shots or eat that number of hotdogs.</p>
            <p>3. The winner will be the incumbent champion in next week's Matchup of the Week.</p>
            <p>4. In the case of a tie (pls no), both teams will complete their respective shots or dogs, and
                both
                teams will be the incumbent members in the next week's Matchups of the Week.</p>
        </div>
    )
}

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
                    { name: 'This Week', symbol: { fill: ColorConstants.newsBlue } },
                    { name: 'Historic', symbol: { fill: ColorConstants.neutral3 } },
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
                    style={{ data: { fill: ColorConstants.newsBlue } }}
                    cornerRadius={3}
                    data={thisWeekData}
                    x="team_points"
                    bins={bins} />
                <VictoryHistogram
                    style={{ data: { fill: ColorConstants.neutral3 } }}
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
                    { name: 'MotW', symbol: { fill: ColorConstants.newsBlue } },
                    { name: 'Not MotW', symbol: { fill: ColorConstants.neutral3 } },
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
                    style={{ data: { fill: ColorConstants.newsBlue } }}
                    cornerRadius={3}
                    data={chartData.filter(entry => entry.group === 'MotW')}
                    x="x"
                    bins={bins}
                />
                <VictoryHistogram
                    style={{ data: { fill: ColorConstants.neutral3 } }}
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
                    { name: 'Maximum', symbol: { fill: ColorConstants.newsBlue } },
                    { name: 'Average', symbol: { fill: ColorConstants.neutral4 } },
                    { name: 'Median', symbol: { fill: ColorConstants.neutral1 } },
                    { name: 'Minimum', symbol: { fill: ColorConstants.newsRed } },
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
                style={{ data: { stroke: ColorConstants.newsBlue, strokeWidth: 2 } }}
            />
            <VictoryLine
                data={data}
                x="week"
                y="Average"
                style={{ data: { stroke: ColorConstants.neutral4, strokeWidth: 2 } }}
            />
            <VictoryLine
                data={data}
                x="week"
                y="Median"
                style={{ data: { stroke: ColorConstants.neutral1, strokeWidth: 2 } }}
            />
            <VictoryLine
                data={data}
                x="week"
                y="Minimum"
                style={{ data: { stroke: ColorConstants.newsRed, strokeWidth: 2 } }}
            />
            <VictoryScatter
                data={data}
                x="week"
                y="team_points"
            />
        </VictoryChart>
    );
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

// recap stuff
export const RecapPositionTable = ({ data, selectedTeam }) => {
    const columns = [
        { label: 'Team', sortKey: 'team_name' },
        { label: 'Player', sortKey: 'full_name' },
        { label: 'Games Played', sortKey: 'games_played', center: true },
        { label: 'Points per Game', sortKey: 'ppg', center: true, colorKey: 'color' },
    ];

    return <GenericRecapTable data={data} selectedTeam={selectedTeam} columns={columns} />;
}

const calculateAverage = (arr) => {
    const sum = arr.reduce((total, value) => total + value, 0);
    return sum / arr.length;
};

export const KickerDefenseChart = ({ data }) => {
    const averagePPG = calculateAverage(data.map(entry => entry.ppg));
    const averageCount = calculateAverage(data.map(entry => entry.count));

    const shouldRenderLabel = (point, otherPoints) => {
        for (const otherPoint of otherPoints) {
            // Check if point is close to otherPoint and is occluded
            if (
                Math.abs(point.count - otherPoint.count) < 1 &&
                Math.abs(point.ppg - otherPoint.ppg) < 1 &&
                point.ppg > otherPoint.ppg
            ) {
                return true; // Render label for occluded point
            }
        }
        return false; // Do not render label
    };

    return (
        <VictoryChart
            containerComponent={
                <VictoryContainer
                    style={{
                        touchAction: "auto"
                    }}
                />
            }
            domainPadding={{ x: 0, y: 10 }}
            padding={{ top: 10, bottom: 50, left: 90, right: 30 }}
        >
            <VictoryLine
                data={[
                    { x: Math.min(...data.map(entry => entry.count)) - 0.5, y: averagePPG },
                    { x: Math.max(...data.map(entry => entry.count)) + 0.5, y: averagePPG }
                ]}
                style={{
                    data: { stroke: 'grey', strokeWidth: 0.5, strokeDasharray: '4, 4' },
                }}
            />
            <VictoryLine
                data={[
                    { y: Math.min(...data.map(entry => entry.ppg)) - 0.5, x: averageCount },
                    { y: Math.max(...data.map(entry => entry.ppg)) + 0.5, x: averageCount }
                ]}
                style={{
                    data: { stroke: 'grey', strokeWidth: 0.5, strokeDasharray: '4, 4' },
                }}
            />
            <VictoryScatter
                data={data}
                x="count"
                y="ppg"
                dataComponent={<CustomDataComponent />}
                labels={({ datum }) => shouldRenderLabel(datum, data) ? datum.team_name : ''}
                labelComponent={<VictoryLabel dx={50} dy={0} angle={-45} labelPlacement="parallel" style={{ fontSize: 8 }} />}
            />
            {/* X-axis */}
            <VictoryAxis
                label="Unique Players Started"
                tickFormat={(tick) => `${tick}`}
                style={{
                    axisLabel: { padding: 30 },
                }}
            />
            {/* Y-axis */}
            <VictoryAxis
                dependentAxis
                label="Average PPG"
                style={{
                    axisLabel: { padding: 30 },
                }}
            />
        </VictoryChart>
    );
};

export const WorstStartSitsTable = ({ bestBallBenchData, selectedTeam }) => {
    const columns = [
        { label: 'Team Name', sortKey: 'team_name' },
        { label: 'Week', sortKey: 'week', center: true },
        { label: 'Bench Player', sortKey: 'full_name' },
        { label: 'Points', sortKey: 'points', center: true, colorKey: 'color_bench' },
        { label: 'Starter Points', sortKey: 'points_starter', center: true, colorKey: 'color_starter' },
        { label: 'Starter', sortKey: 'full_name_starter' },
    ];

    return <GenericRecapTable data={bestBallBenchData} selectedTeam={selectedTeam} columns={columns} />;
}

export const FreeAgentTable = ({ data, selectedTeam }) => {
    const columns = [
        { label: 'Week', sortKey: 'week', center: true },
        { label: 'Team Name', sortKey: 'team_name' },
        { label: 'Games Played', sortKey: 'games_played', center: true, colorKey: 'games_played_color' },
        { label: 'PPG', sortKey: 'ppg', center: true, colorKey: 'ppg_color' },
        { label: 'Points', sortKey: 'points', center: true, colorKey: 'points_color' },
        { label: 'Full Name', sortKey: 'full_name' },
    ];

    return <GenericRecapTable data={data} selectedTeam={selectedTeam} columns={columns} />;
}

const StyledButton = styled.button`
    background-color: ${ColorConstants.background};
    border: 1px solid ${ColorConstants.newsBlue};
    border-radius: 50px;
    padding: 14px;
    cursor: pointer;
    text-align: center;
    color: ${ColorConstants.newsBlue};

    /* Additional styles for disabled state */
    &:disabled {
        opacity: 0;
        cursor: not-allowed;
    }
`;


export const DualTableViewer = ({ data, selectedTeam }) => {
    // Initialize state based on whether data is available
    const [currentTransIdIndex, setCurrentTransIdIndex] = useState(data.length > 0 ? 0 : null);

    // Extract unique trans_ids
    const uniqueTransIds = [...new Set(data.map(item => item.trans_id))];

    // Check if data array is not empty
    if (data.length === 0) {
        return <div>No data available.</div>;
    }

    const currentTransId = uniqueTransIds[currentTransIdIndex];

    // Filter data for the current transaction
    const currentTransactionData = data.filter(item => item.trans_id === currentTransId);

    const handlePreviousTransaction = () => {
        setCurrentTransIdIndex(prevIndex => Math.max(prevIndex - 1, 0));
    };

    const handleNextTransaction = () => {
        setCurrentTransIdIndex(prevIndex => Math.min(prevIndex + 1, uniqueTransIds.length - 1));
    };

    const columns = [
        { label: 'Week', sortKey: 'week', center: true },
        { label: 'Team Name', sortKey: 'team_name' },
        { label: 'Full Name', sortKey: 'full_name' },
        { label: 'Games Played', sortKey: 'games_played', center: true, colorKey: 'games_played_color' },
        { label: 'Points', sortKey: 'points', center: true, colorKey: 'points_color' },
        { label: 'PPG', sortKey: 'ppg', center: true, colorKey: 'ppg_color' },
    ];

    return (
        <div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                {/* Button to go to the previous transaction */}
                <StyledButton
                    onClick={handlePreviousTransaction}
                    disabled={currentTransIdIndex === 0}
                >
                    Previous Trade
                </StyledButton>

                {/* Button to go to the next transaction */}
                <StyledButton
                    onClick={handleNextTransaction}
                    disabled={currentTransIdIndex === uniqueTransIds.length - 1}
                >
                    Next Trade
                </StyledButton>
            </div>

            <div>
                <ArticleSubheader>Winner - Players Acquired</ArticleSubheader>
                {/* Winner table */}
                <GenericRecapTable data={currentTransactionData.filter(item => item.winner === 1)} selectedTeam={selectedTeam} columns={columns} />;

                <ArticleSubheader>Loser - Players Acquired</ArticleSubheader>
                {/* Loser table */}
                <GenericRecapTable data={currentTransactionData.filter(item => item.winner === 0)} selectedTeam={selectedTeam} columns={columns} />;
            </div>
        </div>
    );
};

const GridContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr); /* Set the number of columns to 2 */
    gap: 16px;
`;

const GridItem = styled.div`
    border: 1px solid ${ColorConstants.text};
    border-radius: 8px;
    overflow: hidden;
    width: 100%;

    img {
        width: 100%;
        height: auto;
    }
`;

const AwardsTitle = styled.p`
    font-family: 'Playfair Display', serif;
    font-weight: 400;
    font-size: 1.75rem; /* 28px in relative units */
    text-align: center;
    font-style: italic;
    margin: 10px 0;
`;

const AwardsRecipient = styled.p`
    font-family: 'Playfair Display', serif;
    font-weight: 800;
    font-size: 1.25rem; /* 20px in relative units */
    text-align: center;
    margin: 10px 0;
`;

const AwardDescription = styled.p`
    font-family: 'Playfair Display', serif;
    font-weight: 400;
    font-size: 1rem; /* 16px in relative units */
    text-align: center;
    margin: 10px 0;
`;

export const AwardsGrid = ({ data }) => {
    return (
        <GridContainer>
            {data.map((item, index) => (
                <GridItem key={index}>
                    <img src={item.photo} alt={item.name} />
                    <AwardsTitle>{item.award}</AwardsTitle>
                    <AwardsRecipient>{item.name}</AwardsRecipient>
                    <AwardDescription>{item.value}</AwardDescription>
                    <AwardDescription>{item.description}</AwardDescription>
                </GridItem>
            ))}
        </GridContainer>
    );
};

export const MotwRecapTable = ({ data, selectedTeam }) => {
    const columns = [
        { label: 'Team Name', sortKey: 'team_name' },
        { label: 'Wins', sortKey: 'motw_wins', center: true, colorKey: 'motw_wins_color' },
        { label: 'Losses', sortKey: 'motw_losses', center: true, colorKey: 'motw_losses_color' },
        { label: 'Hot Dogs / Shots Taken', sortKey: 'shots_dogs', center: true, colorKey: 'shots_dogs_taken_color' },
        { label: 'Hot Dogs / Shots Given', sortKey: 'shots_dogs_given_out', center: true, colorKey: 'shots_dogs_given_out_color' },
    ];

    return <GenericRecapTable data={data} selectedTeam={selectedTeam} columns={columns} />;
};

const StyledSortButton = styled.button`
    background-color: #d6d6d6;
    color: ${ColorConstants.text};
    border: none;
    width: 100%;
    height: 100%;
    text-align: center;
    display: inline-block;
    cursor: pointer;
    transition: background-color 0.3s;
`;

export const TableSortButton = ({ onClick, className, children }) => {
    return (
        <StyledSortButton className={`sort-button ${className}`} onClick={onClick}>
            {children}
        </StyledSortButton>
    );
};

TableSortButton.propTypes = {
    onClick: PropTypes.func.isRequired,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
};

const useSortableData = (items, config = null) => {
    const [sortConfig, setSortConfig] = React.useState(config);

    const sortedItems = React.useMemo(() => {
        let sortableItems = [...items];
        if (sortConfig !== null) {
            sortableItems.sort((a, b) => {
                if (a[sortConfig.key] < b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? -1 : 1;
                }
                if (a[sortConfig.key] > b[sortConfig.key]) {
                    return sortConfig.direction === 'ascending' ? 1 : -1;
                }
                return 0;
            });
        }
        return sortableItems;
    }, [items, sortConfig]);

    const requestSort = key => {
        let direction = 'descending';
        if (sortConfig && sortConfig.key === key && sortConfig.direction === 'descending') {
            direction = 'ascending';
        }
        setSortConfig({ key, direction });
    }

    return { items: sortedItems, requestSort, sortConfig };
}


export const TeamDropdown = ({ data, onSelectTeam }) => {
    return (
        <div style={{ textAlign: 'center' }}>
            <select
                onChange={(e) => onSelectTeam(e.target.value)}
                style={{
                    padding: '5px',
                    fontSize: '16px',
                    borderRadius: '5px',
                    border: '1px solid ' + ColorConstants.text,
                    width: '300px',
                    margin: '10px auto',
                }}
            >
                <option value="">Select Team</option>
                {data.map((item, index) => (
                    <option key={index} value={item.team_name}>
                        {item.team_name}
                    </option>
                ))}
            </select>
        </div >
    );
};

// Styled component for the slider
export const StyledSlider = ({ value, onChange, min, max }) => (
    <input
        type="range"
        min={min}
        max={max}
        value={value}
        onChange={onChange}
        style={{
            width: '300px',
            margin: '0 auto',
            display: 'block',
            center: 'true',
        }}
    />
);

export const BestWorstGameRecapTable = ({ data, selectedTeam }) => {
    const columns = [
        { label: 'Team Name', sortKey: 'team_name' },
        { label: 'Best Win', sortKey: 'most_points_1', center: true, colorKey: 'best_win_color' },
        { label: 'Worst Win', sortKey: 'least_points_1', center: true, colorKey: 'worst_win_color' },
        { label: 'Best Loss', sortKey: 'most_points_0', center: true, colorKey: 'best_loss_color' },
        { label: 'Worst Loss', sortKey: 'least_points_0', center: true, colorKey: 'worst_loss_color' },
    ];

    return <GenericRecapTable data={data} selectedTeam={selectedTeam} columns={columns} />;
};

export const BestWorstTeamRecapTable = ({ data, selectedTeam }) => {
    const columns = [
        { label: 'Team Name', sortKey: 'team_name' },
        { label: '# of Weeks as Top Team', sortKey: 'best_team_week_count', center: true, colorKey: 'best_team_color' },
        { label: '# of Weeks as Worst Team', sortKey: 'worst_team_week_count', center: true, colorKey: 'worst_team_color' },
        { label: '# of Weeks against Top Team', sortKey: 'other_team_best_week_count', center: true, colorKey: 'best_other_team_color' },
        { label: '# of Weeks against Worst Team', sortKey: 'other_team_worst_week_count', center: true, colorKey: 'worst_other_team_color' },
    ];

    return <GenericRecapTable data={data} selectedTeam={selectedTeam} columns={columns} />;
};

export const BlowoutRecapTable = ({ data, selectedTeam }) => {
    const columns = [
        { label: 'Team Name', sortKey: 'team_name' },
        { label: 'Avg Pt Diff in W', sortKey: 'pt_diff_1', center: true, colorKey: 'pt_diff_1_color' },
        { label: 'Avg Pt Diff in L', sortKey: 'pt_diff_0', center: true, colorKey: 'pt_diff_0_color' },
        { label: 'Blowout Wins', sortKey: 'blowouts_1', center: true, colorKey: 'blowouts_1_color' },
        { label: 'Blowout Losses', sortKey: 'blowouts_0', center: true, colorKey: 'blowouts_0_color' },
        { label: 'Close Wins', sortKey: 'close_games_1', center: true, colorKey: 'close_games_1_color' },
        { label: 'Close Losses', sortKey: 'close_games_0', center: true, colorKey: 'close_games_0_color' },
    ];

    return <GenericRecapTable data={data} selectedTeam={selectedTeam} columns={columns} />;
};

export const JakeAlecTable = ({ data, selectedTeam }) => {
    const columns = [
        { label: 'Week', sortKey: 'week', center: true },
        { label: 'Team Name', sortKey: 'team_name' },
        { label: 'Points Scored', sortKey: 'team_points.y', center: true, colorKey: 'points_color' },
        { label: 'Won', sortKey: 'winner.y', center: true, colorKey: 'winner_color' },
    ];

    return <GenericRecapTable data={data} selectedTeam={selectedTeam} columns={columns} />;
};

const GenericRecapTable = ({ data, selectedTeam, columns }) => {
    const { items, requestSort } = useSortableData(data);

    return (
        <StyledTable>
            <thead>
                <tr>
                    {columns.map((column, index) => (
                        <th key={index} className='wrap-cell'>
                            <TableSortButton
                                onClick={() => requestSort(column.sortKey)}
                                children={column.label}
                            />
                        </th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {items.map((item, index) => (
                    <tr key={index}>
                        {columns.map((column, columnIndex) => {
                            const colorCondition = column.colorKey ? true : false;

                            return (
                                <td
                                    key={columnIndex}
                                    className={`${column.center ? 'center-column' : ''
                                        } wrap-cell`}
                                    style={{
                                        background:
                                            column.sortKey === 'team_name' && item.team_name === selectedTeam
                                                ? ColorConstants.newsBlue
                                                : colorCondition && item[column.colorKey]
                                                    ? item[column.colorKey] // Use the correct color value from the item data
                                                    : 'transparent',
                                    }}
                                >
                                    {item[column.sortKey]}
                                </td>
                            );
                        })}
                    </tr>
                ))}
            </tbody>
        </StyledTable>
    );
};

export const TransactionRecapTable = ({ data, selectedTeam }) => {
    const columns = [
        { label: 'Team Name', sortKey: 'team_name' },
        { label: 'Unique Starters', sortKey: 'distinct_starters', center: true, colorKey: 'distinct_starters_color' },
        { label: 'Completed Waiver Claims', sortKey: 'completed_waivers', center: true, colorKey: 'completed_waivers_color' },
        { label: 'Failed Waiver Claims', sortKey: 'failed_waivers', center: true, colorKey: 'failed_waivers_color' },
        { label: 'Free Agent Adds', sortKey: 'free_agent_adds', center: true, colorKey: 'free_agent_adds_color' },
        { label: 'Drops', sortKey: 'drops', center: true, colorKey: 'drops_color' },
        { label: 'Trades', sortKey: 'trades', center: true, colorKey: 'trades_color' }
    ];

    return <GenericRecapTable data={data} selectedTeam={selectedTeam} columns={columns} />;
}

export const TradeRecapTable = ({ data, selectedTeam }) => {
    const columns = [
        { label: 'Team Name', sortKey: 'team_name' },
        { label: 'Trades Won', sortKey: 'trade_wins', center: true, colorKey: 'trade_wins_color' },
        { label: 'Trades Lost', sortKey: 'trade_losses', center: true, colorKey: 'trade_losses_color' },
        { label: 'Points Traded For', sortKey: 'total_trade_for_points', center: true, colorKey: 'total_trade_for_points_color' },
        { label: 'Points Traded Away', sortKey: 'total_trade_away_points', center: true, colorKey: 'total_trade_away_points_color' }
    ];

    return <GenericRecapTable data={data} selectedTeam={selectedTeam} columns={columns} />;
}


export const StartSitRecapTable = ({ data, selectedTeam }) => {
    const columns = [
        { label: 'Team Name', sortKey: 'team_name' },
        { label: 'Wrong Start Sits', sortKey: 'wrong_start_sits', center: true, colorKey: 'wrong_start_sits_color' },
        { label: 'Points Lost From Them', sortKey: 'points_lost_from_wrong_start_sits', center: true, colorKey: 'points_lost_from_wrong_start_sits_color' },
    ];

    return <GenericRecapTable data={data} selectedTeam={selectedTeam} columns={columns} />;
}