import React from "react";

const Loader = () => {
  return (
    <div className="flex justify-center items-center h-20">
      <div className="w-12 h-12 border-4 border-blue-500 border-dashed rounded-full animate-spin"></div>
      <span className="ml-2">Loading...Please wait!</span>
    </div>
  );
};

export default Loader;
