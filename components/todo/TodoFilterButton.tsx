"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface TodoFilterButtonProps {
  label: string;
  value?: string;
}

const TodoFilterButton = ({ label, value }: TodoFilterButtonProps) => {
  const searchParams = useSearchParams();
  const params = new URLSearchParams(searchParams);
  const { replace } = useRouter();

  const currentStatus = params.get("status") || undefined;

  const handleFilter = () => {
    params.set("page", "1");

    if (value) {
      params.set("status", value);
    } else {
      params.delete("status");
    }

    replace(`/todos/?${params.toString()}`);
  };

  return (
    <li>
      <button
        className={`border  px-2 py-1 rounded-md ${
          currentStatus === value && "bg-blue-200"
        }`}
        onClick={handleFilter}
      >
        {label}
      </button>
    </li>
  );
};
export default TodoFilterButton;
