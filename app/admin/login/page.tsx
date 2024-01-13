"use client";
import { signIn, useSession } from "next-auth/react";
import { redirect } from "next/navigation";
import React, { useEffect } from "react";

const Login = () => {
  const { data: session, status } = useSession();
  useEffect(() => {
    if (status === "authenticated") {
      redirect("/admin");
    } else if (status === "unauthenticated") {
      signIn("google");
    }
  }, [session]);
};

export default Login;
