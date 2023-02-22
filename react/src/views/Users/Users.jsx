import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import axiosClient from "../../api/axios-client";
import Pagination from "../../components/Pagination";
import { useStateContext } from "../../context/ContextProvider";
import Loading from "./Loading";

function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pagination, setPagination] = useState({});
  const { setNotification } = useStateContext();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = (page = null) => {
    setLoading(true);
    const url = page ? `/users?page=${page}` : "/users";
    axiosClient
      .get(url)
      .then(({ data }) => {
        setUsers(data.data);
        setPagination(data.meta);
        setLoading(false);
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  const onDelete = (id) => {
    if (!window.confirm("Are you sure?")) {
      return;
    }
    axiosClient
      .delete(`/users/${id}`)
      .then(({ data }) => {
        setNotification("Utilisateur supprimé avec succès");
        getUsers();
      })
      .catch((err) => {
        setLoading(false);
      });
  };

  return (
    <div className="px-4 sm:px-6 lg:px-8">
      <div className="sm:flex sm:items-center">
        <div className="sm:flex-auto">
          <h1 className="text-xl font-semibold text-gray-900">Users</h1>
        </div>
        <div className="mt-4 sm:mt-0 sm:ml-16 sm:flex-none">
          <Link
            to="/users/new"
            type="button"
            className="inline-flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:w-auto"
          >
            Add user
          </Link>
        </div>
      </div>
      <div className="mt-8 flex flex-col">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 md:rounded-t-lg">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6"
                    >
                      Name
                    </th>

                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Email
                    </th>
                    <th
                      scope="col"
                      className="px-3 py-3.5 text-left text-sm font-semibold text-gray-900"
                    >
                      Created at
                    </th>
                    <th
                      scope="col"
                      className="relative py-3.5 pl-3 pr-4 sm:pr-6"
                    ></th>
                  </tr>
                </thead>
                {loading && <Loading items={15} />}

                {!loading && (
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {users.map((person) => (
                      <tr key={person.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-6">
                          {person.id}
                        </td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6">
                          {person.name}
                        </td>

                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {person.email}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {person.created_at}
                        </td>
                        <td className="relative whitespace-nowrap flex gap-4 justify-end py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-6">
                          <button
                            onClick={(ev) => onDelete(person.id)}
                            className="text-gray-500  hover:text-gray-900"
                          >
                            Delete
                          </button>
                          <Link
                            to={`/users/${person.id}`}
                            className="text-indigo-600 hover:text-indigo-900"
                          >
                            Edit
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                )}
              </table>
            </div>
          </div>
        </div>
        {!loading && <Pagination pagination={pagination} getUsers={getUsers} />}
      </div>
    </div>
  );
}

export default Users;
