import axios from "axios";

export interface IProfile {
  id: string;
  firstName: string;
  lastName: string;
  completedTasksIds: string[];
  phaseId: string;
  phaseTasks?: ITask[];
}

export interface ITask {
  id: string;
  title: string;
  description: string;
}

export interface IProcess {
  id: string;
  name: string;
  length: string;
  description: string;
  phases: {
    id: string;
    title: string;
  }[];
}

export interface IUser {
  id: string;
  email: string;
}

export const handleProfiles = async (token: string) => {
  const response: IProfile[] = await axios
    .get("https://otsapp-production.up.railway.app/profile/all", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
  return response;
};

export const handleCompleteTask = async (
  taskId: string,
  profileId: string,
  token: string
) => {
  const response: IProfile = await axios.post(
    "https://otsapp-production.up.railway.app/profile/complete",
    {
      profileId: profileId,
      taskId: taskId,
    },
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
  return response;
};

export const handleGetProcesses = async (token: string) => {
  const response: IProcess[] = await axios
    .get("https://otsapp-production.up.railway.app/process", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
  return response;
};

export const handleGetPhases = async (token: string) => {
  const repsonse = await axios.get(
    "https://otsapp-production.up.railway.app/phase/all",
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  );
};

export const handleCreateProfile = async (values: any, token: string) => {
  const response = await axios
    .post("https://otsapp-production.up.railway.app/profile", values, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
  return response;
};

export const handleCreateTask = async (values: any, token: string) => {
  const response = await axios
    .post("https://otsapp-production.up.railway.app/task", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
  return response;
};

export const handleGetUsers = async (id: string, token: string) => {
  const response: IUser[] = await axios
    .get(`https://otsapp-production.up.railway.app/user/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
  return response;
};

export const handleCreateUser = async (
  values: any,
  profileId: string,
  token: string
) => {
  const response = await axios
    .post(
      "https://otsapp-production.up.railway.app/user",
      {
        ...values,
        profileId: profileId,
      },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    )
    .then((res) => res.data);
  return response;
};

export const handleDeletUser = async (userId: string, token: string) => {
  const response = await axios
    .delete(`https://otsapp-production.up.railway.app/user/${userId}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
    .then((res) => res.data);
};
