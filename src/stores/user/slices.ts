import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { User, Link } from "./types";
import dayjs from 'dayjs'
import { Posts, Post } from "../../helpers/cmsApiClient/types";

// Stateの初期化
const initialState = {
    name: "ユーザー名",
    links: {}
} as User;

// Slice = State + Action Creator + Reducer
const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        /**
         * ユーザー情報を読み込む
         */
         readUser(state, action: PayloadAction<Posts>) {
            // const posts: Record<string, Link> = {}
            // for(const content of action.payload.contents){
            //     posts[content.id] = {
            //         id: content.id,
            //         title: content.title,
            //         body: content.content,
            //         publishedAt: dayjs(content.publishedAt).unix(),
            //         favoritesCount: 0,
            //         eyecatch: content.eyecatch ? {
            //             url: content.eyecatch.url,
            //             height: content.eyecatch.height,
            //             width: content.eyecatch.width
            //         } : undefined
            //     };
            // }
            // state.posts = posts
            // state.totalCount = action.payload.totalCount
        }
    },
    extraReducers: (builder) => {},
  })

export const { readUser } = postSlice.actions
export const userReducer = postSlice.reducer