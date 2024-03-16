import { Carousel } from "react-bootstrap";

import { carouselItems } from "./CarouselItems";
import { Link } from "react-router-dom";



export function CarouselBox() {
    return (
        <Carousel>
            {carouselItems.map(item => (
                <Carousel.Item key={item.id} style={{"height": "690px"}}>
                    <Link to={item.url}>
                        <img 
                        className="d-block w-100"
                        src={item.imgSrc}
                        alt={item.imgAlt}
                        height="690px"
                    />
                    </Link>
                
                <Carousel.Caption>
                    <h1>{item.title}</h1>
                    <p>{item.description}</p>
                </Carousel.Caption>
            </Carousel.Item>
            ))}

        </Carousel>
    )
}