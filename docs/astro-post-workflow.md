# Astro記事の作成・公開フロー

## 基本方針

Astro形式の記事は、本文・URL・メタデータを分けて管理します。

```text
src/articles/<slug>.astro        本文
src/pages/posts/<slug>.astro     公開URL
src/content/astro-posts.ts       タイトル、投稿日、公開状態、目次
public/images/posts/<slug>/      記事画像
```

通常は `npm run new:post` で雛形を作り、本文を書き、最後に `draft: true` を外して公開します。

## 新規記事の作成

```sh
npm run new:post -- --slug example-post --title "記事タイトル" --description "記事説明" --date 2026-04-23 --category "カテゴリ" --tag "タグ"
```

このコマンドで次の3つを作成します。

```text
src/articles/<slug>.astro
src/pages/posts/<slug>.astro
public/images/posts/<slug>/
```

メタデータは `src/content/astro-posts.ts` に追加されます。初期状態は `draft: true` です。

## 本文を書く

本文は `src/articles/<slug>.astro` に書きます。見出しは目次に出すため、`h2` または `h3` に `id` を付けます。

```astro
<h2 id="intro">本文</h2>

<p>本文を書きます。</p>
```

VS Codeでは次のスニペットを使えます。

```text
post-section     h2見出し
post-subsection  h3見出し
post-image       画像付きfigure
```

## 画像の置き場所

記事画像は、記事スラッグごとに次の場所へ置きます。

```text
public/images/posts/<slug>/
```

記事本文からは、次のように参照します。

```astro
<figure>
	<img src="/images/posts/<slug>/image.webp" alt="画像説明" loading="lazy" decoding="async" />
	<figcaption>キャプション</figcaption>
</figure>
```

ファイル名は記事内で分かりやすい名前にします。写真、スクリーンショット、引用画像などで命名規則を無理に統一せず、同じ記事フォルダ内で意味が通る名前にしてください。

## サムネイルの設定

記事上部に表示するサムネイルは、`BlogPost` の `heroImage` に渡します。本文中の画像は `public/images/posts/<slug>/` に置きますが、サムネイルは Astro の画像処理を使うため、`src/assets/post-thumbnails/` に置く運用にします。

```text
src/assets/post-thumbnails/<slug>.webp
```

記事ページ `src/pages/posts/<slug>.astro` でサムネイルを import します。

```astro
---
import ArticleBody from '../../articles/example-post.astro';
import thumbnail from '../../assets/post-thumbnails/example-post.webp';
import { getAstroPost } from '../../content/astro-posts';
import BlogPost from '../../layouts/BlogPost.astro';

const post = getAstroPost('example-post');

if (!post) {
	throw new Error('Astro post metadata not found: example-post');
}
---

<BlogPost
	title={post.title}
	description={post.description}
	pubDate={post.pubDate}
	updatedDate={post.updatedDate}
	heroImage={thumbnail}
	headings={post.headings}
>
	<ArticleBody />
</BlogPost>
```

サムネイルを使わない記事では、`thumbnail` の import と `heroImage={thumbnail}` を省略します。

## VS Codeで画像を挿入する

記事本文の `.astro` ファイルで `post-image` スニペットを使うと、現在開いている記事ファイル名をスラッグとして使い、次の形式を挿入します。

```astro
<figure>
	<img src="/images/posts/<slug>/image.webp" alt="画像説明" loading="lazy" decoding="async" />
	<figcaption>キャプション</figcaption>
</figure>
```

## 目次の自動同期

記事本文の `h2` / `h3` から、`src/content/astro-posts.ts` の `headings` を自動生成できます。

```sh
npm run sync:post-headings -- --slug example-post
```

全記事を同期する場合は `--slug` を省略します。

```sh
npm run sync:post-headings
```

現在は `npm run check` と `npm run build` の前にも自動で同期されます。見出しを変更した後に手動同期を忘れても、チェックやビルド時に目次が更新されます。

## 画像参照のチェック

本文中の `/images/...` 参照が、実際に `public/images/...` に存在するか確認できます。

```sh
npm run check:images
```

存在しない画像がある場合は、参照元ファイルと画像パスを表示して失敗します。

## 公開前の確認

公開前に、記事用の準備処理をまとめて実行します。

```sh
npm run prepare:posts
```

その後、通常のチェックとビルドを実行します。

```sh
npm run check
npm run build
```

問題なければ `src/content/astro-posts.ts` の対象記事から `draft: true` を外すか、`draft: false` に変更して公開します。

## PDF版の作成

この手順書のPDFは、次のコマンドで作成できます。

```sh
npm run docs:pdf
```

出力先は次のファイルです。

```text
docs/astro-post-workflow.pdf
```
