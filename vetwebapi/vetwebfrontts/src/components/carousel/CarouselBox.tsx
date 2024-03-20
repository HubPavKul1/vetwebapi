import { Carousel } from "react-bootstrap";

import { carouselItems } from "./CarouselItems";
import { Link } from "react-router-dom";
import { MdKeyboardDoubleArrowLeft, MdKeyboardArrowRight, MdKeyboardDoubleArrowRight } from "react-icons/md";


export function CarouselBox() {
    const myPrevIcon = <span style={{height: "32px", width: "32px"}}><MdKeyboardDoubleArrowLeft/></span>
    const myNextIcon = <span><MdKeyboardDoubleArrowRight/></span>

    return (
        <Carousel className="home-carousel flex" variant="dark">
            {carouselItems.map(item => (
                <Carousel.Item key={item.id} className="home-carousel-item">
                    <Link to={item.url}>
                        <img 
                        className="home-carousel-image"
                        src={item.imgSrc}
                        alt={item.imgAlt}
                    />
                    </Link>
                
                    <Carousel.Caption className="home-carousel-caption">
                        <h1 className="home-carousel-caption-title">{item.title}</h1>
                        <p className="home-carousel-caption-desc">{item.description}</p>
                    </Carousel.Caption>
                </Carousel.Item>
            ))}

        </Carousel>
    )
}