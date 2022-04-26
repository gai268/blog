import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { LinkResponse } from "../../helpers/apis/cmsApi/types";
import { Link } from "./types";

// Stateのアダプター
const linksAdapter = createEntityAdapter<Link>()

export const linksSelectors = linksAdapter.getSelectors()

// Slice = State + Action Creator + Reducer
const linksSlice = createSlice({
    name: 'links',
    initialState: linksAdapter.getInitialState(), // Stateの初期化
    reducers: {
        /**
         * 関連リンク一覧の読み込み
         */
         linksReceived(state, action: PayloadAction<LinkResponse[]>) {
            // Stateの更新
            linksAdapter.setAll(state, action.payload.map<Link>((linkResponse, index) => {
                return {
                    id: index,
                    url: linkResponse.url,
                    text: linkResponse.text,
                    icon: linkResponse.icon
                }
            }))
        }
    }
})

export const { linksReceived } = linksSlice.actions
export const linksReducer = linksSlice.reducer