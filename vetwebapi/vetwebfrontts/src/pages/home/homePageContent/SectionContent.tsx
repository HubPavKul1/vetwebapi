import { contentData } from "../../../components/data/HomeContent";
import { HomePageCard } from "../homePageCard/HomePageCard";

import { Catalog } from "../../../components/Catalog";

export function SectionContent() {
  return (
    <Catalog title="Вет учреждения" cardsInRow={4}>
      {contentData.map((item) => (
        <HomePageCard key={item.id} item={item} />
      ))}
    </Catalog>
  );
}
