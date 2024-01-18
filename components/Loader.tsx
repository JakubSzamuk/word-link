import React from "react";

const Loader = () => {
  return (
    <div className="w-full h-full flex justify-center items-center">
      <div className="w-16 aspect-square bg-tertiary rounded-full relative grid">
        <div className="w-full h-full animate-spin">
          <div className="w-8 h-8 rounded-tl-full bg-secondary"></div>
        </div>

        <div className="w-12 h-12 bg-tertiary absolute self-center justify-self-center rounded-full"></div>
      </div>
    </div>
  );
};

export default Loader;
