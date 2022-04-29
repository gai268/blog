import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit'
import { linksReducer } from './links/slices'
import { paginationReducer } from './pagination/slices'
import { postsReducer } from './posts/slices'
import { siteReducer } from './site/slices'
import { userReducer } from './user/slices'

export function makeStore() {
  // Reference: https://redux-toolkit.js.org/api/configureStore
  return configureStore({
    reducer: {
      posts: postsReducer,
      user: userReducer,
      links: linksReducer,
      site: siteReducer,
      pagination: paginationReducer
    },
    // The Redux DevTools Extension is disabled for production
    devTools: process.env.NODE_ENV !== 'production',
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