import { useRouter } from 'next/router';
import Link from 'next/link';
import { useState, useEffect } from 'react'; // Import useEffect
import navData from '../data/navData.json';

const Navbar: React.FC = () => {
	const router = useRouter();
	const [isNavbarOpen, setNavbarOpen] = useState(false);

	const isAbsoluteUrl = (url: string) => /^(http|https):\/\//.test(url);

	const toggleNavbar = () => {
		setNavbarOpen(!isNavbarOpen);
	};

	// Close navbar on route change
	useEffect(() => {
		const handleRouteChange = () => {
			setNavbarOpen(false);
		};

		router.events.on('routeChangeStart', handleRouteChange);
		return () => {
			router.events.off('routeChangeStart', handleRouteChange);
		};
	}, [router.events]);

	return (
		<nav className="navbar navbar-expand-xl">
			<button
				className={`navbar-toggler ${isNavbarOpen ? 'show' : ''}`}
				type="button"
				onClick={toggleNavbar}
				aria-controls="navbarNav"
				aria-expanded={isNavbarOpen ? 'true' : 'false'}
				aria-label="Toggle navigation"
			>
				<span className="icon-bar"></span>
				<span className="icon-bar"></span>
				<span className="icon-bar"></span>
			</button>
			<div className={`collapse navbar-collapse ${isNavbarOpen ? 'show' : ''}`} id="navbarNav">
				<ul className="navbar-nav">
					{navData.navLinks.map((link) => {
						const isActive = router.pathname === link.href;
						const isExternal = isAbsoluteUrl(link.href);
						return (
							<li className={`nav-item ${isActive ? 'active' : ''}`} key={link.label}>
								<Link href={link.href} passHref legacyBehavior>
									<a className="nav-link" target={isExternal ? '_blank' : ''}>
										{link.label}
									</a>
								</Link>
							</li>
						);
					})}
				</ul>
			</div>
		</nav>
	);
};

export default Navbar;