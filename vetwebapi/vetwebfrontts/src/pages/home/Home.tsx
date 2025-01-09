import { CarouselBox } from "entities/home";
import { PageWrapper } from "shared/index";
import { SectionContent } from "widgets/home";

export function Home() {
  return (
    <PageWrapper>
      <section id="#carousel" className="carousel">
        <CarouselBox />
      </section>
      <section id="#home-сontent" className="home-content section-offset">
        <SectionContent />
      </section>
    </PageWrapper>
  );
}
