import { FormProvider, SubmitHandler, useForm } from "react-hook-form";
import { CustomButton } from "components/CustomButton";
import { useCreateItem } from "hooks/useCreateItem";
import { CompanyInputs } from "./CompanyInputs";
import { ICompanyCreate } from "interfaces/CompanyInterfaces";

interface CreateCompanyProps {
  children?: React.ReactElement | React.ReactNode;
  url: string;
  invQueryName: string;
}

export function CreateCompany({ url, invQueryName }: CreateCompanyProps) {
  const methods = useForm<ICompanyCreate>({
    mode: "onChange",
  });

  const { handleSubmit, reset } = methods;

  const { mutate } = useCreateItem(
    invQueryName,
    url,
    invQueryName,
    "Предприятие успешно добавлено!",
    reset
  );

  const onSubmit: SubmitHandler<ICompanyCreate> = (data) => {
    mutate(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)}>
        <CompanyInputs />
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
