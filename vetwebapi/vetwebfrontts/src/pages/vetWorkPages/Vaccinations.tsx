import { CatalogWrapper } from "components/CatalogWrapper";
import { vaccinationsUrl } from "../../shared/urls/vetWorkUrls";
import { VetWorkCreateForm } from "components/vetWorks/VetWorkCreateForm";

export function Vaccinations() {
  const url = vaccinationsUrl;
  const queryKey = "vaccinations";
  return (
    <CatalogWrapper
      url={url}
      imgSrc="/vetworkBg.jpg"
      title="Вакцинации"
      btnTitle="Добавить вакцинацию"
      queryKey={queryKey}
      cardsInRow={3}
      createForm={<VetWorkCreateForm url={url} queryKey={`${queryKey}1`} />}
    />
  );
}
