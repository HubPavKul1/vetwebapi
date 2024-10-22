import { create } from "zustand";

interface IReceiptPDFState {
  isReceiptPDF: boolean;
  receiptPdfOpen: CallableFunction;
  receiptPdfClose: CallableFunction;
}

const useReceiptPDFStore = create<IReceiptPDFState>()((set) => ({
  isReceiptPDF: false,
  receiptPdfOpen: () => set((state) => ({ isReceiptPDF: true })),
  receiptPdfClose: () => set((state) => ({ isReceiptPDF: false })),
}));

export default useReceiptPDFStore;
