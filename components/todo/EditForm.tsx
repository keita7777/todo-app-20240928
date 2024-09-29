"use client";

import { EditTodo } from "@/app/(todo)/todos/[id]/edit/page";
import { TodoFormInput } from "@/app/(todo)/todos/create/page";
import { todoSchema } from "@/validations/todoSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";

const EditForm = ({ todo }: { todo: EditTodo }) => {
  const { id, title, description, status } = todo;
  const router = useRouter();
  const {
    handleSubmit,
    reset,
    register,
    setError,
    formState,
    formState: { errors },
  } = useForm<TodoFormInput>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title: title,
      description: title,
      status: status,
    },
  });

  const onSubmit = async (data: TodoFormInput) => {
    console.log(data);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex flex-col mb-4">
        <label htmlFor="title">タイトル</label>
        <input
          type="title"
          className="border rounded-md p-2 text-sm"
          defaultValue={title}
          {...register("title")}
        />
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="description">詳細</label>
        <textarea
          id="description"
          className="border rounded-md p-2 text-sm"
          defaultValue={description}
          {...register("description")}
        />
      </div>
      <div className="flex flex-col mb-4 max-w-[50%]">
        <label htmlFor="status">ステータス</label>
        <select
          id="status"
          defaultValue={status}
          className="border rounded-md p-2 text-sm"
          {...register("status")}
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
  );
};
export default EditForm;
