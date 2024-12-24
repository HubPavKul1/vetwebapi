import { create } from "zustand";

interface ICompaniesFilterState {
  animalGroup: string;
  setAnimalGroup: CallableFunction;
}

const useCompaniesFilter = create<ICompaniesFilterState>()((set) => ({
  animalGroup: "",
  setAnimalGroup: (animalGroup: string) =>
    set((state) => ({ animalGroup: animalGroup })),
}));

export default useCompaniesFilter;
