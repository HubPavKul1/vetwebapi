import { create } from "zustand";

interface IActState {
  isAct: boolean;
  actOpen: CallableFunction;
  actClose: CallableFunction;
}

const useActStore = create<IActState>()((set) => ({
  isAct: false,
  actOpen: () => set((state) => ({ isAct: true })),
  actClose: () => set((state) => ({ isAct: false })),
}));

export default useActStore;
