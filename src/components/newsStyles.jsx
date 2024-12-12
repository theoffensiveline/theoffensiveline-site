import styled, { useTheme } from 'styled-components';
import { VictoryChart, VictoryHistogram, VictoryStack, VictoryAxis, VictoryLegend, VictoryBar, VictoryLabel, VictoryLine, VictoryScatter, VictoryContainer } from 'victory';
import React from 'react';
import { ColorConstants, colorsByPosition } from '../components/constants/ColorConstants.ts';

export const NewsletterContainer = styled.div`
    max-width: 100%;
    margin: 0 auto;
    padding: 4px;
    font-family: 'Playfair Display', sans-serif;
    font-size: 14px;
    color: ${({ theme }) => theme.text};
    background-color: ${({ theme }) => theme.background};
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
    border-bottom: 2px solid ${({ theme }) => theme.text};
    border-top: 2px solid ${({ theme }) => theme.text};
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
        border-top: 1px solid ${({ theme }) => theme.text};
        content: '';
        width: 250px;
        height: 7px;
        display: block;
        margin: 0 auto;
    }

    &:after {
        border-bottom: 1px solid ${({ theme }) => theme.text};
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
        color: ${({ theme }) => theme.text};
    }

    th {
        color: ${({ theme }) => theme.background};
        background-color: ${({ theme }) => theme.text};
        text-align: center;
    }

    td {
        text-align: left;
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

export const StickyTable = styled(StyledTable)`
  overflow-x: auto; /* Enable horizontal scrolling for the table */
  display: block; /* Allows horizontal scrolling within this element */

  thead th {
    position: sticky;
    top: 0;
    z-index: 1;
  }

  /* Sticky styles for the first three columns */
  tbody td:nth-child(1), thead th:nth-child(1) {
    position: sticky;
    left: 0;
    background-color: ${({ theme }) => theme.text};
    color: ${({ theme }) => theme.background};
    z-index: 2;
    width: 120px;
    min-width: 120px;
    max-width: 120px;
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
    color: ${({ theme }) => theme.text};
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

export const AwardsGridV2 = ({ awardsData }) => {
    return (
        <AwardsContainer>
            {awardsData.map((award, index) => (
                <Award key={index}>
                    <img src={award.photo} alt={award.name} />
                    <h2>{award.award}</h2>
                    <h3>{award.name}</h3>
                    <h4>{award.value}</h4>
                    <p>{award.description}</p>
                </Award>
            ))}
        </AwardsContainer>
    )
}

const AwardsContainer = styled.div`
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    gap: 16px;

    @media (max-width: 600px) {
        grid-template-columns: repeat(2, 1fr);
    }
`;

const Award = styled.div`
    border: 1px solid ${({ theme }) => theme.text};
    border-radius: 8px;
    overflow: hidden;
    width: 100%;

    img {
        width: 100%;
        height: auto;
    }

    h2 {
        font-family: 'Playfair Display', serif;
        font-weight: 800;
        font-size: 1.5rem; /* 28px in relative units */
        text-align: center;
        margin: 10px 0;
    }

    h3 {
        font-family: 'Playfair Display', serif;
        font-weight: 550;
        font-size: 1.2rem; /* 20px in relative units */
        text-align: center;
        margin: 10px 0;
    }

    h4 {
        font-family: 'Playfair Display', serif;
        font-weight: 400;
        font-size: 1rem; /* 16px in relative units */
        text-align: center;
        margin: 10px 0;
    }

    p {
        font-family: 'Playfair Display', serif;
        font-weight: 200;
        font-size: 0.8rem; /* 16px in relative units */
        text-align: center;
        margin: 10px 0;
    }
`;

export const EfficiencyChart = ({ chartData }) => {
    const theme = useTheme();
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
                style={{
                    axis: { width: 0, height: 0 },
                    tickLabels: { fill: theme.text },
                }}
                tickValues={bins}
                gridComponent={<line
                    style={{ stroke: 'grey', strokeDasharray: '4 4' }}
                />}
            />
            <VictoryLegend x={100} y={0}
                orientation="horizontal"
                gutter={20}
                data={[
                    { name: 'Actual Points', symbol: { fill: theme.newsBlue } },
                    { name: 'Max Points', symbol: { fill: theme.neutral3 } },
                ]}
                style={{
                    labels: { fill: theme.text },
                }}
            />
            <VictoryBar
                barWidth={15}
                cornerRadius={3}
                style={{
                    data: { fill: theme.neutral3 },
                    labels: { fill: theme.text },
                }}
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
                style={{ data: { fill: theme.newsBlue } }}
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
            <p style={{ textIndent: "2em" }}>2a. If the loser fails to submit their video on time, they must add 1 extra shot or hotdog for the first week it's late, 2 extra for the second week, 3 extra for the third week, and so on. The additional penalty grows each week, and all penalties are added to their original total.</p>
            <p style={{ textIndent: "2em" }}>2b. Nikhil Clause - If you are granted an extension, and do not meet the extended deadline, the extension is revoked and you owe the full amount of shots or dogs as if it was a normal late penalty.</p>
            <p>3. The winner will be the incumbent champion in next week's Matchup of the Week.</p>
            <p>4. In the case of a tie (pls no), both teams will complete their respective shots or dogs, and
                both
                teams will be the incumbent members in the next week's Matchups of the Week.</p>

        </div>
    )
}

