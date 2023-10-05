import { styled } from "styled-components";

// this needs to be styled much better, but I got the text in for now
// weird whitespace on the right and bottom idk how to fix
// generally ugly, probably need new font and better styling for lists and especially tables I had chatGPT give me some bullshit and also found this link
// https://codesandbox.io/s/tables-styled-components-v7vgb

export default function Bylaws() {
    return (
        <>
            <TitleHolder>Title IXers Bylaws</TitleHolder>
            <br></br>
            <SubtitleHolder>Purpose</SubtitleHolder>
            <CenteredTextWithPadding>In order to encourage fair and competitive play and to establish the longevity of our league the league name here constitution has been created. This constitution outlines the current league structure in order to have an organized reference for all members.</CenteredTextWithPadding>
            <SubtitleHolder>Article I - League Structure</SubtitleHolder>
            <StyledTextArea><StyledOrderedList><StyledListItem>Format: The League name here is a twelve-team league with a head-to-head points format and an annual entry fee with a base fee of $10 and any additional fees that vary based on the chosen punishment. The punishment fee will be estimated at the beginning of the season as part of pitching the punishment, and any leftover funds from that will be paid back to owners in equal parts after the punishment has been paid for.</StyledListItem><StyledListItem>Regular Season Schedule: The league's regular season begins Week 1 and ends Week 14 of the NFL season. The commissioner allows Sleeper to set the schedule automatically. Sleeper typically sets the regular season schedule on the following principle: each team plays all other teams at least once the remaining matchups are randomized. There is no tie-breaker for regular season matchups.</StyledListItem><StyledListItem>Punishment:  The last place (regular season) punishment will be decided each off-season by all managers. The punishment must be unanimously agreed upon  before the draft begins. In the case of a punishment being undecided, the league will default to the original punishment of taking the ACT. Regardless of the punishment, the loser will be responsible for executing the punishment (as much as possible).</StyledListItem><StyledListItem>Postseason: The league postseason begins in Week 15. The top six teams qualify for a three week playoff tournament to compete for the league championship. The number one and number two seeds are granted with a first round bye. In the event of a postseason tie, the higher seed wins.</StyledListItem><StyledListItem>Playoff Bracket: Playoff matchups are one week long. Second round playoff matchups will be adjusted so the highest seeded team will play the lowest seeded team in Week 16.</StyledListItem><StyledListItem>Consolation Bracket: The six teams that do not make it into the playoffs will compete in the Toilet Bowl where the lower bracket teams play to avoid battling for last place. The LOSING team from each round gets flushed to the next round. The eleventh and twelfth seed teams receive a first round bye of the Toilet Bowl.</StyledListItem><StyledListItem>League Champion: In Week 17 the final two remaining teams compete in a one week matchup for fantasy immortality. The winner is declared the champion. The commissioner will have the champion's name engraved on the league trophy, and the champion has the right to display the trophy for the following year until the next champion is decided.</StyledListItem><StyledListItem>Cash Prizes: The champion will receive $80, the second place team will receive $30, and the third place team will receive $10, which is equal to their entry fee.</StyledListItem></StyledOrderedList></StyledTextArea>
            <SubtitleHolder>Article II - Administration</SubtitleHolder>
            <StyledTextArea><StyledOrderedList><StyledListItem>Sleeper: The league is hosted on Sleeper. The league rules as listed below should align with the league settings on Sleeper. In any case where the league rules as listed here do not align with the rules as set up in Sleeper, the settings in Sleeper will take precedence if the league is mid-season. If the inconsistency is brought to the commissioner's attention in the offseason, these rules will be brought into alignment with the Sleeper settings.</StyledListItem><StyledListItem>Commissioner: The commissioner handles the day-to-day administration of the league, including but not limited to: implementing the rules in Sleeper, cultivating a spirit of friendly competition, resolving disputes, clarifying rule ambiguity, keeping league stats, identifying new owners for vacant teams, and updating the league trophy.</StyledListItem><StyledListItem>Assistant Commissioner: The assistant commissioner is a league member who serves at the pleasure of the commissioner to provide counsel and assist with league administration. The assistant commissioner may act in place of the commissioner, especially in cases of the commissioner's absence or conflict of interest.</StyledListItem><StyledListItem>Assistant to the Commissioner: The assistant to the commissioner is a league member who serves at the pleasure of the commissioner to provide counsel and assist with league administration. The assistant to the commissioner may act in place of the commissioner, especially in cases of the commissioner's absence or conflict of interest.</StyledListItem><StyledListItem>Elections: Each offseason, an election can be triggered for any administrative position if someone in the league would like to run for a position they are not currently in.</StyledListItem></StyledOrderedList></StyledTextArea>
            <SubtitleHolder>Article III - Membership</SubtitleHolder>
            <StyledTextArea><StyledOrderedList><StyledListItem>Joining: The league shall be composed of twelve owners. Owners are invited to join the league by the commissioner.</StyledListItem><StyledListItem>Entry Fee: The cost of participation is an entry fee that varies in cost (see punishment section above) and is due at the beginning of each NFL regular season.</StyledListItem><StyledListItem>Active Participation: Owners are expected to set a full roster each week during the NFL regular season and to make every effort to participate in the annual draft and all league decisions.</StyledListItem><StyledListItem>Resigning: Owners wishing to leave the league should communicate that to the commissioner in the offseason well in advance of the draft.</StyledListItem></StyledOrderedList></StyledTextArea>
            <SubtitleHolder>Article IV - Code of Conduct</SubtitleHolder>
            <StyledTextArea><StyledOrderedList><StyledListItem>Good Sportsmanship: All owners are expected to set their best possible lineup each week and to attempt to win every game to the best of their ability. As explained below, collusion, tanking, churning, and inactivity are violations of this code of conduct.</StyledListItem><StyledListItem>Collusion: Collusion occurs when two teams work together against the rest of the league, or one team makes moves to benefit another team without trying to improve its own position. Collusion undermines the ethic of good sportsmanship as well as the competitive balance of the league. Examples include: one-sided trades; dropping a player so that another team may pick up that player; transactions that involve future considerations or preferential treatment; and swapping players to cover bye weeks or injury.</StyledListItem><StyledListItem>Tanking: Tanking occurs when a team intentionally loses a game or drops players to alter the competitive balance of the league. Teams are prohibited from losing a game to alter playoff matchups and from dumping valued players into the player pool after giving up on a disappointing season.</StyledListItem><StyledListItem>Churning: Churning occurs when a team adds and drops players on waivers for the sole purpose of making them unavailable to other teams, which is prohibited.</StyledListItem><StyledListItem>Inactivity: A team is considered inactive if there are inactive, injured, or bye week players in the starting lineup, or empty lineup positions, and no changes have been made to the roster. The commissioner will contact an owner whose team is inactive for two or more weeks in a row. If the team remains inactive, the commissioner reserves the right to make changes to fill the roster and reassign ownership of the team for purposes of competitive balance.</StyledListItem></StyledOrderedList></StyledTextArea>
            <SubtitleHolder>Article V - Annual Draft</SubtitleHolder>
            <StyledTextArea><StyledOrderedList><StyledListItem>Timing: The Draft is scheduled with input from league members, and the date and time are ultimately determined by the commissioner. The Draft should be held the night before the NFL season begins, or as close to that date as the schedules of the league members permits, to allow for the most up to date info on injuries and availability.</StyledListItem><StyledListItem>Format: The draft is conducted in a snake format through fifteen rounds.</StyledListItem><StyledListItem>Draft Slot Selection: Two weeks before the draft is scheduled to occur, owners select their draft position. The order of selection is determined by a competition agreed upon by the league. Previous iterations included a league vote to determine the order, and most recently choosing teams in the LLWS, which could potentially become the standard method.</StyledListItem></StyledOrderedList></StyledTextArea>
            <SubtitleHolder>Article VI - Rosters</SubtitleHolder>
            <StyledTextArea><StyledOrderedList><StyledListItem>Active Roster: A team's active roster consists of fifteen player slots, with an additional injured reserve (IR) slot. The starting roster consists of nine player slots, outlined below:</StyledListItem><ul><StyledListItem>1 Quarterback (QB)</StyledListItem><StyledListItem>2 Running Backs (RB)</StyledListItem><StyledListItem>2 Wide Receivers (WR)</StyledListItem><StyledListItem>1 Tight End (TE)</StyledListItem><StyledListItem>1 Flex (RB/WR/TE)</StyledListItem><StyledListItem>1 Kicker (K)</StyledListItem><StyledListItem>1 Defense (DEF)</StyledListItem></ul><StyledListItem>Bench & IR: Each team has a bench of six players, plus an additional injured reserve slot (IR). Players are eligible to be placed on the IR if they are listed as O (Out), Injured Reserve (IR), or PUP (Physically Unable to Perform).</StyledListItem><StyledListItem>Roster Lock: Player lineup changes lock on a per-player basis, set for the start of each player’s individually scheduled game time. The roster will also be locked if the manager exceeds the allowed number of player slots, and the commissioner can lock a roster if the manager is breaking rules.</StyledListItem></StyledOrderedList></StyledTextArea>
            <SubtitleHolder>Article VII - Scoring</SubtitleHolder>
            <StyledTextArea><StyledOrderedList><StyledListItem>Passing:</StyledListItem><StyledTable border="1">
                <tr>
                    <th>Action</th>
                    <th>Points</th>
                </tr>
                <tr>
                    <td>Passing Yard (25 yards = 1 point)</td>
                    <td>0.04</td>
                </tr>
                <tr>
                    <td>Passing Touchdown</td>
                    <td>4</td>
                </tr>
                <tr>
                    <td>2-Pt Conversion</td>
                    <td>2</td>
                </tr>
                <tr>
                    <td>Interception</td>
                    <td>-2</td>
                </tr>
            </StyledTable><StyledListItem>Rushing:</StyledListItem><StyledTable border="1">
                    <tr>
                        <th>Action</th>
                        <th>Points</th>
                    </tr>
                    <tr>
                        <td>Rushing Yard (10 yards = 1 point)</td>
                        <td>0.1</td>
                    </tr>
                    <tr>
                        <td>Rushing Touchdown</td>
                        <td>6</td>
                    </tr>
                    <tr>
                        <td>2-Pt Conversion</td>
                        <td>2</td>
                    </tr>
                </StyledTable><StyledListItem>Receiving:</StyledListItem><StyledTable border="1">
                    <tr>
                        <th>Action</th>
                        <th>Points</th>
                    </tr>
                    <tr>
                        <td>Receiving Yard (10 yards = 1 point)</td>
                        <td>0.1</td>
                    </tr>
                    <tr>
                        <td>Reception</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>Receiving Touchdown</td>
                        <td>6</td>
                    </tr>
                    <tr>
                        <td>2-Pt Conversion</td>
                        <td>2</td>
                    </tr>
                </StyledTable><StyledListItem>Kicking:</StyledListItem><StyledTable border="1">
                    <tr>
                        <th>Action</th>
                        <th>Points</th>
                    </tr>
                    <tr>
                        <td>FG Made</td>
                        <td>3</td>
                    </tr>
                    <tr>
                        <td>Points per FG yard over 30</td>
                        <td>0.1</td>
                    </tr>
                    <tr>
                        <td>FG Missed</td>
                        <td>-1</td>
                    </tr>
                    <tr>
                        <td>PAT Made</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>PAT Missed</td>
                        <td>-1</td>
                    </tr>
                </StyledTable><StyledListItem>Defense:</StyledListItem><StyledTable border="1">
                    <tr>
                        <th>Action</th>
                        <th>Points</th>
                    </tr>
                    <tr>
                        <td>Defensive Touchdown</td>
                        <td>6</td>
                    </tr>
                    <tr>
                        <td>Points Allowed 0</td>
                        <td>10</td>
                    </tr>
                    <tr>
                        <td>Points Allowed 1-6</td>
                        <td>7</td>
                    </tr>
                    <tr>
                        <td>Points Allowed 7-13</td>
                        <td>4</td>
                    </tr>
                    <tr>
                        <td>Points Allowed 14-20</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>Points Allowed 21-27</td>
                        <td>0</td>
                    </tr>
                    <tr>
                        <td>Points Allowed 28-34</td>
                        <td>-1</td>
                    </tr>
                    <tr>
                        <td>Points Allowed 35+</td>
                        <td>-4</td>
                    </tr>
                    <tr>
                        <td>Sacks</td>
                        <td>1</td>
                    </tr>
                    <tr>
                        <td>Interceptions</td>
                        <td>2</td>
                    </tr>
                    <tr>
                        <td>Fumble Recovery</td>
                        <td>2</td>
                    </tr>
                    <tr>
                        <td>Safety</td>
                        <td>2</td>
                    </tr>
                    <tr>
                        <td>Blocked Kick</td>
                        <td>2</td>
                    </tr>
                    <tr>
                        <td>Special Teams TD</td>
                        <td>6</td>
                    </tr>
                    <tr>
                        <td>Special Teams Fumble Recovery</td>
                        <td>2</td>
                    </tr>
                </StyledTable><StyledListItem>Miscellaneous</StyledListItem><StyledTable border="1">
                    <tr>
                        <th>Action</th>
                        <th>Points</th>
                    </tr>
                    <tr>
                        <td>Fumble Lost</td>
                        <td>-2</td>
                    </tr>
                    <tr>
                        <td>Fumble Recovery TD</td>
                        <td>6</td>
                    </tr>
                    <tr>
                        <td>Special Teams Player TD</td>
                        <td>6</td>
                    </tr>
                    <tr>
                        <td>Special Teams Player Fumble Recovery</td>
                        <td>2</td>
                    </tr>
                </StyledTable></StyledOrderedList></StyledTextArea>
            <SubtitleHolder>Article VIII - Transactions</SubtitleHolder>
            <StyledTextArea><StyledOrderedList><StyledListItem>Waivers: Players are put on waivers when dropped (after being owned for more than 24 hours), or at the start of their game time. Players who are dropped remain on waivers for 2 days, after which time they become free agents. Game related waivers clear Wednesday morning at 3:05 AM ET (12:05 AM PT). Waiver order is determined on a rolling basis with the initial order being the reverse of the draft order. All waiver transactions are processed based on the current order of the waiver list. After each individual waiver transaction you move to the bottom of the list.</StyledListItem><StyledListItem>Trades: Trades process after both parties have accepted and after 2 days of league voting.  Trades can be overturned by the commissioner, but only in extremely rare cases where a trade cannot be reasonably defended as mutually beneficial from the perspective of both parties. Please see the Code of Conduct above. The trade deadline is Week 13.</StyledListItem><StyledListItem>Limitations: There is no limit to a team's roster acquisitions during the season. All teams may freely add or drop players following the annual league draft until rosters lock following Week 17, constituting the team's end-of-season roster.</StyledListItem></StyledOrderedList></StyledTextArea>
            <SubtitleHolder>Article IX - Amendments</SubtitleHolder>
            <StyledTextArea><StyledOrderedList><StyledListItem>Off-season Changes: Any owner may suggest rule modifications to the commissioner before the league's annual meeting. A simple majority vote of all owners may amend this constitution.</StyledListItem><StyledListItem>In-season Changes: The Commissioner may make in-season rule changes only in exceptional circumstances, with input from the Assistant to the Commissioner, and informed by league opinion.</StyledListItem></StyledOrderedList></StyledTextArea>
        </>
    );
};

