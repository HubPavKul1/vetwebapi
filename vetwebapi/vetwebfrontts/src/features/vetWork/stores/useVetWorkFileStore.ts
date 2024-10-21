import { create } from "zustand";

interface IVetWorkFileState {
  isFile: boolean;
  fileId: number;
  fileOpen: CallableFunction;
  fileClose: CallableFunction;
  setFileId: CallableFunction;
}

const useVetWorkFileStore = create<IVetWorkFileState>()((set) => ({
  isFile: false,
  fileId: 0,
  fileOpen: () => set((state) => ({ isFile: true })),
  fileClose: () => set((state) => ({ isFile: false })),
  setFileId: (fileId: number) => set((state) => ({fileId: fileId}))
}));

export default useVetWorkFileStore;
