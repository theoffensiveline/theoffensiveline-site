import React from "react";
import { useTheme } from "styled-components";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryContainer,
  VictoryLabel,
  VictoryPie,
  VictoryStack,
} from "victory";
import styled from "styled-components";
import { renderStackedBarChart } from "./stackedBarChart";
import { processHotDogData } from "./hotDogDataProcessor";
import { StyledTable } from "../../components/newsletters/tableStyles";
import hotDogsData from "../../data/hotDogs.json";

// Chart configuration functions
export const getBaseChartConfig = () => ({
  containerComponent: <VictoryContainer style={{ touchAction: "auto" }} />,
  responsive: true,
  width: undefined, // Allow charts to be responsive
  height: undefined,
});

// Common axis configuration with configurable gridlines
const getAxisConfigWithGrid = (
  theme: any,
  options: { grid?: boolean } = {}
) => {
  const config: any = {
    style: {
      tickLabels: { fill: theme.text },
      axis: { stroke: theme.text },
    },
    tickFormat: (t: any) => t.toString().replace(/,/g, ""),
  };

  if (options.grid) {
    config.gridComponent = (
      <line style={{ stroke: "grey", strokeDasharray: "4 4" }} />
    );
  }

  return config;
};

const PageContainer = styled.div`
  padding: 1rem;
  max-width: 400px;
  margin: 0 auto;
  background-color: ${({ theme }) => theme.background};
  color: ${({ theme }) => theme.text};
`;

const Title = styled.h1`
  text-align: center;
  margin-bottom: 1.5rem;
  color: ${(props) => props.theme.text};
  font-size: 1.75rem;
`;

export const ChartContainer = styled.div`
  margin-bottom: 1.5rem;
  padding: 1rem;
  border-radius: 8px;
  background-color: ${(props) => props.theme.background};
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  color: ${(props) => props.theme.text};
`;

export const ChartTitle = styled.h2`
  margin-bottom: 0.75rem;
  color: ${(props) => props.theme.text};
  font-size: 1.25rem;
`;

const ChartGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1.5rem;
`;

const StatsContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-bottom: 1.5rem;
  color: ${(props) => props.theme.newsBlue};
  gap: 0.75rem;
`;

const StatCard = styled.div`
  background-color: ${(props) => props.theme.newsBlue};
  border-radius: 8px;
  padding: 1rem;
  width: 100%;
  max-width: 300px;
  text-align: center;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const StatValue = styled.div`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 0.25rem;
  color: ${(props) => props.theme.text};
`;

const StatLabel = styled.div`
  font-size: 0.875rem;
  color: ${(props) => props.theme.text};
`;

const MatchupTableContainer = styled.div`
  margin-top: 2rem;
  margin-bottom: 2rem;
  overflow-x: auto; /* Enable horizontal scrolling for the table */
`;

const TableTitle = styled.h2`
  margin-bottom: 0.75rem;
  color: ${(props) => props.theme.text};
  text-align: center;
  font-size: 1.25rem;
`;

const VideoLink = styled.a`
  color: ${(props) => props.theme.newsBlue};
  text-decoration: underline;
  display: inline-block;
  &:hover {
    opacity: 0.8;
  }
