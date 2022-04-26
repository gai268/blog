/**
 * CMS APIのリクエスト・レスポンスのエンティティ
 */

/**
 * 画像情報
 */
type ImageResponse = {
    url: string,
    height: number,
    width: number
}

/**
 * 投稿一覧情報
 */
export type PostsResponse = {
    contents: PostResponse[]
    totalCount: number,
    offset: number,
    limit: number
}
/**
 * 投稿情報
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
 * ユーザー情報
 */
export type UserResponse = {
    name: string,
    description: string | undefined,
    avatar: ImageResponse | undefined
    links: LinkResponse[]
}

/**
 * 関連リンク情報
 */
export type LinkResponse = {
    fieldId: string,
    url: string,
    text: string,
    icon: ImageResponse
}