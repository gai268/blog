import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User } from "./types";
import { UserResponse } from "../../helpers/apis/cmsApi/types";


// Stateの初期化
const initialState = {
    name: "ユーザー名"
} as User;

// Slice = State + Action Creator + Reducer
const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        /**
         * ユーザー情報の読み込み
         */
         userReceived(state, action: PayloadAction<UserResponse>) {
            const userResponse = action.payload;
            state.name = userResponse.name
            state.discription = userResponse.description
            state.avatar = userResponse.avatar
        }
    },
    extraReducers: (builder) => {},
  })

export const { userReceived } = userSlice.actions
export const userReducer = userSlice.reducer