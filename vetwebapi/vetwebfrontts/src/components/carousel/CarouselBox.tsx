import { Carousel, CarouselItem, CarouselCaption } from "react-bootstrap";

import { carouselItems } from "./CarouselItems";
import { Link } from "react-router-dom";

import styles from "./Carousel.module.scss"

export function CarouselBox() {

        return (
            <Carousel variant="dark">
                {carouselItems.map(item => (
                    <CarouselItem key={item.id} className={styles.carouselItem}>
                        <Link to={item.url}>
                            <img 
                                className={styles.carouselImage}
                                src={item.imgSrc}
                                alt={item.imgAlt}
                             />
                        </Link>
                    
                        <CarouselCaption className={styles.carouselCaption}>
                            <h1 className={styles.captionTitle}>{item.title}</h1>
                            <p className={styles.captionDesc}>{item.description}</p>
                        </CarouselCaption>
                    </CarouselItem>
                ))}
    
            </Carousel>
        )
    
}