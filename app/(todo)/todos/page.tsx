import Pagenation from "@/components/todo/Pagenation";
import TodoFilter from "@/components/todo/TodoFilter";
import TodoList from "@/components/todo/TodoList";
import { countTodo } from "@/lib/actions";
import { Status } from "@prisma/client";

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

  return (
    <div>
      <TodoFilter />
      <TodoList
        pageSize={pageSize}
        page={page}
        query={query}
        status={status}
        sort={sort}
      />
      <Pagenation
        itemCount={todoCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </div>
  );
};
export default Todos;
