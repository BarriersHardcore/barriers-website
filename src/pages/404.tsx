import { Container, Row, Col } from 'react-bootstrap';
import Image from 'next/image';
import Link from 'next/link';

const Custom404: React.FC = () => {
	return (
		<>
			<section className="py-5">
				<Container>
					<Row className="justify-content-md-center">
						<Col lg="5">
                            <div className="my-5 text-center">
                                <h1>404</h1>
                                <h2>Something broke!</h2>
                                <Image
                                    src="/images/something-broke.gif"
                                    alt="Something broke!"
                                    width={480}
                                    height={360}
                                    layout="responsive"
                                    className="mt-4"
                                />
                                <p className="fs-4 lh-sm"><br />We can&apos;t find that page, it could be an old link or something might have changed.</p>
                                <p><Link href="/">Try again</Link></p>
                            </div>
						</Col>
					</Row>
				</Container>
			</section>
		</>
  	);
}

export default Custom404;