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

## 店舗一覧の2ビュー仕様（2026-08-19確定版）

⑤強化エリアの列の意味（齋藤さん確認済み）:

- **A列「優先度」（★〜★★★）＝ 通常募集の強化度**（`stores.json` の `stars`）
- **B列「顧客持ち」（★）＝ 顧客（指名のお客様）を抱えたスタイリストなら受け入れ可能**（`stores.json` の `clientOk: true`）

実装（`components/board/StoreExplorer.tsx`）:

- デフォルト＝**通常の募集一覧**（★あり、または `clientOk` なしの行）。B列★のみで通常募集がない店はデフォルト非表示
- テーブル上部の2択セレクタでビュー切替。顧客持ちビューは `clientOk` の行のみ表示（説明文も連動）
- **セレクタの店舗数表記は stores.json から自動計算**（手動更新は不要）
- ヒーロー統計の店舗数（`content/partners/shared.ts`）は通常ビューの件数に合わせて**手動更新**（現在35）
- 雇用形態・業態・エリアのフィルタは両ビュー共通。旧「採用時期」フィルタは廃止（`timing` フィールドはデータに残置）
- 現在の件数: 通常35店／顧客持ち39店（2026-08-19晩の⑤同期時点）

## 既知の注意点

- セレスト三軒茶屋・久屋大通・小倉・福間は**OAK店舗を改装してオープン予定**（2026-08-19齋藤さん）。
  HPB未掲載はこのため。掲載開始を確認したらリンクを追加する（三軒茶屋の旧セレスト掲載 slnH000277206 は404で掲載終了済み）
- ⑤との機械照合スクリプト（audit_stores.py）は旧リポジトリ（personal-cockpit/work/recruiting）にあり未移植。
  ⑤同期の際は件数（通常／顧客持ち）の突き合わせを必ず行うこと
