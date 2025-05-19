import React from "react";
import { ITask } from "@/handlers";

interface TaskCardProps {
  task: ITask;
  isDone: boolean;
  completeFn: (id: string) => void;
}

const ProfileTaskCard = ({ task, isDone, completeFn }: TaskCardProps) => {
  return (
    <div className="w-full flex items-center justify-between bg-gray-50 h-12 rounded-lg px-4">
      <p className="text-md font-medium">{task.title}</p>
      {isDone ? (
        <div className="badge badge-success">
          <svg
            className="size-[1em]"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g fill="currentColor" strokeLinejoin="miter" strokeLinecap="butt">
              <circle
                cx="12"
                cy="12"
                r="10"
                fill="none"
                stroke="currentColor"
                strokeLinecap="square"
                strokeMiterlimit="10"
                strokeWidth="2"
              ></circle>
              <polyline
                points="7 13 10 16 17 8"
                fill="none"
                stroke="currentColor"
                strokeLinecap="square"
                strokeMiterlimit="10"
                strokeWidth="2"
              ></polyline>
            </g>
          </svg>
          Done
        </div>
      ) : (
        <button
          onClick={() => completeFn(task.id)}
          className="btn btn-soft h-8 btn-success"
        >
          Mark as Done
        </button>
      )}
    </div>
  );
};

export default ProfileTaskCard;
