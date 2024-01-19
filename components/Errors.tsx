import { Bug, ShieldWarning } from "@phosphor-icons/react";
import React from "react";

const Errors = ({ message }: { message: string }) => {
  return (
    <div className="w-full h-full flex justify-center items-center text-white primary_font">
      <div className="flex">
        <div className="h-full flex items-center mr-2">
          {message.split(",")[0] == "401" && <ShieldWarning size={60} />}
          {message.split(",")[0] == "404" && <Bug size={60} />}
        </div>
        <div>
          <h2 className="text-2xl">{message}</h2>
          <p className="text-standard">
            Please Contact an Administrator if you think this is a mistake.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Errors;
