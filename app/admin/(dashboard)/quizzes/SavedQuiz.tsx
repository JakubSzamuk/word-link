"use client";
import { Key, PencilSimple, Trash } from "@phosphor-icons/react";
import React from "react";
import type { SavedQuizProps } from "./page";
import { useRouter } from "next/navigation";
import axios from "axios";

const SavedQuiz = ({ quiz, handle_popup }: SavedQuizProps) => {
  const { push } = useRouter();

  return (
    <div className="grid grid-cols-2 xlg:flex items-center bg-secondary rounded-md py-2 px-6 xlg:flex-row">
      <p className="text-standard">{quiz.name}</p>
      <button
        onClick={() => push(`/admin/quizzes/share-code/${quiz.code}`)}
        className="flex items-center xlg:mr-4 ml-auto gap-1"
      >
        <Key size={32} color="#fff" />
        <p className="text-standard">{quiz.code}</p>
      </button>

      <div className="col-span-2 ml-auto xlg:ml-0 flex justify-center">
        <button onClick={() => push(`/admin/quizzes/add-quiz/${quiz.code}`)}>
          <PencilSimple size={32} color="#fff" />
        </button>
        <button
          onClick={() => {
            axios
              .delete(`/api/quizzes?quiz_id=${quiz.id}`)
              .then((data): void => {
                handle_popup(
                  data.data.code == 200
                    ? `Successfully Deleted ${quiz.name}`
                    : `Could not Delete ${quiz.name}`,
                  data.data.code == 200,
                  quiz.id
                );
              });
            push("/admin/quizzes");
          }}
        >
          <Trash size={32} color="#fff" />
        </button>
      </div>
    </div>
  );
};

export default SavedQuiz;
