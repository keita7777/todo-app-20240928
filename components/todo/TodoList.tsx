import Link from "next/link";

const TodoList = () => {
  return (
    <ul>
      <li className="border rounded-md p-2 text-sm mb-2">
        <div className="flex justify-between items-center gap-2 mb-2">
          <div className="flex items-center w-[calc(100%-3rem)]">
            <span className="text-xs rounded-md bg-blue-300 px-2 py-1 flex-shrink-0">
              未着手
            </span>
            <div className="flex ml-4 gap-2 items-center flex-1">
              <p className="flex-shrink-0">タイトル</p>
            </div>
          </div>
          <div className="flex-shrink-0 w-12 mx-auto flex">
            <Link
              href="/todos/1/edit"
              className="bg-green-600 px-2 py-1 rounded-md text-slate-50 w-full text-center"
            >
              編集
            </Link>
          </div>
        </div>
        <p className="text-gray-600 text-xs truncate h-4 mb-2">
          詳細テキスト詳細テキスト詳細テキスト詳細テキスト詳細テキスト詳細テキスト詳細テキスト詳細テキスト詳細テキスト詳細テキスト詳細テキスト詳細テキスト
        </p>
        <div className="border-t text-xs text-gray-500 flex justify-end gap-4 px-2 pt-2">
          <p>作成者：ユーザー名</p>
          <p>作成日：202412月12日</p>
        </div>
      </li>
      <li className="border rounded-md p-2 text-sm mb-2">
        <div className="flex justify-between items-center gap-2 mb-2">
          <div className="flex items-center w-[calc(100%-3rem)]">
            <span className="text-xs rounded-md bg-blue-300 px-2 py-1 flex-shrink-0">
              未着手
            </span>
            <div className="flex ml-4 gap-2 items-center flex-1">
              <p className="flex-shrink-0">タイトル</p>
            </div>
          </div>
          <div className="flex-shrink-0 w-12 mx-auto flex">
            <Link
              href="/todos/edit/1"
              className="bg-green-600 px-2 py-1 rounded-md text-slate-50 w-full text-center"
            >
              編集
            </Link>
          </div>
        </div>
        <p className="text-gray-600 text-xs truncate h-4 mb-2">
          詳細テキスト詳細テキスト詳細テキスト詳細テキスト詳細テキスト詳細テキスト詳細テキスト詳細テキスト詳細テキスト詳細テキスト詳細テキスト詳細テキスト
        </p>
        <div className="border-t text-xs text-gray-500 flex justify-end gap-4 px-2 pt-2">
          <p>作成者：ユーザー名</p>
          <p>作成日：202412月12日</p>
        </div>
      </li>
      <li className="border rounded-md p-2 text-sm mb-2">
        <div className="flex justify-between items-center gap-2 mb-2">
          <div className="flex items-center w-[calc(100%-3rem)]">
            <span className="text-xs rounded-md bg-blue-300 px-2 py-1 flex-shrink-0">
              未着手
            </span>
            <div className="flex ml-4 gap-2 items-center flex-1">
              <p className="flex-shrink-0">タイトル</p>
            </div>
          </div>
          <div className="flex-shrink-0 w-12 mx-auto flex">
            <Link
              href="/todos/edit/1"
              className="bg-green-600 px-2 py-1 rounded-md text-slate-50 w-full text-center"
            >
              編集
            </Link>
          </div>
        </div>
        <p className="text-gray-600 text-xs truncate h-4 mb-2">
          詳細テキスト詳細テキスト詳細テキスト詳細テキスト詳細テキスト詳細テキスト詳細テキスト詳細テキスト詳細テキスト詳細テキスト詳細テキスト詳細テキスト
        </p>
        <div className="border-t text-xs text-gray-500 flex justify-end gap-4 px-2 pt-2">
          <p>作成者：ユーザー名</p>
          <p>作成日：202412月12日</p>
        </div>
      </li>
    </ul>
  );
};
export default TodoList;
