import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { entryReducer } from './entry/slices'

export function makeStore() {
  return configureStore({
    reducer: {entry: entryReducer},
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