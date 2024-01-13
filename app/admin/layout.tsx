"use client";

import React, { useEffect } from "react";
import { useSession, SessionProvider } from "next-auth/react";

const HomeLayout = ({ children }: { children: React.ReactNode }) => {
  return <SessionProvider>{children}</SessionProvider>;
};

export default HomeLayout;
