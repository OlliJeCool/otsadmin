import React from "react";
import CreateProfileForm from "./CreateProfileForm";
import { useQuery } from "@tanstack/react-query";
import { handleGetProcesses, IProcess } from "@/handlers";
import { useAuth0 } from "@auth0/auth0-react";

const CreateProfileModal = () => {
  const { getAccessTokenSilently } = useAuth0();
  const { data: processes = [] } = useQuery<IProcess[]>({
    queryKey: ["processes"],
    queryFn: async () => handleGetProcesses(await getAccessTokenSilently()),
  });

  return (
    <dialog id="create_profile_modal" className="modal">
      <div className="modal-box flex flex-col gap-4">
        <h3 className="font-bold text-lg">Create Profile</h3>
        <CreateProfileForm processes={processes} />
      </div>
      <form method="dialog" className="modal-backdrop">
        <button>close</button>
      </form>
    </dialog>
  );
};

export default CreateProfileModal;
