import React from 'react';

export const articles = [  // Export the articles as a named export
    {
        id: 2,
        title: 'Article 2',
        content: (
            <div>
                <h2>This is the Title of Article 1</h2>
                <img src="https://picsum.photos/200/300" />
                <p>
                    This is the content of Article 1. It can include text, images, and
                    other elements.
                </p>
            </div>
        ),
    },
    {
        title: 'Article 2',
        content: (
            <div>
                <h2>This is the Title of Article 2</h2>
                <img src="https://picsum.photos/400/400" />
                <p>
                    This is the content of Article 2. It can include text, images, and
                    other elements.
                </p>
            </div>),
    },
    {
        title: 'Article 3',
        content: (
            <div>
                <h2>This is the Title of Article 3</h2>
                <img src="https://picsum.photos/900/600" />
                <p>
                    This is the content of Article 3. It can include text, images, and
                    other elements.
                </p>
            </div>
        ),
    },
    // Add more articles with JSX content as needed
];