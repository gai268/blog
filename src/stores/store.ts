import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { linksReducer } from './links/slices'
import { postsReducer } from './posts/slices'
import { siteReducer } from './site/slices'
import { userReducer } from './user/slices'

export function makeStore() {
  return configureStore({
    reducer: {
      posts: postsReducer,
      user: userReducer,
      links: linksReducer,
      site: siteReducer
    },
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