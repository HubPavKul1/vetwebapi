import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { PositionsSelect } from "./PositionsSelect";
import { IEmployeeCreate } from "interfaces/EmployeeInterfaces";

import { FormInputProps } from "shared/model/FormInterface";
import {
  fieldRequiredMessage,
  maxLenErrorMessage,
  minLenErrorMessage,
} from "components/ErrorMessages";
import { useParams } from "react-router-dom";
import { useCreateItem } from "hooks/useCreateItem";
import { companyEmployeesUrl } from "urls/companyUrls";
import { CustomButton, CustomInput } from "shared/index";

export function AddEmployeeForm() {
  const { id } = useParams();
  const companyId = Number(id);

  const inputItems: FormInputProps<IEmployeeCreate>[] = [
    { fieldName: "lastname", placeholder: "Введите фамилию *" },
    { fieldName: "firstname", placeholder: "Введите имя *" },
    { fieldName: "patronymic", placeholder: "Введите отчество *" },
  ];

  const methods = useForm<IEmployeeCreate>({
    mode: "onChange",
  });

  const {
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = methods;

  const { mutate } = useCreateItem(
    "create employee",
    companyEmployeesUrl(companyId),
    "company",
    "Работник успешно добавлен!",
    reset,
    id
  );

  const createEmployee: SubmitHandler<IEmployeeCreate> = (data) => {
    console.log("employee: ", data);
    mutate(data);
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(createEmployee)}>
        <div className="form-group">
          <label>Выберите должность *</label>
          <PositionsSelect />
        </div>
        {inputItems.map((item) => (
          <CustomInput
            key={item.fieldName}
            className="text-input"
            placeholder={item.placeholder}
            register={register}
            fieldName={item.fieldName}
            type="text"
            errors={errors}
            rules={{
              required: fieldRequiredMessage,
              maxLength: {
                value: 50,
                message: maxLenErrorMessage + " 50 символов!",
              },
              minLength: {
                value: 3,
                message: minLenErrorMessage + " 3 символа!",
              },
            }}
          />
        ))}

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
