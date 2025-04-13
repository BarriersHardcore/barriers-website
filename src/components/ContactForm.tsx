import React, { useRef, FormEvent, useState } from 'react';
import emailjs from '@emailjs/browser';
import { Form, Button, FloatingLabel, Alert } from 'react-bootstrap';
import styles from '../styles/components/ContactForm.module.scss';

export const ContactUs: React.FC = () => {
  	const form = useRef<HTMLFormElement | null>(null);
  	const [isSubmitted, setIsSubmitted] = useState(false); // State to track form submission
  	const [errorMessage, setErrorMessage] = useState<string>('');

  	const sendEmail = (e: FormEvent<HTMLFormElement>): void => {
    	e.preventDefault();

    	if (form.current) {
      		emailjs
			.sendForm('service_cu9kmqr', 'template_knd036p', form.current, {
				publicKey: 'YMsffHxs9pTqGV5f4',
			})
        	.then(
			() => {
				setIsSubmitted(true); // Set the state to true when email is sent successfully
			},
			(error) => {
				console.error(error); // Log the error (optional)
				setErrorMessage('Sorry, there was an issue with your submission. Please try again.');
				setIsSubmitted(false); // Set the state to false if there is an error
			}
        );
    }
};

return (
    <>
      	{isSubmitted ? (
			<Alert variant="success" className={styles.alert}>
				<p><i className="fas fa-check-circle"></i></p>
				<p>Thanks for contacting us!</p>
				<p>We&apos;ve got your message, and will get back to you ASAP!</p>
			</Alert>
      	) : (
        <>
			{errorMessage && (
				<Alert variant="danger" className={styles.alert}><p><i className="fas fa-exclamation-circle"></i></p><p>{errorMessage}</p></Alert>
			)}

			<Form ref={form} onSubmit={sendEmail} className={styles.form}>
				<FloatingLabel controlId="formName" label="Your name" className="mb-3">
					<Form.Control className={styles.formControl} type="text" name="user_name" placeholder="Your name" required />
				</FloatingLabel>

				<FloatingLabel controlId="formEmail" label="Your email" className="mb-3">
					<Form.Control className={styles.formControl} type="email" name="user_email" placeholder="Your email" required />
				</FloatingLabel>

				<FloatingLabel controlId="formSubject" label="Subject" className="mb-3">
					<Form.Control className={styles.formControl} type="text" name="subject" placeholder="Subject" required />
				</FloatingLabel>

				<FloatingLabel controlId="formMessage" label="Your message" className="mb-3">
					<Form.Control className={styles.formControl} as="textarea" name="message" placeholder="Your message" style={{ height: '150px' }} required />
				</FloatingLabel>

				<Button className={styles.formButton} type="submit">
					Submit
				</Button>
          	</Form>
        </>
		)}
    </>
	);
};

export default ContactUs;