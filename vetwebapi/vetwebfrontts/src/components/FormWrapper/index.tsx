import { FieldValues, FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { CustomButton } from "../CustomButton";

interface FormWrapperProps {
  children?: React.ReactElement | React.ReactNode;
  submitFunction: SubmitHandler<FieldValues>;
}

export function FormWrapper({ children, submitFunction }: FormWrapperProps) {
  const methods = useForm({
    mode: "onChange",
  });

  const { handleSubmit } = methods;

  const onSave = (data) => {
    console.log(data)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(submitFunction)}>
        {children}
        <div className="form-group">
          <CustomButton
            className="btn-color btn-transform text-md"
            disabled={false}
            title="Зарегистрировать"
          />
        </div>
      </form>
    </FormProvider>
  );
}
