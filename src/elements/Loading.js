// Dependencies
import React from "react";
import PacmanLoader from "react-spinners/PacmanLoader";

const Loading = () => {
  return (
    <div className="loader-wrapper">
      <div className="loader">
        <PacmanLoader color="red" loading={true} size={50} />
      </div>
    </div>
  );
};

export default Loading;
