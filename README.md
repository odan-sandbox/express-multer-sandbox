# express-multer-sandbox

[multer](https://github.com/expressjs/multer) がデフォルトで提供している StorageEngine はデータをファイルに書き出す or メモリに buffer として展開するのどちらかで使い勝手が悪い

なので PassThrough を使って stream に残した状態でリクエストを処理するサンプル

サーバを動かす

```
$ yarn ts-node-esm src/app.ts
```

リクエストを投げる

```
$ curl -X POST -F avatar=@ddtest localhost:3000/profile
```
