/**
 * APIの記事一覧情報
 */
export type Posts = {
    contents: Post[]
    totalCount: number,
    offset: number,
    limit: number
}
/**
 * APIの記事詳細情報
 */
export type Post = {
    id: string,
    publishedAt: string
    title: string,
    content: string,
    eyecatch: Eyecatch,
    category: Category
}

type Eyecatch = {
    url: string,
    height: number,
    width: number
}

type Category = {
    id: string,
    name: string
}