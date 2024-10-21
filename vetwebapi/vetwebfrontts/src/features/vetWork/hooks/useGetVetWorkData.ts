import { IVetWorkSchema } from "entities/vetWork";
import { useParams } from "react-router-dom";
import { queryClient } from "shared/services/queryClient";

export function useGetVetWorkData() {
  const { id } = useParams();
  if (!id) return;
  const data = queryClient.getQueryData<IVetWorkSchema>(["vetwork", id]);
  return data;
}
