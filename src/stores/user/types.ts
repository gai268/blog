
export type User = {
    /**
     * ユーザー名
     */
    name: string,
    /**
     * アバター画像
     */
    avatar: Avatar | undefined,
    /**
     * ユーザー説明文
     */
    discription: string | undefined,
    /**
     * リンク一覧
     */
    links: Record<string, Link>
}
/**
 * アバター画像
 */
type Avatar = {
    url: string,
    height: number,
    width: number
}
/**
 * リンク情報
 */
export type Link = {
    /**
     * リンクID
     */
    id: string,
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
