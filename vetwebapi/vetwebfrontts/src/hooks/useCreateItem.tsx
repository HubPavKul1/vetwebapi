import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AppService } from "services/app.service";
import { UseFormReset } from "react-hook-form";

export function useCreateItem(
  mutationKey: string,
  url: string,
  queryKey: string,
  alertMessage: string,
  reset: UseFormReset<TFieldValues>,
  id?: string
) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: [mutationKey],
    mutationFn: (data: object) => AppService.createItem(url, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: !id ? [queryKey] : [queryKey, id],
      }),
        alert(alertMessage),
        reset();
    },
  });

  return { mutate };
}
