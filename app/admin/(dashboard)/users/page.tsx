"use client";
import React, { useEffect, useState } from "react";
import AuthorizedUser from "./AuthorizedUser";
import axios from "axios";
import Errors from "@/components/Errors";
import Loader from "@/components/Loader";

export type AuthorizedUserProps = {
  user: AuthorizedUser;
  delete_user: (id: string) => void;
};
export type AuthorizedUser = {
  id: string;
  email: string;
  super_admin: boolean;
};

const Page = () => {
  const [users, setUsers] = useState<AuthorizedUser[]>([]);
  const [isAllowed, setIsAllowed] = useState<boolean>(true);

  useEffect(() => {
    axios.get("/api/users/fetch-users").then((data) => {
      console.log(data);
      if (data.data.data != "unauthorized") {
        setUsers(data.data.data);
      } else {
        setIsAllowed(false);
      }
    });
  }, []);

  const deleteUser = (id: string) => {
    setUsers(users.filter((user) => user.id != id));
  };

  return (
    <div className="text-white primary_font w-full">
      {users == null ? (
        isAllowed ? (
          <Loader />
        ) : (
          <Errors message="401, Unauthorized" />
        )
      ) : (
        <>
          <div className="flex items-center w-full">
            <h1 className="text-standard">
              Here is a list of authorized users.
            </h1>
            <button
              className="text-button py-1 px-12 rounded-md bg-secondary ml-auto"
              onClick={() =>
                setUsers([...users, { id: "", email: "", super_admin: false }])
              }
            >
              New User
            </button>
          </div>

          <div className="mt-4 flex flex-col gap-2 overflow-y-scroll h-5/6">
            {users.length != 0 &&
              users.map((user, index) => (
                <AuthorizedUser
                  key={index}
                  user={user}
                  delete_user={deleteUser}
                />
              ))}
          </div>
        </>
      )}
    </div>
  );
};

export default Page;
