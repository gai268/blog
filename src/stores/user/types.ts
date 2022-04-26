
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
    discription: string | undefined
}
/**
 * アバター画像
 */
type Avatar = {
    url: string,
    height: number,
    width: number
}