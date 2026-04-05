# Cloudflare Pages deploy

`wrangler` ベースで Pages へ直接デプロイできます。

## 1. 初回だけ

PowerShell:

```powershell
npx wrangler login
```

この環境のように非対話実行で使う場合は、`wrangler login` ではなく API token が必要です。

```powershell
setx CLOUDFLARE_API_TOKEN "your-cloudflare-api-token"
```

ローカルの通常ターミナルから使うだけなら、まずは `npx wrangler login` を試す運用で構いません。

このリポジトリは Cloudflare Pages の `stellorbitnet-ver2` を既定の deploy 先として使います。

別プロジェクトへ送るときだけ、環境変数で上書きしてください。

```powershell
setx CLOUDFLARE_PAGES_PROJECT_NAME "your-pages-project-name"
```

必要ならブランチ名も固定できます。

```powershell
setx CLOUDFLARE_PAGES_BRANCH "main"
```

`setx` の反映後はターミナルを開き直してください。

## 2. 通常のデプロイ

```powershell
npm run deploy
```

これは次をまとめて実行します。

1. `astro build`
2. `wrangler pages deploy dist --project-name stellorbitnet-ver2`

## 3. すでに `dist` がある場合

```powershell
npm run deploy:skip-build
```

## 補足

- GitHub への push を待たずに Cloudflare Pages を更新できます。
- Pages の Git 連携を残したままでも使えますが、運用を単純化するなら direct upload に寄せる方が分かりやすいです。
