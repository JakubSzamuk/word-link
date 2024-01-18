"use client";
import { useSession } from "next-auth/react";
import React, { useEffect } from "react";
import { redirect } from "next/navigation";

const Page = () => {
  const { data: session, status } = useSession();

  return <main className="flex justify-center items-center"></main>;
};

export default Page;
