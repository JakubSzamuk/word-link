"use client";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { redirect } from "next/navigation";

const Page = () => {
  const { data: session, status } = useSession();
  if (status === "unauthenticated") {
    redirect("/admin/login");
    return <div></div>;
  } else if (status === "authenticated") {
    redirect("/admin/quizzes");
    return <div></div>;
  }

  return <main className="flex justify-center items-center"></main>;
};

export default Page;
