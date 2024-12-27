import { FilterButton } from "shared/ui/FilterButton";
import { DiseaseSelectFilter } from "./selectData/DiseaseSelectFilter";
import useVetWorkFilterStore from "../stores/useVetWorkFilterStore";
import { IBase } from "shared/index";

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
  const all: IBase = { id: 0, name: "Все" };
  const stateAssignmentButtons = [
    { id: true, name: "Госзадание" },
    { id: false, name: "Не госзадание" },
  ];
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
        item={all}
        clickFunc={() => chooseAll()}
        activeId={diseaseId}
      />
      <DiseaseSelectFilter />
      {stateAssignmentButtons.map((item) => (
        <FilterButton
          item={item}
          clickFunc={() => chooseStateAssignment(item)}
          activeId={stateAssignment}
        />
      ))}
    </div>
  );
}
