import { useTheme } from 'styled-components';
import { VictoryChart, VictoryAxis, VictoryLegend, VictoryBar, VictoryLabel, VictoryContainer, VictoryStack, VictoryHistogram, VictoryLine, VictoryScatter } from 'victory';
import { colorsByPosition } from '../components/constants/ColorConstants.ts';

// Common style configurations
const getCommonChartStyles = (theme) => ({
    container: {
        touchAction: "auto"
    },
    axis: {
        tickLabels: { fill: theme.text },
        axis: { stroke: theme.text }
    },
    grid: {
        stroke: 'grey',
        strokeDasharray: '4 4'
    },
    legend: {
        labels: { fill: theme.text }
    }
});

// Common chart configuration
const getBaseChartConfig = () => ({
    containerComponent: (
        <VictoryContainer style={{ touchAction: "auto" }} />
    )
});

// Common axis configuration - base version without gridlines
const getBaseAxisConfig = (theme) => ({
    style: {
        tickLabels: { fill: theme.text },
        axis: { stroke: theme.text }
    },
    tickFormat: (t) => t.toString().replace(/,/g, '')
});

// Version with configurable gridlines
const getAxisConfigWithGrid = (theme, options = {}) => {
    const config = { ...getBaseAxisConfig(theme) };

    if (options.grid) {
        config.gridComponent = <line style={{ stroke: 'grey', strokeDasharray: '4 4' }} />;
    }

    return config;
};

// Common legend configuration
const getBaseLegendConfig = (theme, x = 100, y = 0) => ({
    x,
    y,
    orientation: "horizontal",
    gutter: 20,
    style: {
        labels: { fill: theme.text }
    }
});

