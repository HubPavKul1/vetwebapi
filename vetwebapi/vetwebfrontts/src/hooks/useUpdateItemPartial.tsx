import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AppService } from "services/app.service";

export function useUpdateItemPartial(
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
    mutationFn: (data: object) => AppService.updateItemPartial(url, data),
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
