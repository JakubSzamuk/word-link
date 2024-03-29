"use client";
import { PencilSimple, Trash } from "@phosphor-icons/react";
import React, { useState } from "react";
import type { AuthorizedUserProps } from "./page";
import axios from "axios";

const SavedQuiz = ({
  user,
  delete_user,
  handle_popup,
}: AuthorizedUserProps) => {
  const [isEditing, setIsEditing] = useState(user.id ? false : true);
  const [emailAddress, setEmailAddress] = useState(user.email);
  const [isSuper, setIsSuper] = useState(user.super_admin);

  return (
    <div className="grid grid-cols-2 xlg:flex items-center overflow-x-scroll xlg:overflow-x-auto bg-secondary rounded-md py-2 px-6 md:flex-col xlg:flex-row">
      <div className="relative w-full mr-2 col-span-2 overflow-x-visible">
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
          <div className="flex ml-auto xlg:ml-0">
            <input
              type="checkbox"
              checked={isSuper}
              onChange={() => setIsSuper(!isSuper)}
            />
            <p className="text-standard ml-1 mr-2">SuperAdmin?</p>
          </div>
          <div className="flex col-span-2 ml-auto xlg:ml-0">
            <button
              className="text-standard px-12 py-[1px] rounded-md bg-tertiary ml-auto"
              onClick={() => {
                setEmailAddress(user.email);
                setIsEditing(false);
              }}
            >
              Cancel
            </button>
            <button
              className="text-standard py-[1px] px-12 rounded-md bg-tertiary ml-2"
              onClick={() => {
                let requestBody =
                  user.id != ""
                    ? { id: user.id, email: emailAddress, superUser: isSuper }
                    : { email: emailAddress, superUser: isSuper };

                axios.post("/api/users", requestBody).then((data) => {
                  user.id = data.data.data.id;
                  user.email = data.data.data.email;
                  setIsSuper(data.data.data.super_admin);
                  if (data.data.code == 200) {
                    handle_popup(`Successfully Saved ${user.email}`, true);
                  } else {
                    handle_popup(`Uh oh, An error occured`, false);
                  }
                });

                setIsEditing(false);
              }}
            >
              Save
            </button>
          </div>
        </>
      ) : (
        <div className="flex ml-auto xlg:ml-0">
          <button className="ml-auto" onClick={() => setIsEditing(true)}>
            <PencilSimple size={32} color="#fff" />
          </button>
          <button
            onClick={() => {
              axios
                .delete(`/api/users?user_id=${user.id}`)
                .then(() => {
                  handle_popup(`Successfully Deleted ${user.email}`, true);
                })
                .catch(() => {
                  handle_popup(`Failed to Delete ${user.email}`, false);
                });
              delete_user(user.id);
            }}
          >
            <Trash size={32} color="#fff" />
          </button>
        </div>
      )}
    </div>
  );
};

export default SavedQuiz;
