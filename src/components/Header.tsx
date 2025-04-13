import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Image from 'next/image';
import Link from 'next/link';
import Navbar from '../components/Navbar';
import { Container, Row, Col } from 'react-bootstrap';
import styles from '../styles/components/Header.module.scss';

const Header: React.FC = () => {

    const router = useRouter();
    // Check if the current route is the homepage
    const isHomepage = router.pathname === '/';

    useEffect(() => {
        if (isHomepage) {
            document.body.classList.add('home');
        } else {
            document.body.classList.remove('home');
        }
        return () => {
            document.body.classList.remove('home');
        };
    }, [isHomepage]);

    // add 'affix' class to header on scroll
    const [scroll, setScroll] = useState(false);
    useEffect(() => {
        window.addEventListener('scroll', () => {
            setScroll(window.scrollY > 400);
        });
    }, []);

    return (
        <>
        <div className={`${scroll ? `${styles.marginTop}` : ''}`}></div>
        <header className={`${styles.header} ${isHomepage ? `${styles.homepage}` : ''} ${scroll ? 'affix' : ''}`}>
            <Container fluid>
                <Row>
                    <Col lg="12">
                        <div className={styles.logo}>
                            <Link href="/">
                                <Image
                                    src="/images/barriers-header-logo.svg"
                                    alt="Barriers Logo"
                                    width={210}
                                    height={72}
                                    priority={true}
                                />
                            </Link>
                        </div>
                        <Navbar />
                    </Col>
                </Row>
            </Container>
        </header>
        </>
    );
};

export default Header;