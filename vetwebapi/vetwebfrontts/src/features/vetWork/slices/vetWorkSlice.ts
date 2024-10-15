import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IVetWorkSchema } from "entities/vetWork";

export interface VetWorkState {
  vetWork: IVetWorkSchema | null;
}

const initialState: VetWorkState = {
  vetWork: null,
};

export const vetWorkSlice = createSlice({
  name: "vetWork",
  initialState,
  reducers: {
    setVetWork: (state, action: PayloadAction<IVetWorkSchema>) => {
      state.vetWork = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setVetWork } = vetWorkSlice.actions;

export default vetWorkSlice.reducer;
