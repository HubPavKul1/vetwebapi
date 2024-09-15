import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AppService } from "shared/services/app.service";

export function useDeleteItem(
  url: string,
  queryKey: string,
  alertMessage: string,
  id?: string
) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: ["deleteItem"],
    mutationFn: () => AppService.deleteItem(url),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey, id] }),
        alert(alertMessage);
    },
  });

  return { mutate };
}
