import React from "react";
import AuthorizedUser from "./AuthorizedUser";

export type AuthorizedUserProps = {
  id: string;
  email: string;
};

const page = () => {
  const users = [{ id: "1", email: "Jakub.Szamuk@UTCLeeds.co.uk" }];

  return (
    <div className="text-white primary_font w-full">
      <div className="flex items-center w-full">
        <h1 className="text-standard">Here is a list of authorized users.</h1>
        <button className="text-button py-1 px-12 rounded-md bg-secondary ml-auto">
          New User
        </button>
      </div>

      <div className="mt-4">
        {users.map((user, index) => (
          <AuthorizedUser key={index} {...user} />
        ))}
      </div>
    </div>
  );
};

export default page;
