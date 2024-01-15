"use client";
import React, { useEffect, useState } from "react";
import SavedQuiz from "./SavedQuiz";
import { useRouter } from "next/navigation";
import axios from "axios";
import { signOut } from "next-auth/react";

export type SavedQuizProps = {
  id: string;
  name: string;
  code: number;
};

const Page = () => {
  const [quizzes, setQuizzes] = useState<SavedQuizProps[]>([]);
  const { push } = useRouter();

  useEffect(() => {
    axios.get("/api/quizzes/fetch-quizzes").then((res) => {
      setQuizzes(res.data.data);
    });
  });
  if (quizzes == null) {
    push("/admin");
    signOut();
  }

  return (
    <div className="text-white primary_font w-full">
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
        {quizzes == null ? (
          <p>Unauthorized</p>
        ) : quizzes.length == 0 ? (
          <p>Loading...</p>
        ) : (
          quizzes.map((quiz) => <SavedQuiz key={quiz.code} {...quiz} />)
        )}
      </div>
    </div>
  );
};

export default Page;
