import { useEffect, useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import HeadTags from '../components/HeadTags';
import Hero from '../components/Hero';
import ContactUs from '../components/ContactForm';
import contactData from '../data/contactData.json';
import styles from '../styles/pages/Contact.module.scss';

const Contact: React.FC = () => {
  	const [data, setData] = useState<{ title: string; content: string; bgImage: string }>({
    	title: '',
    	content: '',
		bgImage: ''
  	});

  	useEffect(() => {
    	setData(contactData);
  	}, []);

  	return (
    	<>
			<HeadTags
				title="Contact"
				description="Reach out to us for inquiries or bookings."
				image=""
				url="contact">
			</HeadTags>

			<Hero title={data.title || ''} imageUrl={data.bgImage || '/images/hero/hero-1.png'} />

			<section className={styles.contactMainSection || ''}>
				<Container>
					<Row className="justify-content-md-center">
						<Col lg="8">
							<p>{data.content || ''}</p>
						</Col>
					</Row>
					<Row className="justify-content-md-center">
						<Col lg="6">
							<ContactUs/>
						</Col>
					</Row>
				</Container>
			</section>
    	</>
  	);
}

export default Contact;