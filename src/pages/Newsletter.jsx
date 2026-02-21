import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Helmet } from "react-helmet";
import * as NewsStyles from "../components/newsletters/newsStyles";

function formatDate(inputDate) {
  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  };
  const date = new Date(inputDate + "T00:00:00Z"); // Add time and UTC timezone
  return date.toLocaleDateString(undefined, options);
}

export const TeamContext = React.createContext({
  selectedTeam: null,
  setSelectedTeam: () => {},
});

function Newsletter() {
  const { issue: encodedIssue } = useParams();
  const issue = decodeURIComponent(encodedIssue);
  const [content, setContent] = useState(null);

  const [selectedTeam, setSelectedTeam] = useState(null);

  useEffect(() => {
    const loadContent = async () => {
      // Map the issue name to the correct folder path
      let folderPath = issue;

      // Handle different newsletter types
      if (issue.includes("WP Week")) {
        // Walter Picks newsletters
        folderPath = `WalterPicks/${issue}`;
      } else if (issue.includes("2025")) {
        // 2025 newsletters
        folderPath = `2025/${issue}`;
      } else if (issue.includes("2024")) {
        // 2024 newsletters
        folderPath = `2024/${issue}`;
      } else if (issue.includes("2023")) {
        // 2023 newsletters
        folderPath = `2023/${issue}`;
      }

      // Dynamically import the content based on the mapped path
      const module = await import(`../newsletters/${folderPath}/${issue}.jsx`);
      let newsletterData = module.default;
      if (!newsletterData) {
        // Backward compatibility for old newsletter format
        newsletterData = { newsDate: module.newsDate, articles: module.articles };
      }
      setContent(newsletterData); // Set the newsletter data
    };

    loadContent();
  }, [issue]);

  return (
    <TeamContext.Provider value={{ selectedTeam: selectedTeam, setSelectedTeam: setSelectedTeam }}>
      <Helmet>
        <title>{content?.meta?.title || `${issue}`}</title>
        <meta property="og:title" content={content?.meta?.title || `${issue}`} />
        <meta
          property="og:description"
          content={content?.meta?.description || `Read the latest newsletter issue: ${issue}`}
        />
        <meta
          property="og:image"
          content={
            content?.meta?.image
              ? content.meta.image.startsWith("http")
                ? content.meta.image
                : `${window.location.origin}${content.meta.image}`
              : `${window.location.origin}/banner_logo.png`
          }
        />
        <meta property="og:url" content={window.location.href} />
      </Helmet>
      <NewsStyles.NewsletterContainer>
        <NewsStyles.NewsletterTitle>The Offensive Line</NewsStyles.NewsletterTitle>
        <NewsStyles.DateBar>{content && formatDate(content.newsDate)}</NewsStyles.DateBar>
        <div>
          {content ? (
            <div>
              {content.articles.map((article) => (
                <NewsStyles.ArticleBlock as="div" key={article.id}>
                  <article.content />
                </NewsStyles.ArticleBlock>
              ))}
            </div>
          ) : (
            <p>Loading...</p>
          )}
        </div>
      </NewsStyles.NewsletterContainer>
    </TeamContext.Provider>
  );
}

export default Newsletter;
