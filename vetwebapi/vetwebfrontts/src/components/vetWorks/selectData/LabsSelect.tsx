import Select from "react-select";

import { useFormContext, Controller } from "react-hook-form";
import { IOption } from "shared/model/FormInterface";

import { ICompany } from "interfaces/CompanyInterfaces";
import { useGetData } from "shared/hooks/useGetData";
import { labsUrl } from "shared/urls/companyUrls";

export function LabsSelect() {
  const { data, isLoading } = useGetData("labs", labsUrl);

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
      name="laboratory_id"
      render={({
        field: { onChange, value },
        // fieldState: {error}
      }) => (
        <Select
          className="custom-select"
          isSearchable
          isClearable
          options={options}
          value={getValue(value)}
          onChange={(newValue) => onChange((newValue as IOption).value)}
          placeholder="Выберите лабораторию"
        />
      )}
    />
  );
}
