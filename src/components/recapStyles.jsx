import styled from 'styled-components';
import React, { useState } from 'react';
import { VictoryChart, VictoryAxis, VictoryLabel, VictoryLine, VictoryScatter, VictoryContainer } from 'victory';
import { ColorConstants } from '../components/constants/ColorConstants.ts';
import { CustomDataComponent, ArticleSubheader, StyledTable } from './newsStyles.jsx';
import PropTypes from 'prop-types';

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