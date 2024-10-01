"use client";

import { useRouter, useSearchParams } from "next/navigation";

const SeachQueryReset = () => {
  const searchParams = useSearchParams();
  const { replace } = useRouter();
  const params = new URLSearchParams(searchParams);
  const query = params.get("query");

  const queryReset = () => {
    params.delete("query");
    replace(`/todos/?${params.toString()}`);
  };

  return (
    <>
      {query && (
        <button onClick={queryReset} className={`border  px-2 py-1 rounded-md`}>
          検索条件をリセット
        </button>
      )}
    </>
  );
};
export default SeachQueryReset;
