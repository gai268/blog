/**
 * ブログ記事一覧
 */
export interface EntriesState{
    count: number,
    entries: Record<symbol, Entry>
}

/**
 * ブログ記事
 */
export interface Entry {
    /**
     * 記事のタイトル
     */
    title: string;
    /**
     * 記事の作成日
     */
    createAt: Date,
    /**
     * 記事本文
     */
    body: string;
}