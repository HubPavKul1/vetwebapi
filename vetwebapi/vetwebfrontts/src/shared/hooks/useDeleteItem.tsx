import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AppService } from "shared/services/app.service";

export function useDeleteItem(
  mutationKey: string,
  url: string,
  queryKey: string,
  alertMessage: string,
  id?: string
) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: [mutationKey],
    mutationFn: () => AppService.deleteItem(url),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [queryKey, id] }),
        alert(alertMessage);
    },
  });

  return { mutate };
}
