import { contentData } from "../../../components/data/HomeContent";
import { HomePageCard } from "../homePageCard/HomePageCard";

import { Catalog } from "../../../components/Catalog";

export function SectionContent() {
  return (
    <Catalog title="Полезная информация" cardsInRow={4} dataLength={contentData.length}>
      {contentData.map((item) => (
        <HomePageCard key={item.id} item={item} />
      ))}
    </Catalog>
  );
}
