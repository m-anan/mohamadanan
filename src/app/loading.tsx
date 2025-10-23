import Image from "next/image";
import React from "react";

const Loading = () => {
  return (
    <div className=" w-screen h-screen flex items-center justify-center  bg-white fixed left-0 top-0">
      <span className="loading loading-spinner loading-md"></span>
    </div>
  );
};

export default Loading;
