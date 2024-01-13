import React from "react";
import SavedQuiz from "./SavedQuiz";

export type SavedQuizProps = {
  id: string;
  name: string;
  code: number;
};

const page = () => {
  const quizzes = [{ id: "1", name: "Quiz 1", code: 614823 }];

  return (
    <div className="text-white primary_font w-full">
      <div className="flex items-center w-full">
        <h1 className="text-standard">Here are your Quizzes.</h1>
        <button className="text-button py-1 px-12 rounded-md bg-secondary ml-auto">
          New Quiz
        </button>
      </div>

      <div className="mt-4">
        {quizzes.map((quiz, index) => (
          <SavedQuiz key={index} {...quiz} />
        ))}
      </div>
    </div>
  );
};

export default page;
