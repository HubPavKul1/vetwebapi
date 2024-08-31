import { contentData } from "data/HomeContent";
import { HomePageCard } from "../homePageCard/HomePageCard";
import { CatalogWrapper } from "components/CatalogWrapper";

export function SectionContent() {
  return (
    <CatalogWrapper title="Полезная информация" cardsInRow={4}>
      {contentData.map((item) => (
        <HomePageCard key={item.id} item={item} />
      ))}
    </CatalogWrapper>
  );
}
