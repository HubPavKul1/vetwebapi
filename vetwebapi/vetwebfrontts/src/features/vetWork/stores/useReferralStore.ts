import { create } from "zustand";

interface IReferralState {
  isReferral: boolean;
  referralOpen: CallableFunction;
  referralClose: CallableFunction;
}

const useReferralStore = create<IReferralState>()((set) => ({
  isReferral: false,
  referralOpen: () => set((state) => ({ isReferral: true })),
  referralClose: () => set((state) => ({ isReferral: false })),
}));

export default useReferralStore;
