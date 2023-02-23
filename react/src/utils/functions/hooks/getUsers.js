import { useQuery } from "react-query";
import axiosClient from "../../../api/axios-client";

const getUsers = async (page = 0) => {
  const url = page !== 0 ? `/users?page=${page}` : "/users";
  const { data } = await axiosClient.get(url);
  return data;
};

export const useDeleteUser = async (id) => {
  const { data } = await axiosClient.delete(`/users/${id}`);
  return data;
};

export function useUsers(page) {
  return useQuery(["users", page], () => getUsers(page), {
    keepPreviousData: true,
    staleTime: 5000,
  });
}
