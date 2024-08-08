import { useMutation, useQueryClient } from "@tanstack/react-query";
import { AppService } from "../app.service";
import { UseFormReset } from "react-hook-form";


export function useUpload(
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
    mutationFn: (data: FormData) => AppService.uploadFile(url, data),
    onSuccess: () => {
      alert(alertMessage);
      queryClient.invalidateQueries({
        queryKey: !id ? [queryKey] : [queryKey, id],
      }),
      reset();
    },
  });

  return { mutate };
}
