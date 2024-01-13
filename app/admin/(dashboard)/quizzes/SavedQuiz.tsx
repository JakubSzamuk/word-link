"use client";
import { Key, PencilSimple, Trash } from "@phosphor-icons/react";
import React from "react";
import type { SavedQuizProps } from "./page";

const SavedQuiz = ({ id, code, name }: SavedQuizProps) => {
  return (
    <div className="flex items-center bg-secondary rounded-md py-2 px-6">
      <p className="text-standard">{name}</p>
      <div className="flex items-center mr-4 ml-auto gap-1">
        <Key size={32} color="#fff" />
        <p className="text-standard">{code}</p>
      </div>
      <button>
        <PencilSimple size={32} color="#fff" />
      </button>
      <button>
        <Trash size={32} color="#fff" />
      </button>
    </div>
  );
};

export default SavedQuiz;
