import { useEffect, useState } from 'react';
import Link from 'next/link';
import socialLinksData from '../data/socialLinksData.json';
import styles from '../styles/components/SocialLinks.module.scss';

interface SocialLink {
    name: string;
    url: string;
    icon: string;
    category?: string; // Optional category field
}

interface SocialLinksProps {
    categories?: string[]; // Accept an array of categories
}

const SocialLinks: React.FC<SocialLinksProps> = ({ categories }) => {
    const [links, setLinks] = useState<SocialLink[]>([]);

    useEffect(() => {
        // If categories are provided, filter and order the data based on the categories array
        if (categories && categories.length > 0) {
            const orderedLinks = categories.flatMap(category =>
                socialLinksData.filter(link => link.category === category)
            );
            setLinks(orderedLinks);
        } else {
            setLinks(socialLinksData); // Default to showing all links
        }
    }, [categories]);

    return (
        <ul className={styles.socialLinks}>
            {links.map((link, index) => (
                <li key={index} className={styles.socialLinkItem}>
                    <Link href={link.url} passHref title={link.name} target="_blank" rel="noopener noreferrer" className={styles.socialLinkAnchor}>
                        <i className={link.icon}></i>
                    </Link>
                </li>
            ))}
        </ul>
    );
};

export default SocialLinks;