"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent } from "react";

const TodoSort = () => {
  const searchParams = useSearchParams();
  const router = useRouter();

  const handleSort = (e: ChangeEvent<HTMLSelectElement>) => {
    const newSortValue = e.target.value;
    const params = new URLSearchParams(searchParams);

    if (params.has("sort")) {
      params.set("sort", newSortValue);
    } else {
      params.append("sort", newSortValue);
    }

    router.replace(`?${params.toString()}`);
  };

  return (
    <div>
      <select className="border px-2 py-1 rounded-md" onChange={handleSort}>
        <option value="desc">降順（日付）</option>
        <option value="asc">昇順（日付）</option>
      </select>
    </div>
  );
};
export default TodoSort;
