import { useMutation } from "@tanstack/react-query";
import { UseFormReset } from "react-hook-form";
import { AppService } from "shared/services/app.service";
import { queryClient } from "shared/services/queryClient";

export function useUpload(
  reset: UseFormReset<TFieldValues>,
  url: string,
  queryKey: string,
  mutationKey: string,
  alertMessage?: string,
  id?: string
) {
  const { mutate } = useMutation({
    mutationKey: [mutationKey],
    mutationFn: (data: FormData) => AppService.uploadFile(url, data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: [queryKey, id],
      }),
        alert(alertMessage);
      reset();
    },
  });

  return { mutate };
}
