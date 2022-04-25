// 共通エラークラス
class BaseError extends Error {
    constructor(e?: string) {
      super(e);
      this.name = new.target.name;
      // 下記の行はTypeScriptの出力ターゲットがES2015より古い場合(ES3, ES5)のみ必要
      Object.setPrototypeOf(this, new.target.prototype);
    }
  }
  
/**
 * エラーのHTTPステータスが返却された場合にスローされる例外
 */
export class HttpStatusError extends BaseError {
    constructor(public statusCode: number, e?: string) {
      super(e);
    }
}