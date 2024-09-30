"use client";

import { useRouter, useSearchParams } from "next/navigation";

interface TodoFilterButtonProps {
  label: string;
  value?: string;
}

const TodoFilterButton = ({ label, value }: TodoFilterButtonProps) => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();

  console.log(value);

  const handleFilter = () => {
    const params = new URLSearchParams(searchParams);
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
        className={`border bg-blue-200 px-2 py-1 rounded-md`}
        onClick={handleFilter}
      >
        {label}
      </button>
    </li>
  );
};
export default TodoFilterButton;
