# Newsletter Creation Guide

This guide explains how to add a new newsletter to The Offensive Line website.

## Overview

Newsletters are React components that display fantasy football league content in a masonry layout. Each newsletter consists of multiple articles that are rendered in a responsive grid format.

## File Structure

Each newsletter follows this structure:

```
src/newsletters/
├── [Newsletter Name]/
│   ├── [Newsletter Name].jsx          # Main newsletter component
│   ├── awardsTable.json               # Awards data
│   ├── bestBallLb.json               # Best ball leaderboard data
│   ├── efficiencyData.json           # Manager efficiency data
│   ├── leaderboard.json              # Main leaderboard data
│   ├── matchupData.json              # Matchup statistics
│   ├── medianLb.json                 # Median scoring leaderboard
│   ├── motwTable.json                # Matchup of the week history
│   ├── powerRankings.json            # Power rankings data
│   ├── scheduleData.json             # Schedule information
│   ├── shotsDist.json                # Shots distribution data
│   ├── starters.json                 # Player starter data
│   ├── dangerTable.json              # Danger zone table data
│   └── [images].png/jpg              # Any images used in the newsletter
```

## Step-by-Step Instructions

### 1. Create the Newsletter Directory

Create a new directory in `src/newsletters/` with the newsletter name:

```
src/newsletters/[Your Newsletter Name]/
```

**Naming Convention:**

- Regular season weeks: `2024 Week 1`, `2024 Week 2`, etc.
- Season recaps: `2024 Season Recap`
- Preseason: `2024 Preseason`
- Offseason: `2024 Offseason`
- Special events: `2024 WP Week 4` (Walter Picks)

### 2. Create the Main Newsletter Component

Create `[Newsletter Name].jsx` in your directory. This file should:

1. **Import required components:**

```jsx
import {
  MotWRules,
  ArticleHeader,
  ImageWrapper,
  ArticleImage,
  ArticleSubheader,
  EfficiencyChart,
  StackedHistogram,
  MatchupPlot,
  MotwTable,
  ShotsDistributionChart,
  LeaderboardTable,
  PfPaScatter,
  AltLeaderboardTable,
  ArticleCaption,
  LeagueQuote,
  AwardsGridV2,
  DangerTable,
} from "../../components/newsletters/newsStyles";
```

2. **Import your data files:**

```jsx
import awardsData from "./awardsTable.json";
import bestBallLbData from "./bestBallLb.json";
import efficiencyData from "./efficiencyData.json";
import leaderboardData from "./leaderboard.json";
import matchupData from "./matchupData.json";
import medianLbData from "./medianLb.json";
import motwHistoryData from "./motwTable.json";
import shotsDistData from "./shotsDist.json";
import starterData from "./starters.json";
import dangerTable from "./dangerTable.json";
```

3. **Set the publication date:**

```jsx
export const newsDate = "YYYY-MM-DD";
```

### 3. Create Article Components

Each article should be a React component that returns JSX. Common article types include:

#### Awards and Recap Article

```jsx
const AwardsAndRecapArticle = () => {
  return (
    <div>
      <ArticleHeader>Awards and Recap</ArticleHeader>
      <ArticleSubheader>Week X</ArticleSubheader>
      <AwardsGridV2 awardsData={awardsData} />
      <p>Your recap text here...</p>
      <ArticleSubheader>Manager Skill Assessment</ArticleSubheader>
      <EfficiencyChart chartData={efficiencyData} />
      <ArticleCaption>Weekly Manager Skill Assessment</ArticleCaption>
      <p>Analysis of manager performance...</p>
    </div>
  );
};
```

#### Matchup of the Week Article

```jsx
const MotwArticle = () => {
  return (
    <div>
      <ArticleHeader>Matchup of the Week</ArticleHeader>
      <ArticleSubheader>Your Subheader</ArticleSubheader>
      <p>Matchup analysis...</p>
      <MatchupPlot data={starterData} matchupId={2} />
      <p>Additional commentary...</p>
      <ArticleSubheader>Matchup of the Week History</ArticleSubheader>
      <MotwTable motwHistoryData={motwHistoryData} />
      <ArticleSubheader>Potential # of Shots/Dogs</ArticleSubheader>
      <ShotsDistributionChart chartData={shotsDistData} />
    </div>
  );
};
```

