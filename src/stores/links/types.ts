import { EntityId } from "@reduxjs/toolkit"

/**
 * リンク情報
 */
 export type Link = {
    /**
     * リンクID
     */
    id: EntityId,
    /**
     * リンクテキスト
     */
    text: string,
     /**
     * リンクURL
     */
    url: string,
    /**
     * アイコン画像
     */
    icon: Icon
}

/**
 * アイコン画像
 */
 type Icon = {
    url: string,
    height: number,
    width: number
}
