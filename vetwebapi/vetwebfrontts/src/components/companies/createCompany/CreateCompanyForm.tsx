import { SubmitHandler, useForm } from "react-hook-form";
import { ICompanyCreate } from "../../../interfaces/CompanyInterfaces";
import { Input } from "../../Input";
import { FormInputProps } from "../../../interfaces/FormInterface";
import {
  fieldRequiredMessage,
  maxLenErrorMessage,
  minLenErrorMessage,
} from "../../ErrorMessages";
import { CustomButton } from "../../CustomButton";
import { useCreateItem } from "../../../hooks/useCreateItem";

interface CreateCompanyFormProps {
  url: string;
  invQueryName: string;
}

export function CreateCompanyForm({ url, invQueryName }: CreateCompanyFormProps) {
  const inputItems: FormInputProps<ICompanyCreate>[] = [
    { fieldName: "full_name", placeholder: "Введите полное наименование *" },
    { fieldName: "short_name", placeholder: "Введите краткое наименование *" },
  ];

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<ICompanyCreate>({
    mode: "onChange",
  });


  const { mutate } = useCreateItem(invQueryName, url, invQueryName, "Предприятие успешно добавлено!", reset)


  const createCompany: SubmitHandler<ICompanyCreate> = (data) => {
    mutate(data);
  };

  return (
    <form
      className="create-company-form"
      onSubmit={handleSubmit(createCompany)}
    >
      {inputItems.map((item) => (
        <Input
          key={item.fieldName}
          className="form-control"
          style={{ textAlign: "center" }}
          placeholder={item.placeholder}
          register={register}
          fieldName={item.fieldName}
          type="text"
          errors={errors}
          rules={{
            required: fieldRequiredMessage,
            maxLength: {
              value: 200,
              message: maxLenErrorMessage + "200 символов!",
            },
            minLength: {
              value: 3,
              message: minLenErrorMessage + "3 символа!",
            },
          }}
        />
      ))}

      <CustomButton
        className="btn-submit"
        disabled={false}
        title="Зарегистрировать"
      />
    </form>
  );
}
