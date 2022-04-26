import { PostResponse, PostsResponse, UserResponse } from './types'
import axios, { AxiosRequestHeaders } from 'axios';
import axiosRetry from 'axios-retry';

const client = axios.create({ 
    baseURL: `${process.env.CMS_API_ENDPOINT}`,
    headers: (() => {
        const headers: AxiosRequestHeaders = {};
        if(process.env.CMS_API_KEY_HEADER_NAME){
            headers[process.env.CMS_API_KEY_HEADER_NAME] = process.env.CMS_API_KEY_HEADER_VALUE || "empty"
        }
        return headers;
    })()
});
axiosRetry(client, { retries: 0, retryDelay: axiosRetry.exponentialDelay });


/**
 * CMS APIのクライアント
 */
export const cmsApi = {

    /**
     * 投稿一覧を取得する
     */
    fetchPosts: async (): Promise<PostsResponse> => {
        const response = await client.get(`/posts`, {'axios-retry': { retries: 2 }})
        const posts: PostsResponse = response.data
        return posts
    },

    /**
     * 投稿を取得する
     * @param contentId 記事のコンテンツID
     */
    fetchPost: async (contentId: string): Promise<PostResponse> => {
        const response = await client.get(`/posts/${contentId}`, {'axios-retry': { retries: 2 }})
        const post: PostResponse = response.data
        return post
    },

    /**
     * ユーザー情報を取得する
     */
    fetchUser: async (): Promise<UserResponse> => {
        const response = await client.get(`/user`, {'axios-retry': { retries: 2 }})
        const user: UserResponse = response.data
        return user

    }
    
}