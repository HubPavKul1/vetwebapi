import { useMutation } from "@tanstack/react-query";
import { AppService } from "shared/services/app.service";
import { UseFormReset } from "react-hook-form";
import { IUserLogin } from "shared/model/BaseInterfaces";

export function useLogin(reset: UseFormReset<TFieldValues>) {
  const { mutate } = useMutation({
    mutationKey: ["login"],
    mutationFn: (data: IUserLogin) => AppService.login(data),
    onSuccess: () => {
      alert("Вы успешно вошли в систему!"), reset();
    },
  });

  return { mutate };
}
