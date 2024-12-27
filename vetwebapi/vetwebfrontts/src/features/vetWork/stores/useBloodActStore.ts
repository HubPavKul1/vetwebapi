import { create } from "zustand";

interface IBloodActState {
  isBloodAct: boolean;
  bloodActOpen: CallableFunction;
  bloodActClose: CallableFunction;
}

const useBloodActStore = create<IBloodActState>()((set) => ({
  isBloodAct: false,
  bloodActOpen: () => set((state) => ({ isBloodAct: true })),
  bloodActClose: () => set((state) => ({ isBloodAct: false })),
}));

export default useBloodActStore;
