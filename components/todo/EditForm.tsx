"use client";

import { EditTodo } from "@/app/(todo)/todos/[id]/edit/page";
import { TodoFormInput } from "@/app/(todo)/todos/create/page";
import { updateTodo } from "@/lib/actions";
import { todoSchema } from "@/validations/todoSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import Link from "next/link";

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
      description: description,
      status: status,
    },
  });

  const onSubmit = async (data: TodoFormInput) => {
    const response = await updateTodo(id, data);

    if (response?.message) {
      setError("root", {
        message: response.message,
      });
    } else {
      router.push("/todos");
      router.refresh();
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      {errors["root"] && (
        <p className="text-red-500 text-center">{errors["root"].message}</p>
      )}
      <div className="flex flex-col mb-4">
        <label htmlFor="title">タイトル</label>
        <input
          type="title"
          className="border rounded-md p-2 text-sm"
          defaultValue={title}
          {...register("title")}
        />
        {errors["title"] && (
          <p className="text-red-500">{errors["title"].message}</p>
        )}
      </div>
      <div className="flex flex-col mb-4">
        <label htmlFor="description">詳細</label>
        <textarea
          id="description"
          className="border rounded-md p-2 text-sm"
          defaultValue={description}
          {...register("description")}
        />
        {errors["description"] && (
          <p className="text-red-500">{errors["description"].message}</p>
        )}
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
        {errors["status"] && (
          <p className="text-red-500">{errors["status"].message}</p>
        )}
      </div>
      <div className="flex justify-center gap-4">
        <button
          type="submit"
          className="bg-blue-500 text-white px-2 py-2 mt-4 rounded-md w-2/5"
        >
          更新
        </button>
        <Link
          href={`/todos/${todo.id}`}
          className="bg-red-500 text-white px-2 py-2 mt-4 rounded-md w-2/5 text-center"
        >
          キャンセル
        </Link>
      </div>
    </form>
  );
};
export default EditForm;