export const StackedHistogram = ({ chartData }) => {
    const theme = useTheme();
    const maxScore = Math.ceil(Math.max(...chartData.map(entry => entry.team_points)));
    const minScore = Math.floor(Math.min(...chartData.map(entry => entry.team_points)));

    const bins = [];
    for (let i = minScore - 5; i <= maxScore + 5; i += 5) {
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
                    { name: 'This Week', symbol: { fill: theme.newsBlue } },
                    { name: 'Historic', symbol: { fill: theme.neutral3 } },
                ]}
                style={{
                    labels: { fill: theme.text },
                }}
            />
            <VictoryAxis
                tickCount={Math.round(bins.length / 2.5)}
                style={{
                    tickLabels: { fill: theme.text },
                }}
            />
            <VictoryAxis
                dependentAxis
                tickCount={8}
                gridComponent={<line
                    style={{ stroke: 'grey', strokeDasharray: '4 4' }}
                />}
                style={{
                    tickLabels: { fill: theme.text },
                }}
            />
            <VictoryStack colorScale="qualitative">
                <VictoryHistogram
                    style={{ data: { fill: theme.newsBlue } }}
                    cornerRadius={3}
                    data={thisWeekData}
                    x="team_points"
                    bins={bins} />
                <VictoryHistogram
                    style={{ data: { fill: theme.neutral3 } }}
                    cornerRadius={3}
                    data={historicData}
                    x="team_points"
                    bins={bins} />
            </VictoryStack>

        </VictoryChart>
    );
};

export const ShotsDistributionChart = ({ chartData }) => {
    const theme = useTheme();
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
                    { name: 'MotW', symbol: { fill: theme.newsBlue } },
                    { name: 'Not MotW', symbol: { fill: theme.neutral3 } },
                ]}
                style={{
                    labels: { fill: theme.text },
                }}
            />
            <VictoryAxis
                dependentAxis
                tickCount={7}
                gridComponent={<line
                    style={{ stroke: 'grey', strokeDasharray: '4 4' }}
                />}
                style={{
                    tickLabels: {
                        fill: theme.text,
                    }
                }}
            />
            <VictoryStack colorScale="qualitative">
                <VictoryHistogram
                    style={{ data: { fill: theme.newsBlue } }}
                    cornerRadius={3}
                    data={chartData.filter(entry => entry.group === 'MotW')}
                    x="x"
                    bins={bins}
                />
                <VictoryHistogram
                    style={{ data: { fill: theme.neutral3 } }}
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
                    style={{ fill: theme.text }}
                />
            ))}
        </VictoryChart>
    );
};

