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



function NewsletterPage() {
    const currentLocation = useLocation();
    const { issue } = currentLocation.state;
    const [content, setContent] = useState(null);

    useEffect(() => {
        const loadContent = async () => {
            try {
                // Dynamically import the content based on the issue name
                const module = await import(`../newsletters/${issue}/${issue}.jsx`);
                setContent(module); // Set the default export from the module
            } catch (error) {
                console.error('Error loading newsletter content:', error);
                setContent([]); // Handle the error gracefully
            }
        };

        loadContent();
    }, [issue]);

    return (
        <NewsStyles.NewsletterContainer>
            <NewsStyles.NewsletterTitle>The Offensive Line</NewsStyles.NewsletterTitle>
            <NewsStyles.DateBar>
                {content && formatDate(content.newsDate)}
            </NewsStyles.DateBar>
            <div>
                {content ? (
                    <ResponsiveMasonry columnsCountBreakPoints={{ 600: 1, 1200: 2, 1800: 3, 2400: 4, 3000: 5 }}>
                        <Masonry>
                            {content.articles.map((article) => (
                                <NewsStyles.ArticleBlock as="div" key={article.id}>
                                    {article.content}
                                </NewsStyles.ArticleBlock>
                            ))}
                        </Masonry>
                    </ResponsiveMasonry>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </NewsStyles.NewsletterContainer>
    );
}

export default NewsletterPage;
