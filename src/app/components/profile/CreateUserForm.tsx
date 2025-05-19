import { handleCreateUser } from "@/handlers";
import { useAuth0 } from "@auth0/auth0-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useFormik } from "formik";
import React from "react";

import * as Yup from "yup";

interface props {
  profileId: string;
}

const roleOptions = ["ADMIN", "USER"];

const CreateUserForm = ({ profileId }: props) => {
  const queryClient = useQueryClient();
  const { getAccessTokenSilently } = useAuth0();
  const mutation = useMutation({
    mutationFn: async (values) =>
      handleCreateUser(values, profileId, await getAccessTokenSilently()),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: [{ users: profileId }] });
      const modal = document.getElementById(
        "create_user_modal"
      ) as HTMLDialogElement | null;
      modal?.close();
    },
  });

  const names: any = {
    email: "Email",
  };

  const formik = useFormik({
    initialValues: {
      email: "",
      role: roleOptions[1],
    },
    validationSchema: Yup.object({
      email: Yup.string().email().required("Email required!"),
    }),
    onSubmit: (values: any) => {
      mutation.mutate(values);
      formik.resetForm();
    },
  });
  return (
    <>
      <form onSubmit={formik.handleSubmit} className="grid gap-3">
        {["email"].map((field) => (
          <div key={field}>
            <input
              type="text"
              name={field}
              placeholder={names[field]}
              className="input input-bordered w-full"
              value={formik.values[field]}
              onChange={formik.handleChange}
            />
            {formik.touched[field] && formik.errors[field] && (
              <p className="text-red-500 text-sm">
                {formik.errors[field].toString()}
              </p>
            )}
          </div>
        ))}

        <div className="flex justify-end gap-2 mt-4">
          <button
            type="submit"
            className="btn btn-neutral"
            disabled={mutation.isPending}
          >
            {mutation.isPending ? "Submitting..." : "Create"}
          </button>
        </div>
      </form>
    </>
  );
};

export default CreateUserForm;
