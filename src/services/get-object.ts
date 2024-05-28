import axios from "axios";
import { useQuery } from "@tanstack/react-query";

interface Object {
  id: string;
  name: string;
  color: string;
  capacity: string;
}

const getObject = async (id: string) => {
  const response = await axios.get(`api/objects/${id}`);
  return response.data;
};

export const useGetObject = (id: string) => {
  return useQuery({
    queryKey: ["object", id],
    queryFn: () => getObject(id),
  });
};
