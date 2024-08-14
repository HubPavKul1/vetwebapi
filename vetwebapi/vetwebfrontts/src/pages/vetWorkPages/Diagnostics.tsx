import { VetWorkCreateForm } from "../../components/vetWorks/VetWorkCreateForm";
import { diagnosticsUrl } from "../../urls/vetWorkUrls";
import { VetWorks } from "./VetWorks";

export function Diagnostics() {
  const url = diagnosticsUrl;
  const queryKey = "diagnostics";
  return (
    <VetWorks
      url={url}
      createForm={<VetWorkCreateForm url={url} queryKey={queryKey} />}
      imgSrc="/diagnostic.jpg"
      title="Диагностические исследования"
      btnTitle="Добавить диагностику"
      queryKey={queryKey}
    />
  );
}