// Common bar style configuration
const getBaseBarConfig = (theme, color) => ({
    barWidth: 150,
    style: {
        data: {
            fill: color,
            stroke: '#000',
            strokeWidth: 1,
        }
    }
});

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
            {...getBaseChartConfig()}
            horizontal
            padding={{ top: 25, bottom: 25, left: 10, right: 50 }}
            domainPadding={{ x: 10 }}
        >
            <VictoryAxis
                dependentAxis
                {...getAxisConfigWithGrid(theme, { grid: true })}
                tickValues={bins}
            />
            <VictoryLegend
                {...getBaseLegendConfig(theme)}
                data={[
                    { name: 'Actual Points', symbol: { fill: theme.newsBlue } },
                    { name: 'Max Points', symbol: { fill: theme.neutral3 } },
                ]}
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
        <VictoryChart {...getBaseChartConfig()}>
            <VictoryLegend
                {...getBaseLegendConfig(theme, 125)}
                data={[
                    { name: 'This Week', symbol: { fill: theme.newsBlue } },
                    { name: 'Historic', symbol: { fill: theme.neutral3 } },
                ]}
            />
            <VictoryAxis {...getBaseAxisConfig(theme)} tickCount={Math.round(bins.length / 2.5)} />
            <VictoryAxis dependentAxis {...getAxisConfigWithGrid(theme, { grid: true })} tickCount={8} />
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
    const bins = [1, 2, 3, 4, 5, 6, 7, 8, 9];

    return (
        <VictoryChart
            {...getBaseChartConfig()}
            domainPadding={{ x: 0, y: 0 }}
            padding={{ top: 40, bottom: 25, left: 40, right: 20 }}
        >
            <VictoryLegend
                {...getBaseLegendConfig(theme, 140)}
                data={[
                    { name: 'MotW', symbol: { fill: theme.newsBlue } },
                    { name: 'Not MotW', symbol: { fill: theme.neutral3 } },
                ]}
            />
            <VictoryAxis
                dependentAxis
                tickCount={7}
                {...getAxisConfigWithGrid(theme, { grid: true })}
            />
            <VictoryStack colorScale="qualitative">
                {['MotW', 'Not MotW'].map(group => (
                    <VictoryHistogram
                        key={group}
                        style={{ data: { fill: group === 'MotW' ? theme.newsBlue : theme.neutral3 } }}
                        cornerRadius={3}
                        data={chartData.filter(entry => entry.group === group)}
                        x="x"
                        bins={bins}
                    />
                ))}
            </VictoryStack>
            {bins.map((bin, index) => (
                <VictoryLabel
                    key={index}
                    text={`${bin}`}
                    x={index * 49.2 + 62.5}
                    y={287}
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

    const lineStyles = {
        Maximum: { stroke: theme.newsBlue },
        Average: { stroke: theme.neutral4 },
        Median: { stroke: theme.neutral1 },
        Minimum: { stroke: theme.newsRed },
    };

    return (
        <VictoryChart {...getBaseChartConfig()}>
            <VictoryLegend
                {...getBaseLegendConfig(theme, 50, 10)}
                data={Object.entries(lineStyles).map(([name, style]) => ({
                    name,
                    symbol: { fill: style.stroke }
                }))}
            />
            <VictoryAxis
                dependentAxis
                tickValues={[50, 70, 90, 110, 130, 150, 170, 190]}
                {...getAxisConfigWithGrid(theme)}
            />
            <VictoryAxis
                tickCount={data.length / 18}
                tickFormat={(t) => Math.round(t)}
                {...getAxisConfigWithGrid(theme)}
            />
            {Object.entries(lineStyles).map(([key, style]) => (
                <VictoryLine
                    key={key}
                    data={data}
                    x="week"
                    y={key}
                    style={{ data: { ...style, strokeWidth: 2 } }}
                />
            ))}
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
    const theme = useTheme();
    const data = chartData.map(({ week, team_points, margin_of_victory, image_or_text }) => ({
        week,
        team_points,
        margin_of_victory,
        image_or_text,
    }));

    return (
        <VictoryChart {...getBaseChartConfig()}>
            <VictoryAxis
                dependentAxis
                tickValues={[-75, -50, -25, 0, 25, 50, 75]}
                {...getAxisConfigWithGrid(theme)}
            />
            <VictoryAxis
                tickCount={data.length / 18}
                tickFormat={(t) => Math.round(t)}
                {...getAxisConfigWithGrid(theme)}
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

// Define the order for sorting positions
const positionOrder = ["QB", "RB", "WR", "TE", "K", "DEF"];

export const MatchupPlot = ({ data, matchupId }) => {
    const theme = useTheme();
    const filteredData = data.filter((team) => team.matchup_id === matchupId);

    const uniquePositions = positionOrder
        .filter((position) => filteredData.some((team) => team.entries.some((entry) => entry.position === position)))
        .reverse();

    const totalPointsByTeam = filteredData.map((team) => ({
        team_name: team.team_name,
        totalPoints: parseFloat(
            team.entries.reduce((sum, entry) => sum + entry.points, 0).toFixed(2)
        )
    }));

    return (
        <div>
            <VictoryChart
                {...getBaseChartConfig()}
                domainPadding={{ x: 100, y: 20 }}
                padding={{ top: 10, bottom: 30, left: 40, right: 20 }}
            >
                <VictoryAxis
                    tickValues={filteredData.map((team, index) => index + 0.5)}
                    tickFormat={filteredData.map((team) => team.team_name)}
                    style={{
                        axis: { stroke: "transparent" },
                        ticks: { stroke: "transparent" },
                        tickLabels: { fill: theme.text }
                    }}
                />
                <VictoryAxis
                    dependentAxis
                    {...getAxisConfigWithGrid(theme, { grid: true })}
                    style={{
                        axis: { stroke: "transparent" },
                        ticks: { stroke: "transparent" },
                        tickLabels: { fill: theme.text }
                    }}
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
                                    index,
                                }))
                        )
                    ).map((entry) => (
                        <VictoryBar
                            key={entry.index}
                            data={[entry]}
                            x="team_name"
                            y="points"
                            {...getBaseBarConfig(theme, colorsByPosition[entry.position])}
                            labels={({ datum }) => `${datum.full_name} ${datum.label} ${datum.nickname}`}
                            labelComponent={<CustomLabel />}
                        />
                    ))}
                </VictoryStack>
                {totalPointsByTeam.map((team, index) => (
                    <VictoryLabel
                        key={index}
                        x={(index + 0.64) * 188}
                        y={20}
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
    const minPF = Math.min(...leaderboardData.map((d) => d.PF));
    const maxPF = Math.max(...leaderboardData.map((d) => d.PF));
    const minPA = Math.min(...leaderboardData.map((d) => d.PA));
    const maxPA = Math.max(...leaderboardData.map((d) => d.PA));

    const cornerLabels = [
        { lines: ["Unlucky", "and", "Bad"], colors: [theme.newsRed, theme.text, theme.newsRed], x: minPF, y: maxPA, dx: 10, dy: 20 },
        { lines: ["Unlucky", "and", "Good"], colors: [theme.newsRed, theme.text, theme.newsBlue], x: maxPF, y: maxPA, dx: -10, dy: 20 },
        { lines: ["Lucky", "and", "Bad"], colors: [theme.newsBlue, theme.text, theme.newsRed], x: minPF, y: minPA, dx: 10, dy: 10 },
        { lines: ["Lucky", "and", "Good"], colors: [theme.newsBlue, theme.text, theme.newsBlue], x: maxPF, y: minPA, dx: -10, dy: 10 },
    ];

    const getAxisConfig = (label, padding = 30) => ({
        ...getAxisConfigWithGrid(theme),
        label,
        style: {
            ...getCommonChartStyles(theme).axis,
            axisLabel: { padding, fill: theme.text }
        }
    });

    return (
        <VictoryChart
            {...getBaseChartConfig()}
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
            <VictoryAxis {...getAxisConfig("Points For")} />
            <VictoryAxis dependentAxis {...getAxisConfig("Points Against", 50)} />
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

export const TradesLineChart = ({ tradeHistory }) => {
    const theme = useTheme();

    const lineConfigs = [
        { key: 'yahoo_trades', stroke: theme.yahoo },
        { key: 'sleeper_trades_2023', stroke: theme.neutral3 },
        { key: 'non_faab_sleeper_2024', stroke: theme.newsBlue, strokeDasharray: "3,3" },
        { key: 'sleeper_trades_2024', stroke: theme.newsBlue }
    ];

    const legendData = [
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
    ];

    const getAxisConfig = (label, padding = 30) => ({
        ...getAxisConfigWithGrid(theme),
        label,
        style: {
            ...getCommonChartStyles(theme).axis,
            axisLabel: { padding, fill: theme.text }
        }
    });

    return (
        <VictoryChart {...getBaseChartConfig()}>
            <VictoryAxis {...getAxisConfig("Week")} />
            <VictoryAxis dependentAxis {...getAxisConfig("Total Trades")} />
            <VictoryLegend
                {...getBaseLegendConfig(theme)}
                data={legendData}
            />
            {lineConfigs.map(({ key, stroke, strokeDasharray }) => (
                <VictoryLine
                    key={key}
                    data={tradeHistory}
                    x="week"
                    y={key}
                    style={{ data: { stroke, strokeDasharray } }}
                />
            ))}
        </VictoryChart>
    );
};

const calculateAverage = (arr) => {
    const sum = arr.reduce((total, value) => total + value, 0);
    return sum / arr.length;
};

export const KickerDefenseChart = ({ data }) => {
    const theme = useTheme();

    const averagePPG = calculateAverage(data.map(entry => entry.ppg));
    const averageCount = calculateAverage(data.map(entry => entry.count));

    const shouldRenderLabel = (point, otherPoints) => {
        for (const otherPoint of otherPoints) {
            if (
                Math.abs(point.count - otherPoint.count) < 1 &&
                Math.abs(point.ppg - otherPoint.ppg) < 1 &&
                point.ppg > otherPoint.ppg
            ) {
                return true;
            }
        }
        return false;
    };

    const getAxisConfig = (label, padding = 30) => ({
        ...getAxisConfigWithGrid(theme),
        label,
        style: {
            ...getCommonChartStyles(theme).axis,
            axisLabel: { padding, fill: theme.text }
        }
    });

    return (
        <VictoryChart
            {...getBaseChartConfig()}
            domainPadding={{ x: 0, y: 10 }}
            padding={{ top: 10, bottom: 50, left: 90, right: 30 }}
        >
            <VictoryLine
                data={[
                    { x: Math.min(...data.map(entry => entry.count)) - 0.5, y: averagePPG },
                    { x: Math.max(...data.map(entry => entry.count)) + 0.5, y: averagePPG }
                ]}
                style={{
                    data: { stroke: theme.text, strokeWidth: 0.5, strokeDasharray: '4, 4' },
                }}
            />
            <VictoryLine
                data={[
                    { y: Math.min(...data.map(entry => entry.ppg)) - 0.5, x: averageCount },
                    { y: Math.max(...data.map(entry => entry.ppg)) + 0.5, x: averageCount }
                ]}
                style={{
                    data: { stroke: theme.text, strokeWidth: 0.5, strokeDasharray: '4, 4' },
                }}
            />
            <VictoryScatter
                data={data}
                x="count"
                y="ppg"
                dataComponent={<CustomDataComponent />}
                labels={({ datum }) => shouldRenderLabel(datum, data) ? datum.team_name : ''}
                labelComponent={
                    <VictoryLabel
                        dx={50}
                        dy={0}
                        angle={-45}
                        labelPlacement="parallel"
                        style={{ fontSize: 8, fill: theme.text }}
                    />
                }
            />
            <VictoryAxis {...getAxisConfig("Unique Players Started")} />
            <VictoryAxis dependentAxis {...getAxisConfig("Average PPG")} />
        </VictoryChart>
    );
};

