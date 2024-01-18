"use client";
import React, { useEffect, useState } from "react";
import SavedQuiz from "./SavedQuiz";
import { useRouter } from "next/navigation";
import axios from "axios";
import { signOut } from "next-auth/react";
import Loader from "@/components/Loader";
import Errors from "@/components/Errors";

export type SavedQuizProps = {
  id: string;
  name: string;
  code: number;
};

const Page = () => {
  const [quizzes, setQuizzes] = useState<SavedQuizProps[] | null>([]);
  const [loading, setLoading] = useState(true);
  const { push } = useRouter();

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
    <div className="text-white primary_font w-full">
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
              quizzes.map((quiz) => <SavedQuiz key={quiz.code} {...quiz} />)
            ) : (
              <p>
                Looks Like you do not have any Quizzes, Click the new quiz
                button to get started
              </p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
