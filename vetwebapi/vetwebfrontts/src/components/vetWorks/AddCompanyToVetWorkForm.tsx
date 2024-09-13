import { useForm, FormProvider, SubmitHandler } from "react-hook-form";



import { useParams } from "react-router-dom";
import { CompanySelect } from "./selectData/CompanySelect";
import { ICompanyInVetWorkIn } from "interfaces/CompanyInterfaces";
import { useCreateItem } from "hooks/useCreateItem";
import { CustomButton } from "shared/index";

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
            <CustomButton
              className="btn-submit"
              disabled={false}
              title="Добавить"
            />
          </div>
        </form>
      </FormProvider>
    </>
  );
}
