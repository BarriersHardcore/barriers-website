// npm run dev

import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Link from 'next/link';
import Image from 'next/image';
import homeData from '../data/homeData.json';
import styles from '../styles/pages/Home.module.scss';
import HeadTags from '../components/HeadTags';
import SocialLinks from '../components/SocialLinks';
import Carousel from '../components/Carousel';
import GigsListGoogle from '../components/GigsListGoogle';

const structuredData = {
	"@context": "https://schema.org",
	"@type": "MusicGroup",
	"name": "Barriers",
	"url": "https://www.barriershardcore.com",
	"sameAs": [
		"https://www.instagram.com/barriershardcore/",
		"https://www.facebook.com/barriershardcore/",
		"https://www.youtube.com/@barriershardcore",
		"https://barriershardcore.bandcamp.com/",
		"https://open.spotify.com/artist/3PW0fhROb6GXAVCU9BaOrA",    
		"https://linktr.ee/BarriersHardcore",
		"https://www.discogs.com/artist/11990621-Barriers-3"
	],
		"genre": "Punk Hardcore",
		"member": [
		{
			"@type": "Person",
			"name": "Andy Mansell",
			"role": "Lead Vocalist"
		},
		{
			"@type": "Person",
			"name": "Tom Lamont",
			"role": "Guitarist"
		},
		{
			"@type": "Person",
			"name": "Gregg Bunce",
			"role": "Bassist"
		},
		{
			"@type": "Person",
			"name": "Chris Walker",
			"role": "Drummer"
		}
	],
	"track": [
		{
			"@type": "MusicRecording",
			"name": "French Bulldog",
			"url": "https://barriershardcore.bandcamp.com/track/french-bulldog",
			"releaseDate": "2024-04-18",
			"duration": "PT2M36S",  //(ISO 8601 format)
			"genre": "Punk Hardcore",
			"image": "https://www.barriershardcore.com/images/french-bulldog.jpg"
		},
		{
			"@type": "MusicRecording",
			"name": "The Void",
			"url": "https://barriershardcore.bandcamp.com/track/the-void",
			"releaseDate": "2024-04-18",
			"duration": "PT43S",  //(ISO 8601 format)
			"genre": "Punk Hardcore",
			"image": "https://www.barriershardcore.com/images/the-void.jpg"
		},
		{
			"@type": "MusicRecording",
			"name": "Sick Sad World",
			"url": "https://barriershardcore.bandcamp.com/track/sick-sad-world",
			"releaseDate": "2024-08-09",
			"duration": "PT2M59S",  //(ISO 8601 format)
			"genre": "Punk Hardcore",
			"image": "https://www.barriershardcore.com/images/sick-sad-world.jpg"
		},
		{
			"@type": "MusicRecording",
			"name": "Distant Memory",
			"url": "https://barriershardcore.bandcamp.com/track/distant-memory",
			"releaseDate": "2024-04-18",
			"duration": "PT3M10S",  //(ISO 8601 format)
			"genre": "Punk Hardcore",
			"image": "https://www.barriershardcore.com/images/distant-memory.jpg"
		}
	],
	"album": [
		{
			"@type": "MusicAlbum",
			"name": "Through the Middle",
			"url": "https://barriershardcore.bandcamp.com/album/through-the-middle",
			"datePublished": "2019-11-04",
			"genre": "Punk Hardcore",
			"image": "https://www.barriershardcore.com/images/through-the-middle.jpg",
			"byArtist": {
				"@type": "MusicGroup",
				"name": "Barriers"
			}
		}
	],  
	"logo": "https://www.barriershardcore.com/images/og-logo.jpg",
	"image": "https://www.barriershardcore.com/images/barriers-band-image.jpg",
	"contactPoint": {
		"@type": "ContactPoint",
		"contactType": "Email",
		"email": "barriershardcore@gmail.com",
		"areaServed": "UK",
		"availableLanguage": "English"
	}
};

interface Music {
    button: string;
    href: string;
}

interface Merch {
    bgImage: string;
    title: string;
    content: string;
    button: string;
    href: string;
}

