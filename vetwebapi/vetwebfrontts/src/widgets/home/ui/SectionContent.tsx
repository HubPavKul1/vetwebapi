import { contentData } from "entities/home/model/homeContent";
import { HomePageCard } from "entities/home/ui/HomePageCard";
import { HomeContentWrapper } from "entities/home";

export function SectionContent() {
  return (
    <HomeContentWrapper title="Полезная информация">
      {contentData.map((item) => (
        <HomePageCard key={item.id} item={item} />
      ))}
    </HomeContentWrapper>
  );
}
