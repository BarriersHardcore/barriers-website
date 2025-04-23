// components/OGTags.tsx
import Head from 'next/head';

interface OGTagsProps {
    title: string;
    description: string;
    image: string;
    url: string;
    type?: 'website' | 'article' | 'video' | 'music'; // You can extend this to include other types
    children?: React.ReactNode; // To allow injecting custom head content on a per-page basis
    favicon?: string; // Optional: URL to favicon icon
    appleTouchIcon?: string; // Optional: URL to Apple touch icon
}

const HeadTags: React.FC<OGTagsProps> = ({ 
    title, 
    description, 
    image, 
    url, 
    type = 'website', 
    children,
    favicon = 'https://barriershardcore.com/images/favicon.svg', // Default favicon
    appleTouchIcon = 'https://barriershardcore.com/images/apple-touch-icon.png' // Default Apple touch icon
    }) => {
    const defaultTitle = "BARRIERS | Hardcore Punk Band from Brighton, UK";
    const defaultDescription = "Barriers is a hardcore punk band from Brighton, UK. Explore their music, singles, and upcoming gigs.";
    const defaultImage = "https://barriershardcore.com/images/og-logo.png";
    const defaultUrl = "https://barriershardcore.com/";

    return (
        <Head>
            {/* Title Meta Tag */}
            <title>{`BARRIERS | ${title || defaultTitle}`}</title>

            {/* General Meta Tags */}
            <meta name="description" content={description || defaultDescription} />
            <meta name="keywords" content="Barriers band, Barriers hardcore, Barriers hardcore punk, Barriers, punk rock, Barriers Brighton, hardcore punk, punk rock, Brighton, UK, punk singles, punk gigs, Brighton DIY punk" />
            <meta name="author" content="Barriers" />

            {/* Open Graph Meta Tags */}
            <meta property="og:title" content={`BARRIERS | ${title || defaultTitle}`} />
            <meta property="og:description" content={description || defaultDescription} />
            <meta property="og:image" content={image || defaultImage} />
            <meta property="og:url" content= {`https://barriershardcore.com/${url || defaultUrl}`} />
            <meta property="og:type" content={type} />
            <meta property="og:site_name" content="Barriers Hardcore Official Website" />
            <meta property="og:locale" content="en-GB" />

            {/* Favicon */}
            <link rel="icon" href={favicon} type="image/x-icon" />

            {/* Apple Touch Icon */}
            <link rel="apple-touch-icon" href={appleTouchIcon} />

            {/* Custom Content (Passed as children) */}
            {children}
        </Head>
    );
};

export default HeadTags;