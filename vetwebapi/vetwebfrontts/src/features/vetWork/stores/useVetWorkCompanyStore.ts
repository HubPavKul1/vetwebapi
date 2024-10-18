import { create } from "zustand";

interface IVetWorkCompanyState {
  companyId: string;
  setCompanyId: CallableFunction;
}

const useVetWorkCompanyStore = create<IVetWorkCompanyState>()((set) => ({
  companyId: "",
  setCompanyId: (companyId: string) =>
    set((state) => ({ companyId: companyId })),
}));

export default useVetWorkCompanyStore;
