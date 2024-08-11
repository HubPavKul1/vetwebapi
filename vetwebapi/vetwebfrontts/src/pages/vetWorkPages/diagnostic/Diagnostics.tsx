import { VetWorkCreateForm } from "../../../components/vetWorks/VetWorkCreateForm";
import { VetWorks } from "../VetWorks";

export function Diagnostics() {
  const url = "/api/vetwork/diagnostics";
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
