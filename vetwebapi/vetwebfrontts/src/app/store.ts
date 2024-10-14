import { configureStore } from '@reduxjs/toolkit'
import isActOpen from '../features/vetWork/slices/actSlice'
import vetWork from "../features/vetWork/slices/vetWorkSlice"

export const store = configureStore({
  reducer: {
    isActOpen,
    vetWork,

  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch