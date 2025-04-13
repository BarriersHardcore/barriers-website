import '../styles/globals.scss';
import Header from '../components/Header';
import Footer from '../components/Footer';
import { AppProps } from 'next/app';
import { Barlow_Condensed } from 'next/font/google';

const barlowCondensed = Barlow_Condensed({
	weight: ['700', '800'],
	style: ['normal'],
	subsets: ['latin'],
  	display: 'swap',
})

function MyApp({ Component, pageProps }: AppProps) {
  	return (
    	<div className={barlowCondensed.className}>
      		<Header /> 
      		<main>
        		<Component {...pageProps} /> {/* Render page content */}
      		</main>
      		<Footer />
    	</div>
  	);
}

export default MyApp;