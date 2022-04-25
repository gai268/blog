import { Post, Posts, User } from '../../helpers/cmsApiClient/types'
import { HttpStatusError } from './errors'

/**
 * CMS APIのクライアント
 */
export const cmsApiClient = {

    /**
     * 投稿一覧を取得する
     */
    fetchPosts: async (): Promise<Posts> => {
        const headers = new Headers()
        headers.set(process.env.CMS_API_KEY_HEADER_NAME || "", process.env.CMS_API_KEY_HEADER_VALUE || "")
        const res: Response = await fetch(`${process.env.CMS_API_ENDPOINT}/posts`, {headers})
        if(!res.ok) {
            throw new HttpStatusError(res.status, `status: ${res.status}, body: ${(await res.text()).toString()}`)
        }
        const posts: Posts = await res.json();
        return posts;
    },

    /**
     * 投稿を取得する
     * @param contentId 記事のコンテンツID
     */
    fetchPost: async (contentId: string): Promise<Post> => {
        const headers = new Headers()
        headers.set(process.env.CMS_API_KEY_HEADER_NAME || "", process.env.CMS_API_KEY_HEADER_VALUE || "")
        const res: Response = await fetch(`${process.env.CMS_API_ENDPOINT}/posts/${contentId}`, {headers})
        if(!res.ok) {
          throw new HttpStatusError(res.status, `status: ${res.status}, body: ${(await res.text()).toString()}`)
        }
        const post: Post = await res.json();
        return post;
    },

    /**
     * ユーザー情報を取得する
     */
    fetchUser: async (): Promise<User> => {
        const headers = new Headers()
        headers.set(process.env.CMS_API_KEY_HEADER_NAME || "", process.env.CMS_API_KEY_HEADER_VALUE || "")
        const res: Response = await fetch(`${process.env.CMS_API_ENDPOINT}/user`, {headers})
        if(!res.ok) {
          throw new HttpStatusError(res.status, `status: ${res.status}, body: ${(await res.text()).toString()}`)
        }
        const user: User = await res.json();
        return user;
    }
    
}