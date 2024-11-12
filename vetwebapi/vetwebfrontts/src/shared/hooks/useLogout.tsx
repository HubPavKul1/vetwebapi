import { useMutation } from "@tanstack/react-query";
import { AppService } from "shared/services/app.service";
import { queryClient } from "shared/services/queryClient";

export function useLogout() {
  const { mutate } = useMutation({
    mutationKey: ["logout"],
    mutationFn: () => AppService.logout(),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["getUser"] }),
        alert("Вы успешно вышли из системы!");
    },
  });

  return { mutate };
}
