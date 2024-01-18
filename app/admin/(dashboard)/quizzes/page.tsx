"use client";
import React, { useEffect, useState } from "react";
import SavedQuiz from "./SavedQuiz";
import { useRouter } from "next/navigation";
import axios from "axios";
import { signOut } from "next-auth/react";
import Loader from "@/components/Loader";
import Errors from "@/components/Errors";

import { motion as m, useAnimationControls } from "framer-motion";
import { Check, X } from "@phosphor-icons/react";

type SavedQuiz = {
  id: string;
  name: string;
  code: number;
};
export type SavedQuizProps = {
  quiz: SavedQuiz;
  handle_popup: (message: string, code: boolean, id: string) => void;
};

const Page = () => {
  const [quizzes, setQuizzes] = useState<SavedQuiz[] | null>([]);
  const [loading, setLoading] = useState(true);
  const { push } = useRouter();

  const [message, setMessage] = useState<{ code: boolean; message: string }>({
    code: false,
    message: "",
  });
  const popupControls = useAnimationControls();

  useEffect(() => {
    setTimeout(() => {
      popupControls.start("hidden");
    }, 2000);
  }, [message]);

  const handlePopupMessage = (message: string, code: boolean, id: string) => {
    setMessage({ code, message });
    popupControls.start("shown");
    setQuizzes(quizzes?.filter((quiz) => quiz.id != id)!);
  };

  useEffect(() => {
    axios.get("/api/quizzes").then((res) => {
      setQuizzes(res.data.data);
      setLoading(false);
    });
  }, []);
  if (quizzes == null) {
    signOut();
  }

  return (
    <div className="text-white primary_font w-full relative">
      {quizzes == null ? (
        <Errors message="401, Unauthorized" />
      ) : (
        <>
          <div className="flex items-center w-full">
            <h1 className="text-standard">Here are your Quizzes.</h1>
            <button
              className="text-button py-1 px-12 rounded-md bg-secondary ml-auto"
              onClick={() => push("/admin/quizzes/add-quiz/new")}
            >
              New Quiz
            </button>
          </div>

          <div className="mt-4 flex flex-col gap-2 overflow-y-scroll h-5/6">
            {loading ? (
              <Loader />
            ) : quizzes.length > 0 ? (
              quizzes.map((quiz) => (
                <SavedQuiz
                  key={quiz.code}
                  quiz={quiz}
                  handle_popup={handlePopupMessage}
                />
              ))
            ) : (
              <p>
                Looks Like you do not have any Quizzes, Click the new quiz
                button to get started
              </p>
            )}
          </div>
        </>
      )}
      <m.div
        variants={{
          hidden: {
            y: 100,
            opacity: 0,
          },
          shown: {
            y: 0,
            opacity: 1,
          },
        }}
        animate={popupControls}
        initial="hidden"
        className="absolute bottom-0 right-0 px-8 py-4 flex items-center bg-secondary rounded-md"
      >
        <div className="flex items-center">
          {message.code ? <Check size={32} /> : <X size={32} />}
          <p className="text-standard ml-2">{message.message}</p>
        </div>
      </m.div>
    </div>
  );
};

export default Page;
