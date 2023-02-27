import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axiosClient from "../api/axios-client";
import SignupErrors from "../components/SignupErrors";
import TitleHeader from "../components/TitleHeader";
import { useStateContext } from "../context/ContextProvider";
import { useUser } from "../utils/functions/hooks/getUsers";

function UserForm() {
  const { setNotification } = useStateContext();
  const navigate = useNavigate();
  const { id } = useParams();
  const [errors, setErrors] = React.useState({});
  const [user, setUser] = useState({
    id: null,
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  if (id) {
    // fetch user
    const { data, isLoading } = useUser(id);
    useEffect(() => {
      if (data) {
        setUser(data);
      }
    }, [data]);
  }

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (user.id) {
      // update
      axiosClient
        .put(`/users/${user.id}`, user)
        .then(({ data }) => {
          setNotification("Utilisateur modifié avec succès");
          navigate("/users");
        })
        .catch((err) => {
          const response = err.response;
          console.log(response);
          if (response.status === 422) {
            setErrors(response.data.errors);
            return;
          }
        });
    } else {
      // create
      axiosClient
        .post("/users", user)
        .then(({ data }) => {
          setNotification("Utilisateur créé avec succès");
          navigate("/users");
        })
        .catch((err) => {
          const response = err.response;
          console.log(response);
          if (response.status === 422) {
            setErrors(response.data.errors);
            return;
          }
        });
    }
  };

  return (
    <>
      <TitleHeader title={user.id ? `Modify user: ${user.name}` : `New user`} />

      {Object.keys(errors).length > 0 && <SignupErrors errors={errors} />}

      <form
        action="#"
        method="POST"
        onSubmit={onSubmit}
        className="pt-8 bg-white "
      >
        <div className="shadow sm:overflow-hidden sm:rounded-md">
          <div className="space-y-6 bg-white py-6 px-4 sm:p-6">
            <div className="grid grid-cols-6 gap-6">
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="first-name"
                  className="block text-sm font-medium text-gray-700"
                >
                  Name
                </label>
                <input
                  type="text"
                  value={user.name}
                  onChange={(ev) => setUser({ ...user, name: ev.target.value })}
                  name="first-name"
                  id="first-name"
                  autoComplete="off"
                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700"
                >
                  Email
                </label>
                <input
                  type="email"
                  value={user.email}
                  onChange={(ev) =>
                    setUser({ ...user, email: ev.target.value })
                  }
                  name="email"
                  id="email"
                  autoComplete="off"
                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Password
                </label>
                <input
                  type="password"
                  onChange={(ev) =>
                    setUser({ ...user, password: ev.target.value })
                  }
                  name="password"
                  id="password"
                  autoComplete="off"
                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </div>
              <div className="col-span-6 sm:col-span-3">
                <label
                  htmlFor="confirm-password"
                  className="block text-sm font-medium text-gray-700"
                >
                  Confirm password
                </label>
                <input
                  type="password"
                  onChange={(ev) =>
                    setUser({ ...user, password_confirmation: ev.target.value })
                  }
                  name="confirm-password"
                  id="confirm-password"
                  autoComplete="off"
                  className="mt-1 block w-full rounded-md border border-gray-300 py-2 px-3 shadow-sm focus:border-indigo-500 focus:outline-none focus:ring-indigo-500 sm:text-sm"
                />
              </div>
            </div>
          </div>
          <div className="bg-gray-50 px-4 py-3 text-right sm:px-6">
            <button
              type="submit"
              className="inline-flex justify-center rounded-md border border-transparent bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Save
            </button>
          </div>
        </div>
      </form>
    </>
  );
}

export default UserForm;
