import React from 'react';
import { exampleHeader } from '../components/newsStyles';

export const articles = [
    {
        id: 1,
        title: 'Article 1',
        content: (
            <div>
                <exampleHeader>This is the Title of Article 1</exampleHeader>
                <img src="https://picsum.photos/800/300" alt="Article 1" />
                <p>
                    This is the content of Article 1. It can include text, images, and other elements.
                </p>
            </div>
        ),
    },
    {
        id: 2,
        title: 'Article 2',
        content: (
            <div>
                <h2>This is the Title of Article 2</h2>
                <img src="https://picsum.photos/400/400" alt="Article 2" />
                <p>
                    This is the content of Article 2. It can include text, images, and other elements.
                </p>
            </div>),
    },
    {
        id: 3,
        title: 'Article 3',
        content: (
            <div>
                <h2>This is the Title of Article 3</h2>
                <img src="https://picsum.photos/900/600" alt="Article 3" />
                <p>
                    This is the content of Article 3. It can include text, images, and other elements.
                </p>
            </div>
        ),
    },
];

