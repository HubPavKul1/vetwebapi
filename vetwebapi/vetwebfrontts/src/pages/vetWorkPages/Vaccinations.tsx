import useVetWorkFilterStore from "features/vetWork/stores/useVetWorkFilterStore";
import { VetWorkQueryKeys } from "shared/constants/vetworkConst";
import { vaccinationsUrl } from "shared/index";
import { VetWorks } from "widgets/vetWork";

export function Vaccinations() {
  const diseaseId = useVetWorkFilterStore((state) => state.diseaseId);
  const stateAssignment = useVetWorkFilterStore(
    (state) => state.stateAssignment
  );

  const url =
    stateAssignment === undefined
      ? `${vaccinationsUrl}?disease_id=${diseaseId}`
      : `${vaccinationsUrl}?disease_id=${diseaseId}&state_assignment=${stateAssignment}`;

  const queryKey =
    VetWorkQueryKeys.vaccinations + diseaseId.toString() + `${stateAssignment}`;

  return (
    <VetWorks
      url={url}
      imgSrc="/vaccination.png"
      title="Вакцинации"
      btnTitle="Добавить вакцинацию"
      queryKey={queryKey}
    />
  );
}
