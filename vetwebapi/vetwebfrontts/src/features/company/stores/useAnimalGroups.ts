import { create } from "zustand";

interface IAnimalGroupsState {
  animalGroups: string[];
  setAnimalGroups: CallableFunction;
}

const useAnimalGroups = create<IAnimalGroupsState>()((set) => ({
  animalGroups: [],
  setAnimalGroups: (animalGroups: string[]) =>
    set((state) => ({ animalGroups: animalGroups })),
}));

export default useAnimalGroups;
