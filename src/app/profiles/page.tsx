import React from "react";
import ProfileList from "../components/profile/ProfileList";
import { Toaster } from "react-hot-toast";

const page = () => {
  return (
    <div className="w-full p-8">
      <div className="w-full flex justify-center">
        <ProfileList />
      </div>
      <Toaster position="bottom-right" />
    </div>
  );
};

export default page;
