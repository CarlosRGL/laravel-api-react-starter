import React from "react";
import { useMutation } from "react-query";
import { Link, useOutletContext } from "react-router-dom";
import axiosClient from "../../api/axios-client";
import { queryClient } from "../../api/queryClient";
import Pagination from "../../components/Pagination";
import TitleHeader from "../../components/TitleHeader";
import { useStateContext } from "../../context/ContextProvider";
import { useUsers } from "../../utils/functions/hooks/getUsers";
import Loading from "./Loading";

function Users() {
  const [search] = useOutletContext();
  const { setNotification } = useStateContext();
  const [page, setPage] = React.useState(0);
  const { data, isLoading } = useUsers(page, search || false);
  const mutation = useMutation(
    (id) => {
      return axiosClient.delete(`/users/${id}`);
    },
    {
      onSuccess: () => {
        setNotification("User deleted");
        queryClient.invalidateQueries("users");
      },
    }
  );
  const onDelete = (id) => {
    if (!window.confirm("Are you sure?")) {
      return;
    }
    mutation.mutate(id);
  };

  return (
    <div className="bg-white">
      <TitleHeader title="Users" />
      <div className="flex flex-col overflow-x-hidden">
        <div className="-my-2 -mx-4 overflow-x-auto sm:-mx-6 lg:-mx-8">
          <div className="inline-block min-w-full py-2 align-middle md:px-6 lg:px-8">
            <div className="overflow-hidden shadow ring-1 ring-black ring-opacity-5 ">
              <table className="min-w-full divide-y divide-gray-300">
                <thead className="bg-gray-50">
                  <tr>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-12"
                    >
                      ID
                    </th>
                    <th
                      scope="col"
                      className="py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-12"
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
                      className="relative py-3.5 pl-3 pr-4 sm:pr-12"
                    ></th>
                  </tr>
                </thead>
                {isLoading && <Loading items={25} />}

                {!isLoading && (
                  <tbody className="divide-y divide-gray-200 bg-white">
                    {data.data?.map((person) => (
                      <tr key={person.id}>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-500 sm:pl-12">
                          {person.id}
                        </td>
                        <td className="whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-12">
                          {person.name}
                        </td>

                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {person.email}
                        </td>
                        <td className="whitespace-nowrap px-3 py-4 text-sm text-gray-500">
                          {person.created_at}
                        </td>
                        <td className="relative whitespace-nowrap flex gap-4 justify-end py-4 pl-3 pr-4 text-right text-sm font-medium sm:pr-12">
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
        {!isLoading && <Pagination pagination={data.meta} setPage={setPage} />}
      </div>
    </div>
  );
}

export default Users;
