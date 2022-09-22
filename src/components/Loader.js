import React from "react";
///components
import { Oval } from "react-loader-spinner";

const Loader = () => {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <Oval
        height="80"
        width="80"
        radius="9"
        color="green"
        ariaLabel="loading"
        wrapperStyle
        wrapperClass
      />
    </div>
  );
};

export default Loader;
