import { diagnosticsUrl } from "shared/index";
import { VetWorks } from "widgets/vetWork";

export function Diagnostics() {
  const url = diagnosticsUrl;
  const queryKey = "diagnostics";

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
