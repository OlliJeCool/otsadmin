"use client";

import { handleGetProcesses, IProcess } from "@/handlers";
import { useAuth0 } from "@auth0/auth0-react";
import { useQuery } from "@tanstack/react-query";
import React from "react";

const ProcessList = () => {
  const { getAccessTokenSilently } = useAuth0();
  const { data: processes = [] } = useQuery<IProcess[]>({
    queryKey: ["processes"],
    queryFn: async () => handleGetProcesses(await getAccessTokenSilently()),
  });

  return <div></div>;
};

export default ProcessList;
