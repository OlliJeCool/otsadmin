"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { handleProfiles } from "@/handlers";
import ProfileCard from "./ProfileCard";
import CreateProfileModal from "./CreateProfileModal";
import { useAuth0 } from "@auth0/auth0-react";

function ProfileList() {
  const { getAccessTokenSilently } = useAuth0();
  const [search, setSearch] = useState("");
  const { data: profiles } = useQuery({
    queryKey: ["profiles"],
    queryFn: async () => handleProfiles(await getAccessTokenSilently()),
  });

  const filteredProfiles = !search
    ? profiles
    : profiles?.filter((profile) => {
        const profileName = profile.firstName + " " + profile.lastName;
        return profileName.toLowerCase().includes(search.toLowerCase());
      });

  return (
    <div className="w-3/4 flex flex-col gap-4 mt-8">
      <div className="flex justify-between">
        <label className="input">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            type="search"
            required
            placeholder="Search Profiles"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </label>
        <button
          onClick={() => {
            const modal = document.getElementById(
              "create_profile_modal"
            ) as HTMLDialogElement | null;
            modal?.showModal();
          }}
          className="btn btn-ghost"
        >
          Add
        </button>
        <CreateProfileModal />
      </div>
      <div className="flex flex-col gap-2">
        {filteredProfiles?.map((profile) => (
          <ProfileCard key={profile.id} profile={profile} />
        ))}
      </div>
    </div>
  );
}

export default ProfileList;