`;

const HotDogTracker: React.FC = () => {
  const theme = useTheme();

  // Process data using the imported function
  const processData = processHotDogData;

  const {
    totalHotDogs,
    totalShots,
    totalMatchups,
    avgHotDogs,
    avgShots,
    perLossData,
    countDistributionData,
    stackedWinnerData,
    stackedLoserData,
    stackedWinnerHotDogData,
    stackedLoserHotDogData,
  } = processData();

  // Prepare data for matchup table
  const matchupTableData = [...hotDogsData]
    .sort((a, b) => {
      // Sort by year (descending) and then by week (descending)
      if (a.year !== b.year) return b.year - a.year;
      return b.week - a.week;
    })
    .map((item) => ({
      Year: item.year,
      Week: item.week,
      Winner: item.winner,
      Loser: item.loser,
      Count: item.count,
      Type: item.type === "hotdogs" ? "Hot Dogs" : "Shots",
      Video: item.link,
    }));

  return (
    <PageContainer>
      <Title>Hot Dog & Shot Tracker</Title>

      <StatsContainer>
        <StatCard>
          <StatValue>{totalMatchups}</StatValue>
          <StatLabel>Total Matchups</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{totalHotDogs}</StatValue>
          <StatLabel>Total Hot Dogs</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{totalShots}</StatValue>
          <StatLabel>Total Shots</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{avgHotDogs.toFixed(1)}</StatValue>
          <StatLabel>Avg Hot Dogs Per Matchup</StatLabel>
        </StatCard>
        <StatCard>
          <StatValue>{avgShots.toFixed(1)}</StatValue>
          <StatLabel>Avg Shots Per Matchup</StatLabel>
        </StatCard>
      </StatsContainer>

      <ChartGrid>
        {renderStackedBarChart(
          "Most Losses",
          stackedLoserData,
          [
            theme.hotDogYellow,
            theme.hotDogPurple,
            theme.hotDogOrange,
            theme.hotDogBlue,
            theme.hotDogPink,
          ],
          theme
        )}

        {renderStackedBarChart(
          "Most Hot Dogs/Shots Consumed",
          stackedLoserHotDogData,
          [
            theme.hotDogYellow,
            theme.hotDogPurple,
            theme.hotDogOrange,
            theme.hotDogBlue,
            theme.hotDogPink,
          ],
          theme
        )}

        {renderStackedBarChart(
          "Most Wins",
          stackedWinnerData,
          [
            theme.hotDogYellow,
            theme.hotDogPurple,
            theme.hotDogOrange,
            theme.hotDogBlue,
            theme.hotDogPink,
          ],
          theme
        )}

        {renderStackedBarChart(
          "Most Hot Dogs/Shots Given Out",
          stackedWinnerHotDogData,
          [
            theme.hotDogYellow,
            theme.hotDogPurple,
            theme.hotDogOrange,
            theme.hotDogBlue,
            theme.hotDogPink,
          ],
          theme
        )}

        <ChartContainer>
          <ChartTitle>Hot Dogs & Shots Per Loss</ChartTitle>
          <VictoryChart
            {...getBaseChartConfig()}
            horizontal
            domainPadding={{ x: 10 }}
            padding={{ top: 10, bottom: 50, left: 50, right: 50 }}
          >
            <VictoryAxis
              style={{
                tickLabels: {
                  fontSize: 10,
                  fill: theme.text,
                  color: theme.text,
                },
              }}
            />
            <VictoryBar
              data={perLossData}
              x="name"
              y="totalPerLoss"
              barWidth={15}
              colorScale={[theme.hotDogYellow]}
              labels={({ datum }) => datum.totalPerLoss.toFixed(1)}
              labelComponent={
                <VictoryLabel
                  textAnchor="middle"
                  verticalAnchor="middle"
                  dx={-10}
                  style={{
                    fill: "#ffffff",
                    fontSize: 9,
                    fontWeight: "bold",
                  }}
                />
              }
            />
          </VictoryChart>
        </ChartContainer>

        <ChartContainer>
          <ChartTitle>Hot Dogs vs Shots Distribution</ChartTitle>
          <VictoryPie
            data={[
              { x: "Hot Dogs", y: totalHotDogs },
              { x: "Shots", y: totalShots },
            ]}
            colorScale={[theme.hotDogBrown, theme.hotDogGold]}
            labelRadius={40}
            labels={({ datum }) => `${datum.x}: ${datum.y}`}
            style={{
              labels: {
                fill: theme.text,
                fontSize: 10,
              },
            }}
            padding={{ top: 10, bottom: 10, left: 10, right: 10 }}
            height={200}
            width={200}
          />
        </ChartContainer>

        <ChartContainer>
          <ChartTitle>Count Distribution</ChartTitle>
          <VictoryChart
            {...getBaseChartConfig()}
            domainPadding={{ x: 20 }}
            padding={{
              top: 20,
              bottom: 40,
              left: 40,
              right: 20,
            }}
            height={250}
          >
            <VictoryAxis
              label="Number of Hot Dogs/Shots"
              style={{
                axisLabel: { padding: 30, fill: theme.text },
                tickLabels: { fill: theme.text },
              }}
            />
            <VictoryAxis
              dependentAxis
              label="Frequency"
              style={{
                axisLabel: { padding: 40, fill: theme.text },
                tickLabels: { fill: theme.text },
              }}
              {...getAxisConfigWithGrid(theme, { grid: true })}
            />
            <VictoryStack colorScale={[theme.hotDogBrown, theme.hotDogGold]}>
              <VictoryBar
                data={countDistributionData.map((item) => ({
                  count: item.count,
                  frequency: item.hotdogFrequency || 0,
                }))}
                x="count"
                y="frequency"
                cornerRadius={{ top: 3 }}
                barWidth={20}
              />
              <VictoryBar
                data={countDistributionData.map((item) => ({
                  count: item.count,
                  frequency: item.shotFrequency || 0,
                }))}
                x="count"
                y="frequency"
                cornerRadius={{ top: 3 }}
                barWidth={20}
              />
            </VictoryStack>

            {/* Add separate bar chart for total labels */}
            <VictoryBar
              data={countDistributionData.map((item) => ({
                count: item.count,
                frequency:
                  (item.hotdogFrequency || 0) + (item.shotFrequency || 0),
              }))}
              x="count"
              y="frequency"
              style={{ data: { fill: "transparent" } }}
              barWidth={20}
              labels={({ datum }) =>
                datum.frequency > 0 ? datum.frequency : null
              }
              labelComponent={
                <VictoryLabel
                  dy={-10}
                  style={{ fill: theme.text, fontWeight: "bold" }}
                />
              }
            />
          </VictoryChart>
        </ChartContainer>
      </ChartGrid>

      <MatchupTableContainer>
        <TableTitle>Matchup History</TableTitle>
        <MatchupTable matchupData={matchupTableData} />
      </MatchupTableContainer>
    </PageContainer>
  );
};

// Table component for matchup history
const MatchupTable: React.FC<{ matchupData: any[] }> = ({ matchupData }) => {
  const headers = ["Year", "Week", "Winner", "Loser", "Count", "Type"];

  const renderCell = (row: any, header: string) => {
    switch (header) {
      case "Loser":
        return (
          <td>
            {row.Video ? (
              <VideoLink
                href={row.Video}
                target="_blank"
                rel="noopener noreferrer"
              >
                {row.Loser}
              </VideoLink>
            ) : (
              row.Loser
            )}
          </td>
        );
      case "Count":
      case "Week":
      case "Year":
        return <td className="center-column">{row[header]}</td>;
      default:
        return <td>{row[header]}</td>;
    }
  };

  return (
    <StyledTable>
      <thead>
        <tr>
          {headers.map((header) => (
            <th key={header}>{header}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {matchupData.map((row, index) => (
          <tr key={index}>
            {headers.map((header) => renderCell(row, header))}
          </tr>
        ))}
      </tbody>
    </StyledTable>
  );
};

export default HotDogTracker;
