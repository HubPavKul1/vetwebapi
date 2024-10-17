import { create } from "zustand";

interface IAccountingActState {
  isAccountingAct: boolean;
  actOpen: CallableFunction;
  actClose: CallableFunction;
}

const useAccountingActStore = create<IAccountingActState>()((set) => ({
  isAccountingAct: false,
  actOpen: () => set((state) => ({ isAccountingAct: true })),
  actClose: () => set((state) => ({ isAccountingAct: false })),
}));

export default useAccountingActStore;
