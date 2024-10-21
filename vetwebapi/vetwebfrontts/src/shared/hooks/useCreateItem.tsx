import { useMutation } from "@tanstack/react-query";
import { AppService } from "shared/services/app.service";
import { UseFormReset } from "react-hook-form";
import { queryClient } from "shared/services/queryClient";

export function useCreateItem(
  mutationKey: string,
  url: string,
  queryKey: string,
  alertMessage: string,
  reset: UseFormReset<TFieldValues>,
  id?: string
) {
  const { mutate } = useMutation({
    mutationKey: [mutationKey],
    mutationFn: (data: object) => AppService.createItem(url, data),
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
