import axios from "axios";
import { useQuery } from "@tanstack/react-query";

const getObjects = async (page: any) => {
  const response = await axios.get(`api/objects?page=${page}`);
  return response.data;
};

export const useGetAllObjects = (page: any) => {
  return useQuery({
    queryFn: () => getObjects(page),
    queryKey: ["objects", page],
  });
};
