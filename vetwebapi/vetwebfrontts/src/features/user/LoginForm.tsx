import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { ButtonSubmit, IUserLogin, useLogin } from "shared/index";
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
      <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
        <div className="mb-3">
          <LoginInputs />
        </div>
        <div className="form-group">
          <ButtonSubmit title="Войти" />
        </div>
      </form>
    </FormProvider>
  );
}
