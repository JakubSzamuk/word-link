"use client";
import { signOut, useSession } from "next-auth/react";
import { redirect, usePathname } from "next/navigation";
import { useRouter } from "next/navigation";
import React from "react";

const AdminWrapper = ({ children }) => {
  const { data: session, status } = useSession();
  const pathname = usePathname();
  const { push } = useRouter();
  if (status === "unauthenticated") {
    redirect("/admin/login");
    return;
  }

  return (
    <div className="w-11/12 xlg:w-2/3 mt-16">
      <h1 className="text-white primary_font text-standard mb-1">
        Welcome to WordLink, {session?.user?.name?.split(" ")[0]}
      </h1>
      <div className="primary_background rounded-lg p-4 flex gap-4 min-h-[80svh] min-w-4/5 flex-col xlg:flex-row">
        <div className="flex flex-col gap-2 text-white primary_font text-button min-w-64">
          <button
            onClick={() => push("/admin/quizzes")}
            className={`px-10 py-2 rounded-md ${
              pathname.slice(0, 14) === "/admin/quizzes"
                ? "bg-secondary"
                : "bg-tertiary"
            }`}
          >
            Quizzes
          </button>
          <button
            onClick={() => push("/admin/users")}
            className={`px-10 py-2 rounded-md bg-secondary ${
              pathname === "/admin/users" ? "bg-secondary" : "bg-tertiary"
            }`}
          >
            Users
          </button>
          <button
            className="mt-auto px-10 py-2 rounded-md bg-secondary"
            onClick={() => signOut()}
          >
            Sign Out
          </button>
        </div>
        <div className="w-1 bg-secondary rounded-full"></div>
        {children}
      </div>
    </div>
  );
};

export default AdminWrapper;
