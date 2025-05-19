"use client";

import React from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { handleCreateProfile, IProcess } from "@/handlers";
import { useAuth0 } from "@auth0/auth0-react";

const visaOptions = ["J1", "F1", "StudyPermit"];

export default function CreateProfileForm({
  processes,
}: {
  processes: IProcess[];
}) {
  const { getAccessTokenSilently } = useAuth0();
  const queryClient = useQueryClient();
  const mutation = useMutation({
    mutationFn: async (values) =>
      handleCreateProfile(values, await getAccessTokenSilently()),
    onSuccess: () => {
      queryClient.refetchQueries({ queryKey: ["profiles"] });
      const modal = document.getElementById(
        "create_profile_modal"
      ) as HTMLDialogElement | null;
      modal?.close();
      formik.resetForm();
    },
  });

  const names: any = {
    firstName: "First Name",
    lastName: "Last Name",
    dateOfBirth: "Date of Birth",
    address: "Address",
    destination: "Destination",
    school: "School",
    host: "Host",
    about: "About",
  };

  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      dateOfBirth: "",
      address: "",
      processId: "",
      destination: "",
      school: "",
      host: "",
      about: "",
      visa: "",
    },
    validationSchema: Yup.object({
      firstName: Yup.string().required("Required"),
      lastName: Yup.string().required("Required"),
      dateOfBirth: Yup.date().required("Required"),
      address: Yup.string().required("Required"),
      processId: Yup.string().uuid().required("Required"),
      destination: Yup.string().required("Required"),
      school: Yup.string().required("Required"),
      host: Yup.string().required("Required"),
      about: Yup.string(),
      visa: Yup.string().oneOf(visaOptions).required("Required"),
    }),
    onSubmit: (values: any) => {
      mutation.mutate(values);
    },
  });

  return (
    <>
      <form onSubmit={formik.handleSubmit} className="grid gap-3">
        {[
          "firstName",
          "lastName",
          "dateOfBirth",
          "address",
          "destination",
          "school",
          "host",
          "about",
        ].map((field) => (
          <div key={field}>
            <input
              type={field === "dateOfBirth" ? "date" : "text"}
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

        <select
          name="processId"
          className="select select-bordered w-full"
          value={formik.values.processId}
          onChange={formik.handleChange}
        >
          <option value="" disabled>
            Select Process
          </option>
          {processes.map((p) => (
            <option key={p.id} value={p.id}>
              {p.name}
            </option>
          ))}
        </select>

        <select
          name="visa"
          className="select select-bordered w-full"
          value={formik.values.visa}
          onChange={formik.handleChange}
        >
          <option value="" disabled>
            Select Visa Type
          </option>
          {visaOptions.map((v) => (
            <option key={v} value={v}>
              {v}
            </option>
          ))}
        </select>
        {formik.touched.visa && formik.errors.visa && (
          <p className="text-red-500 text-sm">
            {formik.errors.visa.toString()}
          </p>
        )}

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
}
