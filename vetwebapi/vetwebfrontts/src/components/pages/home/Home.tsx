
import { CarouselBox } from "../../carousel/CarouselBox";
import { SectionContent } from "./SectionContent";
import { Container } from "react-bootstrap";


export function Home() {
    return (  
        <>
        <section id="#carousel" className="carousel">
          <CarouselBox />
        </section>
        <section id="#homepageContent" className="home-content section-offset">
          <SectionContent />
        </section>
        
        </>
            


        
               
       )
}