#### Individual Matchup Articles

```jsx
const MatchupArticleTwo = () => {
  return (
    <div>
      <ArticleHeader>Matchup #2</ArticleHeader>
      <ArticleSubheader>Your Subheader</ArticleSubheader>
      <p>Matchup analysis...</p>
      <MatchupPlot data={starterData} matchupId={1} />
      <p>Additional commentary...</p>
    </div>
  );
};
```

#### Standings Article

```jsx
const StandingsArticle = () => {
  return (
    <div>
      <ArticleHeader>Standings & Points</ArticleHeader>
      <ArticleSubheader>Current Standings</ArticleSubheader>
      <LeaderboardTable leaderboardData={leaderboardData} />
      <p>Standings analysis...</p>
      <ArticleSubheader>PF Vs. PA</ArticleSubheader>
      <PfPaScatter leaderboardData={leaderboardData} />
      <p>Points analysis...</p>
    </div>
  );
};
```

#### Meme Articles

```jsx
const MemeArticle = () => {
  return (
    <ImageWrapper>
      <ArticleImage src={"https://your-meme-url.jpg"}></ArticleImage>
      <ArticleCaption>Submitted by [Name]</ArticleCaption>
    </ImageWrapper>
  );
};
```

### 4. Export the Articles Array

At the bottom of your newsletter file, export an array of articles:

```jsx
export const articles = [
  {
    id: 1,
    content: AwardsAndRecapArticle,
  },
  {
    id: 2,
    content: MotwArticle,
  },
  {
    id: 3,
    content: MatchupArticleTwo,
  },
  // ... more articles
  {
    id: 30,
    content: MotWRules,
  },
];
```

**Important:**

- Each article must have a unique `id`
- The `MotWRules` component should always be included with `id: 30`
- Article IDs should be sequential but can have gaps (for commented-out articles)

### 5. Create Data Files

You'll need to create JSON files for your data. These files are generated from the `ff-data-analytics` repository:

#### Data Sources

- **Regular season data**: Generated from `main.R` in the `ff-data-analytics` repo
- **Season recap data**: Generated from `end_of_season_recap.R` in the `ff-data-analytics` repo

#### Common Data Files

- `awardsTable.json` - Awards data
- `bestBallLb.json` - Best ball leaderboard
- `efficiencyData.json` - Manager efficiency metrics
- `leaderboard.json` - Main standings
- `matchupData.json` - Matchup statistics
- `medianLb.json` - Median scoring leaderboard
- `motwTable.json` - Matchup of the week history
- `powerRankings.json` - Power rankings
- `scheduleData.json` - Schedule information
- `shotsDist.json` - Shots distribution data
- `starters.json` - Player starter data
- `dangerTable.json` - Danger zone table

**Note**: For special newsletters (like offseason, preseason, etc.), you may not need all these data files. See the "Special Newsletters" section below.

### 6. Add to Navigation

Update `src/pages/Home.jsx` to include your newsletter in the navigation:

1. Find the `newsletterContent` object
2. Add your newsletter name to the appropriate array:
   - `mostRecentIssue` for the latest newsletters
   - `newsletterIssues` for older newsletters

```jsx
const newsletterContent = {
  mostRecentIssue: [
    "Your Newsletter Name",
    // ... other recent newsletters
  ],
  newsletterIssues: [
    // ... older newsletters
  ],
};
```

### 7. Test Your Newsletter

1. Start your development server
2. Navigate to the home page
3. Click on your newsletter to verify it loads correctly
4. Check that all articles display properly
5. Verify that images and data are loading correctly

## Special Newsletters

Some newsletters don't follow the standard weekly format and may not require all the typical data files. Examples include offseason, preseason, and special event newsletters.

### Creating a Special Newsletter (Example: 2024 Offseason)

Special newsletters can have a simpler structure and may only need:

1. **Basic imports** - Only the components you actually use:

```jsx
import React from "react";
import {
  ArticleCaption,
  ArticleHeader,
  ArticleImage,
  ArticleSubheader,
  LeagueQuote,
} from "../../components/newsletters/newsStyles";
import yourImage from "./your-image.jpg"; // If using local images
```

