import { useForm, FormProvider, SubmitHandler } from "react-hook-form";
import { PositionsSelect } from "./PositionsSelect";

import { FormInputProps } from "shared/model/FormInterface";

import { useParams } from "react-router-dom";
import { useCreateItem } from "shared/hooks/useCreateItem";
import { companyEmployeesUrl } from "shared/urls/companyUrls";
import {
  ButtonSubmit,
  CustomInput,
  fieldRequiredMessage,
  maxLenErrorMessage,
  minLenErrorMessage,
} from "shared/index";
import { IEmployeeCreate } from "entities/employee/model/employeeInterfaces";

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
          <ButtonSubmit title="Зарегистрировать" />
        </div>
      </form>
    </FormProvider>
  );
}
