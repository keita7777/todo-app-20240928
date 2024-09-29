"use client";

import { FaUserCircle } from "react-icons/fa";
import Link from "next/link";
import { useState } from "react";

const ProfileButton = () => {
  const [isModelOpen, setIsModelOpen] = useState(false);
  return (
    <div className="relative">
      <button
        onClick={(e) => {
          e.preventDefault();
          setIsModelOpen((prev) => !prev);
        }}
        onBlur={(e) => {
          e.preventDefault();
          setIsModelOpen(false);
        }}
      >
        <FaUserCircle />
      </button>
      {isModelOpen && (
        <div className="absolute top-10 right-0 w-44 bg-blue-200 rounded-md p-2">
          <ul className="flex flex-col gap-2 text-sm">
            <li className="bg-white rounded-md text-center p-2">
              <Link href="/profile">プロフィール</Link>
            </li>
            <li className="bg-white rounded-md text-center p-2">
              <button>ログアウト</button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};
export default ProfileButton;
