/*
ーーーーーーーーー 
リクエストパラメータ系
ーーーーーーーーー 
*/
/**
 * 投稿一覧取得APIのパラメータ
 */
export type FetchPostsParams = {
    /**
     * 投稿の取得件数。指定しない場合のデフォルト値は10です。
     */
    limit?: number,

    /**
     * 何件目から取得するか。デフォルト値は0です。
     */
    offset?: number
}

/*
ーーーーーーーーー 
レスポンス系
ーーーーーーーーー 
*/
/**
 * 画像情報レスポンス
 */
type ImageResponse = {
    url: string,
    height: number,
    width: number
}

/**
 * 投稿一覧情報レスポンス
 */
export type PostsResponse = {
    contents: PostResponse[]
    totalCount: number,
    offset: number,
    limit: number
}
/**
 * 投稿情報レスポンス
 */
export type PostResponse = {
    id: string,
    publishedAt: string
    title: string,
    content: string,
    eyecatch: ImageResponse,
    category: CategoryResponse
}
type CategoryResponse = {
    id: string,
    name: string
}

/**
 * サイト情報レスポンス
 */
export type SiteResponse = {
    siteName: string
    siteDescription?: string
    userName: string
    userDescription?: string
    userAvatar?: ImageResponse
    links: LinkResponse[]
}

/**
 * 関連リンク情報レスポンス
 */
export type LinkResponse = {
    fieldId: string
    url: string
    text: string
    icon: ImageResponse
}