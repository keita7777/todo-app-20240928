"use client";

import { useState } from "react";
import DeteleModal from "./DeteleModal";

interface DeleteButtonProps {
  id: string;
}

const DeleteButton = ({ id }: DeleteButtonProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      {isModalOpen && <DeteleModal setIsModalOpen={setIsModalOpen} id={id} />}
      <button
        type="submit"
        className="bg-red-500 text-white px-2 py-2 mt-4 rounded-md w-2/5"
        onClick={(e) => {
          e.preventDefault();
          setIsModalOpen(true);
        }}
      >
        削除
      </button>
    </>
  );
};
export default DeleteButton;
