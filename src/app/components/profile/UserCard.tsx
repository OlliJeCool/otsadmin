import { handleDeletUser, IUser } from "@/handlers";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import React from "react";
import toast, { Toaster } from "react-hot-toast";

interface props {
  user: IUser;
  profileId: string;
}

const UserCard = ({ user, profileId }: props) => {
  const queryClient = useQueryClient();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(user.id);
      if (user.id) {
        toast.success("Copied ID to clipboard!");
      } else {
        toast.error("Could not copy id to clipboard.");
      }
    } catch (err) {}
  };

  const deleteUser = useMutation({
    mutationFn: async () =>
      handleDeletUser(user.id || "", await getAccessTokenSilently()),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [{ users: profileId }] });
    },
  });

  return (
    <div
      key={user.id}
      onClick={() => handleCopy()}
      className="w-full flex items-center justify-between bg-gray-50 h-12 rounded-lg px-4"
    >
      <p className="text-md font-medium">{user.email}</p>
      <div
        className="underline cursor-pointer text-red-400"
        onClick={() => deleteUser.mutate()}
      >
        Remove
      </div>
    </div>
  );
};

export default UserCard;
