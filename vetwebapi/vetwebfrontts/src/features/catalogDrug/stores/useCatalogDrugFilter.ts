import { create } from "zustand";

interface ICatalogDrugFilterState {
  disease: string;
  setDisease: CallableFunction;
}

const useCatalogDrugFilter = create<ICatalogDrugFilterState>()((set) => ({
  disease: "",
  setDisease: (disease: string) => set((state) => ({ disease: disease })),
}));

export default useCatalogDrugFilter;
