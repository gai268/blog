import { EntityId } from "@reduxjs/toolkit";

/**
 * ブログ記事詳細
 */
export type Post = {
    /**
     * 記事ID
     */
    id: EntityId;
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
