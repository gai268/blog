/**
 * ブログ記事一覧
 */
export interface PostState{
    count: number,
    posts: Record<string, Post>
}

/**
 * ブログ記事
 */
export interface Post {
    /**
     * 記事のタイトル
     */
    title: string;
    /**
     * 記事の作成日(Unix時間)
     * 注：Reduxではシリアル化できないDate型等はStateに定義できない
     */
    createAt: number,
    /**
     * 記事本文
     */
    body: string,
    /**
     * お気に入り数
     */
    favoritesCount: number
    ;
}