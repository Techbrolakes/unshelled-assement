import axios from "axios";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-toastify";

export const editObject = async ({
  id,
  payload,
}: {
  id: any;
  payload: any;
}) => {
  const response = await axios.patch(`api/objects/${id}`, payload);
  return response.data;
};

export const useEditObject = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: editObject,
    mutationKey: ["edit-object"],
    onSuccess: () => {
      toast.success("Object updated successfully");
      queryClient.invalidateQueries({
        queryKey: ["objects"],
      });
      queryClient.invalidateQueries({
        queryKey: ["object"],
      });
    },
    // onError: (error) => toast.error(error.message),
  });
};
