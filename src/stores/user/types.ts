
/**
 * ユーザー情報
 */
export type User = {
    /**
     * ユーザー名
     */
    name: string,
    /**
     * アバター画像
     */
    avatar?: Avatar,
    /**
     * ユーザー説明文
     */
    discription?: string
}
/**
 * アバター画像
 */
type Avatar = {
    url: string,
    height: number,
    width: number
}