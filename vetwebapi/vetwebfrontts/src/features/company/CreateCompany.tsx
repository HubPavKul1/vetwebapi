import { FormProvider, SubmitHandler, useForm } from "react-hook-form";

import { useCreateItem } from "shared/hooks/useCreateItem";
import { CompanyInputs } from "./ui/CompanyInputs";
import { CustomButton, ICreateItemFormInterface } from "shared/index";
import { ICompanyCreate } from "entities/company/model/companyInterfaces";

export function CreateCompany({ url, queryKey }: ICreateItemFormInterface) {
  const methods = useForm<ICompanyCreate>({
    mode: "onChange",
  });

  const { handleSubmit, reset } = methods;

  const { mutate } = useCreateItem(
    "createCompany",
    url,
    queryKey,
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
