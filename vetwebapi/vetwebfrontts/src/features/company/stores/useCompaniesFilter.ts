import { create } from "zustand";

interface ICompaniesFilterState {
  animalGroup: number;
  setAnimalGroup: CallableFunction;
}

const useCompaniesFilter = create<ICompaniesFilterState>()((set) => ({
  animalGroup: 0,
  setAnimalGroup: (animalGroupId: number) =>
    set((state) => ({ animalGroup: animalGroupId })),
}));

export default useCompaniesFilter;
