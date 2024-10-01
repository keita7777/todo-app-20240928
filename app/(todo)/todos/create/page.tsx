"use client";

import { createTodo } from "@/lib/actions";
import { todoSchema } from "@/validations/todoSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

export type TodoFormInput = z.infer<typeof todoSchema>;

const Create = () => {
  const router = useRouter();
  const {
    handleSubmit,
    register,
    setError,
    formState,
    formState: { errors },
  } = useForm<TodoFormInput>({
    resolver: zodResolver(todoSchema),
    defaultValues: {
      title: "",
      description: "",
      status: undefined,
    },
  });

  const onSubmit = async (data: TodoFormInput) => {
    const response = await createTodo(data);

    // ユーザー作成処理結果に何かしらのメッセージがある場合はエラーとみなす
    if (response?.message) {
      setError("root", {
        message: response.message,
      });
    } else {
      // メッセージがない場合は認証成功とみなして/todosに遷移させる
      router.push("/todos");
      router.refresh();
    }
  };

  return (
    <div>
      {formState.isSubmitSuccessful && null}
      <h1 className="text-center text-2xl font-bold mb-6">TODOを作成</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <fieldset disabled={formState.isSubmitting}>
          <div className="flex flex-col mb-4">
            <label htmlFor="title">タイトル</label>
            <input
              id="title"
              type="text"
              className="border rounded-md p-2 text-sm"
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
              defaultValue="default"
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
          <div className="flex justify-center gap-2">
            {errors["root"] && (
              <p className="text-red-500">{errors["root"].message}</p>
            )}
            <button
              type="submit"
              className="bg-blue-500 text-white px-2 py-2 mt-4 rounded-md w-2/5"
            >
              登録
            </button>
            <button
              type="submit"
              className="bg-gray-500 text-white px-2 py-2 mt-4 rounded-md w-2/5"
            >
              リセット
            </button>
          </div>
        </fieldset>
      </form>
    </div>
  );
};
export default Create;
