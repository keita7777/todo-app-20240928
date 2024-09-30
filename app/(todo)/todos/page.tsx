import Pagenation from "@/components/todo/Pagenation";
import TodoList from "@/components/todo/TodoList";
import prisma from "@/prisma/db";

interface SearchParams {
  page: string;
}

const Todos = async ({ searchParams }: { searchParams: SearchParams }) => {
  const pageSize = 5;
  const page = parseInt(searchParams.page) || 1;
  const todoCount = await prisma.todo.count();

  return (
    <div>
      <TodoList pageSize={pageSize} page={page} />
      <Pagenation
        itemCount={todoCount}
        pageSize={pageSize}
        currentPage={page}
      />
    </div>
  );
};
export default Todos;
