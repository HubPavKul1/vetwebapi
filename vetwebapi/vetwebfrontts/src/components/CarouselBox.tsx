import { Carousel } from "react-bootstrap";
import image1 from "/animalsBg.png"
import image2 from "/drugsBg.jpg"
import image3 from "/vetWork1.jpg"



export function CarouselBox() {
    return (
        <Carousel>
            <Carousel.Item style={{"height": "660px"}}>
                <img 
                    className="d-block w-100"
                    src={image1}
                    alt="Animals"
                    height="900"
                />
                <Carousel.Caption>
                    <h2>Владельцы животных</h2>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt eius deserunt dolore autem nulla nobis, praesentium, hic eos sint quaerat magnam soluta nemo amet quam, quo rerum voluptate eligendi atque!</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item style={{"height": "660px"}}>
                <img 
                    className="d-block w-100"
                    src={image2}
                    alt="Drugs"
                    height="900"
                />
                <Carousel.Caption>
                    <h2>Биопрепараты</h2>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt eius deserunt dolore autem nulla nobis, praesentium, hic eos sint quaerat magnam soluta nemo amet quam, quo rerum voluptate eligendi atque!</p>
                </Carousel.Caption>
            </Carousel.Item>
            <Carousel.Item style={{"height": "660px"}}>
                <img 
                    className="d-block w-100"
                    src={image3}
                    alt="VetWork"
                    height="900"
                />
                <Carousel.Caption>
                    <h2>Противоэпизоотическая работа</h2>
                    <p>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Sunt eius deserunt dolore autem nulla nobis, praesentium, hic eos sint quaerat magnam soluta nemo amet quam, quo rerum voluptate eligendi atque!</p>
                </Carousel.Caption>
            </Carousel.Item>
        </Carousel>
    )
}