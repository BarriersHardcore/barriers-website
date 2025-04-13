import Image from 'next/image';
import styles from '../styles/components/Hero.module.scss';

interface HeroProps {
	title: string;
	imageUrl: string;
}

const Hero: React.FC<HeroProps> = ({title, imageUrl}) => {
  	return (
		<section className={styles.heroSection}>
			{imageUrl && (
				<Image
					src={imageUrl || '/images/og-logo.jpg'}
					alt={title || ''}
					fill
					priority={true}
					className={styles.heroImage}
				/>
			)}
			<h1>{title || ''}</h1>
		</section>
  	);
};

export default Hero;