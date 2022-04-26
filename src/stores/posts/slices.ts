import { createEntityAdapter, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Post } from "./types";
import dayjs from 'dayjs'
import { addFavorite } from './asyncThunks';
import { PostsResponse, PostResponse } from "../../helpers/apis/cmsApi/types";

// Stateのアダプター
const postsAdapter = createEntityAdapter<Post>()

export const postsSelectors = postsAdapter.getSelectors()

// Slice = State + Action Creator + Reducer
const postsSlice = createSlice({
    name: 'posts',
    initialState: postsAdapter.getInitialState(), // Stateの初期化
    reducers: {
        /**
         * 投稿一覧の読み込み
         */
         postsReceived(state, action: PayloadAction<PostsResponse>) {
            // Stateの更新
            postsAdapter.setAll(state, action.payload.contents.map<Post>(content => {
                return {
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
                }
            }))
        },
        /**
         * 記事1件の読み込み
         */
        postReceived(state, action: PayloadAction<PostResponse>) {
            const post: PostResponse = action.payload

            // Stateの更新
            postsAdapter.setAll(state, [{
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
            }])
        }
    },
    extraReducers: (builder) => {
        // お気に入り実行後の処理
        builder.addCase(addFavorite.fulfilled, (state, action) => {
            const postId = action.payload.postId
            const post = postsSelectors.selectById(state, postId);
            if(post){
                // お気に入り数を+1に更新
                postsAdapter.updateOne(state, {
                    id: postId, 
                    changes: { favoritesCount: post.favoritesCount + 1}})
            }
        })
      },
  })

export const { postsReceived, postReceived } = postsSlice.actions
export const postsReducer = postsSlice.reducer