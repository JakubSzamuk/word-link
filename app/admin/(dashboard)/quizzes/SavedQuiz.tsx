"use client";
import { Key, PencilSimple, Trash } from "@phosphor-icons/react";
import React from "react";
import type { SavedQuizProps } from "./page";
import { useRouter } from "next/navigation";
import axios from "axios";

const SavedQuiz = ({ id, code, name }: SavedQuizProps) => {
  const { push } = useRouter();

  return (
    <div className="grid grid-cols-2 xlg:flex items-center bg-secondary rounded-md py-2 px-6 xlg:flex-row">
      <p className="text-standard">{name}</p>
      <button
        onClick={() => push(`/admin/quizzes/share-code/${code}`)}
        className="flex items-center xlg:mr-4 ml-auto gap-1"
      >
        <Key size={32} color="#fff" />
        <p className="text-standard">{code}</p>
      </button>

      <div className="col-span-2 ml-auto xlg:ml-0 flex justify-center">
        <button onClick={() => push(`/admin/quizzes/add-quiz/${code}`)}>
          <PencilSimple size={32} color="#fff" />
        </button>
        <button
          onClick={() => {
            axios.post("/api/quizzes/delete-quiz", { quiz_id: id });
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
