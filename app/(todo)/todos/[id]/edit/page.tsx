import EditForm from "@/components/todo/EditForm";
import { getTodoDetail } from "@/lib/actions";
import { Status } from "@prisma/client";

export type EditTodo = {
  id: string;
  title: string;
  description: string;
  status: Status;
};

const Edit = async ({ params }: { params: { id: string } }) => {
  const todo = await getTodoDetail(params.id);
  // エラーの時どうするか？？

  return (
    <div>
      <h1 className="text-center text-2xl font-bold mb-6">TODOを編集</h1>
      <EditForm todo={todo} />
    </div>
  );
};
export default Edit;
