import styled from "styled-components";
import { ArticleHeader } from "../../../components/newsletters/newsStyles";

const QABlock = styled.div`
  margin-bottom: 14px;
  padding-left: 12px;
  border-left: 2px solid ${({ theme }) => theme.newsBlue};
`;

const Question = styled.p`
  font-style: italic;
  font-size: 13px;
  margin: 0 0 4px 0;
  color: ${({ theme }) => theme.text};
  opacity: 0.85;
`;

const Answer = styled.p`
  font-weight: 500;
  font-size: 15px;
  margin: 0;
  line-height: 1.5;
`;

const MemberDivider = styled.hr`
  border: none;
  border-top: 1px solid ${({ theme }) => theme.text}33;
  margin: 24px 0;
`;

const MemberQA = ({ question, answer }) => (
  <QABlock>
    <Question>{question}</Question>
    <Answer>{answer}</Answer>
  </QABlock>
);

const MemberUpdate = ({ name, answers, isLast }) => {
  const questions = [
    "1. If your name is Devan, are you still alive?",
    "2. Where are you living these days? City and neighborhood, and did you move in the last year?",
    "3. What's your job situation? Company, role, and whether it's new since last season.",
    "4. Relationship status: Any changes since last year?",
    "5. Any new additions to the family?",
    "6. Biggest trip you took this year — where'd you go and who with?",
    "7. Any upcoming trips?",
    "8. What's taking up your time?",
    "9. Who do you think will lose the league this year?",
    "10. Anything else you want the league to know?",
  ];
  return (
    <div>
      <ArticleHeader>{name}</ArticleHeader>
      {questions.map((q, i) => (
        <MemberQA key={i} question={q} answer={answers[i]} />
      ))}
      {!isLast && <MemberDivider />}
    </div>
  );
};

const NikhilArticle = () => (
  <MemberUpdate
    name="Nikhil"
    isLast={false}
    answers={[
      "Negative",
      "Boston for now",
      "New: Principal robotics software engineer",
      "No change to report",
      "My plants have died",
      "Work trip to the UK",
      "AUSTRALIA",
      "Games (both video and board) and volleyball",
      "Me",
      "RIP Devan",
    ]}
  />
);

const JakeArticle = () => (
  <MemberUpdate
    name="Jake"
    isLast={false}
    answers={[
      "N/A",
      "Geneseo NY",
      "Same Job",
      "Engaged",
      "No",
      "Disney with the whole family!",
      "No",
      "Soccer, Video Games, Sports Cards",
      "Trevor",
      "Hi \u2764\ufe0f",
    ]}
  />
);

const JoshLittleArticle = () => (
  <MemberUpdate
    name="Josh Little"
    isLast={false}
    answers={[
      "I think he's dead and Emily hijacked his socials",
      "I live in Park Ave, Rochester, I'm moving soon to another apartment on Park Ave soon",
      "My company was purchased last year and I was lucky to get hired on to the new company as a Service Desk Manager, associate 2.",
      "I'm dating Kate, she's pretty cool.",
      "Negative, just growing my beer belly",
      "I went to Las Vegas with my family for the Raiders Broncos game, and ran the Hoover Dam half marathon.",
      "Washington D.C for a Nationals Game and other things",
      "I've been playing the new resident evil game, Apex, and Siege. Trying to learn the guitar too.",
      "Probably Alec, but hopefully someone new like Greg",
      "Suggestion: I know making a good video is fun, but it's not fun if everyone is late on them. I think there should be a fine enforced for late videos by commish, that goes to league fund.",
    ]}
  />
);

const AlecArticle = () => (
  <MemberUpdate
    name="Alec"
    isLast={false}
    answers={[
      "N/A",
      "A nice house on a quiet dead end street in NH - this will be my 3rd year here",
      "I'm a project manager at BAE - I heard Cats",
      "3 years with Siobhan",
      "I have a sick garden",
      "Japan - October 2025 with friends",
      "Ireland. In July.",
      "Too many",
      "Probably me",
      "Check your balls for lumps - I had a scare (I'm okay)",
    ]}
  />
);

