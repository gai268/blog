import { v4 as uuidv4 } from 'uuid';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostState, Post } from "./types";
import { parseISO } from 'date-fns';
import { addFavorite } from './asyncThunks';
import { PostsResponse } from '../../pages/api/posts';

// Stateの初期化
const initialState = {
    count: 0,
    posts: {}
} as PostState;

// Slice = State + Action Creator + Reducer
const postSlice = createSlice({
    name: 'article',
    initialState,
    reducers: {
        /**
         * 記事一覧を読み込む
         */
        fetchPosts(state, action: PayloadAction<PostsResponse>) {
            const posts: Record<string, Post> = {};
            for(const postEntity of action.payload.posts){
                posts[uuidv4()] = {
                    title: postEntity.title,
                    body: postEntity.body,
                    createAt: parseISO(postEntity.createAt).getTime(),
                    favoritesCount: 0
                };
            }
            state.posts = posts;
            state.count = action.payload.count;
        }
    },
    extraReducers: (builder) => {
        // お気に入り実行後の処理
        builder.addCase(addFavorite.fulfilled, (state, action) => {
            const key = action.payload.postKey
            state.posts[key].favoritesCount++
        })
      },
  })

export const { fetchPosts } = postSlice.actions
export const postReducer = postSlice.reducer