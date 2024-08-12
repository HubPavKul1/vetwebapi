import Select, { SingleValue } from "react-select";

import { IOption } from "../../interfaces/FormInterface";

import { ICompany } from "../../interfaces/CompanyInterfaces";
import { Controller, useFormContext } from "react-hook-form";
import { useGetData } from "../../hooks/useGetData";
import { companiesUrl } from "../../Urls";

export function CompanySelect() {
  const { data, isLoading } = useGetData("companies", companiesUrl);

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
      name="company_id"
      rules={{ required: "Company is required!" }}
      render={({ field: { onChange, value } }) => (
        <Select
          className="custom-select"
          isSearchable
          isClearable
          options={options}
          value={getValue(value)}
          onChange={(newValue) => onChange((newValue as IOption).value)}
        />
      )}
    />
  );
}
