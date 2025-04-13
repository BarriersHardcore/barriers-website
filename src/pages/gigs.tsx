import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import gigsData from '../data/gigsData.json';
import HeadTags from '../components/HeadTags';
import Hero from '../components/Hero';
import GigslistGoogle from '../components/GigsListGoogle';
import styles from '../styles/pages/Gigs.module.scss';

const GigsPage: React.FC = () => {
  	const [data, setData] = useState<{ title: string; content: string; bgImage: string }>({
    	title: '',
    	content: '',
		bgImage: '',
  	});

	useEffect(() => {
		setData(gigsData);
	}, []);

	return (
		<>
			<HeadTags
				title="Gigs"
				description="Barriers’ upcoming hardcore punk gigs are listed here. Fans can find information on their live shows across the UK."
				image=""
				url="gigs">
			</HeadTags>

			<Hero title={data.title || ''} imageUrl={data.bgImage || '/images/hero/hero-1.png'} />

			<section className={styles.gigsMainSection || ''}>
				<Container>
					<Row className="justify-content-md-center">
						<Col lg="8">
							<p>{data.content || ''}</p>
							<GigslistGoogle/>
						</Col>
					</Row>
				</Container>
			</section>
		</>
  	);
}

export default GigsPage;