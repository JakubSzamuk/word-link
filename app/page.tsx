"use client";
import { motion as m, useAnimationControls } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";

export default function Home() {
  const codeController = useAnimationControls();
  const [code, setCode] = useState("");
  const { push } = useRouter();

  let isSmall;
  if (typeof window !== "undefined") {
    isSmall = window.innerWidth < 800;
  }

  return (
    <main className="primary_font text-white flex flex-col justify-center items-center">
      <div className="mt-64 px-8">
        <h1 className="text-header ">WordLink</h1>
        <p className="text-standard">
          Group Words Based on their Dual meanings. This will
        </p>
        <div className="flex flex-col md:flex-row mt-4 relative gap-8 md:gap-0">
          <m.button
            animate={codeController}
            onClick={() => codeController.start("show")}
            variants={{
              show: {
                width: isSmall ? "100%" : "60%",
                right: 140,
              },
              hide: {
                width: isSmall ? "100%" : "40%",
                right: 0,
              },
            }}
            initial="hide"
            className="primary_background py-2 px-10 rounded-full text-button md:absolute"
          >
            <m.p
              variants={{
                show: {
                  opacity: 0,
                },
                hide: {
                  opacity: 1,
                },
              }}
              animate={codeController}
              initial="hide"
              className="absolute pointer-events-none"
            >
              Enter Code
            </m.p>
            <m.input
              variants={{
                show: {
                  pointerEvents: "auto",
                  opacity: 1,
                },
                hide: {
                  pointerEvents: "none",
                  opacity: 0,
                },
              }}
              animate={codeController}
              initial="hide"
              placeholder="Enter Code"
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="bg-transparent w-full justify-self-start"
            ></m.input>
          </m.button>
          <m.button
            variants={{
              show: {
                y: 0,
                opacity: 1,
              },
              hide: {
                y: 100,
                opacity: 0,
              },
            }}
            initial="hide"
            animate={codeController}
            className="md:absolute right-0 primary_background py-2 px-10 rounded-full text-button"
            onClick={() => push(`/quiz/${code}`)}
          >
            Play
          </m.button>
        </div>
      </div>
    </main>
  );
}
