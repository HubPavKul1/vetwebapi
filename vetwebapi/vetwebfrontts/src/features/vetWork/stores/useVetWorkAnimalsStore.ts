import { create } from "zustand";

interface IVetWorkAnimalsState {
  isAnimals: boolean;
  setAnimals: CallableFunction;
  unsetAnimals: CallableFunction;
}

const useVetWorkAnimalsStore = create<IVetWorkAnimalsState>()((set) => ({
  isAnimals: false,
  setAnimals: () => set((state) => ({ isAnimals: true })),
  unsetAnimals: () => set((state) => ({ isAnimals: false })),
}));

export default useVetWorkAnimalsStore;
