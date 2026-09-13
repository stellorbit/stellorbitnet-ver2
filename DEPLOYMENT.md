# Cloudflare Pages deploy

当プロジェクトはサプライチェーン攻撃対策として **pnpm (v10)** を採用しています。
Cloudflare Pages へのデプロイは「Git 連携による自動ビルド」または「Wrangler による直接デプロイ」のいずれにも対応しています。

---

## A. Cloudflare Pages Git 連携（自動ビルド）の場合の設定

Cloudflare Pages ダッシュボードの対象プロジェクト設定にて、以下を指定してください。

### 1. ビルド設定 (Settings > Build & deployments)
- **Framework preset**: `Astro`
- **Build command**: `pnpm run build`
- **Build output directory**: `dist`
- **Root directory**: `/`

### 2. 環境変数 (Settings > Environment variables)
`pnpm-lock.yaml` を検知して自動で pnpm が使われますが、互換性・安定性のため Node と pnpm のバージョンを明示的に指定します。

| 変数名 | 値 | 説明 |
| :--- | :--- | :--- |
| `NODE_VERSION` | `22.12.0` (または `22`) | Node.js の動作バージョン |
| `PNPM_VERSION` | `10.34.5` (または `10`) | pnpm v10 を明示 |

---

## B. ローカルからの直接デプロイ (Wrangler / Direct Upload)

ローカルでビルドし、Wrangler 経由で Pages へ直接アップロードできます。

### 1. 初回認証

PowerShell:

```powershell
pnpm exec wrangler login
```

非対話環境や CI で実行する場合は、API トークンを環境変数に設定してください。

```powershell
setx CLOUDFLARE_API_TOKEN "your-cloudflare-api-token"
```

このリポジトリは Cloudflare Pages の `stellorbitnet-ver2` を既定の deploy 先として使います。
プロジェクト名やブランチ名を変更する場合は環境変数で指定します。

```powershell
setx CLOUDFLARE_PAGES_PROJECT_NAME "your-pages-project-name"
setx CLOUDFLARE_PAGES_BRANCH "main"
```

### 2. 通常のデプロイ

```powershell
pnpm run deploy
```

上記コマンドにより以下が一括実行されます：
1. `pnpm run build` (Astro 静的サイトビルド)
2. `pnpm exec wrangler pages deploy dist --project-name stellorbitnet-ver2`

### 3. すでに `dist` が生成済みな場合

```powershell
pnpm run deploy:skip-build
```

