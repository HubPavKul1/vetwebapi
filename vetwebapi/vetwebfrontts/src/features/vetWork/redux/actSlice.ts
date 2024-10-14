import { createSlice } from '@reduxjs/toolkit';

export interface ActState {
  isActOpen: boolean
}

const initialState: ActState = {
  isActOpen: false,
}

export const actSlice = createSlice({
  name: 'isActOpen',
  initialState,
  reducers: {
    actOpen: (state) => {
      state.isActOpen == true
    },
    actClose: (state) => {
      state.isActOpen == false
    }
  }
})

// Action creators are generated for each case reducer function
export const { actOpen, actClose } = actSlice.actions

export default actSlice.reducer