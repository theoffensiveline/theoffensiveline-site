import { ChartContainer, ChartTitle } from "./HotDogTracker";
import { getBaseChartConfig } from "./HotDogTracker";
import hotDogsData from "../../data/hotDogs.json";
import {
  VictoryAxis,
  VictoryBar,
  VictoryChart,
  VictoryStack,
  VictoryLabel,
  VictoryLegend,
} from "victory";

const allYears = [...new Set(hotDogsData.map((item) => item.year))].sort();

// Reusable function for creating horizontal bar charts with people on y-axis and years as stacks
export const renderStackedBarChart = (
  title: string,
  data: Array<{ name: string; [key: string]: string | number }>,
  colorScale: string[],
  theme: any // Add theme as a parameter
) => {
  if (!data || data.length === 0) return null;

  // Get all the year keys (they start with 'y')
  const yearKeys = Object.keys(data[0])
    .filter((key) => key.startsWith("y"))
    .sort((a, b) => {
      // Sort by year value (after removing the 'y' prefix)
      return parseInt(a.substring(1)) - parseInt(b.substring(1));
    });

  // Create legend data for years
  const legendData = allYears.map((year, i) => ({
    name: year.toString(),
    symbol: { fill: colorScale[i % colorScale.length] },
  }));

  // Calculate total for each person to sort by total
  // Sort in descending order so biggest bars are on top
  const dataWithTotals = data
    .map((item) => {
      const total = yearKeys.reduce(
        (sum, key) =>
          sum + (typeof item[key] === "number" ? (item[key] as number) : 0),
        0
      );
      return { ...item, total };
    })
    .sort((a, b) => a.total - b.total);

  return (
    <ChartContainer>
      <ChartTitle>{title}</ChartTitle>

      {/* Legend moved outside and above the chart */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
        }}
      >
        <VictoryLegend
          standalone
          width={300}
          height={20}
          colorScale={colorScale}
          data={legendData}
          orientation="horizontal"
          style={{
            labels: { fill: theme.text },
            border: { stroke: "none" },
          }}
        />
      </div>

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
        <VictoryStack colorScale={colorScale} horizontal={true}>
          {yearKeys.map((yearKey) => {
            return (
              <VictoryBar
                key={yearKey}
                data={dataWithTotals}
                x="name"
                y={(datum: any) => Number(datum[yearKey]) || 0}
                barWidth={15}
                labels={({ datum }: { datum: any }) => {
                  const value = Number(datum[yearKey]) || 0;
                  return value > 0 ? value : "";
                }}
                labelComponent={
                  <VictoryLabel
                    textAnchor="middle"
                    verticalAnchor="middle"
                    dx={-10} // Move label left
                    style={{
                      fill: "#ffffff",
                      fontSize: 9,
                      fontWeight: "bold",
                    }}
                  />
                }
              />
            );
          })}
        </VictoryStack>

        {/* Add total labels to the right of each bar */}
        <VictoryBar
          data={dataWithTotals}
          x="name"
          y="total"
          barWidth={0} // Invisible bar, just for positioning labels
          labels={({ datum }) => `${datum.total}`}
          style={{ data: { fill: "transparent" } }}
          labelComponent={
            <VictoryLabel
              dx={10} // Position to the right of the stacked bar
              textAnchor="start"
              verticalAnchor="middle"
              style={{
                fill: theme.text,
                fontSize: 12,
                fontWeight: "bold",
              }}
            />
          }
        />
      </VictoryChart>
    </ChartContainer>
  );
};
