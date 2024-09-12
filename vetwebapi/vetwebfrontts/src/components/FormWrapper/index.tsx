import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

import { useCreateItem } from "hooks/useCreateItem";
import { CustomButton } from "shared/index";

interface FormWrapperProps {
  children?: React.ReactElement | React.ReactNode;
  // submitFunction: SubmitHandler<TFieldValues>;
  url: string;
  invQueryName: string;
  alertMessage: string;
}

export function FormWrapper({
  children,
  // submitFunction,
  url,
  invQueryName,
  alertMessage,
}: FormWrapperProps) {
  const methods = useForm({
    mode: "onChange",
  });

  const { handleSubmit, reset, control } = methods;

  const { mutate } = useCreateItem(
    invQueryName,
    url,
    invQueryName,
    alertMessage,
    reset
  );

  const onSubmit: SubmitHandler<TFormValue> = (data) => {
    console.log("DATA>>>", data);
    // mutate(data);
  };

  // const onSave = (data: FormData) => {
  //   console.log(data);
  // };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        {children}
        <div className="form-group">
          <CustomButton
            className="btn-submit"
            disabled={false}
            title="Зарегистрировать"
          />
        </div>
      </form>
    </FormProvider>
  );
}