export const WeeklyScoringChart = ({ chartData }) => {
    const theme = useTheme();
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
                    { name: 'Maximum', symbol: { fill: theme.newsBlue } },
                    { name: 'Average', symbol: { fill: theme.neutral4 } },
                    { name: 'Median', symbol: { fill: theme.neutral1 } },
                    { name: 'Minimum', symbol: { fill: theme.newsRed } },
                ]}
                style={{
                    labels: { fill: theme.text },
                }}
            />
            <VictoryAxis dependentAxis
                tickValues={[50, 70, 90, 110, 130, 150, 170, 190]}
                style={{
                    tickLabels: { fill: theme.text },
                    axis: { stroke: theme.text },
                }}
            />
            <VictoryAxis
                tickCount={data.length / 18}
                tickFormat={(t) => Math.round(t)}
                style={{
                    tickLabels: { fill: theme.text },
                    axis: { stroke: theme.text },
                }}
            />
            <VictoryLine
                data={data}
                x="week"
                y="Maximum"
                style={{ data: { stroke: theme.newsBlue, strokeWidth: 2 } }}
            />
            <VictoryLine
                data={data}
                x="week"
                y="Average"
                style={{ data: { stroke: theme.neutral4, strokeWidth: 2 } }}
            />
            <VictoryLine
                data={data}
                x="week"
                y="Median"
                style={{ data: { stroke: theme.neutral1, strokeWidth: 2 } }}
            />
            <VictoryLine
                data={data}
                x="week"
                y="Minimum"
                style={{ data: { stroke: theme.newsRed, strokeWidth: 2 } }}
            />
            <VictoryScatter
                data={data}
                x="week"
                y="team_points"
                style={{ data: { fill: theme.text } }}
            />
        </VictoryChart>
    );
};

