import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import * as NewsStyles from '../components/newsStyles';

function formatDate(inputDate) {
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        timeZone: 'UTC',
    };
    const date = new Date(inputDate + 'T00:00:00Z'); // Add time and UTC timezone
    return date.toLocaleDateString(undefined, options);
}

export const TeamContext = React.createContext(
    {
        selectedTeam: null,
        setSelectedTeam: () => { },
    }
);

function Newsletter() {
    const currentLocation = useLocation();
    const { issue } = currentLocation.state;
    const [content, setContent] = useState(null);

    const [selectedTeam, setSelectedTeam] = useState(null);

    useEffect(() => {
        const loadContent = async () => {
            // Dynamically import the content based on the issue name
            const module = await import(`../newsletters/${issue}/${issue}.jsx`);
            setContent(module); // Set the default export from the module
        };

        loadContent();
    }, [issue]);

    return (
        <TeamContext.Provider value={{ selectedTeam: selectedTeam, setSelectedTeam: setSelectedTeam }}>
            <NewsStyles.NewsletterContainer>
                <NewsStyles.NewsletterTitle>The Offensive Line</NewsStyles.NewsletterTitle>
                <NewsStyles.DateBar>
                    {content && formatDate(content.newsDate)}
                </NewsStyles.DateBar>
                <div>

                    {content ? (
                        <ResponsiveMasonry columnsCountBreakPoints={{ 500: 1, 1000: 2, 1500: 3, 2000: 4, 2500: 5 }}>
                            <Masonry>
                                {content.articles.map((article) => (
                                    <NewsStyles.ArticleBlock as="div" key={article.id}>
                                        <article.content />
                                    </NewsStyles.ArticleBlock>
                                ))}
                            </Masonry>
                        </ResponsiveMasonry>
                    ) : (
                        <p>Loading...</p>
                    )}

                </div>
            </NewsStyles.NewsletterContainer>
        </TeamContext.Provider >
    );
}

export default Newsletter;
