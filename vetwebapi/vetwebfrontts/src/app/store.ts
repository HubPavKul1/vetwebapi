import { configureStore } from '@reduxjs/toolkit'
import actSliceReducer from '../features/vetWork/redux/actSlice'

export const store = configureStore({
  reducer: {
    isActOpen: actSliceReducer
  }
})

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch