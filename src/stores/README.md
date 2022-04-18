# 概要
[Redux Toolkit](https://redux-toolkit.js.org/)を用いて状態管理をします。  
[以下のコマンドによって作成されたNext.jsアプリケーション](https://github.com/vercel/next.js/tree/a9d6d9f71acb17a92a3c0965df342049c0dec115/examples/with-redux)に基づいて、ディレクトリ構成を変更しています。
```shell
npx create-next-app --example with-redux
```
以下のようなディレクトリ構成で管理しています。
```
stores
├─ user
│  ├─ asyncThunks.ts
│  ├─ selectors.ts
│  ├─ slices.ts
│  └─ types.ts
├─ post
│  ├─ asyncThunks.ts
│  ├─ selectors.ts
│  ├─ slices.ts
│  └─ types.ts
├─ hooks.ts
└─ stores.ts
```
## 各ファイルの役割
### slices
Redux Toolkit から提供される[createSlice関数](https://redux-toolkit.js.org/api/createSlice)を用いて作成されたSliceを管理します。  
Sliceは、ReduxにおけるState / Reducer / Action Creator をまとめたものです。状態の初期化や更新等を行います。

### selectors
selectors とは、state から必要な値を算出する関数のことです。state をシンプルに保つために、既存の state から算出できる値はすべて Selectors 経由で取得します。

### types
typesファイルは、TypeScriptで記述する場合に使うファイルです。
slice, selectors, asyncThunksで使う型を定義しておきます。
```ts
export interface ArticleState {
  title: string;
  body: string;
}
```
### asyncThunks
Redux Toolkit から提供される[createAsyncThunk](https://redux-toolkit.js.org/api/createAsyncThunk)を用いて作成されたAsyncThunkを管理します。  
主にAPI通信等の非同期処理を行います。  
sliceから呼び出し、利用します。


### store, hooks
Next.jsやHooksでReduxを利用できるようにするための処理が記載されています。  

store.tsには、Redux Toolkit から提供される[configureStore](https://redux-toolkit.js.org/api/configureStore)でのセットアップ処理が記載されています。
新規のストアを追加する場合は以下にreducerを追記します。
```ts:store.ts
import { userReducer } from './user/slices'
import { postReducer } from './post/slices'

export function makeStore() {
  return configureStore({
    reducer: {
      user: userReducer,
      post: postReducer
    },
  })
}
```