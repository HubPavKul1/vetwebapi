import { useMutation, useQueryClient } from "@tanstack/react-query";
import { UseFormReset } from "react-hook-form";
import { AppService } from "shared/services/app.service";

export function useUpload(
  reset: UseFormReset<TFieldValues>,
  url: string,
  queryKey: string,
  mutationKey: string,
  alertMessage?: string,
  id?: string
) {
  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationKey: [mutationKey],
    mutationFn: (data: FormData) => AppService.uploadFile(url, data),
    onSuccess: () => {
      alert(alertMessage);
      queryClient.invalidateQueries({
        queryKey: [queryKey, id],
        // queryKey: !id ? [queryKey] : [queryKey, id],
      }),
        reset();
    },
  });

  return { mutate };
}
