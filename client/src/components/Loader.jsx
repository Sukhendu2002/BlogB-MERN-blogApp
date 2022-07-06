import React from "react";

const Loader = () => {
  return (
    <div
      className="container mt-3 "
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <img src="/loader.gif" alt="loader" />
    </div>
  );
};

export default Loader;
