import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Entry, EntriesState } from "./types";

// Stateの初期化
const initialState = {
    count: 0,
    entries: {}
} as EntriesState;

// Slice = State + Action Creator + Reducer
const entrySlice = createSlice({
    name: 'article',
    initialState,
    reducers: {
        /**
         * 記事一覧を読み込む
         */
        fetchArticles(state, action: PayloadAction<Entry[]>) {
            const entries: Record<symbol, Entry> = {}
            for(const post of action.payload){
                entries[Symbol()] = post;
            }
            state.entries = entries;
        }
    },
  })

export const { fetchArticles } = entrySlice.actions
export const entryReducer = entrySlice.reducer