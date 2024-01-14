"use client";
import { motion as m, useAnimationControls } from "framer-motion";

export default function Home() {
  const codeController = useAnimationControls();
  return (
    <main className="primary_font text-white flex flex-col justify-center items-center">
      <div className="mt-64">
        <h1 className="text-header ">WordLink</h1>
        <p className="text-standard">
          Group Words Based on their Dual meanings. This will
        </p>
        <div className="flex mt-4 relative">
          <m.button
            animate={codeController}
            onClick={() => codeController.start("show")}
            variants={{
              show: {
                width: "60%",
              },
              hide: {
                width: "40%",
              },
            }}
            initial="hide"
            className="primary_background py-2 px-10 rounded-full text-button absolute right-0"
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
              className="bg-transparent w-4/5 justify-self-start"
            ></m.input>
          </m.button>
        </div>
      </div>
    </main>
  );
}
