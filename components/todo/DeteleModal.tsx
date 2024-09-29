"use clinet";

import { deleteTodo } from "@/lib/actions";
import { useRouter } from "next/navigation";
import { SetStateAction } from "react";

interface DeteleModalProps {
  setIsModalOpen: (value: SetStateAction<boolean>) => void;
  id: string;
}

const DeteleModal = ({ setIsModalOpen, id }: DeteleModalProps) => {
  const router = useRouter();
  const handleDelete = async () => {
    await deleteTodo(id);

    router.push("/todos");
    router.refresh();
    setIsModalOpen(false);
  };
  return (
    <div className="absolute top-0 left-0 w-screen h-screen bg-gray-400 bg-opacity-30 flex justify-center items-center">
      <div className="w-3/5 bg-white px-4 py-10 flex flex-col justify-center items-center rounded-md">
        <p>本当に削除しますか？</p>
        <div className="flex gap-4 w-full">
          <button
            className="bg-red-500 text-white px-2 py-2 mt-4 rounded-md w-4/5"
            onClick={handleDelete}
          >
            削除
          </button>
          <button
            className="bg-gray-500 text-white px-2 py-2 mt-4 rounded-md w-4/5"
            onClick={(e) => {
              e.preventDefault();
              setIsModalOpen(false);
            }}
          >
            キャンセル
          </button>
        </div>
      </div>
    </div>
  );
};
export default DeteleModal;
