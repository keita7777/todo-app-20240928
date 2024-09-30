"use client";

import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

interface PagenationProps {
  itemCount: number;
  pageSize: number;
  currentPage: number;
}

const Pagenation = ({ itemCount, pageSize, currentPage }: PagenationProps) => {
  const pageCount = Math.ceil(itemCount / pageSize);
  const router = useRouter();
  const searchParams = useSearchParams();

  const changePage = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", page.toString());

    router.push("?" + params.toString());
  };

  if (pageCount <= 1) return null;

  return (
    <div className="flex justify-center items-center flex-col gap-2 mt-4">
      <div className="flex gap-2">
        <button
          className={`border rounded-md px-2 py-1 ${
            currentPage === 1 && "bg-gray-100 text-gray-500"
          }`}
          disabled={currentPage === 1}
          onClick={() => changePage(1)}
        >
          最初のページ
        </button>
        <button
          className={`border rounded-md px-2 py-1 ${
            currentPage === 1 && "bg-gray-100 text-gray-500"
          }`}
          disabled={currentPage === 1}
          onClick={() => changePage(currentPage - 1)}
        >
          前へ
        </button>
        <button
          className={`border rounded-md px-2 py-1 ${
            currentPage === pageCount && "bg-gray-100 text-gray-500"
          }`}
          disabled={currentPage === pageCount}
          onClick={() => changePage(currentPage + 1)}
        >
          次へ
        </button>
        <button
          className={`border rounded-md px-2 py-1 ${
            currentPage === pageCount && "bg-gray-100 text-gray-500"
          }`}
          disabled={currentPage === pageCount}
          onClick={() => changePage(pageCount)}
        >
          最後のページ
        </button>
      </div>
      <div>
        {pageCount}ページ中{currentPage}ページ目
      </div>
    </div>
  );
};
export default Pagenation;
