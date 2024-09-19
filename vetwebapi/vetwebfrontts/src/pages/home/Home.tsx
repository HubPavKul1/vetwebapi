import { CarouselBox } from "entities/home";
import { SectionContent } from "widgets/home";

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
