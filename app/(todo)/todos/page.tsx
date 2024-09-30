import Pagenation from "@/components/todo/Pagenation";
import TodoList from "@/components/todo/TodoList";
import { countTodo } from "@/lib/actions";

interface SearchParams {
  page: string;
  query: string;
}

const Todos = async ({ searchParams }: { searchParams: SearchParams }) => {
  const pageSize = 5;
  const page = parseInt(searchParams.page) || 1;
  const query = searchParams.query;
  const todoCount = await countTodo(query);

  return (
    <div>
      <TodoList pageSize={pageSize} page={page} query={query} />
      <Pagenation
        itemCount={todoCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </div>
  );
};
export default Todos;
