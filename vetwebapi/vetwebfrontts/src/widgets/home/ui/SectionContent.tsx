import { contentData } from "entities/home/model/homeContent";
import { CatalogWrapper } from "components/CatalogWrapper";
import { HomePageCard } from "entities/home/ui/HomePageCard";

export function SectionContent() {
  return (
    <CatalogWrapper title="Полезная информация" cardsInRow={4}>
      {contentData.map((item) => (
        <HomePageCard key={item.id} item={item} />
      ))}
    </CatalogWrapper>
  );
}
