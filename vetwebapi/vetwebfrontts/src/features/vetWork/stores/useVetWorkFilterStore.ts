import { create } from "zustand";

interface IVetWorkFilterStoreState {
  diseaseId: number;
  setDiseaseId: CallableFunction;
  stateAssignment: boolean | undefined;
  setStateAssignment: CallableFunction;
  unsetStateAssignment: CallableFunction;
}

const useVetWorkFilterStore = create<IVetWorkFilterStoreState>()((set) => ({
  diseaseId: 0,
  stateAssignment: undefined,
  setDiseaseId: (diseaseId: number) =>
    set((state) => ({ diseaseId: diseaseId })),
  setStateAssignment: (stateAssignment: boolean) =>
    set((state) => ({ stateAssignment: stateAssignment })),
  unsetStateAssignment: () => set((state) => ({ stateAssignment: undefined })),
}));

export default useVetWorkFilterStore;