interface HomeData {
    logo: string;
    title: string;
    content: string;
    bgImage: string;
    music: Music;
    merch: Merch;
}

const Home: React.FC = () => {
	const [data, setData] = useState<HomeData>({
        logo: '',
        title: '',
        content: '',
        bgImage: '',
        music: { 
            button: '',
            href: ''
        },
        merch: {
            bgImage: '',
            title: '',
            content: '',
            button: '',
            href: ''
        }
  	});
	useEffect(() => {
		setData(homeData);
	}, []);

return (
	<>
		<HeadTags
			title="Hardcore Punk Band from Brighton, UK"
			description="Barriers is a hardcore punk band from Brighton, UK, known for their raw energy and DIY ethos. listen to latest singles — ‘French Bulldog’ and ‘The Void’, plus earlier tracks ‘Sick Sad World’ and ‘Distant Memory’. Don’t miss their 2019 album Through the Middle. Stay updated on their music, upcoming gigs, and latest news here!"
			image=""
			url="/">
			{/* Custom meta tags specific to this page */}
			{structuredData && (
				<script type="application/ld+json">
					{JSON.stringify(structuredData)}
				</script>
			)}
		</HeadTags>

		<section className={styles.videoSection}>
			<video width="100%" height="auto" preload="none" autoPlay loop muted playsInline poster="/images/home-background-fallback.jpg">
				<source src="/video/home-background.mp4" type="video/mp4" />
				Your browser does not support the html video tag - use a better browser.
			</video>
			<div className={styles.videoContent}>
				<Image
					src={data.logo || '/images/og-logo.jpg'}
					alt="Barriers Band Logo"
					width={900}
					height={305}
					className={styles.homeLogo}
				/>
				<h1 className={styles.videoTitle}>{data.title || ''}</h1>
			</div>
		</section>

		<section className={styles.musicSection}>
			<Container>
				<Row>
					<Col lg="12">
						<Carousel />
						<Link href={data.music.href || ''} passHref className={styles.musicButton}>
							{data.music.button || ''}
						</Link>
					</Col>
				</Row>
			</Container>
		</section>

		<section className={styles.mainInfoSection}>
			<div className={styles.mainInfoSectionBg}>
				<Image
					src={data.bgImage || '/images/og-logo.jpg'}
					alt={data.title || ''}
					width={2384}
					height={1340}
				/>
			</div>
			<Container>
				<Row className="justify-content-md-center">
					<Col lg="7">
						<p>{data.content || ''}</p>
					</Col>
				</Row>
				<Row>
					<Col lg="6">
						<iframe src="https://open.spotify.com/embed/artist/3PW0fhROb6GXAVCU9BaOrA?utm_source=generator" width="100%" height="360" frameBorder="0" allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture" loading="lazy"></iframe>
					</Col>
					<Col lg="6">
						<iframe src="https://www.youtube.com/embed/W4pSKqNjt38?si=HsbFkXGJcEKB5Oc9" width="100%" height="360" title="Barriers - Barriers music video" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen={true}></iframe>
					</Col>
					<Col lg="12">
						<SocialLinks categories={['spotify', 'bandcamp', 'youtube', 'amazon', 'apple']} />
					</Col>
				</Row>
			</Container>
		</section>

		<section className={styles.gigsSection}>
			<Container>
				<Row className="justify-content-md-center">
					<Col lg="8">
						<GigsListGoogle heading="Upcoming shows" showUpcomingGigsOnly={true} />
					</Col>
				</Row>
			</Container>
		</section>

		<section className={styles.merchSection}>
			<Container>
				<Row className="justify-content-md-center">
					<Col lg="5">
						<div className="merch-content">
							<h2>{data.merch.title || ''}</h2>
							<p>{data.merch.content || ''}</p>
							<Link href={data.merch.href || ''} passHref className="nav-link" target="_blank">
								{data.merch.button || ''}
							</Link>
						</div>
					</Col>
				</Row>
			</Container>
		</section>

		</>
   	);
};

export default Home;