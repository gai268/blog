import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostsResponse } from "../../helpers/apis/cmsApi/types";
import { PostsPagination } from "./types";

// Stateの初期化
const initialState = {
    currentPage: 1,
    totalCount: 0,
    maxPostsPerPage: 10,
} as PostsPagination;

// Slice = State + Action Creator + Reducer
const paginationSlice = createSlice({
    name: 'pagination',
    initialState, // Stateの初期化
    reducers: {
        /**
         * 投稿のページネーション情報の読み込み
         */
         postsPaginationReceived(state, action: PayloadAction<{page : number, postsResponse: PostsResponse}>) {
            const {page, postsResponse} = action.payload;
            state.currentPage = page
            state.totalCount = postsResponse.totalCount
            state.maxPostsPerPage = postsResponse.limit
        }
    },
    extraReducers: (builder) => {},
  })

export const { postsPaginationReceived } = paginationSlice.actions
export const paginationReducer = paginationSlice.reducer