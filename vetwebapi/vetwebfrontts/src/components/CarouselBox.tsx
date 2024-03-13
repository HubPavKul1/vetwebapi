import { Carousel } from "react-bootstrap";
import image1 from "/animalsBg.png"
import image2 from "/drugsBg.jpg"
import image3 from "/vetWork1.jpg"



export function CarouselBox() {
    return (
        <Carousel>
            <Carousel.Item>
                <img 
                    className="d-block w-100"
                    src={image1}
                    alt="Animals"
                    height="900"
                />
                <Carousel.Caption>
                    <h3>Владельцы животных</h3>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt eius deserunt dolore autem nulla nobis, praesentium, hic eos sint quaerat magnam soluta nemo amet quam, quo rerum voluptate eligendi atque!</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img 
                    className="d-block w-100"
                    src={image2}
                    alt="Drugs"
                    height="900"
                />
                <Carousel.Caption>
                    <h3>Биопрепараты</h3>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt eius deserunt dolore autem nulla nobis, praesentium, hic eos sint quaerat magnam soluta nemo amet quam, quo rerum voluptate eligendi atque!</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item>
                <img 
                    className="d-block w-100"
                    src={image3}
                    alt="VetWork"
                    height="900"
                />
                <Carousel.Caption>
                    <h3>Противоэпизоотическая работа</h3>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt eius deserunt dolore autem nulla nobis, praesentium, hic eos sint quaerat magnam soluta nemo amet quam, quo rerum voluptate eligendi atque!</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}