import { create } from "zustand";

interface IVetWorkFilterState {
  diseaseId: number;
  setDiseaseId: CallableFunction;
  stateAssignment: boolean | undefined;
  setStateAssignment: CallableFunction;
  setNoStateAssignment: CallableFunction;
  unsetStateAssignment: CallableFunction;
}

const useVetWorkFilter = create<IVetWorkFilterState>()((set) => ({
  diseaseId: 0,
  stateAssignment: undefined,
  setDiseaseId: (diseaseId: number) =>
    set((state) => ({ diseaseId: diseaseId })),
  setStateAssignment: () => set((state) => ({ stateAssignment: true })),
  setNoStateAssignment: () => set((state) => ({ stateAssignment: false })),
  unsetStateAssignment: () => set((state) => ({ stateAssignment: undefined })),

}));

export default useVetWorkFilter;
