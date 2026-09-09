import {
  ArticleCaption,
  ArticleHeader,
  ArticleImage,
  ArticleSubheader,
  LeagueQuote,
} from "../../../components/newsletters/newsStyles";

const PostDraftRecapArticle = () => {
  return (
    <div>
      <ArticleHeader>2026 Post Draft Recap</ArticleHeader>
      <p>
        Getting to draft in-person with nearly every league member was a first for this league, and
        it led to some crazy moments. There were surprising picks, sleeping drafters, and third
        party hardware and software involved in making picks.
      </p>
      <ArticleSubheader>Greg's Draft</ArticleSubheader>
      <p>
        The man of the hour, Greg, was asleep at the wheel for the majority of the draft. This was
        remarkable to see in person, as usually we can at least pretend it isn't happening when
        we're drafting online. How much will Greg owe Shane if he ends up making the championship?
        Maybe he will get him a bottle of Tito's.
      </p>
      <ArticleSubheader>Jake and Will</ArticleSubheader>
      <p>
        Our two remote drafters were back-to-back on the turn, which made putting their picks up on
        the board easy. This also had them competing for the same players. They both built out good
        squads, and Jake did not end up reaching for Josh Allen at the 14th overall pick.
      </p>
      <ArticleSubheader>Walter's Take on the Draft</ArticleSubheader>
      <p>
        As always, we will present our playoff odds and team strengths/weaknesses based on the draft
        results, courtesy of our Lead Analyst Walter.
      </p>
      <ArticleImage src="https://i.imgur.com/jLOvPML.png" />
      <ArticleCaption>WalterPicks Playoff Picture</ArticleCaption>
      <p>
        Of course Walter loved the draft of the team who used Walter to draft, but the next highest
        playoff odds belongs to First Down Syndrome and The Uncs. Outside of those 3 teams, nobody
        has over 50% playoff odds after the draft. The lowest playoff odds belong to Mothers United,
        with weaknesses at QB, RB, and TE due to drafting 7 WRs and 3 RBs in the first 10 rounds.
      </p>
      <ArticleImage src="https://i.imgur.com/vJKu5kf.png" />
      <ArticleCaption>WalterPicks Strength and Weaknesses</ArticleCaption>
      <p>
        As discussed above, Mothers United has the #1 WR room, but is 11th or 12th in every other
        position group. They might want to consider trading with Greg Killed Devan or The Uncs, who
        are 11th and 12th in WR strength.
      </p>
      <ArticleImage src="https://i.imgur.com/ZlWvN61.png" />
      <ArticleCaption>Justin Beer Depth Strength</ArticleCaption>
      <p>
        Part of the reason for Justin Beer having the highest playoff odds is that they are top 3 in
        depth at every position, highlighting the late round talent they picked up thanks to the
        WalterPicks app.
      </p>
    </div>
  );
};

const LeagueBuzzArticle = () => {
  return (
    <div>
      <ArticleHeader>League Buzz</ArticleHeader>
      <ArticleSubheader>Submissions</ArticleSubheader>
      <LeagueQuote>
        "Fleeced" <br /> - Trevor
      </LeagueQuote>
      <p>Fleeced counter - 1</p>
    </div>
  );
};

const MemeArticle = () => {
  return (
    <div>
      <ArticleImage src="https://i.imgur.com/60q2nhK.png" />
      <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
    </div>
  );
};

const MemeArticle2 = () => {
  return (
    <div>
      <ArticleImage src="https://i.imgur.com/KUgdS7H.png" />
      <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
    </div>
  );
};

const MemeArticle3 = () => {
  return (
    <div>
      <ArticleImage src="https://i.imgur.com/L9IyAO5.png" />
      <ArticleCaption>Submitted by Jake</ArticleCaption>
    </div>
  );
};

const MemeArticle4 = () => {
  return (
    <div>
      <ArticleImage src="https://i.imgur.com/Rm557r6.png" />
      <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
    </div>
  );
};

const MemeArticle5 = () => {
  return (
    <div>
      <ArticleImage src="https://i.imgur.com/eXDQ0Qg.png" />
      <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
    </div>
  );
};

const MemeArticle6 = () => {
  return (
    <div>
      <ArticleImage src="https://i.imgur.com/EV2Cdq5.png" />
      <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
    </div>
  );
};

const newsletterData = {
  newsDate: "2026-09-09",
  articles: [
    {
      id: 1,
      content: PostDraftRecapArticle,
    },
    {
      id: 2,
      content: LeagueBuzzArticle,
    },
    {
      id: 3,
      content: MemeArticle,
    },
    {
      id: 4,
      content: MemeArticle2,
    },
    {
      id: 5,
      content: MemeArticle3,
    },
    {
      id: 6,
      content: MemeArticle4,
    },
    {
      id: 7,
      content: MemeArticle5,
    },
    {
      id: 8,
      content: MemeArticle6,
    },
  ],
  meta: {
    title: "2026 Post Draft Recap",
    description: "Recap of the 2026 draft.",
  },
};

export default newsletterData;
