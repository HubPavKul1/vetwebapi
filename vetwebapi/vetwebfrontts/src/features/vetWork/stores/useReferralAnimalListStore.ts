import { create } from "zustand";

interface IReferralAnimalListState {
  isReferralAnimalList: boolean;
  referralAnimalListOpen: CallableFunction;
  referralAnimalListClose: CallableFunction;
}

const useReferralAnimalListStore = create<IReferralAnimalListState>()(
  (set) => ({
    isReferralAnimalList: false,
    referralAnimalListOpen: () =>
      set((state) => ({ isReferralAnimalList: true })),
    referralAnimalListClose: () =>
      set((state) => ({ isReferralAnimalList: false })),
  })
);

export default useReferralAnimalListStore;