export const WeeklyMarginChart = ({ chartData }) => {
    const data = chartData.map(({ week, team_points, margin_of_victory, image_or_text }) => ({
        week,
        team_points,
        margin_of_victory,
        image_or_text,
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
            <VictoryAxis dependentAxis
                tickValues={[-75, -50, -25, 0, 25, 50, 75]}
            />
            <VictoryAxis
                tickCount={data.length / 18}
                tickFormat={(t) => Math.round(t)}
                margin={{ top: 20, bottom: 20, right: 50, left: 50 }}
            />
            <VictoryScatter
                data={data}
                x="week"
                y="margin_of_victory"
                dataComponent={<CustomDataComponent />}
            />
        </VictoryChart>
    );
};

export const WeeklyMarginTable = ({ matchupData, leaderboardData }) => {
    // Find unique weeks
    const weeks = [...new Set(matchupData.map(week => week.week))];

    // Find unique teams and merge them with leaderboard data
    const teamsWithRecords = leaderboardData.map((teamRecord) => {
        return {
            team_name: teamRecord.Team,
            W: teamRecord.W,
            L: teamRecord.L,
            PF: teamRecord.PF,
        };
    });

    // Sort the teams by W and then by PF
    teamsWithRecords.sort((a, b) => {
        if (a.W === b.W) {
            return b.PF - a.PF;  // Sort by PF if W is the same
        }
        return b.W - a.W;  // Sort by W (descending)
    });

    return (
        <StickyTable>
            <thead>
                <tr>
                    <th>Team</th>
                    <th>W</th>
                    <th>L</th>
                    {weeks.map((week) => (
                        <th key={week}>Wk {week}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {teamsWithRecords.map((teamRecord) => {
                    const { team_name, W, L } = teamRecord;

                    return (
                        <tr key={team_name}>
                            <td className="wrap-cell">{team_name}</td>
                            <td className="center-column">{W}</td>
                            <td className="center-column">{L}</td>
                            {weeks.map((week) => {
                                const weekData = matchupData.find(
                                    (data) => data.team_name === team_name && data.week === week
                                );
                                return (
                                    <td className="center-column" key={week}
                                        style={{
                                            backgroundColor: weekData.mov_color,
                                            color: ColorConstants['light'].text
                                        }}>
                                        {weekData ? weekData.margin_of_victory : "N/A"}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </StickyTable>
    );
};


// Define the order for sorting positions
const positionOrder = ["QB", "RB", "WR", "TE", "K", "DEF"];

export const MatchupPlot = ({ data, matchupId }) => {
    const theme = useTheme();
    // Filter data based on the provided matchupId
    const filteredData = data.filter((team) => team.matchup_id === matchupId);

    // Get unique positions for creating legend, sorted in reverse order
    const uniquePositions = positionOrder
        .filter((position) => filteredData.some((team) => team.entries.some((entry) => entry.position === position)))
        .reverse();

    // Calculate total points for each team
    const totalPointsByTeam = filteredData.map((team) => ({
        team_name: team.team_name,
        totalPoints: parseFloat(
            team.entries.reduce((sum, entry) => sum + entry.points, 0).toFixed(2)
        )
    }));

    return (
        <div>
            <VictoryChart
                containerComponent={
                    <VictoryContainer />
                }
                domainPadding={{ x: 100, y: 20 }} // Adjust the x and y domainPadding values
                padding={{ top: 10, bottom: 30, left: 40, right: 20 }}
            >
                <VictoryAxis
                    tickValues={filteredData.map((team, index) => index + 0.5)}
                    tickFormat={filteredData.map((team) => team.team_name)}
                    style={{ tickLabels: { fill: theme.text } }}
                />
                <VictoryAxis
                    dependentAxis
                    gridComponent={<line
                        style={{ stroke: 'grey', strokeDasharray: '4 4' }}
                    />}
                    style={{ tickLabels: { fill: theme.text } }}
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
                                    nickname: entry.nickname,
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
                                }
                            }}
                            labels={({ datum }) => `${datum.full_name} ${datum.label} ${datum.nickname}`}
                            labelComponent={<CustomLabel />}
                        />
                    ))}
                </VictoryStack>
                {/* Render total points for each team on top of the stack */}
                {totalPointsByTeam.map((team, index) => (
                    <VictoryLabel
                        key={index}
                        x={(index + 0.64) * 188} // Adjust the x position to align with each team's bar
                        y={20} // Adjust the y position to place the label on top
                        text={`${team.totalPoints}`}
                        style={{ fontSize: 13, fontWeight: 'bold', fill: theme.text }}
                    />
                ))}
            </VictoryChart>
        </div>
    );
};

// Custom label component to position the label in the middle of the bar segment
const CustomLabel = (props) => {
    const { x, y, datum } = props;

    // Customize the label content based on the provided data
    const hasLabel = datum.label && datum.full_name;
    let fullName = hasLabel ? datum.full_name : '';
    let nickname = hasLabel && datum.nickname ? ` (${datum.nickname})` : '';
    const label = hasLabel ? ` - ${datum.label}` : '';

    // Split full name into first and last name based on the first space
    let firstName = '';
    let lastName = '';
    if (fullName) {
        const nameParts = fullName.split(' ');
        firstName = nameParts[0];
        lastName = nameParts.slice(1).join(' '); // Join the remaining parts in case of multiple last names
    }

    // Assuming points represent the height of the bar segment
    const points = datum.label || 0; // Use the points value from the label or default to 0

    // Define a threshold value for positioning the label outside the bar
    const threshold = -5;

    // Calculate the y position based on the threshold
    const yPos = points < threshold ? y - 15 : y + (2 * points) / 2 + 3;

    return (
        <g transform={`translate(${x}, ${yPos})`}>
            {/* Render the full name, nickname inline with smaller font, and label */}
            <text textAnchor="middle" fontSize={10} fill="#000">
                {fullName && (
                    <>
                        {/* Always insert the nickname in the middle */}
                        <tspan>{firstName}</tspan>
                        {nickname && <tspan fontSize={8}>{nickname}</tspan>}
                        {lastName && <tspan> {lastName}</tspan>}
                    </>
                )}
                <tspan>{label}</tspan>
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
                                backgroundColor: weekData.WinnerScoreColor,
                                color: ColorConstants['light'].text
                            }}>
                            {weekData["Winner Score"]}
                        </td>
                        <td className="center-column"
                            style={{
                                backgroundColor: weekData.LoserScoreColor,
                                color: ColorConstants['light'].text
                            }}>
                            {weekData["Loser Score"]}</td>
                        <td className="wrap-cell">{weekData["Loser Team"]}</td>
                        <td className="center-column"
                            style={{
                                backgroundColor: weekData.ShotsDogsColor,
                                color: ColorConstants['light'].text
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
                            style={{ backgroundColor: teamData.PFColor, color: ColorConstants['light'].text }}
                        >{teamData.PF}</td>
                        <td className="center-column"
                            style={{ backgroundColor: teamData.PAColor, color: ColorConstants['light'].text }}
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
                            style={{ backgroundColor: teamData.TaColor, color: ColorConstants['light'].text }}
                        >{teamData['Team Ability']}</td>
                        <td className="center-column"
                            style={{ backgroundColor: teamData.SosColor, color: ColorConstants['light'].text }}
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
                    <th>Playoff %</th>
                    <th>WP Playoff %</th>
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
                            style={{
                                backgroundColor: teamData.PlayoffColor,
                                color: ColorConstants['light'].text
                            }}
                        >{teamData['Play-off %']}</td>
                        <td className="center-column"
                            style={{
                                backgroundColor: teamData.WPPlayoffColor,
                                color: ColorConstants['light'].text
                            }}
                        >{teamData['WP Playoff %']}</td>
                        <td className="center-column"
                            style={{
                                backgroundColor: teamData.PlayoffMagicColor,
                                whiteSpace: 'nowrap', // Prevent text wrapping
                            }}
                        >{teamData['Play-off #']}</td>
                        <td className="center-column"
                            style={{
                                backgroundColor: teamData.LastColor,
                                color: ColorConstants['light'].text
                            }}
                        >{teamData['Last %']}</td>
                        <td className="center-column"
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

export const CustomDataComponent = (props) => {
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
    const theme = useTheme();

    // Find min/max values for PF and PA to set label positions
    const minPF = Math.min(...leaderboardData.map((d) => d.PF));
    const maxPF = Math.max(...leaderboardData.map((d) => d.PF));
    const minPA = Math.min(...leaderboardData.map((d) => d.PA));
    const maxPA = Math.max(...leaderboardData.map((d) => d.PA));

    // Corner labels with text color and padding for each word
    const cornerLabels = [
        { lines: ["Unlucky", "and", "Bad"], colors: [theme.newsRed, theme.text, theme.newsRed], x: minPF, y: maxPA, dx: 10, dy: 20 },
        { lines: ["Unlucky", "and", "Good"], colors: [theme.newsRed, theme.text, theme.newsBlue], x: maxPF, y: maxPA, dx: -10, dy: 20 },
        { lines: ["Lucky", "and", "Bad"], colors: [theme.newsBlue, theme.text, theme.newsRed], x: minPF, y: minPA, dx: 10, dy: 10 },
        { lines: ["Lucky", "and", "Good"], colors: [theme.newsBlue, theme.text, theme.newsBlue], x: maxPF, y: minPA, dx: -10, dy: 10 },
    ];

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
                    { x: minPF, y: minPA },
                    { x: maxPF, y: maxPA },
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
                    axisLabel: { padding: 30, fill: theme.text },
                    tickLabels: { fill: theme.text },
                    axis: { stroke: theme.text },
                }}
            />
            {/* Y-axis */}
            <VictoryAxis
                dependentAxis
                label="Points Against"
                style={{
                    axisLabel: { padding: 50, fill: theme.text },
                    tickLabels: { fill: theme.text },
                    axis: { stroke: theme.text },
                }}
            />
            {/* Corner labels using multi-line labels with different colors */}
            <VictoryScatter
                data={cornerLabels}
                x="x"
                y="y"
                size={0}
                labels={({ datum }) => datum.lines}
                style={{
                    data: { fill: theme.background }
                }}
                labelComponent={
                    <VictoryLabel
                        dx={({ datum }) => datum.dx}
                        dy={({ datum }) => datum.dy}
                        style={[
                            { fill: ({ datum }) => datum.colors[0] },
                            { fill: ({ datum }) => datum.colors[1] },
                            { fill: ({ datum }) => datum.colors[2] },
                        ]}
                    />
                }
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
                            style={{ backgroundColor: teamData.PFColor, color: ColorConstants['light'].text }}
                        >{teamData.PF}</td>
                        <td className="center-column"
                            style={{ backgroundColor: teamData.PAColor, color: ColorConstants['light'].text }}
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

export const DangerTable = ({ data }) => {
    const theme = useTheme();

    // Extract headers from the keys of the first object in the data array
    const headers = Object.keys(data[0]).filter(header => !header.endsWith('_color') && header !== 'Team');

    // Map for tooltips
    const headerToolTips = {
        'NPG': 'Next Possible Game',
        'RPA': 'Remaining Possible Appearances',
        'DM': 'Danger Metric',
    };

    return (
        <div>
            <StyledTable>
                <thead>
                    <tr>
                        {['Team', ...headers].map((header) => (
                            <th key={header} title={headerToolTips[header]}>
                                {header}
                            </th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((team) => (
                        <tr key={team.Team}>
                            {['Team', ...headers].map((header) => {
                                const cellValue = team[header];
                                const colorColumn = `${header}_color`;
                                const backgroundColor = header === 'Team' ? 'transparent' : team[colorColumn];

                                return (
                                    <td
                                        key={header}
                                        style={{
                                            backgroundColor: backgroundColor || 'transparent',
                                            textAlign: header === 'Team' ? 'left' : 'center',
                                            color: header === 'Team' ? theme.text : ColorConstants['light'].text
                                        }}
                                    >
                                        {cellValue}
                                    </td>
                                );
                            })}
                        </tr>
                    ))}
                </tbody>
            </StyledTable>
        </div>
    );
};

export const TradesLineChart = ({ tradeHistory }) => { // Destructure tradeHistory from props
    const theme = useTheme();

    return (
        <VictoryChart>
            <VictoryAxis
                label="Week"
                style={{
                    axisLabel: { padding: 30, fill: theme.text },
                    tickLabels: { fill: theme.text },
                    axis: { stroke: theme.text },
                }}
            />
            <VictoryAxis
                dependentAxis
                label="Total Trades"
                style={{
                    axisLabel: { padding: 30, fill: theme.text },
                    tickLabels: { fill: theme.text },
                    axis: { stroke: theme.text },
                }}
            />
            <VictoryLegend
                orientation="horizontal"
                x={50}
                gutter={20}
                data={[
                    { name: "2022", symbol: { fill: theme.yahoo } },
                    { name: "2023", symbol: { fill: theme.neutral3 } },
                    { name: "2024", symbol: { fill: theme.newsBlue } },
                    {
                        name: "2024 w/ Player",
                        symbol: {
                            fill: theme.background,
                            strokeDasharray: "3,3",
                            strokeWidth: 2,
                            stroke: theme.newsBlue
                        }
                    }
                    // {name: "Vetoed Yahoo", symbol: {fill: "#FF3366" } }
                ]}
                style={{
                    labels: { fill: theme.text },
                }}
            />
            <VictoryLine
                data={tradeHistory}
                x="week"
                y="yahoo_trades"
                style={{ data: { stroke: theme.yahoo } }}
            />
            <VictoryLine
                data={tradeHistory}
                x="week"
                y="sleeper_trades_2023"
                style={{ data: { stroke: theme.neutral3 } }}
            />
            <VictoryLine
                data={tradeHistory}
                x="week"
                y="non_faab_sleeper_2024"
                style={{ data: { stroke: theme.newsBlue, strokeDasharray: "3,3" } }}
            />
            <VictoryLine
                data={tradeHistory}
                x="week"
                y="sleeper_trades_2024"
                style={{ data: { stroke: theme.newsBlue } }}
            />
            {/* <VictoryLine
                data={tradeHistory}
                x="week"
                y="vetoed_yahoo_trades"
                style={{ data: { stroke: "#FF3366" } }}
            /> */}
        </VictoryChart>
    );
};
