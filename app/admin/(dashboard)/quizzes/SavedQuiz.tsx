"use client";
import { Key, PencilSimple, Trash } from "@phosphor-icons/react";
import React from "react";
import type { SavedQuizProps } from "./page";
import { useRouter } from "next/navigation";

const SavedQuiz = ({ id, code, name }: SavedQuizProps) => {
  const { push } = useRouter();

  return (
    <div className="flex items-center bg-secondary rounded-md py-2 px-6 flex-col xlg:flex-row">
      <p className="text-standard">{name}</p>
      <button
        onClick={() => push(`/admin/quizzes/share-code/${code}`)}
        className="flex items-center mr-4 ml-auto gap-1"
      >
        <Key size={32} color="#fff" />
        <p className="text-standard">{code}</p>
      </button>
      <button onClick={() => push(`/admin/quizzes/add-quiz/${code}`)}>
        <PencilSimple size={32} color="#fff" />
      </button>
      <button>
        <Trash size={32} color="#fff" />
      </button>
    </div>
  );
};

export default SavedQuiz;
