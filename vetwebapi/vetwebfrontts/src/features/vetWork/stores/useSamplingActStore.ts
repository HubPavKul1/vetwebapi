import { create } from "zustand";

interface ISamplingActState {
  isSamplingAct: boolean;
  samplingActOpen: CallableFunction;
  samplingActClose: CallableFunction;
}

const useSamplingActStore = create<ISamplingActState>()((set) => ({
  isSamplingAct: false,
  samplingActOpen: () => set((state) => ({ isSamplingAct: true })),
  samplingActClose: () => set((state) => ({ isSamplingAct: false })),
}));

export default useSamplingActStore;
