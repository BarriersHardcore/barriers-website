import React, { useState, useEffect } from 'react';
import { Carousel } from 'react-bootstrap';
import Image from 'next/image';
import dynamic from 'next/dynamic';
import carouselData from '../data/carouselData.json';

// Define types for the data
interface CarouselItem {
    title: string;
	subtitle: string;
    image: string;
	bcId: string;
	href: string;
}

const BandcampIframe = dynamic(() => import('./BandcampIframe'), { ssr: false });

const CarouselComponent: React.FC = () => {
  	const [carouselItems, setCarouselItems] = useState<CarouselItem[]>(carouselData);

  	useEffect(() => {
    	setCarouselItems(carouselData);
  	}, []);

  	return (
    	<Carousel>
      		{carouselItems.map((item, index) => (
				<Carousel.Item key={index}>
					<div className="carousel-image">
						<Image
							src={item.image}
							alt={item.title}
							layout="fill"
							objectFit="cover"
						/>
					</div>
					<Carousel.Caption>
						<h3>{item.title}<br/> <span>{item.subtitle}</span></h3>
						<BandcampIframe bcId={item.bcId} href={item.href} />
					</Carousel.Caption>
				</Carousel.Item>
			))}
    	</Carousel>
  	);
};

export default CarouselComponent;