import axios from "axios";
import { useMutation } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const deleteObject = async (id: string) => {
  const response = await axios.delete(`api/objects/${id}`);

  return response.data;
};

export const useDeleteObject = () => {
  return useMutation({
    mutationFn: deleteObject,
    mutationKey: ["delete-object"],
    onSuccess: () => {
      toast.success("Object deleted successfully");
      window.location.href = "/";
    },
    onError: (error) => toast.error(error.message),
  });
};
