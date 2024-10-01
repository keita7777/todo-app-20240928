import { getAllTodos } from "@/lib/actions";
import { statusName } from "@/lib/todoStatus";
import { Status } from "@prisma/client";
import Link from "next/link";

interface TodoListProps {
  pageSize: number;
  page: number;
  query: string;
  status: Status;
  sort: "desc" | "asc";
}

const TodoList = async ({
  pageSize,
  page,
  query,
  status,
  sort,
}: TodoListProps) => {
  const todos = await getAllTodos(pageSize, page, query, status, sort);

  return (
    <>
      {todos.length > 0 ? (
        <ul>
          {todos.map((todo) => (
            <li key={todo.id} className="border rounded-md text-sm mb-2">
              <Link href={`/todos/${todo.id}`} className="block p-2">
                <div className="flex justify-between items-center gap-2 mb-2">
                  <div className="flex items-center w-full">
                    <span
                      className={`text-xs rounded-md px-2 py-1 flex-shrink-0 min-w-12 text-center ${
                        todo.status === "notstarted"
                          ? "bg-blue-300"
                          : todo.status === "progress"
                          ? "bg-green-300"
                          : todo.status === "done"
                          ? "bg-gray-300"
                          : ""
                      }`}
                    >
                      {statusName(todo.status)}
                    </span>
                    <div className="flex ml-4 gap-2 items-center flex-1">
                      <p className="flex-shrink-0">{todo.title}</p>
                    </div>
                  </div>
                </div>
                <p className="text-gray-600 text-xs truncate h-4 mb-2">
                  {todo.description}
                </p>
                <div className="border-t text-xs text-gray-500 flex justify-end gap-4 px-2 pt-2">
                  <p>作成者：{todo.user.username}</p>
                  <p>最終更新日：{new Date(todo.updatedAt).toLocaleString()}</p>
                </div>
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <div>
          <p>該当するTODOがありません</p>
        </div>
      )}
    </>
  );
};
export default TodoList;
