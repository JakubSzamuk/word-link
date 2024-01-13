"use client";

import React, { useEffect } from "react";
import Home from "./page";
import { useSession, SessionProvider } from "next-auth/react";
import AdminWrapper from "./AdminWrapper";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <AdminWrapper>{children}</AdminWrapper>
    </div>
  );
};

export default HomeLayout;
