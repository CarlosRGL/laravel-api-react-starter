import { useMutation, useQuery } from "react-query";
import axiosClient from "../../../api/axios-client";

const getUsers = async (page = 0, search = false) => {
  const url =
    search === false
      ? page !== 0
        ? `/users?page=${page}`
        : "/users"
      : `/users/search/${search}`;
  const { data } = await axiosClient.get(url);
  return data;
};

const getUser = async (id) => {
  const { data } = await axiosClient.get(`/users/${id}`);
  return data;
};

const searchUsers = async (query) => {
  const { data } = await axiosClient.get(`/users/search/${query}`);
  return data;
};

export function useUsers(page, search = false) {
  return useQuery(["users", page, search], () => getUsers(page, search), {
    keepPreviousData: true,
    staleTime: 5000,
  });
}
export function useUser(id) {
  return useQuery(["user", id], () => getUser(id), {
    staleTime: 10000,
  });
}

export function useUpdateUser(user) {
  return useMutation((user) => axiosClient.put(`/users/${user.id}`, user), {});
}
