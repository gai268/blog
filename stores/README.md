# Re-ducksパターン
Reduxのディレクトリ構成パターンであるRe-ducksパターンを用いて状態管理をします。
以下のようなディレクトリ構成になります。
```
users
├ actions.ts
├ index.ts
├ operations.ts
├ reducers.ts
├ selectors.ts
└ type.ts

articles
├ actions.ts
├ index.ts
├ operations.ts
├ reducers.ts
├ selectors.ts
└ type.ts
```
## 各ファイルの役割
### redicers

### actions

### operations

### selectors

### type
typesファイルは、TypeScriptで記述する場合に使うファイルです。
action, operation, reducerなどで使う型を定義しておきます。
```ts
export interface ArticleState {
  title: string;
  body: string;
}
```

### index
上記のファイルをまとめてimportしてexportし直すだけのファイルです。