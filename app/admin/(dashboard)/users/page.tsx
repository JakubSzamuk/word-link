"use client";
import React, { useEffect, useState } from "react";
import AuthorizedUser from "./AuthorizedUser";
import axios from "axios";

export type AuthorizedUserProps = {
  id: string;
  email: string;
  super_admin: boolean;
};

const page = () => {
  const [users, setUsers] = useState<AuthorizedUserProps[]>([]);

  useEffect(() => {
    axios.get("/api/users/fetch-users").then((data) => {
      setUsers(data.data.data);
    });
  }, []);

  const deleteUser = (id: string) => {
    setUsers(users.filter((user) => user.id != id));
  };

  return (
    <div className="text-white primary_font w-full">
      <div className="flex items-center w-full">
        <h1 className="text-standard">Here is a list of authorized users.</h1>
        <button
          className="text-button py-1 px-12 rounded-md bg-secondary ml-auto"
          onClick={() =>
            setUsers([...users, { id: "", email: "", super_admin: false }])
          }
        >
          New User
        </button>
      </div>

      <div className="mt-4 flex flex-col gap-2 overflow-y-scroll">
        {users.map((user, index) => (
          <AuthorizedUser key={index} {...user} delete_user={deleteUser} />
        ))}
      </div>
    </div>
  );
};

export default page;