import { create } from "zustand";
import { ICompanyVetWorksReport } from "../models/interfaces";

interface ICompanyVetWorksDataState {
  isReportActive: boolean;
  isReportPDF: boolean;
  vetWorksData: ICompanyVetWorksReport[];
  setReportActive: CallableFunction;
  setReportInactive: CallableFunction;
  setVetWorksData: CallableFunction;
  showReportPDF: CallableFunction;
  closeReportPDF: CallableFunction;
}

const useCompanyVetWorksDataStore = create<ICompanyVetWorksDataState>()(
  (set) => ({
    vetWorksData: [],
    isReportActive: false,
    isReportPDF: false,

    setVetWorksData: (reportData: ICompanyVetWorksReport[]) =>
      set((state) => ({ vetWorksData: [...reportData] })),
    setReportActive: () => set((state) => ({ isReportActive: true })),
    setReportInactive: () => set((state) => ({ isReportActive: false })),
    showReportPDF: () => set((state) => ({ isReportPDF: true })),
    closeReportPDF: () => set((state) => ({ isReportPDF: false })),
  })
);

export default useCompanyVetWorksDataStore;
