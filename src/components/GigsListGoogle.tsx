import { useEffect, useState } from 'react';
import styles from '../styles/components/Gigslist.module.scss';

// Define types for the gig data
interface Gig {
    id: number;
    venue: string;
    city: string;
    date: Date; // Ensure it's a string from CSV
    ticketUrl?: string;
}

interface GigslistProps {
    showUpcomingGigsOnly?: boolean; // Prop to control rendering only upcoming gigs
    showNextGigOnly?: boolean; // Prop to render only the next upcoming gig
    heading?: string; // Prop to customize the heading content
}

const GigsListGoogle = ({ showUpcomingGigsOnly, showNextGigOnly, heading }: GigslistProps) => {
    const [gigs, setGigs] = useState<Gig[]>([]);
    const [upcomingGigs, setUpcomingGigs] = useState<Gig[]>([]);
    const [pastGigs, setPastGigs] = useState<Gig[]>([]);
    const [showAllPastGigs, setShowAllPastGigs] = useState(false); // State to toggle past gigs visibility

    // Google Sheets CSV URL - Replace this with your own sheet's URL
    const sheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSUSU6gF1LPllyr5NqW6W5XIpTbeKUAAbxo769v0qXpQvLJMejdxdbk9sed_kxrGLb2cvN_VarL8sJE/pub?output=csv';

    useEffect(() => {
        // Fetch gig data from Google Sheets CSV
        const fetchGigsData = async () => {
            try {
                const response = await fetch(sheetUrl);
                const text = await response.text();

                // Parse the CSV data
                const parsedData = text
                    .split('\n')
                    .map((line) => line.split(','))
                    .slice(1) // Remove header row
                    .map((row) => ({
                        id: parseInt(row[0]),
                        venue: row[1],
                        city: row[2],
                        date: new Date(row[3]),  // Ensure it's a Date object
                        ticketUrl: row[4]?.trim() || '',
                    }));

                setGigs(parsedData);  // Now this should work without type errors
            } catch (error) {
                console.error('Error fetching gigs data:', error);
            }
        };

        fetchGigsData();
    }, [sheetUrl]);

    useEffect(() => {
        const now = new Date();

        // Sort gigs by date
        const sortedGigs = gigs.map((gig) => ({
            ...gig,
            date: new Date(gig.date), // Ensure date is parsed correctly
        }));

        // Split gigs into upcoming and past
        const upcoming = sortedGigs.filter((gig) => gig.date > now).sort((a, b) => a.date.getTime() - b.date.getTime());
        const past = sortedGigs.filter((gig) => gig.date <= now).sort((a, b) => b.date.getTime() - a.date.getTime());

        setUpcomingGigs(upcoming);
        setPastGigs(past);
    }, [gigs]);

    // Format date to UK format
    const formatDate = (date: Date) => {
        return new Intl.DateTimeFormat('en-GB', { year: 'numeric', month: 'short', day: 'numeric' }).format(date);
    };

    // Toggle visibility of all past gigs
    const togglePastGigs = () => {
        setShowAllPastGigs((prevState) => !prevState);
    };

    // Determine which past gigs to show based on the toggle
    const visiblePastGigs = showAllPastGigs ? pastGigs : pastGigs.slice(0, 5);

    // Render only the next upcoming gig if the prop is passed
    const nextUpcomingGig = showNextGigOnly && upcomingGigs.length > 0 ? upcomingGigs[0] : null;

    return (
        <div className={styles.gigsContainer}>
            
            {/* Render upcoming gigs if showUpcomingGigsOnly is true */}
            {showUpcomingGigsOnly && (
                <div className={styles.upcomingGigs}>
                    <h2>{heading || 'Upcoming Gigs'}</h2> {/* Default heading if no prop is passed */}
                    {upcomingGigs.length === 0 ? (
                        <p>No upcoming gigs</p>
                    ) : (
                        <ul className={styles.gigsList}>
                            {upcomingGigs.map((gig) => (
                                <li key={gig.id} className={styles.gigsListItem}>
                                    <div className={styles.gigsListDate}>{formatDate(new Date(gig.date))}</div>
                                    <div className={styles.gigsListVenue}>{gig.venue} - {gig.city}</div>
                                    {/* Only render ticket button if ticketUrl is provided and not empty */}
                                    {gig.ticketUrl && gig.ticketUrl.trim() !== "" ? (
                                        <div className={styles.gigsListTicket}>
                                            <a href={gig.ticketUrl} target="_blank" rel="noopener noreferrer">
                                                Tickets
                                            </a>
                                        </div>
                                    ) : null}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            )}

            {/* Render only the next upcoming gig if showNextGigOnly is true */}
            {showNextGigOnly && nextUpcomingGig && (
                <div className={styles.upcomingGigs}>
                    <h2>{heading || 'Next Gig'}</h2> {/* Default heading if no prop is passed */}
                    <ul className={styles.gigsList}>
                        <li key={nextUpcomingGig.id} className={styles.gigsListItem}>
                            <div className={styles.gigsListDate}>{formatDate(new Date(nextUpcomingGig.date))}</div>
                            <div className={styles.gigsListVenue}>{nextUpcomingGig.venue} - {nextUpcomingGig.city}</div>
                            {/* Only render ticket button if ticketUrl is provided and not empty */}
                            {nextUpcomingGig.ticketUrl && nextUpcomingGig.ticketUrl.trim() !== "" ? (
                                <div className={styles.gigsListTicket}>
                                    <a href={nextUpcomingGig.ticketUrl} target="_blank" rel="noopener noreferrer">
                                        Tickets
                                    </a>
                                </div>
                            ) : null}
                        </li>
                    </ul>
                </div>
            )}

            {/* Render both upcoming and past gigs if no filter prop is passed */}
            {!showUpcomingGigsOnly && !showNextGigOnly && (
                <>
                    <div className={styles.upcomingGigs}>
                        <h2>{heading || 'Upcoming Gigs'}</h2> {/* Default heading if no prop is passed */}
                        {upcomingGigs.length === 0 ? (
                            <p>No gigs planned at the moment</p>
                        ) : (
                            <ul className={styles.gigsList}>
                                {upcomingGigs.map((gig) => (
                                    <li key={gig.id} className={styles.gigsListItem}>
                                        <div className={styles.gigsListDate}>{formatDate(new Date(gig.date))}</div>
                                        <div className={styles.gigsListVenue}>{gig.venue} - {gig.city}</div>
                                        {/* Only render ticket button if ticketUrl is provided and not empty */}
                                        {gig.ticketUrl && gig.ticketUrl.trim() !== "" ? (
                                        <div className={styles.gigsListTicket}>
                                            <a href={gig.ticketUrl} target="_blank" rel="noopener noreferrer">
                                                Tickets
                                            </a>
                                        </div>
                                        ) : null}
                                    </li>
                                ))}
                            </ul>
                        )}
                    </div>

                    {pastGigs.length > 0 && (
                        <div className={styles.pastGigs}>
                            <h2>{heading || 'Previous Gigs'}</h2> {/* Default heading if no prop is passed */}
                            <ul className={styles.gigsList}>
                                {visiblePastGigs.map((gig) => (
                                    <li key={gig.id} className={styles.gigsListItem}>
                                        <div className={styles.gigsListDate}>{formatDate(new Date(gig.date))}</div>
                                        <div className={styles.gigsListVenue}>{gig.venue} - {gig.city}</div>
                                    </li>
                                ))}
                            </ul>

                            {/* If there are more than 5 past gigs, show the "Show More" button */}
                            {pastGigs.length > 5 && (
                                <button className={styles.toggleButton} onClick={togglePastGigs}>
                                    {showAllPastGigs ? 'Show Less' : 'Show all'}
                                </button>
                            )}
                        </div>
                    )}
                </>
            )}
        </div>
    );
};

export default GigsListGoogle;