import { DiseaseSelectFilter } from "./selectData/DiseaseSelectFilter";
import useVetWorkFilterStore from "../stores/useVetWorkFilterStore";
import { allFilterButton, FilterButton, stateAssignmentFilterButtons } from "shared/index";

export function VetWorkFilterButtons() {
  const setDiseaseId = useVetWorkFilterStore((state) => state.setDiseaseId);
  const diseaseId = useVetWorkFilterStore((state) => state.diseaseId);
  const stateAssignment = useVetWorkFilterStore(
    (state) => state.stateAssignment
  );
  const setStateAssignment = useVetWorkFilterStore(
    (state) => state.setStateAssignment
  );
  const unsetStateAssignment = useVetWorkFilterStore(
    (state) => state.unsetStateAssignment
  );
  
  const chooseAll = () => {
    setDiseaseId(0);
    unsetStateAssignment();
  };

  const chooseStateAssignment = (item: { id: boolean; name: string }) => {
    setStateAssignment(item.id);
  };
  return (
    <div className="flex mb-5">
      <FilterButton
        item={allFilterButton}
        clickFunc={() => chooseAll()}
        activeId={diseaseId}
      />
      <DiseaseSelectFilter />
      {stateAssignmentFilterButtons.map((item) => (
        <FilterButton
          item={item}
          clickFunc={() => chooseStateAssignment(item)}
          activeId={stateAssignment}
        />
      ))}
    </div>
  );
}
