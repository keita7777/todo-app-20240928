import { auth } from "@/auth";
import DeleteButton from "@/components/todo/DeleteButton";
import { getTodoDetail } from "@/lib/actions";
import { statusName } from "@/lib/todoStatus";
import Link from "next/link";

const Detail = async ({ params }: { params: { id: string } }) => {
  const todo = await getTodoDetail(params.id);
  const session = await auth();
  const currentUserEmail = session?.user?.email;

  return (
    <div>
      <h1 className="text-center text-2xl font-bold mb-6">TODO詳細</h1>
      <div className="border rounded-md p-3">
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">タイトル</h2>
          <p>{todo.title}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">詳細</h2>
          <p>{todo.description}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">ステータス</h2>
          <p>{statusName(todo.status)}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">作成者</h2>
          <p>{todo.user.username}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">作成日</h2>
          <p>{new Date(todo.createdAt).toLocaleString()}</p>
        </div>
        <div className="mb-4">
          <h2 className="text-xl font-bold mb-2">更新日</h2>
          <p>{new Date(todo.updatedAt).toLocaleString()}</p>
        </div>
        {todo.user.email === currentUserEmail && (
          <div className="flex justify-center gap-4">
            <Link
              href={`/todos/${todo.id}/edit`}
              className="bg-green-500 text-white px-2 py-2 mt-4 rounded-md w-2/5 text-center"
            >
              編集
            </Link>
            {/* 削除ボタンクリックしたらモーダルウィンドウを表示させたいのでコンポーネント化してクライアントコンポーネントにする */}
            <DeleteButton id={todo.id} />
          </div>
        )}
      </div>
    </div>
  );
};
export default Detail;
