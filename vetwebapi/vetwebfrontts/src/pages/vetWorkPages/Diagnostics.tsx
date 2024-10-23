import { VetWorkQueryKeys } from "shared/constants/vetworkConst";
import { diagnosticsUrl } from "shared/index";
import { VetWorks } from "widgets/vetWork";

export function Diagnostics() {
  const url = diagnosticsUrl;
  const queryKey = VetWorkQueryKeys.diagnostics;

  return (
    <VetWorks
      url={url}
      imgSrc="/diagnostic.jpg"
      title="Диагностические исследования"
      btnTitle="Добавить диагностику"
      queryKey={queryKey}
    />
  );
}
