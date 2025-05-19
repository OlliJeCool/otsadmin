import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import ProfileTaskCard from "./ProfileTaskCard";
import {
  handleCompleteTask,
  handleCreateUser,
  handleGetUsers,
  IProfile,
} from "@/handlers";
import UserCard from "./UserCard";
import { useState } from "react";
import CreateUserForm from "./CreateUserForm";
import { useAuth0 } from "@auth0/auth0-react";

interface ProfileProps {
  profile?: IProfile;
}

const ProfileCard = ({ profile }: ProfileProps) => {
  const queryClient = useQueryClient();
  const { getAccessTokenSilently } = useAuth0();
  const completeTaskMutation = useMutation({
    mutationFn: async (taskId: string) => {
      return handleCompleteTask(
        taskId,
        profile?.id || "",
        await getAccessTokenSilently()
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["profiles"] });
    },
  });

  const getCurrentProfile = () => {
    return getCurrentProfile();
  };

  const profileUsers = useQuery({
    queryFn: async () => {
      return handleGetUsers(profile?.id || "", await getAccessTokenSilently());
    },
    queryKey: [{ users: profile?.id }],
  });

  return (
    <div
      tabIndex={0}
      className="collapse collapse-arrow bg-base-100 border-base-300 border"
    >
      <input type="checkbox" />
      <div className="collapse-title">
        <div className="w-full h-full flex justify-between">
          <div className="flex gap-2">
            <p className="font-medium text-lg">
              {profile?.firstName + " " + profile?.lastName}
            </p>
          </div>
          <div>
            <div className="flex gap-2">
              <p>{"Completed tasks "}</p>
              <p
                className={`${
                  profile?.completedTasksIds &&
                  profile.phaseTasks &&
                  profile.completedTasksIds.length >=
                    profile.phaseTasks.length / 2
                    ? "text-emerald-300"
                    : "text-red-300"
                }`}
              >
                {profile?.completedTasksIds.length +
                  "/" +
                  profile?.phaseTasks?.length}
              </p>
            </div>
          </div>
        </div>
      </div>
      <div className="collapse-content text-sm">
        <div className="flex flex-col gap-2">
          {profile?.phaseTasks?.map((task) => (
            <ProfileTaskCard
              key={task.id}
              task={task}
              isDone={profile.completedTasksIds.includes(task.id)}
              completeFn={completeTaskMutation.mutate}
            />
          ))}
        </div>
        <div className="divider" />
        <div className="tabs tabs-lift mt-6">
          <input
            type="radio"
            name="my_tabs_3"
            className="tab"
            aria-label="List"
          />
          <div className="tab-content bg-base-100 border-base-300 p-6">
            {" "}
            <div className="w-full flex flex-row justify-between">
              <h2 className="font-medium">Profile Users</h2>
            </div>
            <div className="flex flex-col gap-2">
              {profileUsers.data?.map((user) => (
                <UserCard
                  key={user.id}
                  user={user}
                  profileId={profile?.id || ""}
                />
              ))}
            </div>
          </div>

          <input
            type="radio"
            name="my_tabs_3"
            className="tab"
            aria-label="Add"
            defaultChecked={true}
          />
          <div className="tab-content bg-base-100 border-base-300 p-6">
            <CreateUserForm profileId={profile?.id || ""} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileCard;
