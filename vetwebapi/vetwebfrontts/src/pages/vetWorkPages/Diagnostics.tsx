import { CatalogWrapper } from "components/CatalogWrapper";
import { diagnosticsUrl } from "../../urls/vetWorkUrls";
import { VetWorkCreateForm } from "components/vetWorks/VetWorkCreateForm";

export function Diagnostics() {
  const url = diagnosticsUrl;
  const queryKey = "diagnostics";

  return (
    <CatalogWrapper 
      url={url}
      imgSrc="/diagnostic.jpg"
      title="Диагностические исследования"
      btnTitle="Добавить диагностику"
      queryKey={queryKey}
      cardsInRow={3}
      createForm={<VetWorkCreateForm url={url} queryKey={`${queryKey}1`}/>}
    />
  );
}
