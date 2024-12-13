import { VetWorkQueryKeys } from "shared/constants/vetworkConst";
import { treatmentsUrl } from "shared/index";
import { VetWorks } from "widgets/vetWork";

export function Treatments() {
  const url = treatmentsUrl;
  const queryKey = VetWorkQueryKeys.treatments;
  return (
    <VetWorks
      url={url}
      imgSrc="/treatment.jpg"
      title="Обработки"
      btnTitle="Добавить обработку"
      queryKey={queryKey}
    />
  );
}
