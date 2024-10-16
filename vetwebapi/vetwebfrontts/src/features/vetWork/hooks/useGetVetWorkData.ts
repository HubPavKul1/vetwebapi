import { useQueryClient } from "@tanstack/react-query";
import { IVetWorkSchema } from "entities/vetWork";
import { useParams } from "react-router-dom";

export function useGetVetWorkData() {
  const queryClient = useQueryClient();
  const { id } = useParams();
  if (!id) return;
  const data = queryClient.getQueryData<IVetWorkSchema>(["vetwork", id]);
  if (!data) return;
  return data;
}
