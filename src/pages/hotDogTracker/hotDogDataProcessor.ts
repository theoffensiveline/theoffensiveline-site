import hotDogsData from "../../data/hotDogs.json";

// List of all names for data processing
export const allNames = [
  "Nikhil",
  "Trevor",
  "Kyle",
  "Alec",
  "Smitty",
  "Greg",
  "Anthony",
  "Josh K",
  "Matt Rob",
  "Jake",
  "Josh L",
  "Devan",
];

// Types for processed data
export interface ProcessedHotDogData {
  totalHotDogs: number;
  totalShots: number;
  totalMatchups: number;
  avgHotDogs: number;
  avgShots: number;
  winnerData: { name: string; count: number }[];
  loserData: { name: string; count: number }[];
  winnerHotDogData: { name: string; count: number }[];
  loserHotDogData: { name: string; count: number }[];
  perLossData: {
    name: string;
    hotdogsPerLoss: number;
    shotsPerLoss: number;
    totalPerLoss: number;
    totalLosses: number;
  }[];
  countDistributionData: {
    count: number;
    frequency: number;
    hotdogFrequency: number;
    shotFrequency: number;
  }[];
  yearlyTrendsData: {
    year: number;
    hotdogs: number;
    shots: number;
    hotdogCount: number;
    shotCount: number;
  }[];
  weeklyData: {
    week: number;
    count: number;
    hotdogCount: number;
    shotCount: number;
  }[];
  stackedWinnerData: { name: string; [key: string]: string | number }[];
  stackedLoserData: { name: string; [key: string]: string | number }[];
  stackedWinnerHotDogData: { name: string; [key: string]: string | number }[];
  stackedLoserHotDogData: { name: string; [key: string]: string | number }[];
  allYears: number[];
}

