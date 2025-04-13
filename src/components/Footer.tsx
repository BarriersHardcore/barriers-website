import { useState } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import Modal from 'react-bootstrap/Modal';
import SocialLinks from '../components/SocialLinks';
import styles from '../styles/components/Footer.module.scss';

const Footer: React.FC = () => {

	const [show, setShow] = useState(false);
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

  	return (
		<footer className={styles.footer}>
			<Container>
				<Row>
					<Col lg="12">
						<SocialLinks categories={['instagram', 'facebook', 'youtube', 'bandcamp', 'spotify', 'linktree']} />

						<p onClick={handleShow}>Website credits</p>

						<Modal show={show} onHide={handleClose} centered>
							<Modal.Header closeButton>
								<Modal.Title>Image &amp; video credits</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								Homepage video: <a href="https://www.lumecreativemedia.com/" target="_blank">Lume Creative Media</a>
							</Modal.Body>
						</Modal>
					</Col>
				</Row>
			</Container>
		</footer>
  	);
};

export default Footer;