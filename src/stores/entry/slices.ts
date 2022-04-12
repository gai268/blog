import { v4 as uuidv4 } from 'uuid';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { EntriesState, Entry } from "./types";
import { EntriesEntity } from "../../entities/api/EntriesEntity"
import { parseISO } from 'date-fns';
import { addFavorite } from './asyncThunks';

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
        fetchEntries(state, action: PayloadAction<EntriesEntity>) {
            const entries: Record<string, Entry> = {};
            for(const entryEntity of action.payload.entryEntities){
                entries[uuidv4()] = {
                    title: entryEntity.title,
                    body: entryEntity.body,
                    createAt: parseISO(entryEntity.createAt).getTime(),
                    favoritesCount: 0
                };
            }
            state.entries = entries;
            state.count = action.payload.count;
        }
    },
    extraReducers: (builder) => {
        // お気に入り実行後の処理
        builder.addCase(addFavorite.fulfilled, (state, action) => {
            const key = action.payload.entryKey
            state.entries[key].favoritesCount++
        })
      },
  })

export const { fetchEntries } = entrySlice.actions
export const entryReducer = entrySlice.reducer