import { Carousel, CarouselItem, CarouselCaption } from "react-bootstrap";

import { carouselItems } from "../model/carouselItems";
import { Link } from "react-router-dom";
import { IoIosArrowDropleft, IoIosArrowDropright } from "react-icons/io";

export function CarouselBox() {
  return (
    <Carousel
      data-bs-theme="dark"
      prevIcon={
        <IoIosArrowDropleft
          size={50}
          className="text-slate-500 rounded-full hover:scale-110 transition-transform duration-300 ease-in-out"
        />
      }
      nextIcon={
        <IoIosArrowDropright
          size={50}
          className="text-slate-500 rounded-full hover:scale-110 transition-transform duration-300 ease-in-out"
        />
      }
      className="carousel"
    >
      {carouselItems.map((item) => (
        <CarouselItem key={item.id} className="w-full h-[650px]">
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
