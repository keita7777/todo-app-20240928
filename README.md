# ページ構成

## TODO

ログインしていない場合/signin へリダイレクト（middleware.ts）

- TODO 一覧（/todos）
- TODO 新規作成（/todos/create）
- TODO 詳細（/todos/[id]）

<br><br>
ログインユーザーが作成者でない場合は/todos/[id]へリダイレクト（app\(todo)\todos\[id]\edit\page.tsx）

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

# 各画面の機能

## ヘッダー

- 認証状態によって表示する要素を切り替え
- タイトル検索
  <br>テキストを入力して検索をクリックすると/todos に遷移し、入力したテキストが含まれる TODO が表示される
  <br>検索状態にあるとき（URL に query=XXX があるとき）のみ「検索条件をリセット」ボタンが表示される
- プロフィール画像クリックでメニュー開閉

## TODO 一覧（/todos）

- TODO 一覧の取得
- ページネーション
- ステータスによるフィルター
- 日付の降順/昇順切り替え（デフォルトは降順）
- タイトル検索
- 各 TODO をクリックすると詳細ページへ遷移

## TODO 新規作成（/todos/create）

- タイトル、詳細、ステータスを入力/選択して登録をクリックするとデータベースに保存され、/todos に遷移する
- リセットをクリックすると、入力した内容がリセットされる

## TODO 詳細（/todos/[id]）

- TODO の詳細情報および作成者のユーザー名が表示される
- 編集をクリックすると/todos/[id]/edit に遷移する
- 削除をクリックするとモーダルウィンドウが開く
  <br>モーダルウィンドウの削除をクリックするとデータベースから TODO が削除される
  <br>キャンセルをクリックするとモーダルウィンドウが閉じる

## TODO 編集（/todos/[id]/edit）

- TODO 作成者のみアクセスできる
- 更新をクリックすると入力された情報でデータベースを更新する
- キャンセルをクリックすると詳細ページに遷移する

## プロフィール（/profile）

- ヘッダーのプロフィール画像をクリックして表示されるメニューから遷移できる
- ログインしているユーザーの情報を表示する
  <br>ユーザー名とログイン日時のみ

## ログイン（/signin）

- Credentials 認証
- 実装方法は Auth.js 公式サイトを参考にした（https://authjs.dev/getting-started/installation）

## 新規ユーザー登録（/signup）

- パスワードはハッシュ化したうえでデータベースに保存（bcryptjs を使用）
