import { getTodoDetail } from "@/lib/actions";
import { Status } from "@prisma/client";

type EditTodo = {
  id: string;
  title: string;
  description: string;
  status: Status;
};

const Edit = async ({ params }: { params: { id: string } }) => {
  const todo = await getTodoDetail(params.id);
  // エラーの時どうするか？？

  const { id, title, description, status } = todo as EditTodo;

  return (
    <div>
      <h1 className="text-center text-2xl font-bold mb-6">TODOを編集</h1>
      <form action="">
        <div className="flex flex-col mb-4">
          <label htmlFor="">タイトル</label>
          <input
            type="text"
            className="border rounded-md p-2 text-sm"
            defaultValue={title}
          />
        </div>
        <div className="flex flex-col mb-4">
          <label htmlFor="">詳細</label>
          <textarea
            className="border rounded-md p-2 text-sm"
            defaultValue={description}
          />
        </div>
        <div className="flex flex-col mb-4 max-w-[50%]">
          <label htmlFor="">ステータス</label>
          <select
            name=""
            id=""
            defaultValue={status}
            className="border rounded-md p-2 text-sm"
          >
            <option value="default" disabled>
              ステータスを選択
            </option>
            <option value="notstarted">未着手</option>
            <option value="progress">進行中</option>
            <option value="done">完了</option>
          </select>
        </div>
        <div className="flex justify-center gap-2">
          <button
            type="submit"
            className="bg-blue-500 text-white px-2 py-2 mt-4 rounded-md w-2/5"
          >
            更新
          </button>
          <button
            type="submit"
            className="bg-red-500 text-white px-2 py-2 mt-4 rounded-md w-2/5"
          >
            削除
          </button>
        </div>
      </form>
    </div>
  );
};
export default Edit;
