import { Menu } from "@headlessui/react";
import { BarsArrowUpIcon, ChevronDownIcon } from "@heroicons/react/20/solid";
import React from "react";
import { useMutation } from "react-query";
import { Link } from "react-router-dom";
import axiosClient from "../../api/axios-client";
import { queryClient } from "../../api/queryClient";
import Pagination from "../../components/Pagination";
import { useStateContext } from "../../context/ContextProvider";
import classNames from "../../utils/functions/classes";
import { useUsers } from "../../utils/functions/hooks/getUsers";
import Loading from "./Loading";

function Users() {
  const { setNotification } = useStateContext();
  const [page, setPage] = React.useState(0);
  const { data, isLoading } = useUsers(page);
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
      <div className="border-b border-t border-gray-200 pl-4 pr-6 pt-4 pb-4 sm:pl-6 lg:pl-8 xl:border-t-0 xl:pl-6 xl:pt-6">
        <div className="flex items-center">
          <h1 className="flex-1 text-lg font-medium">Users</h1>
          <Menu as="div" className="relative">
            <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
              <BarsArrowUpIcon
                className="mr-3 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
              Sort
              <ChevronDownIcon
                className="ml-2.5 -mr-1.5 h-5 w-5 text-gray-400"
                aria-hidden="true"
              />
            </Menu.Button>
            <Menu.Items className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
              <div className="py-1">
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Name
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Date modified
                    </a>
                  )}
                </Menu.Item>
                <Menu.Item>
                  {({ active }) => (
                    <a
                      href="#"
                      className={classNames(
                        active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                        "block px-4 py-2 text-sm"
                      )}
                    >
                      Date created
                    </a>
                  )}
                </Menu.Item>
              </div>
            </Menu.Items>
          </Menu>
        </div>
      </div>
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
                {isLoading && <Loading items={15} />}

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
