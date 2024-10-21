import { useMutation } from "@tanstack/react-query";
import { AppService } from "shared/services/app.service";
import { queryClient } from "shared/services/queryClient";

export function useUpdateItem(
  mutationKey: string,
  url: string,
  queryKey: string,
  alertMessage: string,
  reset: UseFormReset<TFieldValues>,
  id?: string
) {
  const { mutate } = useMutation({
    mutationKey: [mutationKey],
    mutationFn: (data: object) => AppService.updateItem(url, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKey, id],
      }),
        alert(alertMessage),
        reset();
    },
  });

  return { mutate };
}
