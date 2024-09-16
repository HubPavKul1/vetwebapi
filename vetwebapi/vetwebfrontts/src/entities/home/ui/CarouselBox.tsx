import { Carousel, CarouselItem, CarouselCaption } from "react-bootstrap";

import { carouselItems } from "../model/carouselItems";
import { Link } from "react-router-dom";

export function CarouselBox() {
  return (
    <Carousel variant="dark">
      {carouselItems.map((item) => (
        <CarouselItem key={item.id} className="carousel">
          <Link to={item.url}>
            <img src={item.imgSrc} alt={item.imgAlt} />
          </Link>

          <CarouselCaption className="carousel-caption">
            <h1>{item.title}</h1>
            <p>{item.description}</p>
          </CarouselCaption>
        </CarouselItem>
      ))}
    </Carousel>
  );
}
