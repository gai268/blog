import { v4 as uuidv4 } from 'uuid';
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { PostState, Post } from "./types";
import { parseISO } from 'date-fns';
import { addFavorite } from './asyncThunks';
import { PostsResponse } from '../../pages/api/posts';
import { PostResponse } from '../../pages/api/posts/[postId]';

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
         * 記事一覧を読む
         */
         readPosts(state, action: PayloadAction<PostsResponse>) {
            const posts: Record<string, Post> = {}
            for(const post of action.payload.posts){
                posts[post.id] = {
                    id: post.id,
                    title: post.title,
                    body: post.body,
                    createAt: parseISO(post.createAt).getTime(),
                    favoritesCount: 0
                };
            }
            state.posts = posts
            state.count = action.payload.count
        },
        /**
         * 記事詳細を読む
         */
        readPost(state, action: PayloadAction<PostResponse>) {
            const posts: Record<string, Post> = {}
            const post: PostResponse = action.payload
            posts[post.id] = {
                id: post.id,
                title: post.title,
                body: post.body,
                createAt: parseISO(post.createAt).getTime(),
                favoritesCount: 0
            };
            state.posts = posts
            state.count = 1
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