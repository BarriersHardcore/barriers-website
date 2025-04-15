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
								<Modal.Title>Video &amp; photography credits</Modal.Title>
							</Modal.Header>
							<Modal.Body>
								🎥 <a href="https://www.lumecreativemedia.com/" target="_blank">Lume Creative Media</a><br/>
								📸 <a href="https://www.instagram.com/klab.paint/" target="_blank">klab.paint</a><br/>
								📸 <a href="https://www.instagram.com/blondieslondon/" target="_blank">blondieslondon</a><br/>
								📸 <a href="https://www.instagram.com/reprievevision/" target="_blank">Jon Sugden | Reprievevision</a><br/>
								📸 <a href="https://www.instagram.com/coco.henley/" target="_blank">Coco Henley</a><br/>
							</Modal.Body>
						</Modal>
					</Col>
				</Row>
			</Container>
		</footer>
  	);
};

export default Footer;