2. **Set the publication date**:

```jsx
export const newsDate = "YYYY-MM-DD";
```

3. **Create custom article components** - These can be completely custom content:

```jsx
const TopStoryArticle = () => {
  return (
    <div>
      <ArticleHeader>Your Main Headline</ArticleHeader>
      <ArticleSubheader>Your Subheadline</ArticleSubheader>
      <p>Your article content here...</p>
      <LeagueQuote>
        "Your quoted text here"
        <br />- Attribution
      </LeagueQuote>
      <p>More content...</p>
      <ArticleImage src={yourImage} />
      <ArticleCaption>Image caption</ArticleCaption>
    </div>
  );
};

const MemeArticle = () => {
  return (
    <div>
      <ArticleImage src="https://your-meme-url.jpg" />
      <ArticleCaption>Submitted by [Name]</ArticleCaption>
    </div>
  );
};
```

4. **Export articles array** - Much simpler for special newsletters:

```jsx
export const articles = [
  {
    id: 1,
    content: TopStoryArticle,
  },
  {
    id: 2,
    content: MemeArticle,
  },
  // ... more articles as needed
];
```

### Special Newsletter Examples

- **Offseason newsletters** - Focus on league updates, rule changes, punishment ideas
- **Preseason newsletters** - Draft analysis, season previews, team breakdowns
- **Special events** - Tournament results, special challenges, league milestones

### Key Differences for Special Newsletters

1. **No data files required** - These newsletters typically don't use the standard JSON data files
2. **Simpler structure** - Fewer articles, more focused content
3. **Custom styling** - Can use any combination of the available styled components
4. **Image handling** - Can use local images or external URLs
5. **Flexible content** - Not constrained by the typical weekly newsletter format

## Common Components and Their Usage

### Charts and Visualizations

- `EfficiencyChart` - Shows manager efficiency metrics
- `StackedHistogram` - Displays scoring distributions
- `MatchupPlot` - Shows individual matchup data
- `ShotsDistributionChart` - Shows shots/dogs distribution
- `PfPaScatter` - Points for vs points against scatter plot

### Tables

- `LeaderboardTable` - Main standings table
- `AltLeaderboardTable` - Alternative leaderboard formats
- `AwardsGridV2` - Awards display grid
- `MotwTable` - Matchup of the week history table
- `DangerTable` - Danger zone table

### Styled Components

- `ArticleHeader` - Main article titles
- `ArticleSubheader` - Section subtitles
- `ArticleCaption` - Image captions
- `LeagueQuote` - Quoted text from league members
- `ImageWrapper` - Container for images
- `ArticleImage` - Styled image component

## Tips and Best Practices

1. **Copy from existing newsletters** - Use a recent newsletter as a template
2. **Test incrementally** - Add one article at a time and test
3. **Check data formats** - Ensure your JSON files match the expected structure
4. **Use consistent naming** - Follow the established naming conventions
5. **Comment out unused articles** - Use `//` to disable articles you don't want to show
6. **Keep IDs unique** - Each article needs a unique ID, even if commented out

## Troubleshooting

### Newsletter not appearing in navigation

- Check that you added it to the correct array in `Home.jsx`
- Verify the newsletter name matches exactly

### Articles not displaying

- Check that all imported data files exist
- Verify the `articles` array is properly exported
- Ensure all component imports are correct

### Images not loading

- Check that image URLs are correct
- Verify image files are in the newsletter directory
- Use absolute URLs for external images

### Data not displaying

- Verify JSON file structure matches expected format
- Check that data files are properly imported
- Ensure component props match the data structure

## Example Newsletter Structure

Here's a typical weekly newsletter structure:

1. **Awards and Recap** (id: 1)
2. **Matchup of the Week** (id: 2)
3. **Individual Matchups** (id: 3-7)
4. **Scoring Distribution** (id: 8)
5. **Standings** (id: 9)
6. **Power Rankings** (id: 10) - optional
7. **Alternate Universe** (id: 12-14) - optional
8. **Danger Zone** (id: 15)
9. **League Buzz** (id: 16)
10. **Memes** (id: 17-24) - variable number
11. **MotW Rules** (id: 30) - always last

This structure can be modified based on the specific content and needs of each newsletter.
