"use client";
import { PencilSimple, Trash } from "@phosphor-icons/react";
import React, { useState } from "react";
import type { AuthorizedUserProps } from "./page";
import axios from "axios";

const SavedQuiz = ({
  id,
  email,
  super_admin,
  delete_user,
}: AuthorizedUserProps) => {
  const [isEditing, setIsEditing] = useState(id ? false : true);
  const [emailAddress, setEmailAddress] = useState(email);
  const [isSuper, setIsSuper] = useState(super_admin);

  return (
    <div className="flex items-center bg-secondary rounded-md py-2 px-6 flex-col xlg:flex-row">
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
          value={emailAddress}
          onChange={(e) => setEmailAddress(e.target.value)}
        />
      </div>

      {isEditing ? (
        <>
          <input
            type="checkbox"
            checked={isSuper}
            onChange={() => setIsSuper(!isSuper)}
          />
          <p className="text-standard ml-1 mr-2">SuperAdmin?</p>
          <button
            className="text-standard px-12 py-[1px] rounded-md bg-tertiary ml-auto"
            onClick={() => {
              setEmailAddress(email);
              setIsEditing(false);
            }}
          >
            Cancel
          </button>
          <button
            className="text-standard py-[1px] px-12 rounded-md bg-tertiary ml-2"
            onClick={() => {
              if (id != "") {
                axios
                  .post("/api/users/edit-user", {
                    id: id,
                    email: emailAddress,
                    superUser: isSuper,
                  })
                  .then((data) => {
                    id = data.data.data.id;
                    email = data.data.data.email;
                    setIsSuper(data.data.data.super_admin);
                  });
              } else {
                axios
                  .post("/api/users/add-user", {
                    email: emailAddress,
                    superUser: isSuper,
                  })
                  .then((data) => {
                    id = data.data.data.id;
                    email = data.data.data.email;
                    setIsSuper(data.data.data.super_admin);
                  });
              }

              setIsEditing(false);
            }}
          >
            Save
          </button>
        </>
      ) : (
        <>
          <button className="ml-auto" onClick={() => setIsEditing(true)}>
            <PencilSimple size={32} color="#fff" />
          </button>
          <button
            onClick={() => {
              axios.post("/api/users/delete-user", { userId: id });
              delete_user(id);
            }}
          >
            <Trash size={32} color="#fff" />
          </button>
        </>
      )}
    </div>
  );
};

export default SavedQuiz;
