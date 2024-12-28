import useVetWorkFilterStore from "features/vetWork/stores/useVetWorkFilterStore";
import { VetWorkQueryKeys } from "shared/constants/vetworkConst";
import { treatmentsUrl } from "shared/index";
import { VetWorks } from "widgets/vetWork";

export function Treatments() {
  const diseaseId = useVetWorkFilterStore((state) => state.diseaseId);
  const stateAssignment = useVetWorkFilterStore(
    (state) => state.stateAssignment
  );

  const url =
    stateAssignment === undefined
      ? `${treatmentsUrl}?disease_id=${diseaseId}`
      : `${treatmentsUrl}?disease_id=${diseaseId}&state_assignment=${stateAssignment}`;

  const queryKey =
    VetWorkQueryKeys.treatments + diseaseId.toString() + `${stateAssignment}`;

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
