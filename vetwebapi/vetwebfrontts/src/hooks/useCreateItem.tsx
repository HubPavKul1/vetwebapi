import { useMutation, useQueryClient } from "@tanstack/react-query"
import { AppService } from "../app.service"
import { FieldValues, UseFormReset } from "react-hook-form"



export function useCreateItem(
  mutationKey: string,
  url: string,
  queryKey: string,
  alertMessage: string,
  reset: UseFormReset<TFieldValues>
) {

  const queryClient = useQueryClient()

  const {mutate} = useMutation({
        mutationKey: [mutationKey],
        mutationFn: (data: object) => AppService.createItem(url, data),
        onSuccess: () => {
          queryClient.invalidateQueries({queryKey: [queryKey]}),
          alert(alertMessage),
          reset()
          
        }

    })

  

  return ({mutate})
}


