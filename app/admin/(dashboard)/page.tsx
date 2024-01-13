"use client";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { redirect } from "next/navigation";

const page = () => {
  const { data: session, status } = useSession();
  if (status === "unauthenticated") {
    redirect("/admin/login");
    return;
  }

  return <main className="flex justify-center items-center"></main>;
};

export default page;
