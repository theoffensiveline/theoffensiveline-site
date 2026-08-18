import { ArticleHeader } from "../../../components/newsletters/newsStyles";

const BreakingNewsArticle = () => {
  return (
    <div>
      <ArticleHeader>BREAKING NEWS</ArticleHeader>
      <p>
        For the first time since our 2022 re-alignment, the league will see a franchise close its
        doors.
      </p>
      <p>
        Despite the league remaining incredibly profitable, with revenues exceeding projections year
        after year, it has become increasingly clear that Binghamton is simply not a viable Title IX
        Fantasy Football market.
      </p>
      <p>
        It is therefore with great sadness that I announce Bye Week Curious will not be returning
        for the 2026 season.
      </p>
      <p>
        May we not remember his time in this league for his absence, lack of engagement, or general
        disinterest. Instead, let us remember him for what truly defined his franchise:
      </p>
      <p style={{ textAlign: "center", fontStyle: "italic" }}>
        Being absolutely terrible at fantasy football.
      </p>
      <p>As one chapter closes, another begins.</p>
      <p>
        We now turn the ship around, put the wind at our backs, and begin the search for the next
        great Title IX franchise owner. At this time, the two leading candidates to replace Bye Week
        Curious are:
      </p>
      <ul>
        <li>Matthew Huffman</li>
        <li>Chris Pursley</li>
      </ul>
      <p>
        Given the short notice, and, more importantly, with league revenue in mind, I would propose
        that one of these candidates immediately assume control of the vacant franchise, while the
        other and a third candidate to be named are offered expansion franchises for the 2026
        season.
      </p>
      <p>More owners. More entry fees. More revenue. It's just good business.</p>
      <p>
        Please use the group chat to provide thoughts, concerns, endorsements, character
        assassinations, and/or competing proposals. If necessary, we will bring the matter to a
        formal league vote.
      </p>
      <p style={{ fontWeight: "bold", textAlign: "center" }}>
        The Title IX Fantasy Football League remains open for business.
      </p>
    </div>
  );
};

const newsletterData = {
  newsDate: "2026-08-18",
  articles: [
    {
      id: 1,
      content: BreakingNewsArticle,
    },
  ],
  meta: {
    title: "2026 Breaking News",
    description:
      "Bye Week Curious will not return for the 2026 season. The search for the next Title IX franchise owner begins.",
  },
};

export default newsletterData;