const MattRobArticle = () => (
  <MemberUpdate
    name="Matt Rob"
    isLast={false}
    answers={[
      "I'm not Devan. Hope he's alive though.",
      "Henrietta NY. Built house and moved in on 09 June 2025",
      "Salesforce - Senior Incident Responder (same)",
      "Single. Kiara and I broke up end of Jan / early Feb. I'm in shambles.",
      "Nala is new as of the middle of last year. She's almost a year old now. She's a Pure Bred Working Line German Shepherd.",
      "All my PTO this year has been to decompress at home. Mental health is struggling.",
      "No upcoming trips.",
      "Nala takes up just about all my time.",
      "Good question. Hard to say, but have to put money on Dev, just because he's been so inactive, that I think he won't pay attention much.",
      "No.",
    ]}
  />
);

const DevanArticle = () => (
  <MemberUpdate
    name="Devan"
    isLast={false}
    answers={[
      "Devdawg is alive and well. Been so damn busy, life, work, hobbies etc, working on being better with my phone lol",
      "Moved in with Emily (girlfriend you've met before) last February here in good ole Binghamton NY and started a new job (Quality Engineer) at George Industries (make chassis for aerospace/defense industry).",
      "Going off of #2, I was QE for 8 months, promoted to Supplier Quality in January, then took over director of QA temporarily for 3 months since my boss was fired in February. Negotiating a new salary currently given my role has completely changed and I'm wearing a lot of hats.",
      "Still with Em, plans to propose coming soon \uD83D\uDC40",
      "We are an anti pet household lol but we love our friends who have them \uD83D\uDC36",
      "Trip to Orlando FL for Em's best friends wedding and we had a blast. Went to Universal and felt like a kid again. Airbnb on a golf course and really couldn't ask for anything more.",
      "No trips planned currently, just the lake in the summertime most weekends and the occasional trip to Cuse to see the boys and family.",
      "Being a homeowner is way more work than I thought, lot of time and energy into it. Hobbies (still playing rec sports). Work nowadays has been a lot. Plans out the wazoo with Em's fam or the fellas or doing house projects.",
      "I hope Alec loses this year.",
      "Missing all the boys. Wish we could go back to the days where we went to volleyball and then the landing strip...wish I had a better PTO schedule because I'd love to get together with the fellas soon and catch up. I haven't forgot about the punishment but please someone send me exactly what it is I have to do lol because I forget all the rules/regs of it. Finally, you won't catch me losing ever again. Coming for 1st next season.",
    ]}
  />
);

const TrevorArticle = () => (
  <MemberUpdate
    name="Trevor"
    isLast={false}
    answers={[
      "No",
      "Buffalo, same place west side, looking to move to elmwood village",
      "Still at WalterPicks, just got big raise and new 5 year equity agreement",
      "Dating, ring shopping for engagement which will likely be by the end of the year or early next year",
      "We got a cat named Linus in January",
      "Going to Seattle this week to visit Anthony, other than that the draft for work",
      "Going to Florida and Cape Cod for work, likely a tropical vacation in winter but unplanned rn",
      "TrevorSolves has been fun to build up, just hit 1k followers on TikTok",
      "Alec but I hope Anthony",
      "The Offensive Line is sick and we need to get people using it outside of us, maybe another TikTok channel is needed.",
    ]}
  />
);

const KyleArticle = () => (
  <MemberUpdate
    name="Kyle"
    isLast={false}
    answers={[
      "N/A",
      "Corn Hill in Rochester, NY and yes I did move",
      "PhD Student in Biomedical Engineering, no change",
      "Dating, no changes other than moving in together in August 2025",
      "New pet, Stevie a 4 month old rescue puppy (breed unconfirmed, suspected Australian shepherd/border collie/other)",
      "Charlotte, NC for a conference with my lab",
      "DC for another conference and then Arizona for a bachelor party",
      "School work unfortunately takes a lot of time up, other than that playing tennis and basketball for fun and the puppy takes up a lot of time right now too.",
      "Devan if he is alive and even plays",
      "N/A",
    ]}
  />
);

