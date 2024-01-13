"use client";
import { PencilSimple, Trash } from "@phosphor-icons/react";
import React, { useState } from "react";
import type { AuthorizedUserProps } from "./page";

const SavedQuiz = ({ id, email }: AuthorizedUserProps) => {
  const [isEditing, setIsEditing] = useState(id ? false : true);
  const [emailAddress, setEmailAddress] = useState(email);

  return (
    <div className="flex items-center bg-secondary rounded-md py-2 px-6">
      <div className="relative w-full mr-2">
        <p className={`text-standard ${isEditing ? "collapse" : ""}`}>
          {emailAddress || "None"}
        </p>
        <input
          className={`text-standard bg-transparent absolute top-0 w-full ${
            isEditing ? "" : "collapse"
          }`}
          type="email"
          placeholder="email"
          value={id ? emailAddress : ""}
          onChange={(e) => setEmailAddress(e.target.value)}
        />
      </div>

      {isEditing ? (
        <>
          <button
            className="text-standard px-12 py-[1px] rounded-md bg-tertiary ml-auto"
            onClick={() => {
              setEmailAddress(email);
              setIsEditing(false);
            }}
          >
            Cancel
          </button>
          <button className="text-standard py-[1px] px-12 rounded-md bg-tertiary ml-2">
            Save
          </button>
        </>
      ) : (
        <>
          <button className="ml-auto" onClick={() => setIsEditing(true)}>
            <PencilSimple size={32} color="#fff" />
          </button>
          <button>
            <Trash size={32} color="#fff" />
          </button>
        </>
      )}
    </div>
  );
};

export default SavedQuiz;
