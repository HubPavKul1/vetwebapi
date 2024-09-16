import { CarouselBox } from "entities/home/ui/CarouselBox";
import { SectionContent } from "widgets/home/ui/SectionContent";

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
  );
}
