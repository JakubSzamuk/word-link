"use client";
import React, { useEffect, useState } from "react";
import AuthorizedUser from "./AuthorizedUser";
import axios from "axios";
import Errors from "@/components/Errors";
import Loader from "@/components/Loader";

import { Check, X } from "@phosphor-icons/react";
import { motion as m, useAnimationControls } from "framer-motion";

export type AuthorizedUserProps = {
  user: AuthorizedUser;
  delete_user: (id: string) => void;
  handle_popup: (message: string, code: boolean) => void;
};
export type AuthorizedUser = {
  id: string;
  email: string;
  super_admin: boolean;
};

const Page = () => {
  const [users, setUsers] = useState<AuthorizedUser[]>([]);
  const [isAllowed, setIsAllowed] = useState<boolean>(true);

  const [message, setMessage] = useState<{ code: boolean; message: string }>({
    code: false,
    message: "",
  });
  const popupControls = useAnimationControls();

  const fetch_users = () => {
    axios.get("/api/users").then((data) => {
      if (data.data.data != "unauthorized") {
        setUsers(data.data.data);
      } else {
        setIsAllowed(false);
      }
    });
  };

  useEffect(() => {
    fetch_users();
  }, []);

  useEffect(() => {
    setTimeout(() => {
      popupControls.start("hidden");
    }, 2000);
  }, [message]);

  const deleteUser = (id: string) => {
    setUsers(users.filter((user) => user.id != id));
  };

  const handlePopupMessage = (message: string, code: boolean) => {
    setMessage({ code, message });
    popupControls.start("shown");
  };

  return (
    <div className="text-white primary_font w-full relative">
      {users == null ? (
        !isAllowed && <Errors message="401, Unauthorized" />
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
            {users.length != 0 ? (
              users.map((user, index) => (
                <AuthorizedUser
                  key={index}
                  user={user}
                  delete_user={deleteUser}
                  handle_popup={handlePopupMessage}
                />
              ))
            ) : (
              <Loader />
            )}
          </div>
        </>
      )}
      <m.div
        variants={{
          hidden: {
            y: 100,
            opacity: 0,
          },
          shown: {
            y: 0,
            opacity: 1,
          },
        }}
        animate={popupControls}
        initial="hidden"
        className="absolute bottom-0 right-0 px-8 py-4 flex items-center bg-secondary rounded-md"
      >
        <div className="flex items-center">
          {message.code ? <Check size={32} /> : <X size={32} />}
          <p className="text-standard ml-2">{message.message}</p>
        </div>
      </m.div>
    </div>
  );
};

export default Page;
