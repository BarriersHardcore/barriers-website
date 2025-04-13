import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';
import HeadTags from '../components/HeadTags';
import Hero from '../components/Hero';
import SocialLinks from '../components/SocialLinks';
import musicData from '../data/musicData.json';
import styles from '../styles/pages/Music.module.scss';

// Define the interface for the data structure
interface Album {
  	title: string;
  	releaseYear: number;
  	thumbnail: string;
  	link: string;
}

interface MusicData {
  	title: string;
  	content: string;
  	bgImage: string;
  	albums: Album[];
}

const Music: React.FC = () => {
  	// Explicitly type the state with the MusicData interface
  	const [data, setData] = useState<MusicData>({
    	title: '',
    	content: '',
		bgImage: '',
    	albums: []
  	});

  	useEffect(() => {
    	setData(musicData);
  	}, []);

  	return (
    	<>
			<HeadTags
				title="Music"
				description="Barriers’ music delivers raw, aggressive hardcore punk. Check out their latest singles — ‘French Bulldog’ and ‘The Void’, as well as ‘Sick Sad World’, ‘Distant Memory’ and their 2019 debut album 'Through the Middle'."
				image=""
				url="music">
			</HeadTags>
			
			<Hero title={data.title || ''} imageUrl={data.bgImage || '/images/hero/hero-1.png'} />

			<section className={`music ${styles.musicMainSection}`}>
				<Container>
					<Row>
						<Col lg="12">		

							<SocialLinks categories={['spotify', 'bandcamp', 'apple', 'amazon', 'deezer']} />

							<ul className={styles.musicGrid}>
								{data.albums
									?.slice() // Create a shallow copy of the albums array
									.reverse() // Now reverse the copy, not the original array
									.map((album, index) => (
									<li key={index} className={styles.musicGridItem} style={{ backgroundImage: `url(${album.thumbnail || ''})` }}>
										<Link href={album.link || ''} passHref className={styles.musicGridImageLink} target="_blank">
											<Image
												src={album.thumbnail || '/images/og-logo.jpg'} // Update with an actual footer image or logo
												alt={album.title || ''}
												width={350}
												height={350}
												//layout="intrinsic"
											/>
										</Link>
										<div className={styles.musicGridInfo}>
											<h2 className={styles.musicGridTitle}>{album.title || ''}</h2>
											<sub>({album.releaseYear || ''})</sub>
											<Link href={album.link || ''} passHref className={styles.musicGridLink} target="_blank">
												Listen
											</Link>
										</div>
									</li>
								))}
							</ul>
						</Col>
					</Row>
					<Row className="justify-content-md-center">
						<Col lg="6">
							<iframe src="https://open.spotify.com/embed/artist/3PW0fhROb6GXAVCU9BaOrA?utm_source=generator" width="100%" height="352" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
						</Col>
					</Row>
				</Container>
			</section>
    	</>
  	);
}

export default Music;