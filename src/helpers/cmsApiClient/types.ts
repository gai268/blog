/**
 * CMS APIのリクエスト・レスポンスのエンティティ
 */

/**
 * 画像情報
 */
type Image = {
    url: string,
    height: number,
    width: number
}

/**
 * 投稿一覧情報
 */
export type Posts = {
    contents: Post[]
    totalCount: number,
    offset: number,
    limit: number
}
/**
 * 投稿情報
 */
export type Post = {
    id: string,
    publishedAt: string
    title: string,
    content: string,
    eyecatch: Image,
    category: Category
}
type Category = {
    id: string,
    name: string
}

/**
 * ユーザー情報
 */
export type User = {
    name: string,
    description: string | undefined,
    avatar: Image | undefined
    links: Link[]
}
type Link = {
    url: string,
    text: string,
    icon: Image
}