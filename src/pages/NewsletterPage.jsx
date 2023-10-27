import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';
import Masonry, { ResponsiveMasonry } from 'react-responsive-masonry';
import styled from 'styled-components';

// broken

const ArticleBlock = styled.div`
    padding: 8px;
    margin: 4px; 
    text-align: justify; // justify content only with more than 2 columns?
`;

function NewsletterPage() {
    const currentLocation = useLocation();
    const { issue } = currentLocation.state;
    const [content, setContent] = useState(null);

    useEffect(() => {
        const loadContent = async () => {
            try {
                // Dynamically import the content based on the issue
                const module = await import(`../newsletters/${issue}`);
                setContent(module.articles);
            } catch (error) {
                console.error('Error loading newsletter content:', error);
                setContent([]); // Handle the error gracefully
            }
        };

        loadContent();
    }, [issue]);

    return (
        <div>
            <h1>Newsletter Page</h1>
            <div>
                <h2>Newsletter {issue}</h2>
                {content ? (
                    // ugly af
                    <ResponsiveMasonry columnsCountBreakPoints={{ 600: 1, 1200: 2, 1800: 3 }}>
                        <Masonry>
                            {content.map((article) => (
                                <ArticleBlock as="div" key={article.id}>
                                    {article.content}
                                </ArticleBlock>
                            ))}

                        </Masonry>
                    </ResponsiveMasonry>
                ) : (
                    <p>Loading...</p>
                )}
            </div>
        </div>
    );
}

export default NewsletterPage;
