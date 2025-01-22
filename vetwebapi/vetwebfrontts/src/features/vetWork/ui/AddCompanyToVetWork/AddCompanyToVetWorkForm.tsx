import { useForm, FormProvider, SubmitHandler } from "react-hook-form";

import { useParams } from "react-router-dom";
import { useCreateItem } from "shared/hooks/useCreateItem";
import { ButtonSubmit } from "shared/index";
import { ICompanyInVetWorkIn } from "entities/company/model/companyInterfaces";
import { CompanySelect } from "../selectData/CompanySelect";

interface AddCompanyToVetWorkFormProps {
  url: string;
  queryKey: string;
}

export function AddCompanyToVetWorkForm({
  url,
  queryKey,
}: AddCompanyToVetWorkFormProps) {
  const { id } = useParams();

  const methods = useForm<ICompanyInVetWorkIn>({
    mode: "onChange",
  });

  const {
    reset,
    handleSubmit,
    formState: { errors },
  } = methods;

  const { mutate } = useCreateItem(
    "addCompanyToVetWork",
    url,
    queryKey,
    "Предприятие успешно добавлено!",
    reset,
    id
  );

  const addCompanyToVetWork: SubmitHandler<ICompanyInVetWorkIn> = (data) => {
    mutate(data);
  };

  return (
    <>
      <FormProvider {...methods}>
        <form
          className="form-title"
          onSubmit={handleSubmit(addCompanyToVetWork)}
        >
          <div className="form-group">
            <label>Выберите предприятие *</label>
            <CompanySelect />
          </div>

          <div className="form-group">
            <ButtonSubmit title="Добавить" />
          </div>
        </form>
      </FormProvider>
    </>
  );
}
