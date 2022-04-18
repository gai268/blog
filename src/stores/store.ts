import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { postReducer } from './post/slices'

export function makeStore() {
  return configureStore({
    reducer: {post: postReducer},
  })
}

const store = makeStore()
export type AppState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  AppState,
  unknown,
  Action<string>
>
export default store