import { ArticleHeader } from "../../../components/newsletters/newsStyles";

const RealignmentArticle = () => {
  return (
    <div>
      <ArticleHeader>ATTENTION LEAGUE</ArticleHeader>
      <p>
        After a nail-biter of a vote, it has been determined that we will remain a 12-man league.
      </p>
      <p>
        While this league considers itself honorable, prestigious, and above reproach, we must also
        acknowledge a dark chapter in our history.
      </p>
      <p>
        Following our inaugural season, the then commissioner made the unilateral decision to remove
        several of the league's original inhabitants from their ancestral managerial spots in order
        to make room for an incoming wave of college friends. These displaced founding members were
        scattered to the winds, and for years their stories were conveniently omitted from the
        official league record.
      </p>
      <p>No longer.</p>
      <p>
        Going forward, we will recognize the original members whose sacrifice made the modern league
        possible. Any current manager occupying a roster spot obtained through this historic
        displacement will be required to deliver a formal Land Acknowledgement at the beginning of
        each season recognizing the manager who once inhabited that seat.
      </p>
      <p>But acknowledgement without action is meaningless.</p>
      <p>
        Therefore, as an act of reparations, William Brinkerhoff will officially be offered
        readmission to the league. William was an inaugural member who competed honorably before
        being forcibly displaced during the Great College Friend Expansion. He will be joining the
        Avon Division and moving Matt Rob into the Glizzy Division.
      </p>
      <p>
        Furthermore, all profitable gambling enterprises conducted under the Title IX operation will
        be transferred to William as restitution. All other league members are henceforth prohibited
        from personally profiting from said gambling operations.
      </p>
      <p>
        May this mark the beginning of healing, reconciliation, and, most importantly, another
        season of deeply irresponsible fantasy football decisions.
      </p>
    </div>
  );
};

const newsletterData = {
  newsDate: "2026-08-26",
  articles: [
    {
      id: 1,
      content: RealignmentArticle,
    },
  ],
  meta: {
    title: "2026 Realignment",
    description:
      "The league remains at 12 managers. Original displaced members will be formally recognized, and William Brinkerhoff is offered readmission as reparations. Matt Rob moves to the Glizzy Division.",
  },
};

export default newsletterData;
