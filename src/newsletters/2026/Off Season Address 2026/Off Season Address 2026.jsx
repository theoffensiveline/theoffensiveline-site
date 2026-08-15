import {
  ArticleHeader,
  ArticleSubheader,
  StyledButton,
} from "../../../components/newsletters/newsStyles";

const newsletterData = {
  newsDate: "2026-08-14",
  articles: [],
  meta: {
    title: "2026 Offseason Address",
    description: "The Commissioner's offseason address for the 2026 season.",
  },
};

const OffSeasonAddressArticle = () => {
  return (
    <div>
      <ArticleHeader>2026 Offseason Address</ArticleHeader>
      <p>Dear Fantasy Football Managers,</p>
      <p>
        I hope this letter finds you well! Last season was an exciting one, full of drama, close
        games, and as far as I remember, no gate-worthy controversy. I am excited to get started on
        the 2026 season!
      </p>
      <ArticleSubheader>Draft Order</ArticleSubheader>
      <p>
        It is that time of the year where we need to determine the draft order for drafting our
        leagues draft order. We will return to drafting LLWS teams. We will draft in reverse order
        of the final standing for last year.
      </p>
      <p>Devan, you are on the clock.</p>
      <ArticleSubheader>Draft Date and Time</ArticleSubheader>
      <p>
        A first for our league, the draft will occur in person this year over Labor Day weekend!
        Draft time is set in the sleeper app, and I am excited for the first in person draft! I
        appreciate everyone's flexibility in this matter.
      </p>
      <ArticleSubheader>League Changes</ArticleSubheader>
      <p>
        Let's continue to discuss any rule changes for our league in the discord. There are some
        changes that were proposed during last season that we will continue to discuss, and I'm sure
        we will have new proposals. Voting will begin shortly, but I don't see much changing from
        last year.
      </p>
      <ArticleSubheader>Punishment</ArticleSubheader>
      <p>
        This year, and for the foreseeable future, the punishment is for the loser of the league to
        make a song, with the loser of the toilet bowl featuring on that song.
      </p>
      <ArticleSubheader>MOTW</ArticleSubheader>
      <p>
        We will also see a change to MOTW for this season. Instead of the hotdog/shot bet, the
        standard MOTW bet will be $15 between the two managers in MOTW. If the two managers in MOTW
        want to make another bet to replace the $15 bet, they are able to do that. MOTW timeline for
        completion remains the same, and there will be less forgiveness now that this is self
        imposed.
      </p>
      <ArticleSubheader>League Member Updates</ArticleSubheader>
      <p>
        Attached you will find life updates from each league member. I hope that you appreciate
        these and learn something new about where our league members are in their lives - time is
        flying and we are scattered around. These are <em>a little</em> outdated now so anyone who
        would like to provide futher updates in the groupchat can do so.
      </p>
      <a
        href="./League%20Member%20Updates%202026"
        style={{ textDecoration: "none", display: "block", margin: "16px 0" }}
      >
        <StyledButton style={{ width: "100%" }}>Read League Member Updates 2026</StyledButton>
      </a>
      <p>
        I cannot wait for this next season to be upon us! Miss you all, and hope everything is going
        well!
      </p>
      <p>
        With Love,
        <br />
        Your Commissioner
        <br />
        Matthew Smith
      </p>
    </div>
  );
};

newsletterData.articles = [
  {
    id: 1,
    content: OffSeasonAddressArticle,
  },
];

export default newsletterData;
