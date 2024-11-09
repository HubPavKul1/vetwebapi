import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { useLogin } from "shared/hooks/useLogin";
import { CustomButton, IUserLogin } from "shared/index";
import { LoginInputs } from "./ui/LoginInputs";

export function LoginForm() {
  const methods = useForm<IUserLogin>({
    mode: "onChange",
  });

  const { handleSubmit, reset } = methods;

  const { mutate } = useLogin(reset);

  const onSubmit: SubmitHandler<IUserLogin> = (data) => {
    console.log("Login data>>>", data);
    mutate(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <LoginInputs />
        <div className="form-group">
          <CustomButton className="btn-submit" disabled={false} title="Войти" />
        </div>
      </form>
    </FormProvider>
  );
}
