import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { State, PostState } from "./types";
import dayjs from 'dayjs'
import { addFavorite } from './asyncThunks';
import { Posts, Post } from "../../helpers/cmsApi/types";

// Stateの初期化
const initialState = {
    totalCount: 0,
    posts: {}
} as State;

// Slice = State + Action Creator + Reducer
const postSlice = createSlice({
    name: 'post',
    initialState,
    reducers: {
        /**
         * 記事一覧を読む
         */
         readPosts(state, action: PayloadAction<Posts>) {
            const posts: Record<string, PostState> = {}
            for(const content of action.payload.contents){
                posts[content.id] = {
                    id: content.id,
                    title: content.title,
                    body: content.content,
                    publishedAt: dayjs(content.publishedAt).unix(),
                    favoritesCount: 0,
                    eyecatch: content.eyecatch ? {
                        url: content.eyecatch.url,
                        height: content.eyecatch.height,
                        width: content.eyecatch.width
                    } : undefined
                };
            }
            state.posts = posts
            state.totalCount = action.payload.totalCount
        },
        /**
         * 記事詳細を読む
         */
        readPost(state, action: PayloadAction<Post>) {
            const posts: Record<string, PostState> = {}
            const post: Post = action.payload
            posts[post.id] = {
                id: post.id,
                title: post.title,
                body: post.content,
                publishedAt: dayjs(post.publishedAt).unix(),
                favoritesCount: 0,
                eyecatch: post.eyecatch ? {
                    url: post.eyecatch.url,
                    height: post.eyecatch.height,
                    width: post.eyecatch.width
                } : undefined
            };
            state.posts = posts
            state.totalCount = 1
        }
    },
    extraReducers: (builder) => {
        // お気に入り実行後の処理
        builder.addCase(addFavorite.fulfilled, (state, action) => {
            const postId = action.payload.postId
            state.posts[postId].favoritesCount++
        })
      },
  })

export const { readPosts, readPost } = postSlice.actions
export const postReducer = postSlice.reducer