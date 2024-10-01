"use client";

import { FaUserCircle } from "react-icons/fa";
import Link from "next/link";
import { useCallback, useEffect, useState } from "react";
import { logout } from "@/lib/actions";
import { useRouter } from "next/navigation";

// https://katatumuri.xyz/react/357/react-modal-function-component/
// このページを参考に作成

const ProfileButton = () => {
  const [isModelOpen, setIsModelOpen] = useState(false);
  const router = useRouter();

  // -----3------
  const closeModal = useCallback(() => {
    setIsModelOpen(false);
    document.removeEventListener("click", closeModal);
  }, []);
  // ---↑修正----

  // -----2------
  useEffect(() => {
    return () => {
      document.removeEventListener("click", closeModal);
    };
  }, [closeModal]);
  // ---↑追加----

  function openModal(e: React.MouseEvent<HTMLButtonElement>) {
    setIsModelOpen(true);
    document.addEventListener("click", closeModal);
    e.stopPropagation();
  }

  return (
    <div className="relative">
      <button
        onClick={(e: React.MouseEvent<HTMLButtonElement>) => {
          e.preventDefault();
          e.stopPropagation();
          openModal(e);
        }}
      >
        <FaUserCircle />
      </button>
      {isModelOpen && (
        <div className="absolute top-10 right-0 w-44 bg-blue-200 rounded-md p-2">
          <ul className="flex flex-col gap-2 text-sm">
            <li className="bg-white rounded-md text-center">
              <Link href="/profile" className="block p-2">
                プロフィール
              </Link>
            </li>
            <li className="bg-white rounded-md text-center">
              <button
                onClick={async () => {
                  await logout();
                  router.push("/signin");
                }}
                className="block w-full p-2"
              >
                ログアウト
              </button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
export default ProfileButton;
