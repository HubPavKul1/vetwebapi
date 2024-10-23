import { IDateRange } from "shared/index";
import { create } from "zustand";

interface IReportState {
  dateRange: IDateRange;
  isReportActive: boolean;
  isReportPDF: boolean;
  reportData: object;
  setDateRange: CallableFunction;
  setReportActive: CallableFunction;
  setReportInactive: CallableFunction;
  setReportData: CallableFunction;
  showReportPDF: CallableFunction;
  closeReportPDF: CallableFunction;
}

const useReportStore = create<IReportState>()((set) => ({
  dateRange: { date_start: "", date_end: "" },
  isReportActive: false,
  isReportPDF: false,
  reportData: {},
  setDateRange: (dateRange: IDateRange) =>
    set((state) => ({ dateRange: dateRange })),
  setReportActive: () => set((state) => ({ isReportActive: true })),
  setReportInactive: () => set((state) => ({ isReportActive: false })),
  setReportData: (reportData: object) =>
    set((state) => ({ reportData: reportData })),
  showReportPDF: () => set((state) => ({ isReportPDF: true })),
  closeReportPDF: () => set((state) => ({ isReportPDF: false })),
}));

export default useReportStore;