const JoshKArticle = () => (
  <MemberUpdate
    name="Josh K"
    isLast={false}
    answers={[
      "N/A",
      "Astoria, the beating heart of Mamdanistan. Will be making an in-neighborhood move at the end of the month.",
      "Still SW engineering at MLB",
      "Single",
      "In the process of building a robot",
      "Multi continental trip w/ Tony and food poisoning",
      "Nothing planned, but will be re-evaluating soon",
      "Gym + practicing piano/guitar freestyling",
      "This is Alec's year to lose. Devan's autodraft is gonna cook.",
      "Mike Vrabel innocent.",
    ]}
  />
);

const AnthonyArticle = () => (
  <MemberUpdate
    name="Anthony"
    isLast={false}
    answers={[
      "N/A",
      "Seattle at Greenlake. I moved last September and loveeee where I am now.",
      "Still at Salesforce doing my fake job",
      "Single",
      "N/A",
      "I went to Japan with 5 friends and it was fucking lit. I also went to Hawaii and Thailand in my recent life. Thailand was epic. Also went to Tunisia with Josh which was so fun.",
      "Griztronics at the Gorge soon. Weekend EDM festival with tons of friends.",
      "Running, climbing, random debauchery, general outdoor activities",
      "Alec",
      "I'm very excited to see everyone in September :)",
    ]}
  />
);

const MattSmithArticle = () => (
  <MemberUpdate
    name="Matt Smith"
    isLast={false}
    answers={[
      "N/A",
      "Just moved into an apartment in a neighborhood called Mueller in Austin. First time living alone, excited for that.",
      "Currently partaking in a hostile RIT takeover of Salesforce",
      "Single, broke up with Peggy back in February",
      "Plants are thriving for the most part. Want to get a dog but also seems like a lot of work.",
      "Trip to Big Bend with my Dad, did a big hike there and then continued on to White Sands National Park, Guadalupe Mountains National Park, and Carlsbad Caverns.",
      "Visiting family on Long Island in July, nothing else planned besides trips for Gregothy.",
      "Playing Hockey and Volleyball, going to a decent number of concerts, watching Attack on Titan right now, kinda learning the guitar.",
      "I think Greg will lose the league this year.",
      "I want the league to know that Nikhil is a fraud and bad at Fantasy football.",
    ]}
  />
);

const GregArticle = () => (
  <MemberUpdate
    name="Greg"
    isLast={true}
    answers={[
      "No",
      "Medford MA",
      "BAE Systems, MFG ENG same role",
      "Engaged",
      "No kids or pets",
      "Alaska with Hannah",
      "Tulum, St Lucia and Italy or Greece",
      "League of Legends, Sopranos, School",
      "Matt",
      "No.",
    ]}
  />
);

const IntroArticle = () => {
  return (
    <div>
      <ArticleHeader>Offseason 2026 Questionnaire / Devan Wellness Check</ArticleHeader>
      <p>
        I hope you enjoy these little peaks into each other's lives! Life gets busy and it's hard to
        keep up with everyone.
      </p>
    </div>
  );
};

const newsletterData = {
  newsDate: "2026-08-14",
  articles: [
    { id: 1, content: IntroArticle },
    { id: 2, content: NikhilArticle },
    { id: 3, content: JakeArticle },
    { id: 4, content: JoshLittleArticle },
    { id: 5, content: AlecArticle },
    { id: 6, content: MattRobArticle },
    { id: 7, content: DevanArticle },
    { id: 8, content: TrevorArticle },
    { id: 9, content: KyleArticle },
    { id: 10, content: JoshKArticle },
    { id: 11, content: AnthonyArticle },
    { id: 12, content: MattSmithArticle },
    { id: 13, content: GregArticle },
  ],
  meta: {
    title: "League Member Updates 2026",
    description: "Life updates from each league member ahead of the 2026 season.",
  },
};

export default newsletterData;
