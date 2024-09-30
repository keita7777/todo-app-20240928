import { getAllTodos } from "@/lib/actions";
import { statusName, statusStyle } from "@/lib/todoStatus";
import { Status } from "@prisma/client";
import Link from "next/link";

interface TodoListProps {
  pageSize: number;
  page: number;
  query: string;
  status: Status;
}

const TodoList = async ({ pageSize, page, query, status }: TodoListProps) => {
  const todos = await getAllTodos(pageSize, page, query, status);

  return (
    <ul>
      {todos &&
        todos.map((todo) => (
          <li key={todo.id} className="border rounded-md p-2 text-sm mb-2">
            <div className="flex justify-between items-center gap-2 mb-2">
              <div className="flex items-center w-[calc(100%-3rem)]">
                <span
                  className={`text-xs rounded-md px-2 py-1 flex-shrink-0 min-w-12 text-center ${statusStyle(
                    todo.status
                  )}`}
                >
                  {statusName(todo.status)}
                </span>
                <div className="flex ml-4 gap-2 items-center flex-1">
                  <p className="flex-shrink-0">{todo.title}</p>
                </div>
              </div>
              <div className="flex-shrink-0 w-12 mx-auto flex">
                <Link
                  href={`/todos/${todo.id}/edit`}
                  className="bg-green-600 px-2 py-1 rounded-md text-slate-50 w-full text-center"
                >
                  編集
                </Link>
              </div>
            </div>
            <p className="text-gray-600 text-xs truncate h-4 mb-2">
              {todo.description}
            </p>
            <div className="border-t text-xs text-gray-500 flex justify-end gap-4 px-2 pt-2">
              <p>作成者：{todo.user.username}</p>
              <p>最終更新日：{new Date(todo.updatedAt).toLocaleString()}</p>
            </div>
          </li>
        ))}
    </ul>
  );
};
export default TodoList;
