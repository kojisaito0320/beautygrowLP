# Beauty Grow 採用LP（Next.js）

紹介会社向け求人LP群。**1つのNext.jsアプリ**に統合されており、Vercelにこのリポジトリを接続するだけで全ページが配信されます。

## ページ構成

| パス | 内容 |
|---|---|
| `/` | 内部向けインデックス（LP一覧） |
| `/nicotto` | nicotto業態紹介LP |
| `/wc` | 求人情報ボード（ワークキャンバス様向け） |
| `/wc/referrals` | ご紹介一覧・全履歴（パスワード保護） |
| `/miraizm` | 求人情報ボード（ミライズム様向け） |
| `/miraizm/referrals` | ご紹介一覧・全履歴（パスワード保護） |

全ページ `noindex, nofollow`（検索エンジン非掲載）。

## 開発

```bash
npm install
cp .env.example .env.local   # 値を埋める
npm run dev                  # http://localhost:3000
npm run build                # 型チェック兼ビルド
```

## 環境変数（Vercelにも設定）

- `REFERRALS_PASSWORD_WC` — /wc/referrals のパスワード
- `REFERRALS_PASSWORD_MIRAIZM` — /miraizm/referrals のパスワード
- `SESSION_SECRET` — 認証cookieの署名鍵（ランダム文字列）

パスワード・秘密鍵はリポジトリに**絶対にコミットしない**（Vercel環境変数と `.env.local` のみ）。

## 新しいLPを追加する

1. `content/partners/<slug>.ts` を作成（`wc.ts` をコピーして書き換え）
2. `content/partners/index.ts` の `PARTNERS` に1行追加
3. referrals（保護ページ）が必要なら候補者データ `content/data/private/referrals.<slug>.json` を追加し、`lib/referrals-data.ts` に登録。Vercelにパスワード環境変数を追加

→ `/<slug>` と `/<slug>/referrals` が自動で生えます。

## 更新サイクルで触るファイル

- 店舗一覧: `content/data/stores.json`
- 更新日・変更点（全LP共通）: `content/partners/shared.ts`
- パートナー別の統計・成約者: `content/partners/wc.ts` / `miraizm.ts`
- 候補者一覧（保護ページ・**個人情報**）: `content/data/private/referrals.*.json`

更新後は `npm run build` が通ることを確認（型チェックがデータ検証を兼ねる）。HPBリンクの生存確認は `npm run link-check`。

## データの取り扱い（重要）

- 候補者のフルネームは `content/data/private/` のみに置く。ページはサーバ側で認証後にのみ描画され、静的HTML・クライアントJSには含まれない（`lib/referrals-data.ts` は `server-only`）
- 公開側の紹介実績は**姓のみ**（例: 浅井様）
- Private リポジトリ前提

## デプロイ構成

- 本体: Vercelプロジェクト（このリポジトリのルート、Next.js自動検出）
- 旧URL（bg-nicotto / bg-recruit-wc / bg-recruit-miraizm .vercel.app）: 旧Vercelプロジェクトの Root Directory を `redirects/<プロジェクト名>/` に変更し、新URLへの308リダイレクト専用にする

## tools/

- `tools/sheets-sync/` — Googleスプレッドシート取得・差分確認（fetch_update.py / analyze_diff.py）。取得結果を上記コンテンツファイルへ反映する運用
- `tools/legacy/` — 旧静的HTML時代の文字列置換スクリプト（廃止予定・参照用）
- `tools/link-check.mjs` — 店舗リンクの生存チェック
