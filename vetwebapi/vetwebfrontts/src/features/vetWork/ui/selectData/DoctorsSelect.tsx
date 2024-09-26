import Select from "react-select";
import { useFormContext, Controller } from "react-hook-form";
import { IOption } from "shared/model/FormInterface";
import { useGetData } from "shared/hooks/useGetData";
import { doctorsUrl } from "shared/urls/companyUrls";
import { IEmployee } from "entities/employee/model/employeeInterfaces";

export function DoctorSelect() {
  const { data, isLoading } = useGetData("doctors", doctorsUrl);

  const { control } = useFormContext();

  if (isLoading || !data) return <p>Загрузка ...</p>;

  const options =
    data.employees &&
    data.employees.map((employee: IEmployee) => ({
      value: employee.id,
      label: employee.fullname,
    }));

  const getValue = (value: number) =>
    value ? options?.find((option: IOption) => option.value === value) : "";

  return (
    <Controller
      control={control}
      name="doctors"
      rules={{ required: "Doctor is required!" }}
      render={({
        field: { onChange, value },
        // fieldState: {error}
      }) => (
        <Select
          className="custom-select"
          isSearchable
          isClearable
          isMulti
          options={options}
          value={getValue(value)}
          onChange={(newValue) =>
            onChange((newValue as IOption[]).map((v) => v.value))
          }
          placeholder="Выберите врачей *"
        />
      )}
    />
  );
}
