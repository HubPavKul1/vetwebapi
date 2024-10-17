import { create } from "zustand";

interface IAnimalListState {
  isAnimalList: boolean;
  animalListOpen: CallableFunction;
  animalListClose: CallableFunction;
}

const useAnimalListStore = create<IAnimalListState>()((set) => ({
  isAnimalList: false,
  animalListOpen: () => set((state) => ({ isAnimalList: true })),
  animalListClose: () => set((state) => ({ isAnimalList: false })),
}));

export default useAnimalListStore;
