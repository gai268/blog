
export type State = {
    /**
     * 全記事数
     */
    totalCount: number,
    /**
     * 記事一覧
     */
    posts: Record<string, PostState>
}

/**
 * ブログ記事詳細
 */
export type PostState = {
    /**
     * 記事ID
     */
    id: string;
    /**
     * 記事のタイトル
     */
    title: string;
    /**
     * 記事の公開日(Unix時間)
     * 注：Reduxではシリアル化できないDate型等はStateに定義できない
     */
    publishedAt: number,
    /**
     * 記事本文
     */
    body: string,
    /**
     * お気に入り数
     */
    favoritesCount: number,
    /**
     * アイキャッチ画像
     */
    eyecatch: Eyecatch | undefined
    
}
/**
 * アイキャッチ画像
 */
type Eyecatch = {
    url: string,
    height: number,
    width: number
}
