import Select from "react-select";
import { useFormContext, Controller } from "react-hook-form";
import { IOption } from "shared/model/FormInterface";
import { useGetData } from "shared/hooks/useGetData";
import { vetsUrl } from "shared/urls/companyUrls";
import { ICompany } from "entities/company/model/companyInterfaces";

export function ClinicSelect() {
  const { data, isLoading } = useGetData("clinics", vetsUrl);

  const { control } = useFormContext();

  if (isLoading || !data) return <p>Загрузка ...</p>;

  const options =
    data.companies &&
    data.companies.map((company: ICompany) => ({
      value: company.id,
      label: company.short_name,
    }));

  const getValue = (value: number) =>
    value ? options?.find((option: IOption) => option.value === value) : "";

  return (
    <Controller
      control={control}
      name="clinic_id"
      rules={{ required: "Clinic is required!" }}
      render={({
        field: { onChange, value },
      }) => (
        <Select
          className="custom-select w-auto"
          isSearchable
          isClearable
          options={options}
          value={getValue(value)}
          onChange={(newValue) => onChange((newValue as IOption).value)}
          placeholder="Выберите ветклинику"
        />
      )}
    />
  );
}
