import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Site } from "./types";
import { SiteResponse } from "../../helpers/apis/cmsApi/types";


// Stateの初期化
const initialState = {
    siteName: "No Title"
} as Site;

// Slice = State + Action Creator + Reducer
const siteSlice = createSlice({
    name: 'site',
    initialState,
    reducers: {
        /**
         * サイト情報の読み込み
         */
         siteReceived(state, action: PayloadAction<SiteResponse>) {
            const siteResponse = action.payload;
            state.siteName = siteResponse.siteName
            state.siteDescription = siteResponse.siteDescription
        }
    },
    extraReducers: (builder) => {},
  })

export const { siteReceived } = siteSlice.actions
export const siteReducer = siteSlice.reducer