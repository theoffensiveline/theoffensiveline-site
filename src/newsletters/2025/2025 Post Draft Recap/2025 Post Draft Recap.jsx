import {
  ArticleCaption,
  ArticleHeader,
  ArticleImage,
  ArticleSubheader,
  LeagueQuote,
} from "../../../components/newsletters/newsStyles";

export const newsDate = "2025-09-04";

const PostDraftRecapArticle = () => {
  return (
    <div>
      <ArticleHeader>2025 Post Draft Recap</ArticleHeader>
      <p>
        'Twas the night before kickoff, and all through the draft, not a creature was stirring, not even Tucker Kraft. This is a recap of the 2025 draft, which might have been our most eventful draft yet. We had some people come in extremely prepared, and others who were not prepared at all. There were a lot of surprising picks and guys that dropped well past their ADP. Some teams had bold strategies, and others just took the best players available. Read about all that and more in your favorite publication.
      </p>
      <ArticleSubheader>Setting up for our first back-to-back loser</ArticleSubheader>
      <p>
        Alec, who REALLY sucks at fantasy football, kept his track record during this draft when he drafted a backup running back in the 7th round, Kyle Pitts in the 8th round, and Javonte Williams in the 9th round. All 3 of these picks were immediately shit on by the group. We will see if this draft sets Alec up for back-to-back punishments, but he doesn't seem too worried about even doing it; in fact, he seems to be somewhat excited about it.
      </p>
      <ArticleSubheader>Last Year's MotW Impacting This Year's Draft</ArticleSubheader>
      <p>
        At the end of last year, Josh lost the final MotW against Nikhil. He never submitted a video for this punishment, and it grew exponentially over the course of the offseason. As punishment, the group allowed him to do 5 shots right at the start of this year's draft. This was a full cup of liquor at once, and then Josh had to draft his team. Josh proceeded to draft 6 WRs in the first 8 rounds, more on that later.
      </p>
      <ArticleSubheader>Even More Dangerous Drafter</ArticleSubheader>
      <p>
        Despite having someone drafting with a record high BAC, we had someone even more dangerous in our draft this year. Nikhil was actively driving and drafting, according to his prior claim of being "unable to draft because he would be driving". Despite this claim, Nikhil came online and made every pick and made it out with a decent team. His pick of Omarion Hampton was a controversial one among the group, but he has a strong team top to bottom and should be a contender this year. Good thing he didn't autodraft and get stuck with Joe Mixon and Brian Robinson as his RB1 and RB2.
      </p>
      <ArticleSubheader>Walter's Take on the Draft</ArticleSubheader>
      <p>
        WalterPicks added a playoff odds calculator late last season, and it can help us grade the drafts of everyone in the league. We've also got strengths and weaknesses for every team, which we will get to later.
      </p>
      <ArticleImage src="https://i.imgflip.com/a54mzu.jpg" />
      <ArticleCaption>WalterPicks Playoff Picture</ArticleCaption>
      <p>
        You can see here that WalterPickens has the best odds to make the playoffs, followed by Twin Towers, Costo Guys, and Giving Me a Chubb. Then there are 4 more teams with around 50% playoff odds: TBD, The Barkley Brawlers, Fortnite Master Builder, and Calvin's Cold Streak. Then there are the bottom feeders, First Down Syndrome, Strange Brown Nabers, BBCU, and Just Joshin The 3rd. Just Joshin The 3rd has the lowest playoff odds of any team, as the league would've guessed after their previously covered abysmal draft.
      </p>
      <ArticleImage src="https://i.imgflip.com/a54o5k.jpg" />
      <ArticleCaption>Strange Brown Nabers Strength and Weaknesses</ArticleCaption>
      <p>
        We mentioned earlier that Strange Brown Nabers drafted 6 WRs in the first 8 rounds. That draft strategy helped them earn the best grade for WR for both their starters and their depth from WalterPicks. Sadly this left them at the bottom of the rankings for every other position. They will likely be looking to make some trades in the coming weeks to improve their roster construction.
      </p>
    </div >
  );
};

const LeagueBuzzArticle = () => {
  return (
    <div>
      <ArticleHeader>League Buzz</ArticleHeader>
      <ArticleSubheader>Submissions</ArticleSubheader>
      <LeagueQuote>
        "penis" <br /> - penis
      </LeagueQuote>
      <LeagueQuote>
        "I missed mr memes." <br /> - Ant
      </LeagueQuote>
      <p>
        Yes, yes you did.
      </p>
      <LeagueQuote>
        "Alec, Anthony, & Josh are in a race to be the next American Idol" <br /> - Anonymous League Manager
      </LeagueQuote>
      <p>
        Tea, Walter somewhat agrees with this submission.
      </p>
      <LeagueQuote>
        "Fun fact: with the right app, you can stream mirror sleeper to your CarPlay." <br /> - Nikhil
      </LeagueQuote>
      <p>
        Maybe he wasn't the most dangerous driver on the road after all, but still seems pretty rough.
      </p>
    </div>
  );
};

const MemeArticle = () => {
  return (
    <div>
      <ArticleImage src="https://i.imgflip.com/a54lw8.jpg" />
      <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
    </div>
  );
};

const MemeArticle2 = () => {
  return (
    <div>
      <ArticleImage src="https://i.imgflip.com/a54p46.jpg" />
      <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
    </div>
  );
};

const MemeArticle3 = () => {
  return (
    <div>
      <ArticleImage src="https://i.imgflip.com/a54pes.jpg" />
      <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
    </div>
  );
};

const MemeArticle4 = () => {
  return (
    <div>
      <ArticleImage src="https://i.imgflip.com/a54pn7.jpg" />
      <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
    </div>
  );
};

const MemeArticle5 = () => {
  return (
    <div>
      <ArticleImage src="https://i.imgflip.com/a54psy.jpg" />
      <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
    </div>
  );
};

const MemeArticle6 = () => {
  return (
    <div>
      <ArticleImage src="https://i.imgflip.com/a54pz0.jpg" />
      <ArticleCaption>Submitted by The Offensive Line</ArticleCaption>
    </div>
  );
};

export const articles = [
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
];
