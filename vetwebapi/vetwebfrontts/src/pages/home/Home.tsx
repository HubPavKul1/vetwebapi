
import { CarouselBox } from "../../components/carousel/CarouselBox";
import { SectionContent } from "./homePageContent/SectionContent";


export function Home() {
    return (  
        <>
        <section id="#carousel" className="carousel">
          <CarouselBox />
        </section>
        <section id="#home-сontent" className="home-content section-offset">
          <SectionContent />
        </section>
        
        </>
               
       )
}