import { IVetWorkSchema } from "entities/vetWork";
import { useParams } from "react-router-dom";
import { VetWorkQueryKeys } from "shared/constants/vetworkConst";
import { queryClient } from "shared/services/queryClient";

export function useGetVetWorkData() {
  const { id } = useParams();
  if (!id) return;
  const queryKey = VetWorkQueryKeys.vetWorkDetail;
  const data = queryClient.getQueryData<IVetWorkSchema>([queryKey, id]);
  return data;
}