const CenteredContainer = styled.div`
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
`;

const StyledTextArea = styled.div`
    display: flex;
    width: 100%;
    padding: 8px;
    margin-bottom: 10px;
`;

const TitleHolder = styled(CenteredContainer)`
    font-size: 40px;
`;

const SubtitleHolder = styled(CenteredContainer)`
    font-size: 32px;
`;

const CenteredTextWithPadding = styled(CenteredContainer)`
    padding: 8px 5%;
`;

// Styled component for the ordered list (ol)
const StyledOrderedList = styled.ol`
    list-style-type: decimal; /* You can change this to other list styles like 'disc' or 'none' */
    padding-left: 20px; /* Adjust the left padding as needed */
`;

// Styled component for list items (li)
const StyledListItem = styled.li`
    margin-bottom: 8px; /* Add spacing between list items */
    padding-right: 20px;
`;

const StyledTable = styled.table`
  caption-side: top;
  border: none;
  border-collapse: collapse;
  /* border-collapse: separate; */
  /* border-spacing: 5px 10px; */

  caption-side: bottom;
  /* empty-cell: show | hide;  */
  /* empty-cell is a property of table or the cells themselves */

  /* vertical-align: baseline | sub | super | text-top | 
                text-bottom | middle | top | bottom | 
                <percentage> | <length> */

  /* tbody {
    vertical-align: top;
  }              */
  td,
  th {
    border: none;
  }
  /* td,
  th {
    border: 1px solid;
  } */

  td {
    padding: 5px 10px;
  }

  tbody tr {
    :nth-of-type(odd) {
      background-color: #efefef;
    }
    :hover {
      background-color: lightpink;
    }
  }
  thead > tr {
    background-color: #c2c2c2;
  }
  caption {
    font-size: 0.9em;
    padding: 5px;
    font-weight: bold;
  }
`;