// Process data for different charts
export const processHotDogData = (): ProcessedHotDogData => {
  // Filter only hotdogs (not shots)
  const hotdogsOnly = hotDogsData.filter((item) => item.type === "hotdogs");
  const shotsOnly = hotDogsData.filter((item) => item.type === "shots");

  // Calculate total stats
  const totalHotDogs = hotdogsOnly.reduce((sum, item) => sum + item.count, 0);
  const totalShots = shotsOnly.reduce((sum, item) => sum + item.count, 0);
  const totalMatchups = hotDogsData.length;
  const avgHotDogs = totalHotDogs / hotdogsOnly.length;
  const avgShots = totalShots / shotsOnly.length;

  // Get winners and counts - initialize with all names set to 0
  const winnerCounts: { [key: string]: number } = {};
  const loserCounts: { [key: string]: number } = {};
  const winnerHotDogCounts: { [key: string]: number } = {};
  const loserHotDogCounts: { [key: string]: number } = {};

  // Initialize counts for all names
  allNames.forEach((name) => {
    winnerCounts[name] = 0;
    loserCounts[name] = 0;
    winnerHotDogCounts[name] = 0;
    loserHotDogCounts[name] = 0;
  });

  // For stacked bar charts by year
  const winnersByYearAndName: { [key: string]: { [key: string]: number } } = {};
  const losersByYearAndName: { [key: string]: { [key: string]: number } } = {};
  const winnerHotDogsByYearAndName: {
    [key: string]: { [key: string]: number };
  } = {};
  const loserHotDogsByYearAndName: {
    [key: string]: { [key: string]: number };
  } = {};

  hotDogsData.forEach((item) => {
    const year = item.year;
    const winner = item.winner;
    const loser = item.loser;
    const count = item.count;

    // Count winners
    winnerCounts[winner] = (winnerCounts[winner] || 0) + 1;

    // Count losers
    loserCounts[loser] = (loserCounts[loser] || 0) + 1;

    // Count hot dogs by winner
    winnerHotDogCounts[winner] = (winnerHotDogCounts[winner] || 0) + count;

    // Count hot dogs by loser
    loserHotDogCounts[loser] = (loserHotDogCounts[loser] || 0) + count;

    // Initialize year objects if they don't exist
    if (!winnersByYearAndName[year]) {
      winnersByYearAndName[year] = {};
      // Initialize with all names set to 0
      allNames.forEach((name) => {
        winnersByYearAndName[year][name] = 0;
      });
    }
    if (!losersByYearAndName[year]) {
      losersByYearAndName[year] = {};
      // Initialize with all names set to 0
      allNames.forEach((name) => {
        losersByYearAndName[year][name] = 0;
      });
    }
    if (!winnerHotDogsByYearAndName[year]) {
      winnerHotDogsByYearAndName[year] = {};
      // Initialize with all names set to 0
      allNames.forEach((name) => {
        winnerHotDogsByYearAndName[year][name] = 0;
      });
    }
    if (!loserHotDogsByYearAndName[year]) {
      loserHotDogsByYearAndName[year] = {};
      // Initialize with all names set to 0
      allNames.forEach((name) => {
        loserHotDogsByYearAndName[year][name] = 0;
      });
    }

    // Count by year and name
    winnersByYearAndName[year][winner] =
      (winnersByYearAndName[year][winner] || 0) + 1;
    losersByYearAndName[year][loser] =
      (losersByYearAndName[year][loser] || 0) + 1;
    winnerHotDogsByYearAndName[year][winner] =
      (winnerHotDogsByYearAndName[year][winner] || 0) + count;
    loserHotDogsByYearAndName[year][loser] =
      (loserHotDogsByYearAndName[year][loser] || 0) + count;
  });

  // Convert to arrays for charts
  const winnerData = Object.entries(winnerCounts)
    .map(([name, count]) => ({
      name,
      count: count as number,
    }))
    .sort((a, b) => b.count - a.count);

  const loserData = Object.entries(loserCounts)
    .map(([name, count]) => ({
      name,
      count: count as number,
    }))
    .sort((a, b) => b.count - a.count);

  const winnerHotDogData = Object.entries(winnerHotDogCounts)
    .map(([name, count]) => ({
      name,
      count: count as number,
    }))
    .sort((a, b) => b.count - a.count);

  const loserHotDogData = Object.entries(loserHotDogCounts)
    .map(([name, count]) => ({
      name,
      count: count as number,
    }))
    .sort((a, b) => b.count - a.count);

  // Calculate hot dogs and shots per loss for each person
  const perLossData = allNames
    .map((name) => {
      const totalLosses = loserCounts[name] || 0;
      const totalHotDogsConsumed = hotdogsOnly
        .filter((item) => item.loser === name)
        .reduce((sum, item) => sum + item.count, 0);
      const totalShotsConsumed = shotsOnly
        .filter((item) => item.loser === name)
        .reduce((sum, item) => sum + item.count, 0);

      return {
        name,
        hotdogsPerLoss:
          totalLosses > 0 ? totalHotDogsConsumed / totalLosses : 0,
        shotsPerLoss: totalLosses > 0 ? totalShotsConsumed / totalLosses : 0,
        totalPerLoss:
          totalLosses > 0
            ? (totalHotDogsConsumed + totalShotsConsumed) / totalLosses
            : 0,
        totalLosses,
      };
    })
    .filter((person) => person.totalLosses > 0) // Only show people who have lost at least once
    .sort(
      (a, b) =>
        a.hotdogsPerLoss + a.shotsPerLoss - (b.hotdogsPerLoss + b.shotsPerLoss)
    );

  // Process data for stacked bar charts by person with years as stacks
  const processStackedData = (
    dataByYearAndName: { [year: string]: { [name: string]: number } },
    topNames: number
  ) => {
    // Get all years
    const years = Object.keys(dataByYearAndName)
      .map((y) => parseInt(y))
      .sort();

    // Get the total count for each person across all years
    const personTotals: { [name: string]: number } = {};
    Object.entries(dataByYearAndName).forEach(([year, yearData]) => {
      Object.entries(yearData).forEach(([name, count]) => {
        personTotals[name] = (personTotals[name] || 0) + count;
      });
    });

    // Get top N names by total count (including those with 0)
    const topPersons = Object.entries(personTotals)
      .sort((a, b) => b[1] - a[1])
      .slice(0, topNames)
      .map(([name]) => name);

    // Create data for each top person with year-based stacks
    return topPersons.map((name) => {
      const personData: { name: string; [key: string]: string | number } = {
        name,
      };
      years.forEach((year) => {
        // Ensure we have a value for each year (0 if not present)
        personData[`y${year}`] = dataByYearAndName[year]?.[name] || 0;
      });
      return personData;
    });
  };

  // Create stacked data for each chart - show up to 15 names
  const stackedWinnerData = processStackedData(winnersByYearAndName, 15);
  const stackedLoserData = processStackedData(losersByYearAndName, 15);
  const stackedWinnerHotDogData = processStackedData(
    winnerHotDogsByYearAndName,
    15
  );
  const stackedLoserHotDogData = processStackedData(
    loserHotDogsByYearAndName,
    15
  );

  // Get all years for legend creation
  const allYears = [...new Set(hotDogsData.map((item) => item.year))].sort();

  // Data for count distribution
  const countDistribution: {
    [count: number]: { total: number; hotdogs: number; shots: number };
  } = {};
  hotDogsData.forEach((item) => {
    if (!countDistribution[item.count]) {
      countDistribution[item.count] = { total: 0, hotdogs: 0, shots: 0 };
    }
    countDistribution[item.count].total += 1;

    if (item.type === "hotdogs") {
      countDistribution[item.count].hotdogs += 1;
    } else if (item.type === "shots") {
      countDistribution[item.count].shots += 1;
    }
  });

  const countDistributionData = Object.entries(countDistribution)
    .map(([count, data]) => ({
      count: parseInt(count),
      frequency: data.total,
      hotdogFrequency: data.hotdogs,
      shotFrequency: data.shots,
    }))
    .sort((a, b) => a.count - b.count);

  // Data for yearly trends
  const yearlyData: {
    [year: number]: {
      hotdogs: number;
      shots: number;
      hotdogCount: number;
      shotCount: number;
    };
  } = {};
  hotDogsData.forEach((item) => {
    if (!yearlyData[item.year]) {
      yearlyData[item.year] = {
        hotdogs: 0,
        shots: 0,
        hotdogCount: 0,
        shotCount: 0,
      };
    }

    if (item.type === "hotdogs") {
      yearlyData[item.year].hotdogs += 1;
      yearlyData[item.year].hotdogCount += item.count;
    } else {
      yearlyData[item.year].shots += 1;
      yearlyData[item.year].shotCount += item.count;
    }
  });

  const yearlyTrendsData = Object.entries(yearlyData).map(([year, data]) => ({
    year: parseInt(year),
    ...(data as any),
  }));

  // Data for weekly trends
  const weeklyData = [];
  for (let week = 1; week <= 17; week++) {
    const weekItems = hotDogsData.filter((item) => item.week === week);
    const hotdogItems = weekItems.filter((item) => item.type === "hotdogs");
    const shotItems = weekItems.filter((item) => item.type === "shots");

    weeklyData.push({
      week,
      count: weekItems.length,
      hotdogCount: hotdogItems.reduce((sum, item) => sum + item.count, 0),
      shotCount: shotItems.reduce((sum, item) => sum + item.count, 0),
    });
  }

  return {
    totalHotDogs,
    totalShots,
    totalMatchups,
    avgHotDogs,
    avgShots,
    winnerData,
    loserData,
    winnerHotDogData,
    loserHotDogData,
    perLossData,
    countDistributionData,
    yearlyTrendsData,
    weeklyData,
    stackedWinnerData,
    stackedLoserData,
    stackedWinnerHotDogData,
    stackedLoserHotDogData,
    allYears,
  };
};
