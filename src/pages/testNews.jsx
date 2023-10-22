import React from "react";
import Masonry, { ResponsiveMasonry } from "react-responsive-masonry";
import styled from "styled-components"; // Import styled from styled-components


const ArticleBlock = styled.div`
    padding: 20px;
    border: 1px solid #ccc; /* Optional: Add a border for better separation */
    border-radius: 8px; /* Optional: Add rounded corners */
    margin: 10px; /* Optional: Add margin between articles */
`;

export default function Newspaper() {
    // Define an array of articles
    const articles = [
        {
            title: "Article 1",
            content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
        },
        {
            title: "Article 2",
            content: "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo."
        },
        {
            title: "Article 3",
            content: "But I must explain to you how all this mistaken idea of denouncing pleasure and praising pain was born and I will give you a complete account of the system, and expound the actual teachings of the great explorer of the truth, the master-builder of human happiness. No one rejects, dislikes, or avoids pleasure itself, because it is pleasure, but because those who do not know how to pursue pleasure rationally encounter consequences that are extremely painful. Nor again is there anyone who loves or pursues or desires to obtain pain of itself, because it is pain, but because occasionally circumstances occur in which toil and pain can procure him some great pleasure. To take a trivial example, which of us ever undertakes laborious physical exercise, except to obtain some advantage from it? But who has any right to find fault with a man who chooses to enjoy a pleasure that has no annoying consequences, or one who avoids a pain that produces no resultant pleasure?"
        },
        {
            title: "Article 4",
            content: "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat."
        },
        {
            title: "Article 5",
            content: "On the other hand, we denounce with righteous indignation and dislike men who are so beguiled and demoralized by the charms of pleasure of the moment, so blinded by desire, that they cannot foresee the pain and trouble that are bound to ensue; and equal blame belongs to those who fail in their duty through weakness of will, which is the same as saying through shrinking from toil and pain. These cases are perfectly simple and easy to distinguish. In a free hour, when our power of choice is untrammelled and when nothing prevents our being able to do what we like best, every pleasure is to be welcomed and every pain avoided. But in certain circumstances and owing to the claims of duty or the obligations of business it will frequently occur that pleasures have to be repudiated and annoyances accepted. The wise man therefore always holds in these matters to this principle of selection: he rejects pleasures to secure other greater pleasures, or else he endures pains to avoid worse pains. Vivamus id efficitur risus, a suscipit tellus. Aliquam erat volutpat. Fusce metus arcu, elementum eu tortor ac, fermentum blandit diam. Morbi ullamcorper eros quis rutrum dictum. Aenean accumsan nisi vel mauris suscipit, tempor iaculis felis rutrum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum vel tristique lorem. Suspendisse mollis sollicitudin sodales. Vestibulum consequat, massa non aliquet pellentesque, ex ex blandit arcu, ut pharetra lectus purus dapibus quam. Suspendisse dictum dignissim laoreet. Fusce odio tellus, fermentum nec posuere quis, aliquam in sapien. Nam at blandit orci, eu sollicitudin libero. Proin efficitur elementum rhoncus."
        },
        {
            title: "Article 6",
            content: "Vivamus id efficitur risus, a suscipit tellus. Aliquam erat volutpat. Fusce metus arcu, elementum eu tortor ac, fermentum blandit diam. Morbi ullamcorper eros quis rutrum dictum. Aenean accumsan nisi vel mauris suscipit, tempor iaculis felis rutrum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum vel tristique lorem. Suspendisse mollis sollicitudin sodales. Vestibulum consequat, massa non aliquet pellentesque, ex ex blandit arcu, ut pharetra lectus purus dapibus quam. Suspendisse dictum dignissim laoreet. Fusce odio tellus, fermentum nec posuere quis, aliquam in sapien. Nam at blandit orci, eu sollicitudin libero. Proin efficitur elementum rhoncus."
        },
        {
            title: "Article 7",
            content: "Vivamus id efficitur risus, a suscipit tellus. Aliquam erat volutpat. Fusce metus arcu, elementum eu tortor ac, fermentum blandit diam. Morbi ullamcorper eros quis rutrum dictum. Aenean accumsan nisi vel mauris suscipit, tempor iaculis felis rutrum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum vel tristique lorem. Suspendisse mollis sollicitudin sodales. Vestibulum consequat, massa non aliquet pellentesque, ex ex blandit arcu, ut pharetra lectus purus dapibus quam. Suspendisse dictum dignissim laoreet. Fusce odio tellus, fermentum nec posuere quis, aliquam in sapien. Nam at blandit orci, eu sollicitudin libero. Proin efficitur elementum rhoncus."

        },
        {
            title: "Article 8",
            content: "Vivamus id efficitur risus, a suscipit tellus. Aliquam erat volutpat. Fusce metus arcu, elementum eu tortor ac, fermentum blandit diam. Morbi ullamcorper eros quis rutrum dictum. Aenean accumsan nisi vel mauris suscipit, tempor iaculis felis rutrum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum vel tristique lorem. Suspendisse mollis sollicitudin sodales. Vestibulum consequat, massa non aliquet pellentesque, ex ex blandit arcu, ut pharetra lectus purus dapibus quam. Suspendisse dictum dignissim laoreet. Fusce odio tellus, fermentum nec posuere quis, aliquam in sapien. Nam at blandit orci, eu sollicitudin libero. Proin efficitur elementum rhoncus."

        },
        {
            title: "Article 9",
            content: "Vivamus id efficitur risus, a suscipit tellus. Aliquam erat volutpat. Fusce metus arcu, elementum eu tortor ac, fermentum blandit diam. Morbi ullamcorper eros quis rutrum dictum. Aenean accumsan nisi vel mauris suscipit, tempor iaculis felis rutrum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum vel tristique lorem. Suspendisse mollis sollicitudin sodales. Vestibulum consequat, massa non aliquet pellentesque, ex ex blandit arcu, ut pharetra lectus purus dapibus quam. Suspendisse dictum dignissim laoreet. Fusce odio tellus, fermentum nec posuere quis, aliquam in sapien. Nam at blandit orci, eu sollicitudin libero. Proin efficitur elementum rhoncus."

        },
        {
            title: "Article 10",
            content: "Vivamus id efficitur risus, a suscipit tellus. Aliquam erat volutpat. Fusce metus arcu, elementum eu tortor ac, fermentum blandit diam. Morbi ullamcorper eros quis rutrum dictum. Aenean accumsan nisi vel mauris suscipit, tempor iaculis felis rutrum. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere cubilia curae; Vestibulum vel tristique lorem. Suspendisse mollis sollicitudin sodales. Vestibulum consequat, massa non aliquet pellentesque, ex ex blandit arcu, ut pharetra lectus purus dapibus quam. Suspendisse dictum dignissim laoreet. Fusce odio tellus, fermentum nec posuere quis, aliquam in sapien. Nam at blandit orci, eu sollicitudin libero. Proin efficitur elementum rhoncus."
        },
    ];

    return (
        <div className="Newspaper">
            <ResponsiveMasonry
                columnsCountBreakPoints={{ 400: 1, 900: 2, 1200: 3, 1500: 4 }}
            >
                <Masonry>
                    {articles.map((article, index) => (
                        <ArticleBlock key={index}>
                            <h2>{article.title}</h2>
                            <p>{article.content}</p>
                        </ArticleBlock>
                    ))}
                </Masonry>
            </ResponsiveMasonry>
        </div>
    );
}
