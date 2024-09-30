"use client";

import { useRouter, useSearchParams } from "next/navigation";
import { FormEvent, useState } from "react";
import { useDebouncedCallback } from "use-debounce";

const TodoSearch = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const [searchInput, setSearchInput] = useState("");

  const handleSearch = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (searchInput !== "") {
      params.set("query", searchInput);
    } else {
      params.delete("query");
    }
    setSearchInput("");
    replace(`/todos/?${params.toString()}`);
  };

  return (
    <div className="border rounded-md">
      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="TODOを検索"
          className="px-2 py-1 text-sm rounded-l-md"
          value={searchInput}
          onChange={(e) => {
            setSearchInput(e.target.value);
          }}
        />
        <button
          className="px-2 py-1 text-sm bg-blue-200 rounded-r-md"
          type="submit"
        >
          検索
        </button>
      </form>
    </div>
  );
};
export default TodoSearch;
