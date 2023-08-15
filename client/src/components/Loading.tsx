import React from "react";
import { PuffLoader } from "react-spinners";

const Loading = () => {
  return (
    <section className="fixed top-0 bottom-0 left-0 right-0 flex items-center justify-center">
      <PuffLoader color="#36d7b7" />
    </section>
  );
};

export default Loading;
