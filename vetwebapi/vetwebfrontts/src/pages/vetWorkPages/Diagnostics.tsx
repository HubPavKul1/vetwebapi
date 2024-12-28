import useVetWorkFilterStore from "features/vetWork/stores/useVetWorkFilterStore";
import { VetWorkQueryKeys } from "shared/constants/vetworkConst";
import { diagnosticsUrl } from "shared/index";
import { VetWorks } from "widgets/vetWork";

export function Diagnostics() {
  const diseaseId = useVetWorkFilterStore((state) => state.diseaseId);
  const stateAssignment = useVetWorkFilterStore(
    (state) => state.stateAssignment
  );

  const url =
    stateAssignment === undefined
      ? `${diagnosticsUrl}?disease_id=${diseaseId}`
      : `${diagnosticsUrl}?disease_id=${diseaseId}&state_assignment=${stateAssignment}`;

  const queryKey =
    VetWorkQueryKeys.diagnostics + diseaseId.toString() + `${stateAssignment}`;

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
