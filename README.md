# ページ構成

## TODO

ログインしていない場合/signin へリダイレクト（middleware.ts）

- TODO 一覧（/todos）
- TODO 新規作成（/todos/create）
- TODO 詳細（/todos/[id]）
- TODO 編集（/todos/[id]/edit）

## ユーザー

ログインしていない場合/signin へリダイレクト（middleware.ts）

- プロフィール（/profile）

## 認証

ログインしている場合/todos へリダイレクト（app/\(auth)\layout.tsx）

- ログイン（/signin）
- 新規ユーザー登録（/signup）

# 使用技術

## プログラミング言語

- TypeScript

## フレームワーク

- Next.js

## ライブラリ

### 認証

- Auth.js
- bcryptjs

### フォーム管理

- React Hook From

### バリデーション

- zod

### ORM

- Prisma

### UI 全般

- Tailwind
- react-icons

## データベース

- Supabase

## インフラ

- Vercel

## バージョン管理

- Git/GitHub

-

# 機能

## 認証

- Credentials で実装
- 実装方法は Auth.js 公式サイトを参考にした（https://authjs.dev/getting-started/installation）
- パスワードはハッシュ化したうえでデータベースに保存（bcryptjs を使用）
- バリデーションは zod を使用
