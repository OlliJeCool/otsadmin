import React from "react";
import ProcessList from "../components/process/ProcessList";

const page = () => {
  return (
    <div className="w-full p-8">
      <div className="w-full flex justify-center">
        <ProcessList />
      </div>
    </div>
  );
};

export default page;
