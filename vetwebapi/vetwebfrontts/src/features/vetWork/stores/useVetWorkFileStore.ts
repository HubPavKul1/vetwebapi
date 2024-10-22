import { create } from "zustand";

interface IVetWorkFileState {
  isFile: boolean;
  fileOpen: CallableFunction;
  fileClose: CallableFunction;
}

const useVetWorkFileStore = create<IVetWorkFileState>()((set) => ({
  isFile: false,
  fileOpen: () => set((state) => ({ isFile: true })),
  fileClose: () => set((state) => ({ isFile: false })),
}));

export default useVetWorkFileStore;
