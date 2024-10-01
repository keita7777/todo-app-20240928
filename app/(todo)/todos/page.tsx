import Pagenation from "@/components/todo/Pagenation";
import TodoFilter from "@/components/todo/TodoFilter";
import TodoList from "@/components/todo/TodoList";
import { countAllTodo, countTodo } from "@/lib/actions";
import { Status } from "@prisma/client";
import { Suspense } from "react";

interface SearchParams {
  page: string;
  query: string;
  status: Status;
  sort: "desc" | "asc";
}

const Todos = async ({ searchParams }: { searchParams: SearchParams }) => {
  const pageSize = 5;
  const page = parseInt(searchParams.page) || 1;
  const query = searchParams.query;
  const status = searchParams.status;
  const sort = searchParams.sort;
  const todoCount = await countTodo(query, status);

  // TODOが1つもない場合、フィルタも非表示にする
  const todoAllCount = await countAllTodo();

  return (
    <div>
      {todoAllCount > 0 ? (
        <>
          <TodoFilter />
          <Suspense fallback={<p>ローディング中...</p>}>
            <TodoList
              pageSize={pageSize}
              page={page}
              query={query}
              status={status}
              sort={sort}
            />
          </Suspense>
          <Pagenation
            itemCount={todoCount}
            pageSize={pageSize}
            currentPage={page}
          />
        </>
      ) : (
        <div>
          <p>TODOが1つもありません。新しいTODOを作成してください。</p>
        </div>
      )}
    </div>
  );
};
export default Todos;
