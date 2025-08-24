import { ArticleHeader, ArticleSubheader } from '../../../components/newsletters/newsStyles';
import TikTokEmbed from '../../../components/shared/TikTokEmbed';

export const newsDate = '2025-08-22';

const ChallengeResultsArticle = () => {
    return (
        <div>
            <ArticleHeader>2025 Draft Order Announcement</ArticleHeader>
            <ArticleSubheader>Good luck to everyone in the draft!</ArticleSubheader>
            <TikTokEmbed videoId="7541441373958901047" />
        </div>
    );
};

export const articles = [
    {
        id: 1,
        content: ChallengeResultsArticle,
    },
];
