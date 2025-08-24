import { useEffect, useRef } from 'react';

// TikTok embed component
const TikTokEmbed = ({ videoId }) => {
    const embedRef = useRef(null);

    useEffect(() => {
        // Load TikTok embed script if not already loaded
        if (!window.tiktokEmbed) {
            const script = document.createElement('script');
            script.src = 'https://www.tiktok.com/embed.js';
            script.async = true;
            document.head.appendChild(script);
        }
    }, []);

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            margin: '20px 0'
        }}>
            <blockquote
                ref={embedRef}
                className="tiktok-embed"
                cite={`https://www.tiktok.com/@trevormmartin/video/${videoId}`}
                data-video-id={videoId}
                style={{ maxWidth: '605px', minWidth: '325px' }}
            >
                <section>
                    <a target="_blank" rel="noreferrer" title="@trevormmartin" href="https://www.tiktok.com/@trevormmartin?refer=embed">@trevormmartin</a>
                </section>
            </blockquote>
        </div>
    );
};

export default TikTokEmbed;
