import { Menu, Transition } from "@headlessui/react";
import { Bars3BottomLeftIcon, BellIcon } from "@heroicons/react/24/outline";
import React, { Fragment, useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import axiosClient from "../api/axios-client";
import { useStateContext } from "../context/ContextProvider";
import classNames from "../utils/functions/classes";
import Notification from "./Notification";
import SearchBar from "./SearchBar";
import Sidebar from "./Sidebar";
import { queryClient } from "../api/queryClient";

export default function Defaultlayout() {
  const navigate = useNavigate();
  const { user, token, notification, searchEnable, setUser, setToken } =
    useStateContext();
  useEffect(() => {
    if (!token) {
      navigate("/login");
    }
  }, [token]);

  const [search, setSearch] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const onLogout = (ev) => {
    ev.preventDefault();
    axiosClient.post("/logout").then(() => {
      setUser({});
      setToken(null);
      queryClient.invalidateQueries("users");
    });
  };

  useEffect(() => {
    axiosClient.get("/user").then(({ data }) => {
      setUser(data);
    });
  }, []);

  return (
    <div>
      <Sidebar sidebar={sidebarOpen} setSidebar={setSidebarOpen} />
      <div className="flex flex-col md:pl-64">
        <div className="sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow">
          <button
            type="button"
            className="border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden"
            onClick={() => setSidebarOpen(true)}
          >
            <span className="sr-only">Open sidebar</span>
            <Bars3BottomLeftIcon className="h-6 w-6" aria-hidden="true" />
          </button>
          <div className="flex flex-1 justify-between px-4">
            <div className="flex flex-1">
              {searchEnable && <SearchBar setSearch={setSearch} />}
            </div>
            <div className="ml-4 flex items-center md:ml-6">
              <button
                type="button"
                className="rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
              >
                <BellIcon className="h-6 w-6" aria-hidden="true" />
              </button>

              {/* Profile dropdown */}
              <Menu as="div" className="relative ml-3">
                <div>
                  <Menu.Button className="flex gap-3 max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2">
                    <span className="text-gray-400">{user.name}</span>
                    <img
                      className="h-8 w-8 rounded-full"
                      src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                      alt=""
                    />
                  </Menu.Button>
                </div>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-100"
                  enterFrom="transform opacity-0 scale-95"
                  enterTo="transform opacity-100 scale-100"
                  leave="transition ease-in duration-75"
                  leaveFrom="transform opacity-100 scale-100"
                  leaveTo="transform opacity-0 scale-95"
                >
                  <Menu.Items className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <Menu.Item>
                      {({ active }) => (
                        <a
                          href="#"
                          className={classNames(
                            active ? "bg-gray-100" : "",
                            "block px-4 py-2 text-sm text-gray-700"
                          )}
                          onClick={onLogout}
                        >
                          Sign out
                        </a>
                      )}
                    </Menu.Item>
                  </Menu.Items>
                </Transition>
              </Menu>
            </div>
          </div>
        </div>

        <main className="">
          {/* Replace with your content */}
          <Outlet context={[search]} />
          {/* /End replace */}
        </main>
      </div>
      {notification && <Notification content={notification} />}
    </div>
  );
}
