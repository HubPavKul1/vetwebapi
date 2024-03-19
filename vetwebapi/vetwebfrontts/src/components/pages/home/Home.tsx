
import { CarouselBox } from "../../carousel/CarouselBox";
import { SectionContent } from "./SectionContent";
import { Container } from "react-bootstrap";


export function Home() {
    return (  
        <>
        <section id="#carousel" className="carousel">
          <Container>
              <CarouselBox />
          </Container>
        </section>
        <section id="#homepageContent" className="homepageContent">
          <SectionContent />
        </section>
        
        </>
            


        
               
       )
}